/**
 * Validasi keluaran LLM sebelum artikel ditulis ke repo.
 * Artikel tayang otomatis, jadi hasil yang rusak harus ditolak (dan diulang) di sini.
 */

/** Aksara non-Latin yang tidak boleh muncul di artikel Bahasa Indonesia (token leak). */
const FOREIGN_SCRIPT =
  /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Cyrillic}\p{Script=Arabic}\p{Script=Thai}\p{Script=Devanagari}]/u;

const PLACEHOLDER = /(?<![A-Za-z])(?:TODO|Draft otomatis|Belum di-review|lorem ipsum)(?![A-Za-z])/i;

/** Kegagalan validasi/parsing keluaran LLM; pesannya aman dikirim balik ke model sebagai umpan balik. */
export class ArticleValidationError extends Error {
  constructor(message, problems = []) {
    super(message);
    this.name = "ArticleValidationError";
    this.problems = problems;
  }
}

/**
 * Batas teknis. Isi artikel sengaja tanpa batas huruf/paragraf: panjangnya
 * ditentukan penulis agar padat dan tidak membosankan (lihat SYSTEM_PROMPT).
 */
export const LIMITS = {
  titleMax: 120,
  summaryMin: 40,
  summaryMax: 400,
};

/**
 * @param {{ title: string, summary: string, body: string }} article
 * @param {{ company: string, releaseDate?: string }} ctx
 *   releaseDate: tanggal rilis sumber "dd/mm" yang wajib tertulis di isi artikel (atribusi sumber).
 * @returns {string[]} daftar masalah; kosong berarti lolos
 */
export function findArticleProblems(article, { company, releaseDate }) {
  const problems = [];
  const { title, summary, body } = article;

  for (const [field, value] of [["title", title], ["summary", summary], ["body", body]]) {
    const m = value.match(FOREIGN_SCRIPT);
    if (m) problems.push(`${field} memuat aksara non-Latin ("${m[0]}")`);
    if (PLACEHOLDER.test(value)) problems.push(`${field} memuat teks placeholder`);
  }

  if (title.length > LIMITS.titleMax) {
    problems.push(`title terlalu panjang (${title.length} > ${LIMITS.titleMax})`);
  }
  if (company && !title.toLowerCase().includes(company.toLowerCase())) {
    problems.push(`title tidak memuat nama perusahaan "${company}"`);
  }
  if (summary.length < LIMITS.summaryMin || summary.length > LIMITS.summaryMax) {
    problems.push(
      `panjang summary ${summary.length} di luar ${LIMITS.summaryMin}-${LIMITS.summaryMax} karakter`,
    );
  }
  if (!body.trim()) {
    problems.push("body kosong");
  } else {
    // Atribusi sumber (by line): nama perusahaan dan tanggal rilis harus tertulis di isi.
    if (company && !body.toLowerCase().includes(company.toLowerCase())) {
      problems.push(`body tidak menyebut sumber "${company}" (atribusi rilis)`);
    }
    if (releaseDate && !body.includes(releaseDate)) {
      problems.push(`body tidak memuat tanggal rilis sumber "${releaseDate}" (contoh: "Berdasarkan rilis resmi ${company || "sumber"} (${releaseDate}), ...")`);
    }
  }
  return problems;
}

/**
 * @param {{ title: string, summary: string, body: string }} article
 * @param {{ company: string, releaseDate?: string }} ctx
 */
export function assertValidArticle(article, ctx) {
  const problems = findArticleProblems(article, ctx);
  if (problems.length) {
    throw new ArticleValidationError(`Validasi artikel gagal: ${problems.join("; ")}`, problems);
  }
  return article;
}
