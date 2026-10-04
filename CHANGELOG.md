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

### 📂 Manajemen Konten & Struktur URL (Opsi A)
- **Organisasi Subfolder Berdasarkan Tanggal Rilis (`YYYY-MM-DD`)**:
  - Mengklasifikasikan seluruh file artikel di [`src/content/news/`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content/news/) ke dalam subfolder tanggal terbitnya (misal: `src/content/news/2026-10-04/slug.md`) agar struktur direktori bersih dan rapi.
  - Memperbarui generator [`scripts/generate-news.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/generate-news.mjs) dan utilitas [`scripts/lib/markdown.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/markdown.mjs) dengan parameter `dateFolder` sehingga artikel baru otomatis disimpan ke subfolder tanggal rilisnya.
  - Memperbarui modul deduplikasi [`scripts/lib/dedupe.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/dedupe.mjs) agar melakukan pemindaian berkas secara rekursif (`readdir(dir, { recursive: true })`) serta melacak slug dasar dan slug relatif.
- **Routing Dinamis Rest Parameter (`[...slug].astro`)**:
  - Mengubah rute halaman berita dari `src/pages/berita/[slug].astro` menjadi [`src/pages/berita/[...slug].astro`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/pages/berita/%5B...slug%5D.astro).
  - Format URL permalink artikel kini mengusung standar media berita: `/sinyalai-news/berita/YYYY-MM-DD/slug`, selaras dengan tautan kartu berita di beranda dan link pada feed RSS `dist/rss.xml`.

### 🤖 Pipeline & Ingestion Otomatis
- **Penyaring Relevansi AI Otomatis ([`scripts/lib/relevance.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/relevance.mjs))**:
  - Menambahkan modul filter cerdas berbasis pola regex untuk memisahkan pengumuman AI (LLM, GPT, reasoning, agentic, inference, DeepMind, dsb.) dari artikel non-AI pada feed umum korporat (Microsoft, NVIDIA).
  - Menyediakan filter penolakan kata kunci (`excludeKeywords`) untuk memblokir rilis gaming (misal: *GeForce NOW* / *GFN Thursday*).
  - Menandai feed spesifik riset AI (OpenAI, Google DeepMind, Google AI) dengan atribut `"aiFocused": true` agar tidak terkena pemotongan kuota.
- **Sistem Prioritas Redaksi Berita ([`scripts/lib/relevance.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/relevance.mjs), [`scripts/generate-news.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/generate-news.mjs))**:
  - Menetapkan 4 pilar prioritas editorial utama saat memilih dan menerbitkan rilis:
    1. **Rilis Model Terbaru** (penalaran, frontier LLM, checkpoint, parameter).
    2. **Fitur & Skills** (kemampuan agen baru, tool use, otomatisasi alur kerja, computer use).
    3. **Produk Baru & Infrastruktur** (chip, hardware AI, SDK, ketersediaan API).
    4. **Kerjasama & Kemitraan Industri AI** (aliansi strategis antar-perusahaan teknologi, integrasi, investasi).
  - Mengurutkan kandidat rilis secara otomatis berdasarkan skor prioritas sebelum artikel diproduksi.
  - Artikel di luar 4 pilar utama di atas diproses mengikuti standar publikasi umum (riset, evaluasi, kebijakan).
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
  7. **xAI**: [xAI Integrasikan Model Grok ke Lingkungan Koding OpenCode](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content/news/xai-use-grok-in-opencode.md)
  8. **Meta**: [Meta Rilis SAM Audio, Model Multimodal Pertama untuk Isolasi Suara](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content/news/meta-meta-rilis-sam-audio-model-multimodal-pertama-untuk-isolasi-suara.md)
- **Aktivasi Sumber Meta AI & xAI**: Mengaktifkan feed RSS berita Meta AI (`ai.meta.com`) dan xAI melalui mirror feed komunitas di [`scripts/sources.json`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/sources.json), meningkatkan kapasitas produksi harian menjadi **hingga 16 berita per hari** (8 edisi pagi + 8 edisi malam).
- **Manajemen Draft**: Menyimpan 7 draf berita lainnya dengan status `draft: true` untuk siap direview oleh tim redaksi.

### 🧪 Pengujian Unit (Testing)
- **Ekspansi Test Suite**: Menambahkan unit test baru dengan total melonjak dari **33 menjadi 67 unit test** (100% pass):
  - [`scripts/lib/__tests__/relevance.test.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/__tests__/relevance.test.mjs): 18 test untuk akurasi filter AI dan pencegahan false-positive.
  - [`scripts/lib/__tests__/dedupe.test.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/__tests__/dedupe.test.mjs): 9 test untuk normalisasi URL dan deteksi file yang sudah ada.
  - [`scripts/lib/__tests__/text.test.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/__tests__/text.test.mjs): 6 test untuk pemotongan kata aman dan penanganan tanda baca.
  - Pembaruan unit test existing untuk parser RSS dan writer Markdown.

### 🧠 AI Agent Skills & Tooling
- **Humanizer Skill ([`.agents/skills/humanizer`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/.agents/skills/humanizer))**:
  - Mengintegrasikan modul kepenulisan natural (`blader/humanizer`) untuk mengikis pola tulisan kaku AI (*AI tell/slop*), menghilangkan frasa klise korporat, dan menghasilkan gaya bahasa jurnalistik teknologi yang tajam dan natural.
- **Emil Kowalski Design Engineering & UI Skills ([`.agents/skills/`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/.agents/skills))**:
  - Menginstal 14 skill interaksi, animasi, dan desain UI tingkat lanjut dari `emilkowalski/skills`:
    - `animate`: Resep dan prinsip implementasi animasi modern berbasis performa.
    - `animate-expo`: Praktik animasi gesture dan layout untuk platform React Native/Expo.
    - `animation-vocabulary`: Glosarium istilah animasi interaktif dan transisi mikro.
    - `apple-design`: Panduan konsistensi estetika Apple Human Interface Guidelines.
    - `ask-sonner`: Pola integrasi dan toast notification Sonner.
    - `break-ui`: Audit edge case layout, overflow, dan stress-testing UI.
    - `emil-design-eng`: Standar rekayasa desain (Design Engineering) kelas dunia.
    - `find-animation-opportunities`: Deteksi titik-titik interaksi yang membutuhkan micro-feedback.
    - `improve-animations`: Perbaikan kurva easing, spring physics, dan timing animasi.
    - `mobile-native`: Optimasi performa dan pola native feel pada mobile.
    - `pick-ui-library`: Panduan pemilihan library UI yang tepat sesuai kebutuhan arsitektur.
    - `prototype`: Alur pembuatan prototipe interaktif cepat (*rapid prototyping*).
    - `review-animations`: Checklist audit kualitas dan fluiditas animasi antarmuka.
    - `write-swift`: Panduan penulisan kode SwiftUI dan integrasi platform Apple.

### 🌐 Hosting & CI/CD Deployment GitHub Pages
- **Konfigurasi Subpath Astro ([`astro.config.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/astro.config.mjs))**:
  - Mengonfigurasi `site: 'https://vibe-coder-eja.github.io'` dan `base: '/sinyalai-news'` untuk deployment GitHub Pages.
- **Utilitas Path Dinamis ([`src/lib/url.ts`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/lib/url.ts))**:
  - Menyediakan fungsi pembantu `withBase(path)` agar seluruh navigasi header, footer, tombol hero, kartu berita, sitemap, dan tautan aset (favicon, logo, ogImage) secara dinamis mendukung hosting subpath tanpa broken link.
- **Otomasi Workflow GitHub Actions ([`.github/workflows/deploy.yml`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/.github/workflows/deploy.yml))**:
  - Menyiapkan workflow deployment otomatis menggunakan `actions/upload-pages-artifact@v3` dan `actions/deploy-pages@v4` yang otomatis mem-build dan mempublikasikan situs setiap kali ada push ke branch `main`.
- **Jadwal Tayang Otomatis 2x Sehari ([`.github/workflows/auto-news.yml`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/.github/workflows/auto-news.yml))**:
  - Menjadwalkan cron otomatis setiap hari pada pukul **10:30 WIB** (Edisi Pagi) dan **22:00 WIB** (Edisi Malam).
  - Pipeline secara otomatis menarik rilis resmi terbaru, menulis berita menggunakan OpenRouter (`minimax/minimax-m3`) berstandar Humanizer, mengatribusikan ke **Redaktur Sinyal AI News (RSAIN)**, melakukan commit artikel ke branch `main`, dan mendeploy pembaruan ke GitHub Pages.
- **Proteksi Ketat API Key & Repositori Publik**:
  - Memblokir seluruh file `.env*` pada `.gitignore` dan memindahkan kredensial OpenRouter ke GitHub Repository Secrets (`${{ secrets.OPENROUTER_API_KEY }}`), menjamin keamanan 100% saat repositori diubah statusnya menjadi Public.
- **Feed RSS & Sitemap Terpadu ([`src/pages/rss.xml.ts`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/pages/rss.xml.ts), [`public/robots.txt`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/public/robots.txt))**:
  - Menyelaraskan seluruh link permalink pada XML RSS dan lokasi sitemap di `robots.txt` ke URL target GitHub Pages.

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
