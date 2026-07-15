# Upgrade ke Standar ⭐⭐⭐⭐ — Keamanan, Pipeline RSS, SEO, Testing

Rencana perbaikan untuk 4 kategori yang belum memenuhi standar bintang 4.

## User Review Required

> [!IMPORTANT]
> **Site URL**: Saya akan menggunakan placeholder `https://sinyalai.vercel.app` di `astro.config.mjs`. Anda cukup mengubah satu baris saat sudah punya domain final.

> [!IMPORTANT]
> **Testing Framework**: Saya akan menggunakan **Vitest** karena integrasi native dengan Astro/Vite. Ini akan menambah devDependency baru.

---

## Proposed Changes

### Komponen 1 — SEO (⭐⭐½ → ⭐⭐⭐⭐)

#### [MODIFY] [astro.config.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/astro.config.mjs)
- Set `site: 'https://sinyalai.vercel.app'`
- Tambahkan integrasi `@astrojs/sitemap`

#### [MODIFY] [BaseLayout.astro](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/layouts/BaseLayout.astro)
- Tambah props `ogImage?`, `articleDate?`, `articleCompany?` 
- Tambah Open Graph meta tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale`)
- Tambah Twitter Card meta tags (`twitter:card`, `twitter:title`, `twitter:description`)
- Tambah `<link rel="canonical">`
- Tambah `<link rel="alternate" type="application/rss+xml">` untuk RSS

#### [MODIFY] [[slug].astro](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/pages/berita/%5Bslug%5D.astro)
- Pass `articleDate` dan `articleCompany` ke BaseLayout untuk OG meta
- Tambah JSON-LD structured data (`NewsArticle` schema)

#### [NEW] `src/pages/rss.xml.ts`
- Endpoint RSS feed menggunakan `@astrojs/rss`
- Output semua artikel published sebagai RSS feed

#### [NEW] `public/robots.txt`
- Allow semua crawler
- Link ke sitemap.xml

#### [NEW] `src/pages/404.astro`
- Halaman 404 kustom dengan navigasi kembali

---

### Komponen 2 — Keamanan (⭐⭐⭐ → ⭐⭐⭐⭐)

#### [MODIFY] [content.config.ts](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content.config.ts)
- Tambah `.refine()` pada `source` field untuk enforce `https://` only, menolak `javascript:`, `file://`, dll.

#### [MODIFY] [rss.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/rss.mjs)
- Tambah validasi URL scheme (`https://` only) di `fetchFeed()`
- Tambah response size limit (max 5MB) untuk mencegah OOM
- Fix `extractLink()` — prioritaskan `rel="alternate"` sebelum `href` generik

#### [MODIFY] [markdown.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/markdown.mjs)
- Perbaiki `yamlQuote()` — handle tab, carriage return, null byte, dan karakter kontrol lainnya
- Validasi URL link di `buildDraftBody()` — hanya menerima `https://`
- Terapkan `yamlQuote()` juga pada `company` dan `source` fields (konsisten)

#### [MODIFY] [sources.json](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/sources.json)
- Tambah field `"trusted": false` pada sumber Anthropic (mirror GitHub)
- Tambah komentar keamanan di `notes`

---

### Komponen 3 — Pipeline RSS (⭐⭐⭐ → ⭐⭐⭐⭐)

#### [MODIFY] [fetch-signals.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/fetch-signals.mjs)
- **Fix bug `--source` bypassing `enabled` filter** — filter dari `sources` yang sudah di-filter, bukan `config.sources`
- **Fix duplicate detection** — tambahkan `baseSlug` ke set `existing` (bukan `slug` yang sudah uniquified)
- Tambah rate limiting sederhana (delay 500ms antar fetch)

#### [MODIFY] [slug.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/slug.mjs)
- **Fix truncation mid-word** — potong di batas `-` terakhir sebelum limit
- Tambah batas iterasi di `uniqueSlug()` (max 100)
- Ekstrak magic number `MAX_SLUG_LENGTH = 80` ke named constant

#### [MODIFY] [markdown.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/markdown.mjs) *(lanjutan)*
- **Fix summary truncation** — potong di batas kata terakhir, bukan karakter
- Ekstrak magic numbers ke named constants (`MAX_SUMMARY_LENGTH = 220`)
- Cache template (baca file sekali di luar loop, bukan per artikel)

#### [MODIFY] [rss.mjs](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/rss.mjs) *(lanjutan)*
- Jangan default items tanpa tanggal ke `new Date()` — gunakan `null` dan sort ke bawah
- Ekstrak magic numbers (`MAX_SUMMARY_LENGTH = 400`, `FETCH_TIMEOUT_MS = 20000`)

---

### Komponen 4 — Testing (⭐ → ⭐⭐⭐⭐)

#### Setup
- Install `vitest` sebagai devDependency
- Tambah script `"test"` di `package.json`

#### [NEW] `scripts/lib/__tests__/slug.test.mjs`
- Test `slugify()`: ASCII, Unicode, empty string, very long titles, special chars (`&`), company prefix
- Test `uniqueSlug()`: no collision, collision, batas iterasi

#### [NEW] `scripts/lib/__tests__/markdown.test.mjs`
- Test `yamlQuote()`: double quotes, backslash, newlines, tab, karakter kontrol
- Test `toIsoDate()`: valid date, edge cases
- Test `buildDraftBody()`: output structure, fallback summary, link sanitization
- Test `writeDraftArticle()`: dry-run mode, file creation, template rendering

#### [NEW] `scripts/lib/__tests__/rss.test.mjs`
- Test `parseFeed()`: RSS 2.0 format, Atom format, CDATA handling, empty feed
- Test `extractLink()`: Atom href, rel=alternate priority, fallback
- Test `decodeXml()`: HTML entities, CDATA, tag stripping
- Test `fetchFeed()`: URL scheme validation, response size limit

#### [NEW] `src/__tests__/news.test.ts`
- Test `formatDate()`: format Indonesia
- Test `toIsoDate()`: ISO date output

---

## Verification Plan

### Automated Tests
```bash
npm run test          # Vitest — semua unit test
npm run build         # Astro build — pastikan tidak ada regresi
```

### Manual Verification
- Jalankan `npm run dev` dan verifikasi:
  - OG meta tags muncul di page source
  - RSS feed accessible di `/rss.xml`
  - Sitemap di `/sitemap-index.xml`
  - Halaman 404 tampil saat akses URL tidak valid
  - JSON-LD structured data pada halaman artikel
- Jalankan `npm run fetch:signals -- --dry-run` dan verifikasi perbaikan pipeline
