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
    writerFocus:
      "Edisi pagi: ringkas dan langsung ke inti. Tekankan apa yang berubah dan siapa yang terdampak.",
  },
  malam: {
    id: "malam",
    label: "Edisi Malam (22:05 WIB)",
    focus: "Bacaan malam yang lebih mendalam: fitur yang bisa dipakai, studi kasus penerapan, riset, keamanan, dan kebijakan.",
    boosts: { "Fitur & Skills": 10, "Penerapan Industri": 10, "Riset & Kebijakan": 10 },
    writerFocus:
      "Edisi malam: lebih edukatif dan santai. Jelaskan cara kerja, konteks, dan contoh pemakaian agar enak dibaca.",
  },
};

/**
 * @param {string} name "pagi" atau "malam" (nilai lain dianggap malam, sama seperti perilaku sebelumnya)
 */
export function getEdition(name) {
  return name === "pagi" ? EDITIONS.pagi : EDITIONS.malam;
}

/**
 * Bonus edisi untuk satu kandidat: bonus terbesar di antara kategorinya.
 * @param {{ boosts: Record<string, number> }} edition
 * @param {string[]} categories
 */
export function editionBoost(edition, categories = []) {
  return categories.reduce((max, c) => Math.max(max, edition?.boosts?.[c] || 0), 0);
}
