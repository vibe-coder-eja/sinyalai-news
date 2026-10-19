# Pipeline otomatisasi — Sinyal AI

Tujuan: mengambil rilis dari perusahaan AI → membuat **draft** artikel Markdown → review manual → publish.

```text
sources.json  →  fetch RSS  →  draft .md (draft: true)  →  editorial review  →  draft: false  →  site build
```

## File penting

| Path | Fungsi |
|------|--------|
| `scripts/sources.json` | Daftar perusahaan + URL RSS/page |
| `scripts/templates/article.md` | Template frontmatter + body |
| `scripts/generate-news.mjs` | CLI berita otomatis: seleksi, penulis AI, validasi, simpan |
| `scripts/fetch-signals.mjs` | CLI fetch → tulis draft |
| `scripts/archive-all.mjs` | Tandai semua artikel tayang `archived: true` (dipakai reset konten) |
| `scripts/convert-logos.mjs` | Master logo `src/logo/*.png` → WebP di `public/logo/`, ikon, favicon, OG image |
| `scripts/lib/rss.mjs` | Parser RSS/Atom minimal |
| `scripts/lib/html.mjs` | Pengambil daftar rilis dari halaman HTML |
| `scripts/lib/updates.mjs` | Pengambil catatan rilis Mintlify (blok `<Update>`), dipakai Z.ai |
| `scripts/lib/sources.mjs` | Pemilihan sumber aktif |
| `scripts/lib/source-context.mjs` | Konteks halaman sumber untuk penulis AI |
| `scripts/lib/ai-writer.mjs` | Prompt dan pemanggilan penulis AI (OpenRouter) |
| `scripts/lib/validate.mjs` | Validasi keluaran AI (format, gaya, batas teknis) |
| `scripts/lib/editor.mjs` | Seleksi kandidat, keseimbangan kategori, batas per perusahaan |
| `scripts/lib/editions.mjs` | Profil edisi pagi dan malam |
| `scripts/lib/relevance.mjs` | Penyaring relevansi dan skor prioritas |
| `scripts/lib/release-tags.mjs` | Penyaring tag rilis GitHub |
| `scripts/lib/topic.mjs` | Pembanding topik antar artikel |
| `scripts/lib/dedupe.mjs` | Deduplikasi URL sumber & slug |
| `scripts/lib/backfill.mjs` | Jendela tanggal per hari dan penyaringan arsip untuk reset konten |
| `scripts/lib/archive.mjs` | Penanda `archived: true` pada Markdown |
| `scripts/lib/markdown.mjs` | Writer draft + skeleton body |
| `scripts/lib/slug.mjs` | Pembuat slug aman |
| `scripts/lib/text.mjs` | Pemotongan teks batas kata (*word-boundary*) |
| `src/content/news/` | Artikel (termasuk draft dan arsip) |

Alat reset konten dijelaskan di [`docs/reset-konten.md`](../docs/reset-konten.md), jadwal edisi di [`docs/jadwal-tayang.md`](../docs/jadwal-tayang.md).

## Menjalankan

Dari root project:

```bash
# Dry-run (tidak menulis file)
npm run fetch:signals -- --dry-run

# Ambil max 2 item baru per sumber
npm run fetch:signals -- --limit 2

# Satu sumber saja
npm run fetch:signals -- --source nvidia-blog

# Fetch + tulis draft
npm run fetch:signals
```

Di Windows PowerShell, jika `npm` diblokir policy, gunakan:

```powershell
npm.cmd run fetch:signals -- --dry-run
```

## Alur editorial

1. Jalankan `fetch:signals`.
2. Buka file baru di `src/content/news/*.md` (frontmatter `draft: true`).
3. Perbaiki judul, summary, dan body (netral + sitasi sumber).
4. Set `draft: false`.
5. `npm run build` / `npm run dev` — artikel muncul di site.

Artikel dengan `draft: true` **tidak** ditampilkan di halaman (difilter di `src/lib/news.ts`).

## Menambah sumber

Edit `scripts/sources.json`:

```json
{
  "id": "cohere",
  "company": "Cohere",
  "type": "rss",
  "url": "https://example.com/feed.xml",
  "home": "https://example.com",
  "enabled": true
}
```

- `type: "rss"` — di-fetch otomatis  
- `type: "page"` — placeholder manual (skip fetch)  
- `enabled: false` — diabaikan  

## Aturan penulisan berita (penulis AI)

Berlaku untuk berita otomatis `generate-news.mjs`, sumber kebenarannya ada di `SYSTEM_PROMPT` (`lib/ai-writer.mjs`) dan `lib/validate.mjs`. Artikel yang sudah terbit tidak ditulis ulang.

- **Straight news, piramida terbalik**: paragraf pertama memuat inti berita, paragraf berikutnya dari yang terpenting ke pelengkap.
- **Atribusi sumber (by line)**: paragraf pertama atau kedua memuat nama sumber dengan tanggal rilis `(dd/mm)` berdekatan, misalnya "Berdasarkan rilis resmi OpenAI (07/10), ...". Validator menolak artikel tanpa itu, termasuk tanggal yang terselip jauh dari nama sumber.
- **Netral dan independen**: fakta, bukan penilaian. Klaim dan angka perusahaan ditulis sebagai klaim perusahaan.
- **Informasi pendamping**: boleh menambah penjelasan istilah dan konteks umum yang stabil. Dilarang menambah angka, tanggal, harga, spesifikasi, ketersediaan, atau rencana yang tidak ada di sumber.
- **Bercerita yang relevan**: hangat dan manusiawi tanpa hiperbola, tanpa tokoh, kutipan, atau adegan fiktif.
- **Panjang bebas**: tidak ada batas huruf atau paragraf untuk isi. Pedoman di prompt: rilis biasa 3 sampai 5 paragraf pendek (sekitar 250 sampai 450 kata), informasi pendamping cukup satu paragraf pendek.
- **Tanpa penutup baku**: kalimat "rilis tidak menyebutkan ... Indonesia" ditolak otomatis agar artikel tidak seragam.
- **Informasi pendamping** diletakkan di paragraf terakhir atau dua kalimat terakhir (kaidah piramida terbalik).
- **Batas teknis**: judul maks 120 karakter dan memuat nama perusahaan; ringkasan 40–400 karakter; tanpa aksara non-Latin dan tanpa teks placeholder.
- **Validasi gaya otomatis** (`STYLE_RULES` di `lib/validate.mjs`): artikel ditolak jika memuat formula "bukan sekadar X melainkan Y", klise ("lompatan revolusioner", "game-changer", dll.), kata sifat penilai ("luar biasa", "mengesankan", dll.), atau kalimat Inggris yang belum diterjemahkan. Aturan netralitas lain dan batas informasi pendamping tetap hanya dijaga prompt.

## Seleksi redaksi

- **Skor prioritas** (`lib/relevance.mjs`): kategori Rilis Model 50, Fitur & Skills 45, Produk Baru 40, Kerjasama Industri 40, Penerapan Industri 35, Riset & Kebijakan 35, Umum 10. Skor = kategori tertinggi + 5 per kategori tambahan (maks +10), tidak dijumlahkan penuh. Pola "Rilis Model" hanya cocok dengan nama keluarga model atau frasa seperti "new model", bukan kata "model" saja.
- **Fokus edisi** (`lib/editions.mjs`): pagi memberi bonus pada Rilis Model (+10), Produk Baru (+10), Kerjasama (+5); malam pada Fitur & Skills, Penerapan Industri, dan Riset & Kebijakan (+10 masing-masing). Fokus penulisan edisi juga dikirim ke penulis AI.
- **Keseimbangan kategori otomatis** (`computeCategoryShares` di `lib/editor.mjs`): dari 24 artikel tayang terbaru yang menyimpan `categories`, kategori yang mendominasi dikurangi skornya (hingga 30 poin). Aktif setelah ada minimal 6 artikel berkategori; artikel lama tanpa `categories` diabaikan.
- **Pembanding topik** (`lib/topic.mjs`): berita yang topiknya sama dengan artikel yang sudah ada, atau dengan kandidat berskor lebih tinggi, dibuang walaupun URL-nya berbeda. Dasarnya kata kunci judul dan slug URL (nama produk, versi) dengan bobot kelangkaan. Artikel baru menyimpan `sourceTitle` (judul asli sumber) agar pembandingan berikutnya Inggris-ke-Inggris. Kandidat yang dibuang dicatat di log beserta kata yang cocok.

Untuk menilai hasil tanpa menerbitkan, jalankan `node scripts/generate-news.mjs --dry-run`. Mode ini mencetak artikel lengkap ke log dan tidak menyimpan file.

## Catatan

- Beberapa feed bisa down, redirect, atau memblokir bot — script melanjutkan sumber berikutnya.
- Hormati `robots.txt` / ToS situs sumber.
- Feed mirror komunitas (jika ada) harus diverifikasi ke domain resmi sebelum publish.
