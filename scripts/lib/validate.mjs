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

export const LIMITS = {
  titleMax: 120,
  summaryMin: 80,
  summaryMax: 300,
  bodyMin: 400,
  bodyMinParagraphs: 2,
};

/**
 * @param {{ title: string, summary: string, body: string }} article
 * @param {{ company: string }} ctx
 * @returns {string[]} daftar masalah; kosong berarti lolos
 */
export function findArticleProblems(article, { company }) {
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
  const paragraphs = body.split(/\n\s*\n/).filter((p) => p.trim());
  if (body.length < LIMITS.bodyMin) {
    problems.push(`body terlalu pendek (${body.length} < ${LIMITS.bodyMin} karakter)`);
  }
  if (paragraphs.length < LIMITS.bodyMinParagraphs) {
    problems.push(`body hanya ${paragraphs.length} paragraf`);
  }
  return problems;
}

/**
 * @param {{ title: string, summary: string, body: string }} article
 * @param {{ company: string }} ctx
 */
export function assertValidArticle(article, ctx) {
  const problems = findArticleProblems(article, ctx);
  if (problems.length) {
    throw new ArticleValidationError(`Validasi artikel gagal: ${problems.join("; ")}`, problems);
  }
  return article;
}
