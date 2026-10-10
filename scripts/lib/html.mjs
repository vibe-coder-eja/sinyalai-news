import { truncateAtWord } from "./text.mjs";
import { isSecureUrl, readBodyWithLimit } from "./rss.mjs";

const MAX_SUMMARY_LENGTH = 400;
const FETCH_TIMEOUT_MS = 20000;
const MAX_RESPONSE_SIZE = 5 * 1024 * 1024; // 5MB

const MONTHS = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

/**
 * Parser halaman daftar rilis (HTML) tanpa dependency.
 * Pola yang dikenali: tiap artikel adalah `<a href>` yang membungkus `<time>`,
 * judul (heading `<h1-6>` atau elemen ber-class "title"), dan opsional `<p>` ringkasan.
 */

/**
 * @param {string} value
 */
function decodeHtml(value) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCodePoint(Number.parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, num) =>
      String.fromCodePoint(Number.parseInt(num, 10)),
    )
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Terima ISO ("2026-10-07", "2026-10-07T10:00:00Z") atau "Oct 7, 2026" / "7 October 2026".
 * Tanggal tanpa zona dibaca sebagai UTC agar hasil tidak bergantung zona waktu mesin.
 * @param {string} raw
 * @returns {Date | null}
 */
export function parseListingDate(raw) {
  const text = (raw || "").trim();
  if (!text) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    const d = new Date(`${text}T00:00:00Z`);
    return Number.isNaN(d.valueOf()) ? null : d;
  }
  if (/^\d{4}-\d{2}-\d{2}T/.test(text)) {
    const d = new Date(text);
    return Number.isNaN(d.valueOf()) ? null : d;
  }

  const named =
    text.match(/([A-Za-z]{3,9})\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/) ||
    text.match(/(\d{1,2})\s+([A-Za-z]{3,9})\.?,?\s+(\d{4})/);
  if (!named) return null;

  const dayFirst = /^\d/.test(named[1]);
  const monthName = (dayFirst ? named[2] : named[1]).slice(0, 3).toLowerCase();
  const day = Number(dayFirst ? named[1] : named[2]);
  const year = Number(named[3]);
  const month = MONTHS[monthName];
  if (month === undefined) return null;

  const d = new Date(Date.UTC(year, month, day));
  return Number.isNaN(d.valueOf()) ? null : d;
}

/**
 * @param {string} inner
 */
function extractTitle(inner) {
  const heading = inner.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i);
  if (heading) return decodeHtml(heading[1]);

  const titled = inner.match(
    /<(span|div|p)\b[^>]*class="[^"]*[Tt]itle[^"]*"[^>]*>([\s\S]*?)<\/\1>/,
  );
  return titled ? decodeHtml(titled[2]) : "";
}

/**
 * Tanggal tanpa <time>: elemen `<span>`/`<p>`/`<div>` yang seluruh teksnya berupa tanggal
 * ("September 10, 2026"). Mengembalikan bentuk yang sama dengan hasil match <time>.
 * @param {string} anchor
 * @returns {RegExpMatchArray | null}
 */
function matchPlainDate(anchor) {
  for (const m of anchor.matchAll(/<(span|p|div)\b[^>]*>([^<]{6,40})<\/\1>/gi)) {
    const text = decodeHtml(m[2]);
    if (parseListingDate(text) && text.length <= 30) return ["", "", text];
  }
  return null;
}

/**
 * Ringkasan: `<p>` pertama untuk pola <time>; bila ada beberapa `<p>`
 * (mis. label + tanggal + ringkasan), ambil yang terpanjang yang bukan baris tanggal.
 * @param {string} anchor
 */
function extractSummary(anchor) {
  const texts = [...anchor.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => decodeHtml(m[1]));
  if (texts.length <= 1) return texts[0] || "";
  return texts.reduce((best, t) => (t.length > best.length ? t : best), "");
}

/**
 * @param {string} html
 * @param {string} baseUrl
 * @returns {{ title: string, link: string, publishedAt: Date | null, summary: string }[]}
 */
export function parseListing(html, baseUrl) {
  const anchors = html.match(/<a\b[^>]*\bhref="[^"]*"[^>]*>[\s\S]*?<\/a>/gi) || [];
  /** @type {Map<string, { title: string, link: string, publishedAt: Date | null, summary: string }>} */
  const byLink = new Map();

  for (const anchor of anchors) {
    const time =
      anchor.match(/<time\b([^>]*)>([\s\S]*?)<\/time>/i) || matchPlainDate(anchor);
    if (!time) continue;

    const href = anchor.match(/\bhref="([^"]*)"/i)?.[1];
    if (!href) continue;

    let link;
    try {
      link = new URL(decodeHtml(href), baseUrl).toString();
    } catch {
      continue;
    }
    if (!isSecureUrl(link)) continue;

    const title = extractTitle(anchor);
    if (!title) continue;

    const datetime = time[1].match(/\bdatetime="([^"]*)"/i)?.[1];
    const publishedAt =
      parseListingDate(datetime || "") || parseListingDate(decodeHtml(time[2]));

    const summary = truncateAtWord(extractSummary(anchor), MAX_SUMMARY_LENGTH);

    // Artikel yang sama bisa muncul di blok unggulan dan daftar; pertahankan yang berringkasan.
    const existing = byLink.get(link);
    if (!existing || (!existing.summary && summary)) {
      byLink.set(link, { title, link, publishedAt, summary });
    }
  }

  if (byLink.size === 0) {
    for (const item of parseOverlayCards(html, baseUrl)) byLink.set(item.link, item);
  }

  return [...byLink.values()];
}

/**
 * Pola kartu dengan "stretched link": `<a href aria-label="Judul"></a>` kosong
 * (overlay), lalu elemen ber-class "date" sebagai saudaranya.
 * Dipakai bila pola `<a><time>` tidak menemukan apa pun (mis. kimi.ai/blog).
 * @param {string} html
 * @param {string} baseUrl
 */
function parseOverlayCards(html, baseUrl) {
  const items = [];
  const overlay = /<a\b[^>]*\bhref="([^"]*)"[^>]*\baria-label="([^"]*)"[^>]*>\s*<\/a>/gi;
  const starts = [...html.matchAll(overlay)];

  starts.forEach((match, i) => {
    const chunk = html.slice(
      match.index + match[0].length,
      starts[i + 1]?.index ?? match.index + match[0].length + 3000,
    );
    const date = chunk.match(/<(\w+)\b[^>]*class="[^"]*\bdate\b[^"]*"[^>]*>([\s\S]*?)<\/\1>/i);
    if (!date) return;

    let link;
    try {
      link = new URL(decodeHtml(match[1]), baseUrl).toString();
    } catch {
      return;
    }
    const title = decodeHtml(match[2]);
    if (!title || !isSecureUrl(link)) return;

    items.push({
      title,
      link,
      publishedAt: parseListingDate(decodeHtml(date[2])),
      summary: "",
    });
  });

  return items;
}

/**
 * @param {string} url
 * @param {number} [timeoutMs]
 */
export async function fetchHtmlListing(url, timeoutMs = FETCH_TIMEOUT_MS) {
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
        Accept: "text/html, application/xhtml+xml",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    if (res.url && !isSecureUrl(res.url)) {
      throw new Error("Page redirected to an insecure URL");
    }

    const html = await readBodyWithLimit(res, MAX_RESPONSE_SIZE);
    const items = parseListing(html, res.url || url);
    if (items.length === 0) {
      throw new Error("Tidak ada artikel terdeteksi; struktur halaman mungkin berubah");
    }
    return items;
  } finally {
    clearTimeout(timer);
  }
}
