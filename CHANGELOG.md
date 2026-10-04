# Catatan Perubahan (Changelog) — Sinyal AI News

Semua pembaruan penting, perbaikan teknis, dan peningkatan editorial pada proyek **Sinyal AI News** dicatat dalam dokumen ini. Format pencatatan mengikuti prinsip [Keep a Changelog](https://keepachangelog.com/id/1.0.0/).

---

## [0.2.0] — 2026-10-04

Pembaruan besar (*major upgrade*) yang berfokus pada penyaringan relevansi AI otomatis, deduplikasi sumber berlapis, penguatan metadata SEO/Schema.org, ekspansi pengujian unit, serta penerbitan artikel sinyal resmi industri teknologi.

### 🔒 Keamanan (Security)
- **Validasi Skema HTTPS Ketat**: Memperketat schema Zod pada [`src/content.config.ts`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content.config.ts) dengan validasi protokol HTTPS murni serta penolakan kredensial inline pada URL sumber berita.
- **Proteksi Buffer & OOM Attack**: Membatasi ukuran muatan HTTP response hingga maksimal 5MB dengan teknik chunked stream reader pada [`scripts/lib/rss.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/rss.mjs).
- **Sanitasi Skema Tautan & Kontrol Karakter**: Mencegah serangan injeksi protokol `javascript:` pada parser link dan membersihkan karakter kontrol tersembunyi pada serializer frontmatter YAML.
- **Verifikasi Feed Mirror Komunitas**: Menandai sumber cermin komunitas (seperti mirror RSS Anthropic) dengan flag `"trusted": false` pada konfigurasi [`scripts/sources.json`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/sources.json).

### 🤖 Pipeline & Ingestion Otomatis
- **Penyaring Relevansi AI Otomatis ([`scripts/lib/relevance.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/relevance.mjs))**:
  - Menambahkan modul filter cerdas berbasis pola regex untuk memisahkan pengumuman AI (LLM, GPT, reasoning, agentic, inference, DeepMind, dsb.) dari artikel non-AI pada feed umum korporat (Microsoft, NVIDIA).
  - Menyediakan filter penolakan kata kunci (`excludeKeywords`) untuk memblokir rilis gaming (misal: *GeForce NOW* / *GFN Thursday*).
  - Menandai feed spesifik riset AI (OpenAI, Google DeepMind, Google AI) dengan atribut `"aiFocused": true` agar tidak terkena pemotongan kuota.
- **Deduplikasi URL Sumber Berlapis ([`scripts/lib/dedupe.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/dedupe.mjs))**:
  - Menormalisasi URL artikel (membersihkan parameter pelacak seperti `utm_*`, `fbclid`, trailing slash, skema www).
  - Memindai seluruh metadata frontmatter artikel yang ada di `src/content/news/`.
  - Mencegah rilis yang sama ditarik kembali ke folder draft meskipun judul atau slug file telah dimodifikasi oleh editor manusia.
- **Pemotongan Kata Aman (*Word-Boundary Truncation*) ([`scripts/lib/text.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/text.mjs))**:
  - Menggantikan pemotongan karakter kasar dengan pemotongan batas kata terdekat (`truncateAtWord`) agar kalimat ringkasan tidak terpotong di tengah kata.
- **Peringatan Tanggal Terbit Hilang**: Draft otomatis yang tidak memiliki metadata tanggal pada feed aslinya akan ditandai dengan peringatan editorial tebal agar dikoreksi sebelum publikasi.
- **User-Agent Publik Resmi**: Memperbarui User-Agent crawler RSS agar mengarah ke tautan identitas publik: `SinyalAI-Bot/0.1 (+https://sinyalai.vercel.app/tentang; news draft pipeline)`.

### 🔎 SEO & Structured Data
- **Koreksi Meta Twitter/X Card**: Memperbaiki spesifikasi tag Twitter di [`src/layouts/BaseLayout.astro`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/layouts/BaseLayout.astro) dari `property=` menjadi standar W3C/X yaitu `<meta name="twitter:...">`.
- **Standar Schema.org `NewsArticle` Lengkap**:
  - Menghasilkan aset logo publisher raster beresolusi tinggi di [`public/logo.png`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/public/logo.png) (512x512 PNG) menggantikan SVG untuk memenuhi kriteria Google Rich Snippets.
  - Menambahkan metadata terstruktur `image`, `dateModified`, `inLanguage`, `about`, dan `isBasedOn` pada halaman detail [`src/pages/berita/[slug].astro`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/pages/berita/%5Bslug%5D.astro).
  - Menambahkan field skema opsional `updatedAt` di schema content collection.

### 📰 Konten & Redaksi (Editorial)
- **Penghapusan Artikel Demo Dummy**: Membersihkan 7 file artikel mock awal yang sebelumnya hanya merujuk ke halaman landing umum.
- **Penerbitan 6 Berita Sinyal Industri Resmi**:
  1. **OpenAI**: [Panduan Praktis OpenAI untuk Arsitektur Model Keluarga GPT-6](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content/news/openai-a-model-guide-for-the-gpt-6-family.md)
  2. **Anthropic**: [Anthropic Kucurkan $100 Juta untuk Claude Frontier Academy](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content/news/anthropic-anthropic-invests-100-million-to-train-10-000-engineers-and-tackle.md)
  3. **Google DeepMind**: [Google DeepMind Kenalkan Gemini 4 Argon untuk Coding dan Pertahanan Siber](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content/news/google-gemini-4-argon-our-next-era-of-frontier-intelligence.md)
  4. **Google DeepMind**: [DeepMind Rilis SynthID Bio: Metode Watermarking untuk Biologi Sintetis](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content/news/google-introducing-synthid-bio.md)
  5. **Microsoft**: [Microsoft Rombak Copilot dengan Fitur Home, Code, dan Autopilot](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content/news/microsoft-introducing-the-new-copilot-with-home-code-and-autopilot.md)
  6. **NVIDIA**: [NVIDIA Hadirkan DGX Spark 64GB untuk Komputasi Agen AI Lokal](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content/news/nvidia-nvidia-dgx-spark-64gb-gives-developers-more-ways-to-build-and-scale.md)
- **Manajemen Draft**: Menyimpan 6 draf berita lainnya dengan status `draft: true` untuk siap direview oleh tim redaksi.

### 🧪 Pengujian Unit (Testing)
- **Ekspansi Test Suite**: Menambahkan unit test baru dengan total melonjak dari **33 menjadi 67 unit test** (100% pass):
  - [`scripts/lib/__tests__/relevance.test.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/__tests__/relevance.test.mjs): 18 test untuk akurasi filter AI dan pencegahan false-positive.
  - [`scripts/lib/__tests__/dedupe.test.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/__tests__/dedupe.test.mjs): 9 test untuk normalisasi URL dan deteksi file yang sudah ada.
  - [`scripts/lib/__tests__/text.test.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/__tests__/text.test.mjs): 6 test untuk pemotongan kata aman dan penanganan tanda baca.
  - Pembaruan unit test existing untuk parser RSS dan writer Markdown.

---

## [0.1.0] — 2026-07-11

Rilis awal MVP (Minimum Viable Product) Sinyal AI News.

### 🚀 Fitur Awal Diluncurkan
- **Arsitektur Dasar**: Static Site Generation (SSG) berbasis Astro 7 dengan Content Collections.
- **Rute Web**:
  - Halaman Beranda (`/`) dengan live signal feed dan badge perusahaan.
  - Halaman Arsip Berita (`/berita`) daftar sinyal terpublikasi.
  - Halaman Detail Berita (`/berita/[slug]`) dengan render Markdown native.
  - Halaman Tentang (`/tentang`) dan Halaman Error (`/404`).
- **Fitur Sindikasi & SEO**:
  - Integrasi `@astrojs/sitemap` untuk XML Sitemap otomatis.
  - Endpoint RSS Feed resmi di `/rss.xml`.
  - File `public/robots.txt` ramah mesin pencari.
- **Desain & Gaya**:
  - Vanilla CSS performa tinggi dengan tema gelap (*dark theme*), tipografi Google Fonts (*DM Sans* & *IBM Plex Mono*), aksen neon hijau `#3dff9a`, dan glassmorphism ringan.
  - Zero Client-Side JavaScript untuk waktu pemuatan halaman ultra-cepat (*speed-first*).
- **Otomasi CLI**:
  - Script dasar `scripts/fetch-signals.mjs` untuk mengunduh rilis awal dari RSS/Atom ke draft Markdown.
- **CI/CD**:
  - Workflow GitHub Actions untuk otomatisasi testing dan build static web pada setiap pull request dan push ke branch `main`.
