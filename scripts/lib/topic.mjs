/**
 * Pembanding topik: mengenali berita yang sama meskipun URL sumbernya berbeda
 * (misalnya satu rilis Google yang muncul di dua feed, atau mirror feed).
 *
 * Cara kerja: tiap berita diwakili himpunan kata kunci (judul sumber + slug URL),
 * tanpa kata umum. Kata yang jarang muncul di korpus diberi bobot lebih besar
 * (IDF), sehingga nama produk dan versi (mis. "gemma", "12b", "argon") lebih
 * menentukan daripada kata umum. Dua berita dianggap sama jika kata kunci bersama
 * berbobot cukup besar. Bobot ikut menyesuaikan seiring bertambahnya artikel.
 *
 * Batas: pembandingan judul lintas bahasa (judul Inggris vs judul Indonesia)
 * hanya mengandalkan nama produk dan angka. Karena itu artikel baru menyimpan
 * `sourceTitle` (judul asli sumber) agar pembandingan berikutnya Inggris-Inggris.
 */

const STOPWORDS = new Set(
  (
    // Inggris
    "a an the and or of to in on for with from by at as is are was were be been it its this that these those " +
    "we our you your their they he she his her not no but if so than then into over about after before more most " +
    "how what why when where which who whom can will new now just all any out up one two via per vs " +
    // kata kerja/judul umum di rilis
    "introducing introduces introduce announcing announces announce announced launch launches launched launching " +
    "release releases released releasing unveil unveils unveiled unveiling meet meets available today " +
    "update updates updated using use uses used build builds building built get gets making make makes " +
    "ai model models latest news blog " +
    // Indonesia
    "yang dan di ke dari untuk dengan pada dalam atau oleh juga kini telah akan sebagai ini itu agar bagi " +
    "rilis merilis hadirkan menghadirkan luncurkan meluncurkan perkenalkan memperkenalkan kenalkan resmi " +
    "baru terbaru model tambahkan menambahkan bahas membahas bagikan membagikan lewat sampai hingga lebih " +
    "ai"
  ).split(/\s+/),
);

/** Nama perusahaan sumber tidak membedakan topik. */
const COMPANY_WORDS = new Set(
  "openai anthropic google deepmind microsoft nvidia xai meta".split(" "),
);

/** Ambil bagian terakhir path URL sebagai teks slug ("/blog/gemma-4-12b/" → "gemma 4 12b"). */
export function slugTextFromUrl(url) {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    return (parts[parts.length - 1] || "").replace(/[-_]+/g, " ");
  } catch {
    return "";
  }
}

/**
 * Himpunan kata kunci topik dari sebuah teks.
 * @param {string} text
 * @returns {Set<string>}
 */
export function topicTokens(text) {
  const out = new Set();
  if (typeof text !== "string") return out;
  const ascii = text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    // versi seperti 6.1 atau 4.5 tetap satu kata
    .replace(/(\d)\.(\d)/g, "$1_$2");
  for (const raw of ascii.split(/[^a-z0-9_]+/)) {
    const tok = raw.replace(/^_+|_+$/g, "");
    if (!tok) continue;
    if (STOPWORDS.has(tok) || COMPANY_WORDS.has(tok)) continue;
    if (tok.length < 2 && !/\d/.test(tok)) continue;
    out.add(tok);
  }
  return out;
}

/**
 * Bangun representasi topik.
 * @param {{ title?: string, link?: string }} p
 * @returns {Set<string>}
 */
export function buildTopic({ title = "", link = "" }) {
  const tokens = topicTokens(title);
  for (const t of topicTokens(slugTextFromUrl(link))) tokens.add(t);
  return tokens;
}

/**
 * Bobot kata (IDF) dari kumpulan topik.
 * @param {Set<string>[]} topics
 * @returns {(token: string) => number}
 */
export function makeWeigher(topics) {
  const df = new Map();
  for (const topic of topics) for (const t of topic) df.set(t, (df.get(t) || 0) + 1);
  const n = Math.max(1, topics.length);
  return (token) => Math.log(1 + n / (1 + (df.get(token) || 0)));
}

/** Ambang untuk perusahaan yang sama dan untuk perusahaan berbeda (lebih ketat, karena sudut liputan bisa beda). */
export const SAME_TOPIC_THRESHOLD = 0.6;
export const CROSS_COMPANY_THRESHOLD = 0.85;
export const MIN_SHARED_TOKENS = 2;
export const CROSS_COMPANY_MIN_SHARED = 3;

/**
 * Kemiripan dua topik, 0 sampai 1 (koefisien tumpang tindih berbobot).
 * @param {Set<string>} a
 * @param {Set<string>} b
 * @param {(token: string) => number} weight
 * @returns {{ score: number, shared: string[] }}
 */
export function topicOverlap(a, b, weight) {
  const shared = [...a].filter((t) => b.has(t));
  if (!shared.length) return { score: 0, shared };
  const sum = (s) => [...s].reduce((acc, t) => acc + weight(t), 0);
  const denom = Math.min(sum(a), sum(b));
  return { score: denom > 0 ? shared.reduce((acc, t) => acc + weight(t), 0) / denom : 0, shared };
}

/**
 * Cari topik yang sama di antara daftar pembanding.
 * Perusahaan sama: ambang 0,6 dengan minimal 2 kata kunci bersama.
 * Perusahaan berbeda (mis. NVIDIA menulis tentang rilis OpenAI): ambang 0,85 dengan minimal 3 kata bersama.
 *
 * @param {{ topic: Set<string>, company?: string }} candidate
 * @param {{ topic: Set<string>, company?: string, label: string }[]} pool
 * @param {(token: string) => number} weight
 * @returns {{ label: string, score: number, shared: string[] } | null}
 */
export function findSameTopic(candidate, pool, weight) {
  let best = null;
  for (const other of pool) {
    const { score, shared } = topicOverlap(candidate.topic, other.topic, weight);
    const sameCompany =
      candidate.company && other.company && candidate.company.toLowerCase() === other.company.toLowerCase();
    const needShared = sameCompany ? MIN_SHARED_TOKENS : CROSS_COMPANY_MIN_SHARED;
    const needScore = sameCompany ? SAME_TOPIC_THRESHOLD : CROSS_COMPANY_THRESHOLD;
    if (shared.length >= needShared && score >= needScore) {
      if (!best || score > best.score) best = { label: other.label, score, shared };
    }
  }
  return best;
}
