/**
 * Shared text helpers for the content pipeline.
 */

export const ELLIPSIS = "…";

/**
 * Truncate text at the last word boundary before `limit` characters.
 * Appends an ellipsis only when the text was actually shortened.
 * The returned string (including the ellipsis) never exceeds `limit`.
 *
 * @param {string} text
 * @param {number} limit
 * @returns {string}
 */
export function truncateAtWord(text, limit) {
  if (typeof text !== "string" || !text) return "";
  const clean = text.trim();
  if (clean.length <= limit) return clean;

  const hardLimit = Math.max(1, limit - ELLIPSIS.length);
  const slice = clean.slice(0, hardLimit + 1);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > 0 ? slice.slice(0, lastSpace) : clean.slice(0, hardLimit);

  // Avoid dangling punctuation such as "foo, …" or "bar —…".
  return cut.replace(/[\s,;:\-–—(]+$/u, "") + ELLIPSIS;
}

/**
 * Format tanggal sebagai "dd/mm" (UTC, sama dengan folder tanggal artikel).
 * Dipakai untuk atribusi sumber di dalam artikel, misalnya "OpenAI (07/10)".
 *
 * @param {Date} date
 * @returns {string}
 */
export function formatDayMonth(date) {
  const iso = date.toISOString();
  return `${iso.slice(8, 10)}/${iso.slice(5, 7)}`;
}
