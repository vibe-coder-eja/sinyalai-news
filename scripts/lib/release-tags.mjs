/**
 * Penanganan rilis dari GitHub (feed Atom `releases.atom`).
 *
 * Satu versi sering muncul berkali-kali sebagai tag kandidat (`rc.8-v0.21.7`, `rc.9-v0.21.7`,
 * `abandoned-rc.8-v0.21.7`) sebelum rilis stabil `v0.21.7`. Kandidat rilis tanpa catatan
 * bukan berita, dan beberapa tag untuk versi yang sama adalah topik yang sama.
 */

const PRERELEASE_WORDS = "rc|alpha|beta|canary|nightly|abandoned|snapshot|dev|preview";
const PRERELEASE = new RegExp(`(?:^|[-_.])(?:${PRERELEASE_WORDS})(?:[-_.]?\\d+)*(?=$|[-_.])`, "i");

/**
 * @param {string} link
 * @returns {{ owner: string, repo: string, tag: string } | null} null bila bukan tautan rilis GitHub
 */
export function parseGithubReleaseUrl(link) {
  try {
    const url = new URL(link);
    if (url.hostname.toLowerCase() !== "github.com") return null;
    const m = url.pathname.match(/^\/([^/]+)\/([^/]+)\/releases\/tag\/(.+?)\/?$/);
    if (!m) return null;
    return { owner: m[1], repo: m[2], tag: decodeURIComponent(m[3]) };
  } catch {
    return null;
  }
}

/**
 * Tag kandidat/pra-rilis: rc, alpha, beta, canary, nightly, abandoned, snapshot, dev, preview.
 * @param {string} tag
 */
export function isPrereleaseTag(tag) {
  return typeof tag === "string" && PRERELEASE.test(tag);
}

/**
 * Alasan item harus dilewati, atau null. Hanya berlaku untuk tautan rilis GitHub.
 * @param {{ link?: string }} item
 * @returns {string | null}
 */
export function releaseSkipReason(item) {
  const gh = parseGithubReleaseUrl(item?.link || "");
  if (gh && isPrereleaseTag(gh.tag)) return `kandidat/pra-rilis (${gh.tag})`;
  return null;
}

/** Cuplikan feed minimal agar sebuah rilis GitHub punya bahan berita (huruf). */
export const MIN_RELEASE_NOTES_CHARS = 120;

/**
 * Kata kunci topik untuk rilis GitHub: nama repo dan nomor versi, tanpa penanda kandidat.
 * `rc.8-v0.21.7` dan `rc.9-v0.21.7` menghasilkan himpunan yang sama.
 * @param {{ repo: string, tag: string }} gh
 * @returns {Set<string>}
 */
export function releaseTopicTokens(gh) {
  const out = new Set();
  for (const w of gh.repo.toLowerCase().split(/[^a-z0-9]+/)) if (w) out.add(w);
  const versions = gh.tag.match(/\d+(?:\.\d+)+/g) || [];
  for (const v of versions) out.add(v.replace(/\./g, "_"));
  if (versions.length === 0) {
    const cleaned = gh.tag.toLowerCase().replace(PRERELEASE, " ");
    for (const w of cleaned.split(/[^a-z0-9]+/)) if (w) out.add(w);
  }
  return out;
}
