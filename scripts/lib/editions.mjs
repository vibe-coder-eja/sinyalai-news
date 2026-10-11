/**
 * Profil edisi redaksi. Pemimpin redaksi menetapkan fokus yang berbeda:
 *
 * - Pagi (10.35 WIB): kabar besar semalam yang perlu diketahui sebelum memulai hari.
 *   Rilis model, produk dan infrastruktur, serta kemitraan diberi bonus skor.
 * - Malam (22.05 WIB): bacaan yang lebih santai dan mendalam. Fitur yang bisa dipakai,
 *   studi kasus penerapan, riset, keamanan, dan kebijakan diberi bonus skor.
 *
 * Bonus hanya menggeser urutan; berita tetap harus lolos semua filter lain.
 */

export const EDITIONS = {
  pagi: {
    id: "pagi",
    label: "Edisi Pagi (10:35 WIB)",
    focus: "Kabar besar semalam: rilis model, produk, infrastruktur, dan kemitraan yang perlu diketahui sebelum memulai hari.",
    boosts: { "Rilis Model": 10, "Produk Baru": 10, "Kerjasama Industri": 5 },
    // Pagi boleh mengambil rilis 1-2 hari terakhir, bersaing sejajar dengan rilis hari ini.
    maxAgeDays: 2,
    todayFirst: false,
    writerFocus:
      "Edisi pagi: ringkas dan langsung ke inti. Tekankan apa yang berubah dan siapa yang terdampak.",
  },
  malam: {
    id: "malam",
    label: "Edisi Malam (22:05 WIB)",
    focus: "Bacaan malam yang lebih mendalam: fitur yang bisa dipakai, studi kasus penerapan, riset, keamanan, dan kebijakan.",
    boosts: { "Fitur & Skills": 10, "Penerapan Industri": 10, "Riset & Kebijakan": 10 },
    // Malam memprioritaskan rilis hari yang sama; backlog dibatasi 2 hari.
    maxAgeDays: 2,
    todayFirst: true,
    writerFocus:
      "Edisi malam: lebih edukatif dan santai. Jelaskan cara kerja, konteks, dan contoh pemakaian agar enak dibaca.",
  },
};

/**
 * Batas usia cadangan (hari). Bila rilis dalam `maxAgeDays` tidak cukup memenuhi kuota edisi,
 * pipeline mengulang seleksi dengan batas ini untuk mengisi slot yang kosong. Tanggal tayang
 * tetap mengikuti tanggal sumber, jadi berita lebih tua tidak diberi tanggal palsu.
 */
export const FALLBACK_MAX_AGE_DAYS = 4;

/**
 * @param {string} name "pagi" atau "malam" (nilai lain dianggap malam, sama seperti perilaku sebelumnya)
 */
export function getEdition(name) {
  return name === "pagi" ? EDITIONS.pagi : EDITIONS.malam;
}

/** Zona WIB (UTC+7) tanpa DST. */
const WIB_OFFSET_HOURS = 7;
/** Run pagi yang molor tetap pagi sampai jam ini (WIB); sesudahnya dianggap malam. */
export const PAGI_START_HOUR_WIB = 4;
export const MALAM_START_HOUR_WIB = 19;

/**
 * Tebak edisi dari jam WIB saat run dimulai, untuk run tanpa nama edisi eksplisit.
 * Rentang dibuat longgar karena run terjadwal GitHub bisa molor berjam-jam:
 * pagi 04.00-18.59 WIB (jadwal 10.35), malam 19.00-03.59 WIB (jadwal 22.05).
 * @param {Date} [now]
 * @returns {"pagi" | "malam"}
 */
export function resolveEditionByTime(now = new Date()) {
  const hourWib = (now.getUTCHours() + WIB_OFFSET_HOURS) % 24;
  return hourWib >= PAGI_START_HOUR_WIB && hourWib < MALAM_START_HOUR_WIB ? "pagi" : "malam";
}

/**
 * Bonus edisi untuk satu kandidat: bonus terbesar di antara kategorinya.
 * @param {{ boosts: Record<string, number> }} edition
 * @param {string[]} categories
 */
export function editionBoost(edition, categories = []) {
  return categories.reduce((max, c) => Math.max(max, edition?.boosts?.[c] || 0), 0);
}
