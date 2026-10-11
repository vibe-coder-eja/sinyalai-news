/**
 * Bantuan untuk penyusunan ulang konten (reset edisi): jendela tanggal per hari
 * dan penyaringan arsip lama dari dedupe.
 */

/**
 * Jendela satu hari kalender UTC: [00:00 hari itu, 00:00 hari berikutnya).
 * Tanggal tayang artikel mengikuti tanggal sumber (folder memakai UTC), jadi memakai
 * hari UTC menjamin artikel jatuh tepat di folder tanggal yang diminta.
 * Batas akhir dipotong ke `now` agar tidak ada rilis dari masa depan.
 *
 * @param {string} forDate - format YYYY-MM-DD
 * @param {Date} [now]
 * @returns {{ start: Date, end: Date }}
 */
export function dateWindow(forDate, now = new Date()) {
  if (typeof forDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(forDate)) {
    throw new Error(`Tanggal tidak valid: "${forDate}" (format YYYY-MM-DD)`);
  }
  const start = new Date(`${forDate}T00:00:00.000Z`);
  if (Number.isNaN(start.valueOf())) throw new Error(`Tanggal tidak valid: "${forDate}"`);
  const nextDay = new Date(start.getTime() + 24 * 60 * 60 * 1000);
  return { start, end: nextDay.getTime() > now.getTime() ? now : nextDay };
}

/**
 * Sisakan kandidat yang tanggal rilis sumbernya jatuh di dalam jendela.
 * @param {Array<{ item?: { publishedAt?: Date | null } }>} entries
 * @param {{ start: Date, end: Date }} window
 */
export function filterToWindow(entries, window) {
  return entries.filter(({ item }) => {
    const d = item?.publishedAt;
    if (!(d instanceof Date) || Number.isNaN(d.valueOf())) return false;
    return d.getTime() >= window.start.getTime() && d.getTime() < window.end.getTime();
  });
}

/**
 * Buang artikel berstatus arsip dari data dedupe, supaya sumber dan topik yang sama
 * boleh ditulis ulang. Draf dan artikel tayang tetap dihitung.
 *
 * @param {{ entries: Array<{ archived?: boolean, source?: string }> }} existing
 * @param {(url: string) => string | null} normalizeUrl
 * @returns {{ sources: Set<string>, entries: object[] }}
 */
export function withoutArchived(existing, normalizeUrl) {
  const entries = existing.entries.filter((e) => !e.archived);
  const sources = new Set();
  for (const e of entries) {
    const n = e.source && normalizeUrl(e.source);
    if (n) sources.add(n);
  }
  return { sources, entries };
}
