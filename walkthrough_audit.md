# Walkthrough — Upgrade ke Standar ⭐⭐⭐⭐ SinyalAI News

Upgrade komprehensif pada **Keamanan**, **Pipeline RSS**, **SEO**, dan **Testing** telah berhasil diimplementasikan dan diverifikasi dengan sukses!

---

## 📈 Rating Tracker

| Kategori | Sebelum | Sesudah |
|:---------|:-------:|:-------:|
| 🔒 Keamanan | ⭐⭐⭐ | **⭐⭐⭐⭐** |
| 🤖 Pipeline RSS | ⭐⭐⭐ | **⭐⭐⭐⭐** |
| 🔎 SEO | ⭐⭐½ | **⭐⭐⭐⭐** |
| 🧪 Testing | ⭐ | **⭐⭐⭐⭐** |

---

## 📝 Ringkasan Perubahan

### 1. SEO (⭐⭐½ → ⭐⭐⭐⭐)
- **Astro Config**: Menambahkan integrasi `@astrojs/sitemap` dan mengonfigurasi URL situs ke `https://sinyalai.vercel.app` di [astro.config.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/astro.config.mjs).
- **Meta Tags**: Menambahkan meta tags lengkap untuk Open Graph (Facebook/LinkedIn/WA) dan Twitter Cards di [BaseLayout.astro](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/layouts/BaseLayout.astro). Menambahkan link canonical dan feed autodiscovery.
- **JSON-LD**: Menyisipkan metadata terstruktur `NewsArticle` (Schema.org) di halaman detail [berita/[slug].astro](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/pages/berita/%5Bslug%5D.astro) untuk mendukung Rich Snippets Google.
- **RSS Feed Endpoint**: Membuat route [rss.xml.ts](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/pages/rss.xml.ts) menggunakan `@astrojs/rss` untuk meng-output RSS feed resmi.
- **Robots.txt**: Membuat file [robots.txt](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/public/robots.txt) yang menunjuk ke XML sitemap.
- **Halaman 404**: Membuat halaman error [404.astro](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/pages/404.astro) kustom yang mengikuti design system.

### 2. Keamanan (⭐⭐⭐ → ⭐⭐⭐⭐)
- **Zod HTTPS Enforce**: Memperketat schema Zod pada [content.config.ts](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content.config.ts) untuk menolak skema non-HTTPS pada source URL.
- **Stream Limit**: Mencegah serangan OOM dengan membaca body respons RSS secara chunked dan menetapkan batas aman sebesar 5MB di [rss.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/rss.mjs).
- **HTTPS & Protocol Enforce**: Menolak URI skema non-HTTPS di fetcher RSS dan menolak skema non-HTTP/HTTPS pada link di builder markdown untuk mencegah injeksi `javascript:`.
- **YAML Escape**: Memperbaiki `yamlQuote()` di [markdown.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/markdown.mjs) untuk menangani escape karakter kontrol, tab, carriage return, dan quote.
- **Sources Metadata**: Menandai link komunitas Anthropic sebagai untrusted (`"trusted": false`) di [sources.json](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/sources.json).

### 3. Pipeline RSS (⭐⭐⭐ → ⭐⭐⭐⭐)
- **CLI Flags**: Memperbaiki bug di [fetch-signals.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/fetch-signals.mjs) di mana `--source` flag melewati filter status `enabled`.
- **Duplicate Checking**: Memastikan `baseSlug` ditambahkan ke set `existing` agar duplikat dalam satu run terdeteksi dengan benar.
- **Word Truncation**: Menghilangkan truncating mid-word. Slug dan summary dipotong pada batas kata terdekat.
- **Link Priority**: Memperbaiki prioritas tautan di RSS Atom feed dengan mencocokkan `rel="alternate"` terlebih dahulu.
- **Date Handling**: Item tanpa tanggal pubDate RSS diurutkan ke bagian paling bawah secara aman tanpa default paksa ke waktu sekarang.
- **Caching & Rate Limiting**: Membaca file template sekali di awal eksekusi, serta menambahkan jeda 500ms antar feed fetch untuk menghindari IP blocking.

### 4. Testing (⭐ → ⭐⭐⭐⭐)
- Mengintegrasikan **Vitest** dan menambahkan total 33 unit test di seluruh file modul penunjang:
  - [slug.test.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/__tests__/slug.test.mjs): Menguji normalisasi slug, batas panjang, dan penanganan tabrakan nama.
  - [markdown.test.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/__tests__/markdown.test.mjs): Menguji output yamlQuote, build body, write template, dan penolakan URL sumber non-HTTPS.
  - [rss.test.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/__tests__/rss.test.mjs): Menguji parser RSS/Atom, prioritas alternate link, proteksi ukuran respons, dan protokol HTTPS.
  - [news.test.ts](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/__tests__/news.test.ts): Menguji utilitas formatting tanggal klien dengan mocking Astro virtual modules.

---

## 🧪 Hasil Pengujian Unit

Semua pengujian unit berhasil lolos dengan sukses:

```
> sinyalai-news@0.0.1 test
> vitest run

 RUN  v4.1.10 C:/Users/cber/hermes-agent-project-2026/sinyalai-news

 ✓ scripts/lib/__tests__/rss.test.mjs (9 tests)
 ✓ scripts/lib/__tests__/markdown.test.mjs (12 tests)
 ✓ src/__tests__/news.test.ts (2 tests)
 ✓ scripts/lib/__tests__/slug.test.mjs (10 tests)

 Test Files  4 passed (4)
      Tests  33 passed (33)
```

---

## 🏗️ Hasil Build Produksi

Build produksi Astro berhasil dikompilasi secara penuh dengan generated files untuk RSS dan sitemap:

```
> sinyalai-news@0.0.1 build
> astro build

10.58.27 [build] output: "static"
10.58.27 [build] directory: C:\Users\cber\hermes-agent-project-2026\sinyalai-news\dist\
...
 generating static routes 
10.58.28   ├─ /404.html (+27ms) 
10.58.28   ├─ /berita/...
10.58.28   ├─ /rss.xml (+1.77s) 
10.58.30   ├─ /tentang/index.html (+11ms) 
10.58.30   ├─ /index.html (+12ms) 
10.58.30 ✓ Completed in 2.09s.

10.58.30 [build] ✓ Completed in 2.92s.
10.58.30 [@astrojs/sitemap] `sitemap-index.xml` created at `dist`
10.58.30 [build] 10 page(s) built in 4.90s
10.58.30 [build] Complete!
```
