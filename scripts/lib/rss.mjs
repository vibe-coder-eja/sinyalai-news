import { truncateAtWord } from "./text.mjs";

const MAX_SUMMARY_LENGTH = 400;
const FETCH_TIMEOUT_MS = 20000;
const MAX_RESPONSE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Parser RSS/Atom minimal (tanpa dependency).
 * Cukup untuk title, link, pubDate/updated, description/summary.
 */

/**
 * @param {string} xml
 * @param {string} tag
 */
function firstTag(xml, tag) {
  const cdata = new RegExp(
    `<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`,
    "i",
  );
  const plain = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = xml.match(cdata) || xml.match(plain);
  return m ? decodeXml(m[1].trim()) : "";
}

/**
 * @param {string} xml
 * @param {string} tag
 */
function allBlocks(xml, tag) {
  const re = new RegExp(`<${tag}[\\s>][\\s\\S]*?</${tag}>`, "gi");
  return xml.match(re) || [];
}

/**
 * @param {string} value
 */
function decodeXml(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
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
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * @param {string} block
 */
function extractLink(block) {
  const linkTags = block.match(/<link\b[^>]*>/gi) || [];
  const alternate = linkTags.find((tag) => /\brel=["']alternate["']/i.test(tag));
  const alternateHref = alternate?.match(/\bhref=["']([^"']+)["']/i);
  if (alternateHref?.[1]) return alternateHref[1].trim();

  const atom = block.match(/<link\b[^>]*\bhref=["']([^"']+)["'][^>]*>/i);
  if (atom?.[1]) return atom[1].trim();

  return firstTag(block, "link");
}

/**
 * @param {string} value
 */
function isSecureUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}

/**
 * @param {string} xml
 * @returns {{ title: string, link: string, publishedAt: Date | null, summary: string }[]}
 */
export function parseFeed(xml) {
  const itemBlocks = allBlocks(xml, "item");
  const entryBlocks = itemBlocks.length ? itemBlocks : allBlocks(xml, "entry");

  return entryBlocks
    .map((block) => {
      const title = firstTag(block, "title");
      const link = extractLink(block);
      const dateRaw =
        firstTag(block, "pubDate") ||
        firstTag(block, "published") ||
        firstTag(block, "updated") ||
        firstTag(block, "dc:date");
      const summary =
        firstTag(block, "description") ||
        firstTag(block, "summary") ||
        firstTag(block, "content") ||
        "";

      const publishedAt = dateRaw ? new Date(dateRaw) : null;
      if (!title || !isSecureUrl(link)) return null;

      return {
        title,
        link,
        publishedAt: publishedAt && !Number.isNaN(publishedAt.valueOf())
          ? publishedAt
          : null,
        summary: truncateAtWord(summary, MAX_SUMMARY_LENGTH),
      };
    })
    .filter(Boolean);
}

/**
 * Helper to read stream with max byte limit to prevent OOM
 * @param {Response} res
 * @param {number} limit
 */
export async function readBodyWithLimit(res, limit) {
  if (!res.body) return "";
  const reader = res.body.getReader();
  const chunks = [];
  let receivedBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      receivedBytes += value.length;
      if (receivedBytes > limit) {
        throw new Error(`Response size exceeded limit of ${limit} bytes`);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const allChunks = new Uint8Array(receivedBytes);
  let position = 0;
  for (const chunk of chunks) {
    allChunks.set(chunk, position);
    position += chunk.length;
  }

  return new TextDecoder().decode(allChunks);
}

/**
 * @param {string} url
 * @param {number} [timeoutMs]
 */
export async function fetchFeed(url, timeoutMs = FETCH_TIMEOUT_MS) {
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
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    if (res.url && !isSecureUrl(res.url)) {
      throw new Error("Feed redirected to an insecure URL");
    }

    const xml = await readBodyWithLimit(res, MAX_RESPONSE_SIZE);
    return parseFeed(xml);
  } finally {
    clearTimeout(timer);
  }
}
