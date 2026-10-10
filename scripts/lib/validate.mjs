/**
 * Validasi keluaran LLM sebelum artikel ditulis ke repo.
 * Artikel tayang otomatis, jadi hasil yang rusak harus ditolak (dan diulang) di sini.
 */

/** Aksara non-Latin yang tidak boleh muncul di artikel Bahasa Indonesia (token leak). */
const FOREIGN_SCRIPT =
  /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Cyrillic}\p{Script=Arabic}\p{Script=Thai}\p{Script=Devanagari}]/u;

const PLACEHOLDER = /(?<![A-Za-z])(?:TODO|Draft otomatis|Belum di-review|lorem ipsum)(?![A-Za-z])/i;

/**
 * Aturan gaya yang bisa diperiksa mesin. Isinya sama dengan larangan di SYSTEM_PROMPT.
 * Tiap entri: [pola, nama aturan untuk umpan balik ke model].
 */
export const STYLE_RULES = [
  [/\bbukan\s+(?:hanya|sekadar|sekedar|semata)\b[^.!?\n]{0,80}?\b(?:tetapi|tapi|melainkan)\b/i, 'formula kontras "bukan sekadar X melainkan Y"'],
  [/\blompatan revolusioner\b/i, 'klise "lompatan revolusioner"'],
  [/\bmerombak lanskap\b/i, 'klise "merombak lanskap"'],
  [/\bgame[- ]changer\b/i, 'klise "game-changer"'],
  [/\bmenandai era baru\b/i, 'klise "menandai era baru"'],
  [/\btonggak (?:penting|sejarah)\b/i, 'klise "tonggak penting"'],
  [/\bpada intinya\b/i, 'klise "pada intinya"'],
  [/\bdi era sekarang\b/i, 'klise "di era sekarang"'],
  [/\bt(?:ak|idak) dapat dimungkiri\b/i, 'klise "tak dapat dimungkiri"'],
  [/\b(?:rilis|sumber|pengumuman|tulisan|blog)\b[^.\n]{0,40}\b(?:tidak|belum)\s+(?:menyebut(?:kan)?|membahas|menjelaskan|memuat)\b[^.\n]{0,80}\bIndonesia\b/i, 'penutup baku "rilis tidak menyebut ... Indonesia"'],
  [/\b(?:luar biasa|mengesankan|menakjubkan|mengagumkan|spektakuler|fantastis|brilian|revolusioner|mengecewakan|hebat)\b/i, "kata sifat penilai (menggiring opini)"],
];

/** Kata Inggris yang tidak mungkin muncul di kalimat Indonesia; kemunculannya berulang berarti teks belum diterjemahkan. */
const ENGLISH_MARKERS = /\b(?:the|and|with|that|this|from|which|are|your|our|their)\b/gi;
const ENGLISH_MAX = { title: 1, summary: 1, body: 2 };

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

  for (const [field, value] of [["title", title], ["summary", summary], ["body", body]]) {
    for (const [pattern, name] of STYLE_RULES) {
      if (pattern.test(value)) problems.push(`${field} melanggar aturan gaya: ${name}`);
    }
    const english = value.match(ENGLISH_MARKERS) || [];
    if (english.length > ENGLISH_MAX[field]) {
      problems.push(`${field} memuat kalimat berbahasa Inggris yang belum diterjemahkan ("${english.slice(0, 3).join(" ")}")`);
    }
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
    if (releaseDate) {
      // By line yang tegas: tanggal berdekatan dengan nama sumber, di dua paragraf pertama.
      const lead = body.split(/\n\s*\n/).filter((p) => p.trim()).slice(0, 2).join("\n\n");
      const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const near = company
        ? new RegExp(`${escape(company)}[^\\n]{0,80}\\(${escape(releaseDate)}\\)`, "i")
        : new RegExp(`\\(${escape(releaseDate)}\\)`);
      if (!near.test(lead)) {
        problems.push(
          `by line kurang tegas: tanggal rilis "(${releaseDate})" harus berdekatan dengan nama sumber di paragraf pertama atau kedua (contoh: "Berdasarkan rilis resmi ${company || "sumber"} (${releaseDate}), ...")`,
        );
      }
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
