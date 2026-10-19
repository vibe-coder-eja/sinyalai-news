import { truncateAtWord } from "./text.mjs";
import { isSecureUrl, readBodyWithLimit } from "./rss.mjs";

const MAX_SUMMARY_LENGTH = 400;
const FETCH_TIMEOUT_MS = 20000;
const MAX_RESPONSE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Parser halaman catatan rilis Mintlify (mis. docs.z.ai/release-notes/new-released.md).
 * Tiap rilis berupa blok `<Update label="2026-08-26" description="GLM-5.3-Flash"> ... </Update>`:
 * `label` adalah tanggal, `description` nama model, isinya butir markdown.
 */

/**
 * Buang markup markdown dari butir catatan rilis agar menjadi teks polos.
 * @param {string} body
 */
function toPlainText(body) {
  return body
    .replace(/Learn more in our \[[^\]]*\]\([^)]*\)\.?\\?\*?/gi, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s*[*-]\s+/gm, "")
    .replace(/[*_`\\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * @param {string} markdown
 * @param {string} pageUrl URL halaman catatan rilis (dipakai bila rilis tidak punya tautan dokumentasi)
 * @returns {{ title: string, link: string, publishedAt: Date, summary: string }[]}
 */
export function parseUpdates(markdown, pageUrl) {
  const pageBase = pageUrl.replace(/\.md$/i, "").split("#")[0];
  const items = [];

  for (const match of markdown.matchAll(/<Update\b([^>]*)>([\s\S]*?)<\/Update>/gi)) {
    const attrs = match[1];
    const body = match[2];
    const label = attrs.match(/\blabel="([^"]*)"/i)?.[1]?.trim() || "";
    const model = attrs.match(/\bdescription="([^"]*)"/i)?.[1]?.trim() || "";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(label) || !model) continue;

    const publishedAt = new Date(`${label}T00:00:00Z`);
    if (Number.isNaN(publishedAt.valueOf())) continue;

    // Tautan dokumentasi model (relatif atau absolut) paling berguna sebagai sumber; bila tak ada,
    // pakai halaman catatan rilis dengan jangkar tanggal+model agar tiap rilis punya URL sendiri.
    const docHref = body.match(/\[[^\]]*\]\(([^)\s]+)\)/)?.[1];
    let link = `${pageBase}#${label}-${model.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
    if (docHref) {
      try {
        link = new URL(docHref, pageBase).toString();
      } catch {
        /* pakai jangkar halaman catatan rilis */
      }
    }
    if (!isSecureUrl(link)) continue;

    items.push({
      title: `Z.ai ${model}`,
      link,
      publishedAt,
      summary: truncateAtWord(toPlainText(body), MAX_SUMMARY_LENGTH),
    });
  }

  return items;
}

/**
 * @param {string} url
 * @param {number} [timeoutMs]
 */
export async function fetchUpdates(url, timeoutMs = FETCH_TIMEOUT_MS) {
  if (!isSecureUrl(url)) {
    throw new Error("URL must use HTTPS and must not contain credentials");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "SinyalAI-Bot/0.1 (+https://sinyalai.xyz/tentang; news draft pipeline)",
        Accept: "text/markdown, text/plain, */*",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    if (res.url && !isSecureUrl(res.url)) {
      throw new Error("Page redirected to an insecure URL");
    }

    const markdown = await readBodyWithLimit(res, MAX_RESPONSE_SIZE);
    const items = parseUpdates(markdown, res.url || url);
    if (items.length === 0) {
      throw new Error("Tidak ada blok <Update> terdeteksi; format catatan rilis mungkin berubah");
    }
    return items;
  } finally {
    clearTimeout(timer);
  }
}
