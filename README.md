# Sinyal AI News

Portal berita statis berbahasa Indonesia untuk merangkum rilis resmi industri AI secara ringkas, netral, dan bersumber.

## Fitur

- Astro 7 dengan static site generation (SSG)
- Content Collections untuk artikel Markdown dan alur editorial berbasis Git
- Halaman beranda, arsip berita, detail artikel, Tentang, dan 404
- SEO: canonical URL, Open Graph, Twitter Card, sitemap, robots.txt, RSS, dan JSON-LD `NewsArticle`
- Pipeline RSS/Atom ke draft Markdown dengan pembatasan ukuran respons, timeout, deduplikasi slug, dan validasi HTTPS
- Unit test Vitest untuk parser, writer Markdown, slug, dan utilitas tanggal
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

Simulasikan pengambilan sinyal tanpa menulis file:

```bash
npm run fetch:signals -- --dry-run
```

Contoh opsi lain:

```bash
npm run fetch:signals -- --limit 2
npm run fetch:signals -- --source openai --dry-run
```

Draft baru ditulis ke `src/content/news/` dengan `draft: true`. Review judul, ringkasan, isi, tanggal, dan sumber sebelum mengubahnya menjadi `draft: false`.

Dokumentasi pipeline lebih lengkap tersedia di [`scripts/README.md`](scripts/README.md), sedangkan panduan editorial tersedia di [`panduan_konten.md`](panduan_konten.md).

## Struktur utama

```text
src/
  components/        Komponen antarmuka Astro
  content/news/      Artikel Markdown
  layouts/           Layout dan metadata global
  pages/             Route statis dan RSS
  styles/            Design system CSS
scripts/
  fetch-signals.mjs  CLI RSS/Atom ke draft Markdown
  lib/               Parser, writer, dan slug utilities
public/               Aset statis, robots.txt, favicon, OG image
```

## Konfigurasi deployment

Situs di-deploy ke GitHub Pages dengan domain kustom `https://sinyalai.xyz` (lihat `public/CNAME`). URL canonical dikonfigurasi di `astro.config.mjs` (`site`). Jika domain berubah, perbarui `site`, `public/CNAME`, URL sitemap di `public/robots.txt`, dan fallback URL di `src/pages/rss.xml.ts`.

Workflow: `ci.yml` (test dan build pada PR), `deploy.yml` (deploy saat push ke `main`), dan `auto-news.yml` (generate berita dua kali sehari lalu deploy).

> Artikel diproduksi otomatis dari rilis resmi dengan penulis AI. Tanggal tayang mengikuti tanggal rilis sumber, rilis lebih tua dari 7 hari tidak tayang, dan keluaran AI divalidasi sebelum disimpan. Lihat `docs/rencana-perbaikan.md` untuk rencana perbaikan pipeline.

## Roadmap

- Pengukuran Lighthouse dan Core Web Vitals pada preview deployment

Detail produk dan acceptance criteria tersedia di [`sinyalai_prd.md`](sinyalai_prd.md).
