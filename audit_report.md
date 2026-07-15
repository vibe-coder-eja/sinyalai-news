# 🔍 Laporan Audit — Sinyal AI News

> **Tanggal:** 15 Juli 2026  
> **Reviewer:** Antigravity (QA Engineer & Fullstack Developer)  
> **Proyek:** SinyalAI News — Sinyal Akal Imitasi  
> **Stack:** Astro 7 (Static SSG), Markdown Content Collections, Node.js RSS Pipeline

---

## Ringkasan Eksekutif

Proyek SinyalAI News adalah **MVP yang solid dan fungsional** untuk sebuah portal berita AI. Arsitektur bersih, kode rapi, dan pipeline RSS sudah terbentuk. Build berhasil tanpa error (9 halaman, ~11 detik). Namun ada beberapa area yang perlu diperkuat sebelum production deployment, terutama di sisi **SEO**, **keamanan pipeline**, dan **robustness RSS parser**.

### Scorecard

| Kategori | Nilai | Keterangan |
|:---------|:-----:|:-----------|
| 🏗️ Arsitektur & Struktur | ⭐⭐⭐⭐ | Bersih, modular, mengikuti konvensi Astro |
| 📝 Kualitas Kode | ⭐⭐⭐⭐ | Rapi, konsisten, well-typed |
| 🔒 Keamanan | ⭐⭐⭐ | Beberapa risiko di pipeline RSS dan validasi URL |
| ⚡ Performa | ⭐⭐⭐⭐ | SSG by default, minor blocking resource |
| ♿ Aksesibilitas (a11y) | ⭐⭐⭐⭐ | Di atas rata-rata, skip link & landmarks ada |
| 🔎 SEO | ⭐⭐½ | Dasar OK, tapi **tidak ada OG tags, sitemap, RSS output, structured data** |
| 🤖 Pipeline Otomasi | ⭐⭐⭐ | Fungsional, tapi parser rapuh & ada beberapa bug |
| 📄 Dokumentasi | ⭐⭐⭐⭐ | README baik, scripts terdokumentasi |
| 🧪 Testing | ⭐ | **Tidak ada test sama sekali** |

---

## 1. Arsitektur & Struktur Proyek

### ✅ Hal Positif

```
sinyalai-news/
├── src/
│   ├── components/     → 3 komponen (Header, Footer, NewsCard)
│   ├── content/news/   → 7 artikel Markdown (6 published, 1 draft)
│   ├── layouts/        → 1 layout (BaseLayout)
│   ├── lib/            → 1 utility (news.ts)
│   ├── pages/          → 4 halaman (index, tentang, berita/index, berita/[slug])
│   ├── styles/         → 1 file CSS global (456 baris, design system lengkap)
│   └── content.config.ts → Schema validation dengan Zod
├── scripts/
│   ├── fetch-signals.mjs → Pipeline RSS → draft Markdown
│   ├── lib/              → 3 modul (rss, markdown, slug)
│   ├── sources.json      → 8 sumber RSS
│   └── templates/        → Template artikel
└── public/              → Favicon (SVG + ICO)
```

- Pemisahan concern yang jelas antara frontend dan pipeline otomasi
- Single dependency (`astro` saja) — footprint minimal
- Content Collection dengan schema Zod — validasi tipe kuat
- Design system berbasis CSS custom properties — konsisten

### ⚠️ Hal yang Perlu Diperhatikan

- [astro.config.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/astro.config.mjs) **kosong** — tidak ada `site` URL, tidak ada integrasi (sitemap, RSS)
- Tidak ada halaman 404 kustom
- Tidak ada `.env` atau konfigurasi environment
- Tidak ada testing framework

---

## 2. Kualitas Kode Frontend

### ✅ Hal Positif

- **TypeScript** digunakan dengan baik di [content.config.ts](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content.config.ts) dan [news.ts](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/lib/news.ts)
- **Type export** `NewsEntry` memudahkan typing di seluruh codebase
- **Utility functions** (`formatDate`, `toIsoDate`) terpusat di `lib/news.ts`
- **Scoped styles** di setiap komponen — tidak ada style leakage
- **`prefers-reduced-motion`** di-handle di [global.css](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/styles/global.css) — best practice
- **Empty state** di-handle di halaman [berita/index.astro](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/pages/berita/index.astro) dan [index.astro](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/pages/index.astro)

### ⚠️ Temuan

| Severity | File | Temuan |
|:--------:|:-----|:-------|
| Low | [global.css](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/styles/global.css) | CSS variable `--radius-sm` dan `--space-1` s/d `--space-5` didefinisikan tapi tidak pernah digunakan (dead code) |
| Low | [Header.astro](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/components/Header.astro) | Beberapa warna hardcoded (`rgba(36,48,65,0.9)`, `rgba(7,9,12,0.82)`) tidak menggunakan design token |
| Low | [NewsCard.astro](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/components/NewsCard.astro) | Warna hardcoded dalam scoped CSS (`rgba(18,24,32,0.92)`, `rgba(61,255,154,0.38)`) |
| Low | [index.astro](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/pages/index.astro) + [berita/index.astro](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/pages/berita/index.astro) | Duplikasi style `code` yang sudah ada di `.prose code` global |

---

## 3. Keamanan

### 🔴 Temuan Penting

| Severity | Area | Temuan | Rekomendasi |
|:--------:|:-----|:-------|:------------|
| **Medium** | [content.config.ts](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content.config.ts) | Schema `source: z.string().url()` menerima `javascript:` protocol URL. Kontributor konten bisa menyisipkan XSS via `javascript:alert(1)` | Tambahkan `.refine(url => url.startsWith('https://'))` |
| **Medium** | [sources.json](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/sources.json) | Sumber Anthropic menggunakan **mirror GitHub pihak ketiga** (`raw.githubusercontent.com/Olshansk/...`) — supply chain risk | Cari RSS resmi Anthropic atau tanda-kan sebagai untrusted |
| **Medium** | [rss.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/rss.mjs) | Regex-based XML parsing rentan terhadap **ReDoS** (Regular Expression Denial of Service) dengan input XML yang crafted | Pertimbangkan `fast-xml-parser` atau limit input size |
| **Medium** | [rss.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/rss.mjs) | Tidak ada **limit ukuran response** — `res.text()` membaca seluruh response ke memori. Feed RSS besar/malicious bisa menyebabkan OOM | Tambahkan limit (misal 5MB) |
| **Medium** | [markdown.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/markdown.mjs) | **Markdown injection** via URL link dari RSS — URL crafted seperti `javascript:alert(1)` langsung masuk ke template | Validasi URL hanya `https://` |
| Low | [rss.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/rss.mjs) | Tidak ada validasi **scheme URL** — `fetchFeed` menerima URL apapun termasuk `file://` (SSRF risk jika sources.json user-editable) | Enforce `https://` scheme |
| Low | [markdown.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/markdown.mjs) | Template replacement order aman *by accident* — body yang berisi `{{title}}` tidak di-replace ganda karena urutan eksekusi, tapi **fragile** | Gunakan placeholder yang lebih unik atau sanitize body |

---

## 4. Performa

### ✅ Hal Positif

- **Static Site Generation** — performa runtime excellent, semua halaman pre-rendered
- `font-display: swap` sudah ada di URL Google Fonts
- `preconnect` ke Google Fonts domain sudah ada

### ⚠️ Temuan

| Severity | File | Temuan | Dampak |
|:--------:|:-----|:-------|:-------|
| Medium | [BaseLayout.astro](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/layouts/BaseLayout.astro) | Google Fonts dimuat via render-blocking `<link>` — menunda First Contentful Paint | Pertimbangkan self-hosting font atau preload pattern |
| Low | [global.css](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/styles/global.css) | `background-attachment: fixed` pada body — bisa menyebabkan jank/repaint pada mobile browser | Beberapa mobile browser mengabaikan property ini |
| Low | [global.css](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/styles/global.css) | Animasi `pulse-dot` berjalan infinite pada setiap halaman yang memiliki `.eyebrow` — CPU usage minimal tapi unnecessary saat off-screen | Pertimbangkan `IntersectionObserver` atau `animation-play-state` |

---

## 5. Aksesibilitas (a11y)

### ✅ Hal Positif (Above Average!)

- ✅ **Skip link** `"Lewati ke konten"` — hadir di [BaseLayout.astro](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/layouts/BaseLayout.astro)
- ✅ **`lang="id"`** pada `<html>` — benar untuk konten Indonesia
- ✅ **`aria-label="Navigasi utama"`** pada `<nav>` di [Header.astro](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/components/Header.astro)
- ✅ **`aria-current="page"`** pada link navigasi aktif
- ✅ **`aria-label="Tautan footer"`** pada nav footer
- ✅ **`<time datetime>`** digunakan dengan benar
- ✅ **`prefers-reduced-motion`** di-handle
- ✅ **`:focus-visible`** custom style tersedia (outline hijau accent)

### ⚠️ Temuan

| Severity | File | Temuan | WCAG |
|:--------:|:-----|:-------|:-----|
| Medium | [index.astro](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/pages/index.astro) | `<div class="chip-row" aria-label="...">` — `aria-label` pada `<div>` tanpa role tidak bermakna. Gunakan `<ul>` + `<li>` atau `role="list"` | 4.1.2 |
| Medium | [NewsCard.astro](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/components/NewsCard.astro) | Dua link menuju halaman yang sama (judul + "Baca sinyal") — screen reader mengumumkan duplikat | 2.4.4 |
| Medium | [NewsCard.astro](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/components/NewsCard.astro) | Link "Baca sinyal →" tidak cukup deskriptif tanpa konteks — screen reader listing semua link akan melihat banyak "Baca sinyal" identik | 2.4.4 |
| Low | [Header.astro](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/components/Header.astro) | Trailing slash pada pathname bisa menyebabkan `isActive()` gagal match — tergantung konfigurasi `trailingSlash` di Astro | — |

---

## 6. SEO

> [!CAUTION]
> SEO adalah area paling lemah dari proyek ini. Untuk sebuah **website berita**, ini sangat kritis.

### ✅ Hal yang Sudah Ada

- ✅ `<title>` dinamis per halaman (`Title · Sinyal AI`)
- ✅ `<meta name="description">` per halaman
- ✅ `<html lang="id">`
- ✅ Heading hierarchy benar (h1 → h2)
- ✅ Semantic HTML (`<article>`, `<header>`, `<nav>`, `<time>`, `<footer>`)

### 🔴 Hal yang Tidak Ada

| Severity | Temuan | Dampak |
|:--------:|:-------|:-------|
| **🔴 High** | **Tidak ada Open Graph (OG) meta tags** — `og:title`, `og:description`, `og:image`, `og:url`, `og:type` | Link preview di Facebook, LinkedIn, WhatsApp, Telegram kosong/jelek |
| **🔴 High** | **Tidak ada Twitter Card meta tags** — `twitter:card`, `twitter:title`, `twitter:description` | Link preview di Twitter/X kosong |
| **🔴 High** | **`site` tidak diset di `astro.config.mjs`** — dibutuhkan untuk canonical URL, sitemap, RSS | SEO fundamental broken |
| **Medium** | **Tidak ada `<link rel="canonical">`** | Potensi duplicate content issue |
| **Medium** | **Tidak ada sitemap.xml** — `@astrojs/sitemap` tidak diinstal | Search engine sulit discover semua halaman |
| **Medium** | **Tidak ada RSS/Atom feed output** — ironis untuk situs yang mengkonsumsi RSS tapi tidak memproduksi sendiri | Pembaca tidak bisa subscribe |
| **Medium** | **Tidak ada Structured Data (JSON-LD)** — `NewsArticle` schema sangat penting untuk Google News | Missed opportunity untuk rich snippets |
| Low | **Tidak ada `robots.txt`** kustom | Astro generate default, tapi bisa dikustomisasi |

---

## 7. Pipeline Otomasi RSS

### ✅ Hal Positif

- Arsitektur modular: `rss.mjs`, `markdown.mjs`, `slug.mjs` terpisah
- Dukungan `--dry-run` dan `--source` filter
- CDATA handling di RSS parser
- Timeout pada fetch request (20 detik)
- Fallback date jika date parsing gagal
- Konsol output informatif dengan emoji indicators

### 🔴 Bug Ditemukan

| Severity | File | Bug |
|:--------:|:-----|:----|
| **High** | [markdown.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/markdown.mjs) | `yamlQuote()` tidak lengkap — tidak menangani semua karakter spesial YAML. Bisa menghasilkan frontmatter yang broken |
| **Medium** | [fetch-signals.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/fetch-signals.mjs) | `--source` flag mem-bypass filter `enabled` — bisa fetch sumber yang disabled |
| **Medium** | [fetch-signals.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/fetch-signals.mjs) | Duplicate detection menambahkan `slug` (uniquified) ke set `existing`, tapi check menggunakan `baseSlug` — inkonsisten |
| **Medium** | [markdown.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/markdown.mjs) | Summary dipotong di 220 karakter **tanpa memperhatikan batas kata** — menghasilkan kalimat terpotong |
| Low | [rss.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/rss.mjs) | `extractLink()` prioritas salah — match `<link href>` apapun sebelum `rel="alternate"` |
| Low | [rss.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/rss.mjs) | Item tanpa tanggal default ke `new Date()` — selalu muncul sebagai "terbaru" |
| Low | [slug.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/slug.mjs) | Slug dipotong di 80 karakter **tanpa memperhatikan batas kata** — menghasilkan slug terpotong (contoh: `...-toronto-s`) |
| Low | [slug.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/slug.mjs) | `uniqueSlug()` tidak ada batas iterasi — bisa loop tak terbatas |

### ⚠️ Magic Numbers (Hardcoded Values)

| Nilai | Lokasi | Deskripsi |
|:-----:|:-------|:----------|
| `400` | rss.mjs | Batas truncation summary RSS |
| `220` | markdown.mjs | Batas truncation summary YAML |
| `80` | slug.mjs | Batas panjang slug |
| `3` | fetch-signals.mjs | Default limit item per sumber |
| `20000` | rss.mjs | Timeout fetch (ms) |

---

## 8. Konten Artikel

### Statistik

- **Total:** 7 artikel
- **Published:** 6 artikel (`draft: false`)
- **Draft:** 1 artikel (`draft: true`) — auto-generated

### ⚠️ Temuan

| Severity | Temuan |
|:--------:|:-------|
| Medium | Artikel auto-draft `nvidia-geforce-now-...` berbahasa **Inggris** — inkonsisten dengan konten lain yang berbahasa Indonesia |
| Medium | Artikel NVIDIA GeForce NOW tentang **gaming**, bukan AI — tidak sesuai fokus situs. Pipeline tidak memfilter konten non-AI |
| Low | Slug terpotong mid-word: `nvidia-geforce-now-turns-up-the-heat-with-new-geforce-rtx-5080-powered-toronto-s` (huruf "s" dari "servers") |
| Low | URL sumber pada artikel manual bersifat **fiktif** — OK untuk demo/MVP tapi perlu diganti dengan URL asli |
| Info | Tidak ada artikel yang menggunakan `tags` — tidak ada navigasi faceted |

---

## 9. Build & Deployment

### Build Test ✅

```
✓ 9 page(s) built in 11.08s
✓ Complete!
```

Semua halaman berhasil di-generate:
- `/index.html`
- `/tentang/index.html`
- `/berita/index.html`
- `/berita/[6 article slugs]/index.html`

### ⚠️ Deployment Readiness

| Item | Status | Catatan |
|:-----|:------:|:--------|
| Build sukses | ✅ | Tanpa error |
| `site` URL dikonfigurasi | ❌ | Wajib diset sebelum deploy |
| Sitemap | ❌ | Instal `@astrojs/sitemap` |
| 404 page | ❌ | Buat `src/pages/404.astro` |
| `robots.txt` kustom | ❌ | Opsional |
| Environment variables | ❌ | Belum dibutuhkan saat ini |
| CI/CD pipeline | ❌ | Belum ada |

---

## 10. Rekomendasi Perbaikan (Prioritas)

### 🔴 Prioritas Tinggi (Harus diperbaiki sebelum production)

1. **Set `site` di `astro.config.mjs`** — fondasi untuk canonical URL, sitemap, RSS
2. **Tambah Open Graph & Twitter Card meta tags** di `BaseLayout.astro`
3. **Tambah `@astrojs/sitemap` integration**
4. **Validasi `source` URL** di schema → enforce `https://` only
5. **Perbaiki `yamlQuote()`** di `markdown.mjs` — handle semua karakter YAML spesial

### 🟡 Prioritas Sedang (Sebelum launch publik)

6. **Tambah RSS/Atom feed output** — gunakan `@astrojs/rss`
7. **Tambah structured data JSON-LD** (`NewsArticle` schema) di halaman artikel
8. **Fix bug `--source` bypassing `enabled` filter** di `fetch-signals.mjs`
9. **Fix duplicate detection inconsistency** di `fetch-signals.mjs`
10. **Fix summary & slug truncation** — potong di batas kata, bukan karakter
11. **Tambah halaman 404** (`src/pages/404.astro`)
12. **Perbaiki chip-row semantics** → gunakan `<ul>` + `<li>`
13. **Tambah `aria-label` ke "Baca sinyal" links** di NewsCard

### 🟢 Prioritas Rendah (Nice to have)

14. Self-host Google Fonts untuk mengurangi external dependency
15. Tambah `canonical URL` di `<head>`
16. Bersihkan dead CSS variables
17. Gunakan design tokens konsisten (bukan hardcoded rgba values)
18. Pertimbangkan `fast-xml-parser` untuk parsing RSS yang lebih robust
19. Tambah response size limit di RSS fetcher
20. Tambah unit tests (minimal untuk `slug.mjs`, `markdown.mjs`, `news.ts`)

---

## Kesimpulan

> [!IMPORTANT]
> Proyek SinyalAI News memiliki **fondasi yang kuat** sebagai MVP. Arsitektur bersih, kode rapi, dan pipeline RSS sudah fungsional. Namun, untuk sebuah **website berita** yang akan dipublikasikan, area **SEO** membutuhkan perhatian segera — terutama social sharing tags, sitemap, dan structured data. Keamanan pipeline RSS juga perlu diperkuat sebelum menjalankan fetch dari sumber publik secara rutin.

### Verdict: **Layak untuk development lanjutan, belum siap production.**

Estimasi effort perbaikan prioritas tinggi: **~4-6 jam kerja**
