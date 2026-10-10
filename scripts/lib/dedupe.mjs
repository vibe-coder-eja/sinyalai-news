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
 * Read simple `key: value` pairs from Markdown front matter.
 * Values are unquoted; inline arrays (`["a", "b"]`) are parsed as JSON.
 * @param {string} markdown
 * @returns {Record<string, any>}
 */
export function readFrontmatter(markdown) {
  const fm = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const out = {};
  if (!fm) return out;
  for (const line of fm[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (value.startsWith("[")) {
      try {
        out[m[1]] = JSON.parse(value);
        continue;
      } catch {
        /* fall through to plain string */
      }
    }
    out[m[1]] = value.replace(/^["']|["']$/g, "").replace(/\\"/g, '"');
  }
  return out;
}

/**
 * Load slugs, normalized source URLs, and article metadata of every article
 * (published, draft, or archived). `entries` feeds topic de-duplication and
 * category balancing.
 *
 * @param {string} dir
 * @returns {Promise<{ slugs: Set<string>, sources: Set<string>, entries: object[] }>}
 */
export async function loadExistingArticles(dir) {
  const slugs = new Set();
  const sources = new Set();
  const entries = [];

  let files = [];
  try {
    files = await readdir(dir, { recursive: true });
  } catch {
    return { slugs, sources, entries };
  }

  for (const file of files) {
    if (!/\.mdx?$/i.test(file)) continue;
    const baseSlug = path.basename(file).replace(/\.mdx?$/i, "");
    slugs.add(baseSlug);
    const relSlug = file.replace(/\\/g, "/").replace(/\.mdx?$/i, "");
    slugs.add(relSlug);
    try {
      const raw = await readFile(path.join(dir, file), "utf8");
      const fm = readFrontmatter(raw);
      const source = readSourceFromFrontmatter(raw);
      const normalized = source && normalizeUrl(source);
      if (normalized) sources.add(normalized);
      entries.push({
        slug: relSlug,
        title: fm.title || "",
        sourceTitle: fm.sourceTitle || "",
        company: fm.company || "",
        source: source || "",
        publishedAt: fm.publishedAt ? new Date(fm.publishedAt) : null,
        draft: fm.draft === "true",
        archived: fm.archived === "true",
        categories: Array.isArray(fm.categories) ? fm.categories : [],
      });
    } catch {
      /* unreadable file: slug is still tracked */
    }
  }

  return { slugs, sources, entries };
}
