/**
 * Pemilihan dan pengambilan sumber untuk pipeline berita otomatis.
 *
 * Jenis sumber di sources.json:
 * - rss  : feed RSS/Atom (fetchFeed)
 * - html : halaman daftar rilis HTML (fetchHtmlListing)
 * - page : catatan manual, tidak diambil otomatis
 * `enabled: false` mematikan sumber. Tanpa `type` dianggap rss.
 */

export const ACTIVE_TYPES = new Set(["rss", "html"]);

/**
 * @param {Array<{ id: string, type?: string, enabled?: boolean }>} sources
 * @returns {{ active: object[], skipped: Array<{ source: object, reason: string }> }}
 */
export function selectActiveSources(sources = []) {
  const active = [];
  const skipped = [];
  for (const source of sources) {
    const type = source.type || "rss";
    if (source.enabled === false) {
      skipped.push({ source, reason: "dimatikan (enabled: false)" });
    } else if (!ACTIVE_TYPES.has(type)) {
      skipped.push({ source, reason: `tipe "${type}" tidak diambil otomatis` });
    } else {
      active.push(source);
    }
  }
  return { active, skipped };
}

/**
 * Ambil item dari satu sumber sesuai tipenya.
 * @param {{ type?: string, url: string }} source
 * @param {{ fetchFeed: Function, fetchHtmlListing: Function }} fetchers
 * @param {number} [timeoutMs]
 */
export function fetchSourceItems(source, { fetchFeed, fetchHtmlListing }, timeoutMs) {
  return source.type === "html"
    ? fetchHtmlListing(source.url, timeoutMs)
    : fetchFeed(source.url, timeoutMs);
}
