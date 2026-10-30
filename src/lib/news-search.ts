/**
 * Logika pencarian dan filter berita untuk halaman /berita.
 *
 * Murni dan tanpa dependensi Astro, sehingga dipakai bersama oleh endpoint indeks
 * (build) dan skrip klien, serta mudah diuji.
 */

export interface SearchEntry {
  href: string;
  title: string;
  summary: string;
  company: string;
  /** Tanggal ISO (YYYY-MM-DD) untuk atribut datetime. */
  date: string;
  /** Tanggal terformat bahasa Indonesia untuk ditampilkan. */
  dateLabel: string;
}

export interface CompanyOption {
  name: string;
  count: number;
}

export interface SearchFilters {
  query: string;
  /** Nama perusahaan persis; string kosong berarti semua perusahaan. */
  company: string;
}

/** Huruf kecil, tanpa aksen, spasi rapi, agar "Mistral" dan "mistral" dianggap sama. */
export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Daftar perusahaan unik beserta jumlah berita, diurutkan abjad. */
export function buildCompanyOptions(companies: string[]): CompanyOption[] {
  const counts = new Map<string, number>();
  for (const name of companies) {
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name, "id-ID", { sensitivity: "base" }));
}

/**
 * Menyaring entri. Setiap kata kunci harus ditemukan (AND) di judul, ringkasan,
 * atau nama perusahaan. Urutan asli (terbaru lebih dulu) dipertahankan.
 */
export function filterEntries(entries: SearchEntry[], { query, company }: SearchFilters): SearchEntry[] {
  const terms = normalizeText(query).split(" ").filter(Boolean);
  return entries.filter((entry) => {
    if (company && entry.company !== company) return false;
    if (terms.length === 0) return true;
    const haystack = normalizeText(`${entry.title} ${entry.summary} ${entry.company}`);
    return terms.every((term) => haystack.includes(term));
  });
}
