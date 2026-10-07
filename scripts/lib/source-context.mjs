/**
 * Mengambil teks halaman sumber resmi sebagai konteks tambahan untuk penulis AI,
 * agar artikel tidak hanya bertumpu pada judul dan cuplikan feed.
 * Semua kegagalan menghasilkan string kosong (pipeline tetap berjalan dengan cuplikan feed).
 */

import { readBodyWithLimit } from "./rss.mjs";
import { truncateAtWord } from "./text.mjs";

const FETCH_TIMEOUT_MS = 15000;
const MAX_RESPONSE_SIZE = 2 * 1024 * 1024; // 2MB
export const MAX_CONTEXT_CHARS = 6000;

/** Host internal/lokal yang tidak boleh diakses (mitigasi SSRF dari URL feed). */
function isBlockedHost(hostname) {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal")) return true;
  if (h.includes(":")) return true; // literal IPv6
  const ip = h.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (ip) return true; // literal IPv4: sumber resmi selalu memakai nama domain
  return false;
}

/**
 * @param {string} value
 */
function isFetchableUrl(value) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" && !url.username && !url.password && !isBlockedHost(url.hostname)
    );
  } catch {
    return false;
  }
}

/**
 * Ubah HTML menjadi teks polos ringkas (paragraf utama saja).
 * @param {string} html
 * @param {number} [limit]
 */
export function htmlToContextText(html, limit = MAX_CONTEXT_CHARS) {
  if (typeof html !== "string" || !html) return "";
  const main =
    html.match(/<article[\s\S]*?<\/article>/i)?.[0] ||
    html.match(/<main[\s\S]*?<\/main>/i)?.[0] ||
    html;

  const text = main
    .replace(/<(script|style|noscript|svg|nav|header|footer|form|iframe)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<\/(p|div|li|h[1-6]|br|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/[ \t]+/g, " ")
    .split("\n")
    .map((l) => l.trim())
    // buang baris pendek (menu, tombol, label) dan sisakan kalimat bermakna
    .filter((l) => l.length >= 40)
    .join("\n");

  return truncateAtWord(text, limit);
}

/**
 * @param {string} url
 * @param {number} [timeoutMs]
 * @returns {Promise<string>} teks konteks, atau "" jika gagal/tidak tersedia
 */
export async function fetchSourceText(url, timeoutMs = FETCH_TIMEOUT_MS) {
  if (!isFetchableUrl(url)) return "";

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "SinyalAI-Bot/0.1 (+https://sinyalai.xyz/tentang; news pipeline)",
        Accept: "text/html, application/xhtml+xml",
      },
    });
    if (!res.ok) return "";
    if (res.url && !isFetchableUrl(res.url)) return "";
    const type = res.headers?.get?.("content-type") || "";
    if (type && !/html|xml|text\//i.test(type)) return "";
    return htmlToContextText(await readBodyWithLimit(res, MAX_RESPONSE_SIZE));
  } catch {
    return "";
  } finally {
    clearTimeout(timer);
  }
}
