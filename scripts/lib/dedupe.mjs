import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

/** Query parameters that only carry tracking data. */
const TRACKING_PARAMS = /^(?:utm_[a-z]+|fbclid|gclid|mc_cid|mc_eid|ref|ref_src|cmpid)$/i;

/**
 * Normalize an article URL so the same announcement is recognised even when
 * feeds vary in protocol, `www.`, trailing slash, fragment, or tracking params.
 *
 * @param {string} value
 * @returns {string | null}
 */
export function normalizeUrl(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  let url;
  try {
    url = new URL(value.trim());
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;

  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  const pathname = url.pathname.replace(/\/+$/, "") || "/";

  const params = [...url.searchParams.entries()]
    .filter(([key]) => !TRACKING_PARAMS.test(key))
    .sort(([a], [b]) => a.localeCompare(b));
  const query = params.length
    ? `?${params.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&")}`
    : "";

  return `${host}${pathname}${query}`;
}

/**
 * Extract the `source:` value from Markdown front matter.
 * @param {string} markdown
 * @returns {string | null}
 */
export function readSourceFromFrontmatter(markdown) {
  const fm = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return null;
  const line = fm[1].match(/^source:\s*(.+)$/m);
  if (!line) return null;
  return line[1].trim().replace(/^["']|["']$/g, "");
}

/**
 * Load slugs and normalized source URLs of every article (draft or not).
 *
 * @param {string} dir
 * @returns {Promise<{ slugs: Set<string>, sources: Set<string> }>}
 */
export async function loadExistingArticles(dir) {
  const slugs = new Set();
  const sources = new Set();

  let files = [];
  try {
    files = await readdir(dir);
  } catch {
    return { slugs, sources };
  }

  for (const file of files) {
    if (!/\.mdx?$/i.test(file)) continue;
    slugs.add(file.replace(/\.mdx?$/i, ""));
    try {
      const source = readSourceFromFrontmatter(await readFile(path.join(dir, file), "utf8"));
      const normalized = source && normalizeUrl(source);
      if (normalized) sources.add(normalized);
    } catch {
      /* unreadable file: slug is still tracked */
    }
  }

  return { slugs, sources };
}
