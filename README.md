# Sinyal AI News

Portal berita statis berbahasa Indonesia untuk merangkum rilis resmi industri AI secara ringkas, netral, dan bersumber.

## Fitur

- Astro 7 dengan static site generation (SSG)
- Content Collections untuk artikel Markdown dan alur editorial berbasis Git
- Halaman beranda, arsip berita, detail artikel, Tentang, dan 404
- SEO: canonical URL, Open Graph, Twitter Card, sitemap, robots.txt, RSS, dan JSON-LD `NewsArticle`
- Pipeline berita otomatis (`generate:news`): sumber RSS/Atom/HTML, seleksi redaksi berbasis skor, penulis AI via OpenRouter, validasi keluaran, dan deduplikasi sumber, topik, serta slug
- Pipeline draf manual (`fetch:signals`) dengan pembatasan ukuran respons, timeout, dan validasi HTTPS
- Unit test Vitest untuk pipeline (`scripts/lib`) dan utilitas situs (`src/lib`)
- Zero JavaScript di sisi klien untuk rendering halaman

## Persyaratan

- Node.js `>=22.12.0`
- npm

## Menjalankan secara lokal

```bash
npm ci
npm run dev
```

Astro akan menampilkan URL lokal di terminal.

## Verifikasi

```bash
npm run test
npm run build
```

Build statis tersedia di `dist/`.

## Pipeline konten

Ada dua jalur, keduanya menulis ke `src/content/news/<YYYY-MM-DD>/`.

**Berita otomatis** (jalur utama, dijalankan workflow `auto-news.yml` pada edisi pagi dan malam):

```bash
# Simulasi: mencetak artikel lengkap ke log tanpa menyimpan file (butuh OPENROUTER_API_KEY)
npm run generate:news -- --dry-run --edition=pagi --limit=3
```

**Draf manual** dari feed RSS/Atom, ditulis dengan `draft: true`:

```bash
npm run fetch:signals -- --dry-run
npm run fetch:signals -- --source openai --limit 2
```

Review judul, ringkasan, isi, tanggal, dan sumber sebelum mengubah draf menjadi `draft: false`.

Dokumentasi pipeline ada di [`scripts/README.md`](scripts/README.md). Panduan editorial ada di [`docs/panduan-konten.md`](docs/panduan-konten.md), jadwal edisi di [`docs/jadwal-tayang.md`](docs/jadwal-tayang.md), dan prosedur mengganti seluruh berita tayang di [`docs/reset-konten.md`](docs/reset-konten.md).

## Struktur utama

```text
src/
  components/        Komponen antarmuka Astro
  content/news/      Artikel Markdown per tanggal (archived: true = tidak tayang)
  data/              Data statis (legacy-redirects.json)
  layouts/           Layout dan metadata global
  lib/               Utilitas situs (berita, URL, berbagi)
  logo/              Master logo PNG (sumber untuk scripts/convert-logos.mjs)
  pages/             Route statis dan RSS
  styles/            Design system CSS
scripts/
  generate-news.mjs  Berita otomatis (seleksi, penulis AI, validasi)
  fetch-signals.mjs  RSS/Atom ke draf Markdown
  archive-all.mjs    Arsipkan semua berita tayang (alat reset konten)
  convert-logos.mjs  Master logo PNG ke WebP, ikon, dan OG image
  sources.json       Daftar sumber
  lib/               Modul pipeline beserta tes di __tests__/
docs/                PRD, panduan, jadwal, reset konten, rencana perbaikan
  alur-redaksi/      Snapshot diagram alur redaksi per versi
  arsip/             Dokumen audit lama (historis)
brand-playbook/      Panduan brand
public/              Aset statis, robots.txt, favicon, OG image, logo WebP
.github/workflows/   CI, deploy, berita otomatis, reset konten, rilis
```

## Konfigurasi deployment

Situs di-deploy ke GitHub Pages dengan domain kustom `https://sinyalai.xyz` (lihat `public/CNAME`). URL canonical dikonfigurasi di `astro.config.mjs` (`site`). Jika domain berubah, perbarui `site`, `public/CNAME`, URL sitemap di `public/robots.txt`, dan fallback URL di `src/pages/rss.xml.ts`.

Workflow di `.github/workflows/`:

| Workflow | Fungsi |
|---|---|
| `ci.yml` | Test dan build pada PR dan push ke `main` |
| `deploy.yml` | Test, build, dan deploy ke GitHub Pages saat push ke `main` |
| `auto-news.yml` | Generate berita edisi pagi (10:35 WIB) dan malam (22:05 WIB), lalu deploy. Pemicu utama eksternal, cron GitHub sebagai cadangan |
| `reset-konten.yml` | Manual. Arsipkan berita lama dan tulis ulang ke branch baru untuk ditinjau |
| `release.yml` | Saat tag `v*` didorong, buat GitHub Release dari bagian versi yang sama di `CHANGELOG.md` |

Variabel yang dibutuhkan: secret `OPENROUTER_API_KEY` dan (opsional) variabel `OPENROUTER_MODEL`. Contoh ada di `.env.example`.

> Artikel diproduksi otomatis dari rilis resmi dengan penulis AI. Tanggal tayang mengikuti tanggal rilis sumber, rilis lebih tua dari batas usia edisi (2 hari) tidak tayang, dan keluaran AI divalidasi sebelum disimpan. Riwayat perbaikan pipeline ada di [`docs/rencana-perbaikan.md`](docs/rencana-perbaikan.md) dan `CHANGELOG.md`.

## Roadmap

- Pengukuran Lighthouse dan Core Web Vitals pada preview deployment
- OG image per artikel dan self-host font (ditunda, lihat `docs/rencana-perbaikan.md`)

Detail produk dan acceptance criteria tersedia di [`docs/prd.md`](docs/prd.md) (dokumen awal, Juli 2026).
