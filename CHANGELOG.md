# Catatan Perubahan (Changelog) — Sinyal AI News

Semua pembaruan penting, perbaikan teknis, dan peningkatan editorial pada proyek **Sinyal AI News** dicatat dalam dokumen ini. Format pencatatan mengikuti prinsip [Keep a Changelog](https://keepachangelog.com/id/1.0.0/).

---

## [Belum dirilis]

### 🗄️ Pengarsipan Berita Standar Lama
- Field baru `archived` (default `false`) pada skema koleksi `news`. Artikel `archived: true` tetap tersimpan di repo tetapi tidak tayang di beranda, daftar berita, halaman detail, RSS, maupun sitemap. Penyaringan terpusat di `getPublishedNews()`.
- 24 artikel yang tayang dengan tanggal rilis 6 Oktober 2026 dan sebelumnya diarsipkan karena dibuat dengan standar lama. Artikel `draft: true` tidak diubah.
- Pengecekan duplikat pipeline tetap membaca artikel terarsip, sehingga berita yang sama tidak dibuat ulang.
- URL artikel terarsip tidak lagi dapat diakses (404).

---

## [0.6.1] — 2026-10-07

Penguatan penulis AI setelah dry run `auto-news` pertama: model menyisipkan aksara Mandarin pada sekitar 2 dari 3 artikel di percobaan pertama.

### 🧠 Penulis AI (`scripts/`)
- **Percobaan ulang dengan umpan balik**: maksimal 3 percobaan (sebelumnya 2). Keluaran yang ditolak validasi dan daftar masalahnya dikirim kembali ke model (pesan `assistant` + `user`) agar percobaan berikutnya memperbaiki kesalahan yang sama. Error HTTP/jaringan diulang tanpa umpan balik.
- **`ArticleValidationError`** (`scripts/lib/validate.mjs`): kegagalan validasi kini bertipe khusus dengan daftar `problems`.
- **Log konteks sumber**: tiap artikel mencetak panjang teks halaman sumber dan cuplikan feed.
- **Pesan dry run jelas**: "Lolos validasi (dry run, tidak disimpan)" menggantikan "Berhasil diterbitkan" saat `--dry-run`.
- 3 test baru (total 124).

### ⚙️ Pipeline Otomasi
- `timeout-minutes` job `auto-news.yml` dinaikkan dari 15 ke 20 menit karena kasus terburuk percobaan ulang bertambah.

---

## [0.6.0] — 2026-10-07

Perbaikan kurasi berita otomatis (bug tanggal rilis, batas usia 7 hari), pengamanan alur AI dan workflow, pembersihan artikel bertanggal palsu, serta perbaikan teknis berdasarkan review proyek. Rencana lengkap: [`docs/rencana-perbaikan.md`](docs/rencana-perbaikan.md).

### 🧠 Kurasi Berita (Fase 1 rencana perbaikan)
- **Perbaikan bug tanggal kurasi**: `editor.mjs` dan `generate-news.mjs` membaca `item.date` yang tidak pernah ada (parser mengisi `publishedAt`), sehingga prioritas "Hari Ini" tidak pernah aktif dan rilis lama ikut tayang. Kini memakai `item.publishedAt`.
- **Batas usia rilis 7 hari**: rilis lebih tua dari 7 hari, atau tanpa tanggal valid, tidak lagi tayang otomatis (opsi `--max-age-days=N`).
- **Tanggal tayang mengikuti tanggal sumber**: `publishedAt` artikel dan folder tanggal kini berasal dari tanggal rilis sumber (tidak pernah di masa depan), bukan waktu generate.
- Test baru untuk `isFreshEnough` dan filter usia pada `selectEditorialEdition`.

### ⚙️ Pipeline Otomasi (Fase 2 rencana perbaikan)
- **Urutan workflow `auto-news.yml`**: test dan build kini berjalan sebelum commit/push artikel ke `main`. Artikel yang merusak build tidak lagi masuk repo dan memblokir deploy berikutnya.

### 📰 Pembersihan Konten (Fase 3 rencana perbaikan)
- 11 artikel yang tayang dengan tanggal palsu (stempel waktu generate, padahal rilis sumber jauh lebih lama) ditarik (`draft: true`) dan `publishedAt` dikoreksi ke tanggal sumber terverifikasi. Semuanya lebih tua dari batas 7 hari.
  - Anthropic: Claude 3.5 Sonnet/Computer Use (2024-10-22), Enzim CRISPR-like (2026-09-23), Services Track & Partner Hub (2026-06-03)
  - Meta: Llama 4 (2025-04-05), SAM Audio (2025-12-16), Omnilingual ASR (2025-11-10)
  - xAI: Grok-1.5 (2024-03-28), Grok 4 (2025-07-09), Grok 4.5 (2026-07-16), Skills (2026-05-18)
  - Microsoft: Pembelajaran transformasi AI (2026-09-17)
- Verifikasi dilakukan terhadap feed mirror Anthropic/xAI/Meta dan tanggal pada URL sumber Microsoft. Artikel OpenAI, Google, dan NVIDIA belum dapat diverifikasi otomatis.
- Artikel berbahasa Inggris yang tersisa sudah berstatus `draft: true` (tidak tayang).
- Folder tanggal dan nama file tidak dipindah agar URL artikel lain tetap stabil.

### 🧠 Keandalan Penulis AI (Fase 4 rencana perbaikan)
- **Validasi keluaran LLM** (`scripts/lib/validate.mjs`): artikel ditolak dan diulang (1x) jika memuat aksara non-Latin (CJK dll.), teks placeholder, judul tanpa nama perusahaan atau lebih dari 120 karakter, ringkasan di luar 80–300 karakter, atau isi kurang dari 400 karakter / 2 paragraf.
- **Konteks halaman sumber** (`scripts/lib/source-context.mjs`): teks halaman resmi (maks. 6.000 karakter) dikirim ke LLM di dalam tag `<sumber>` sebagai data, bukan perintah. Hanya HTTPS, dengan batas ukuran dan timeout; host lokal/IP literal ditolak (mitigasi SSRF).
- **Anti-halusinasi**: prompt melarang menambah detail di luar sumber; kandidat dengan konteks terlalu tipis (<300 karakter halaman dan <120 karakter cuplikan) dilewati.
- **Kandidat cadangan**: kurasi mengambil 2x kuota kandidat; yang gagal validasi atau dilewati digantikan kandidat berikutnya sampai kuota edisi terpenuhi.
- Sumber `trusted: false` tetap tayang otomatis sesuai keputusan redaksi.

### 🔧 Perbaikan Teknis (Fase 5 rencana perbaikan)
- `manifest.webmanifest`: `start_url` dan path ikon diperbaiki dari `/sinyalai-news/...` ke `/...` (domain `sinyalai.xyz`), ditambah `scope`.
- JSON-LD artikel: `author` kini `Organization` (redaksi RSAIN), `publisher.name` menjadi "Sinyal AI News" dan memuat `url`.
- `README.md`: deskripsi deployment diperbarui (GitHub Pages + `sinyalai.xyz`), catatan konten demo dan roadmap yang sudah terealisasi dibersihkan.

### 🧹 Kebersihan Repo (Fase 6 rencana perbaikan)
- Versi `package.json` dan `package-lock.json` disinkronkan ke `0.6.0` (sebelumnya `0.0.1`).
- `audit_report.md`, `walkthrough_audit.md`, dan `implementation_plan.md` dipindah dari root ke `docs/`.
- `.agents/skills` dipertahankan (masih dipakai).
- Aset logo tidak dihapus: PNG bernomor `(1)…(7)` di `src/logo/` adalah master yang dibaca `scripts/convert-logos.mjs`, sehingga bukan duplikat yang aman dibuang.

---

## [0.5.2] — 2026-10-05

Optimasi penjadwalan cron edisi pagi (Anti-Drop GitHub Actions), mitigasi token leak bahasa Mandarin pada generator AI, standarisasi batch timestamp edisi rilis, dan penerbitan resmi Edisi Pagi 2026-10-05.

### ⚙️ Pipeline Otomasi & Penjadwalan (GitHub Actions)
- **Anti-Drop Cron Scheduler Edisi Pagi**:
  - Menggeser jadwal siaran edisi pagi di `.github/workflows/auto-news.yml` dari `30 3 * * *` (10:30 WIB) ke `35 3 * * *` (10:35 WIB).
  - *Akar Masalah*: Menit `:00` dan `:30` adalah titik puncak antrean global (*peak scheduler congestion*) pada infrastruktur GitHub Actions yang menyebabkan event pemicu sering tertunda puluhan menit atau terlewat (*dropped*). Sebelumnya pada v0.5.0 perbaikan baru diterapkan pada edisi malam (`15:05 UTC`), sedangkan jadwal pagi masih tertinggal pada menit `:30`. Dengan penyesuaian ini, kedua jadwal tayang (10:35 WIB dan 22:05 WIB) bebas dari antrean menit sibuk.

### 🧠 Generator Berita & AI Redaksi (`scripts/`)
- **Pemberantasan Token Leak Bahasa Asing**:
  - Memperketat `SYSTEM_PROMPT` di `scripts/lib/ai-writer.mjs` untuk mewajibkan 100% Bahasa Indonesia baku tanpa menyisipkan aksara atau kata non-Latin/Mandarin dari model LLM Minimax.
  - Memperbaiki artikel OpenAI terkait rilis GPT-6 Astra dari kebocoran karakter non-terjemahan.
- **Konsistensi Batch Timestamp Edisi**:
  - Memperbarui `scripts/generate-news.mjs` agar seluruh artikel yang digenerasi dalam satu sesi tayang menggunakan `editionBatchTimestamp` yang sama persis, memastikan pengurutan sekunder abjad A-Z (`src/lib/news.ts`) bekerja secara konsisten.

### 📰 Penerbitan Edisi Pagi 2026-10-05
- Menjalankan pipeline otomatis dan menerbitkan 3 artikel resmi terkurasi oleh Pemimpin Redaksi (RSAIN):
  1. *Google*: "Google Rilis Model AI SL2T untuk Penerjemah Bahasa Isyarat"
  2. *OpenAI*: "OpenAI Rilis GPT-6 Astra, Model dengan Kemampuan Computer Use dan Coding"
  3. *xAI*: "xAI Rilis Grok 4.5 untuk Coding, Tugas Agen, dan Knowledge Work"
- Seluruh artikel berhasil dipublikasikan dan live di `https://sinyalai.xyz`.

---

## [0.5.1] — 2026-10-04

Pengurutan berita hierarkis pada halaman berita (`/berita/`) berdasarkan waktu rilis (tanggal dan jam) descending serta alfabetis judul berita (A-Z) untuk artikel pada jadwal siaran yang sama.

### 📰 Pengurutan Berita & Metadata Waktu (`src/lib/news.ts`)
- **Hierarchical News Sorting**:
  - Memperbarui fungsi `getPublishedNews` agar mengurutkan artikel secara bertingkat:
    1. **Prioritas Utama**: Waktu rilis (`publishedAt.getTime()`) secara descending (terbaru lebih dulu: tahun, bulan, tanggal, dan jam rilis).
    2. **Prioritas Sekunder**: Abjad judul berita (`a.data.title.localeCompare(b.data.title, 'id-ID')`) secara A-Z jika waktu rilis/edisi sama.
- **Preservasi ISO Timestamp**:
  - Memperbarui `scripts/lib/markdown.mjs` agar menyimpan format timestamp ISO lengkap pada frontmatter saat pembuatan artikel otomatis, sehingga pemisahan rilis pagi dan malam tercatat akurat.
  - Memperbarui timestamp frontmatter artikel 2026-10-04 sesuai jadwal siaran Edisi Pagi (10:30 WIB) dan Edisi Malam (22:05 WIB).
- **Unit Testing**:
  - Menambahkan pengujian vitest komprehensif pada `src/__tests__/news.test.ts` untuk memastikan akurasi pengurutan waktu rilis dan abjad judul.

---

## [0.5.0] — 2026-10-04

Optimasi penjadwalan pipeline otomatisasi berita (RSAIN), peningkatan izin token GitHub Actions, dan penerbitan langsung Edisi Malam.

### ⚙️ Pipeline Otomasi & Penjadwalan (GitHub Actions)
- **Anti-Drop Cron Scheduler**:
  - Menggeser jadwal siaran edisi malam di `.github/workflows/auto-news.yml` dari `0 15 * * *` (22:00 WIB) ke `5 15 * * *` (22:05 WIB) guna menghindari lonjakan antrean puncak global (*top-of-the-hour queue drop*) pada infrastruktur GitHub Actions.
- **Izin Token Bot Otomatis**:
  - Memperbarui izin repository `default_workflow_permissions` menjadi `write` via GitHub API untuk memastikan bot Redaktur Sinyal AI News (RSAIN) dapat melakukan git push dan auto-deploy tanpa kendala hak akses token.
- **Penerbitan Edisi Malam**:
  - Menjalankan pipeline siaran malam dan menerbitkan 3 artikel resmi terkurasi oleh Pemimpin Redaksi (RSAIN):
    1. *Anthropic*: "Anthropic Rilis Fitur Computer Use dan Model Claude 3.5 Sonnet serta Haiku Terbaru"
    2. *OpenAI*: "OpenAI Rilis GPT-6.1 Sol, Model dengan Tarif Token Lebih Murah"
    3. *Google*: "Google Perkenalkan Pemahaman Video Agen di Gemini"
  - Seluruh artikel berhasil dibangun, diuji, dan dipublikasikan langsung ke web live `sinyalai.xyz`.

---

## [0.4.0] — 2026-10-04

Migrasi dan integrasi Custom Domain resmi **`sinyalai.xyz`** menggantikan subfolder GitHub Pages default (`/sinyalai-news`).

### 🌐 Konfigurasi Domain Kustom (`sinyalai.xyz`)
- **DNS Records**:
  - Konfigurasi 4 A Records di registrar IDWebhost mengarah ke alamat IP Anycast GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`).
  - Menambahkan CNAME record untuk `www` mengarah ke `vibe-coder-eja.github.io`.
- **Astro & Routing**:
  - Memperbarui `astro.config.mjs` dengan `site: 'https://sinyalai.xyz'` dan mengembalikan `base: '/'` (root path).
  - Menambahkan file `public/CNAME` berisi `sinyalai.xyz` untuk deployment otomatis GitHub Pages.
- **Metadata, SEO, & Bot Script**:
  - Memperbarui `public/robots.txt` agar sitemap mengarah ke `https://sinyalai.xyz/sitemap-index.xml`.
  - Memperbarui fallback `siteUrl` di `src/layouts/BaseLayout.astro`, `src/pages/berita/[date]/[slug].astro`, dan `src/pages/rss.xml.ts`.
  - Menyesuaikan User-Agent bot RSS di `scripts/lib/rss.mjs` (`https://sinyalai.xyz/tentang`) dan OpenRouter referer di `scripts/lib/ai-writer.mjs`.
  - Memperbarui footer badge Open Graph image di `scripts/convert-logos.mjs` dan meregenerasi `public/og-default.png` dengan branding `sinyalai.xyz`.

---

## [0.3.0] — 2026-10-04

Integrasi aset identitas visual resmi Sinyal AI News: konversi logo format PNG ke WebP performa tinggi, restrukturisasi varian logo semantik, serta implementasi ke seluruh komponen situs dan metadata web.

### 🎨 Identitas Visual & Konversi Logo WebP (Brand Assets)
- **Konversi WebP Lossless/High-Quality**:
  - Mengonversi seluruh 7 varian logo dari `src/logo/` ke format modern `.webp` dengan penghematan ukuran file hingga 70-95% (contoh: 1.5MB turun menjadi ~62KB) tanpa mengurangi ketajaman visual.
  - Menyediakan penamaan semantik terstruktur di `src/logo/` dan `public/logo/`:
    - `sinyal-ai-news-logo-horizontal-dark.webp`: Lockup horizontal teks putih + simbol hijau neon untuk latar belakang gelap / navbar.
    - `sinyal-ai-news-logo-horizontal-alt.webp`: Varian alternatif lockup horizontal.
    - `sinyal-ai-news-logo-horizontal-light.webp`: Lockup horizontal teks gelap untuk latar belakang terang.
    - `sinyal-ai-news-logo-stacked-dark.webp`: Lockup vertikal bertumpuk untuk tema gelap.
    - `sinyal-ai-news-logo-stacked-light.webp`: Lockup vertikal bertumpuk untuk tema terang.
    - `sinyal-ai-news-logo-icon.webp`: Ikon/simbol murni 1:1 dengan latar belakang transparan.
    - `sinyal-ai-news-logo-icon-card.webp`: Ikon/simbol solid 1:1 dengan latar belakang gelap.
- **Implementasi Komponen Navigasi & Footer**:
  - **Header Navigasi (`src/components/Header.astro`)**: Mengganti kotak placeholder CSS dengan ikon resmi WebP (`sinyal-ai-news-logo-icon.webp`) lengkap dengan efek visual neon glow halus saat *hover* dan *tap feedback* interaktif.
  - **Footer Situs (`src/components/Footer.astro`)**: Menyematkan simbol resmi di samping nama media pada blok identitas redaksi.
  - **Halaman Tentang (`src/pages/tentang.astro`)**: Menambahkan kartu identitas resmi (*brand badge card*) yang memamerkan logo horizontal resmi.
- **Aset Ikon Web & Favicon**:
  - Menghasilkan `public/logo.webp` dan `public/logo.png` (512x512) untuk PWA dan Schema.org.
  - Menghasilkan `public/apple-touch-icon.png` (180x180) untuk homescreen iOS.
  - Menghasilkan `public/favicon-32x32.png` dan `public/favicon-16x16.png` untuk browser modern.
  - Memperbarui `public/manifest.webmanifest` dan `src/layouts/BaseLayout.astro` dengan definisi ikon lengkap.
- **Kartu Berbagi Sosial (Social OG Image)**:
  - Membuat `public/og-default.png` (1200x630) beresolusi tinggi dengan logo resmi horizontal, label *LIVE SIGNALS*, dan tipografi tema gelap.

---

## [0.2.0] — 2026-10-04

Pembaruan besar (*major upgrade*) yang berfokus pada penyaringan relevansi AI otomatis, deduplikasi sumber berlapis, penguatan metadata SEO/Schema.org, ekspansi pengujian unit, serta penerbitan artikel sinyal resmi industri teknologi.

### 🔒 Keamanan (Security)
- **Validasi Skema HTTPS Ketat**: Memperketat schema Zod pada [`src/content.config.ts`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content.config.ts) dengan validasi protokol HTTPS murni serta penolakan kredensial inline pada URL sumber berita.
- **Proteksi Buffer & OOM Attack**: Membatasi ukuran muatan HTTP response hingga maksimal 5MB dengan teknik chunked stream reader pada [`scripts/lib/rss.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/rss.mjs).
- **Sanitasi Skema Tautan & Kontrol Karakter**: Mencegah serangan injeksi protokol `javascript:` pada parser link dan membersihkan karakter kontrol tersembunyi pada serializer frontmatter YAML.
- **Verifikasi Feed Mirror Komunitas**: Menandai sumber cermin komunitas (seperti mirror RSS Anthropic) dengan flag `"trusted": false` pada konfigurasi [`scripts/sources.json`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/sources.json).

### 🎨 UI & Animasi Interaktif (Emil Kowalski Design Engineering)
- **Transisi Antar-Halaman Halus (View Transitions)**:
  - Mengintegrasikan `<ClientRouter />` dari `astro:transitions` pada [`src/layouts/BaseLayout.astro`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/layouts/BaseLayout.astro).
  - Menerapkan animasi *cross-fade & subtle lift* (`::view-transition-old(root)` dan `::view-transition-new(root)`) menggunakan kurva kustom Emil Kowalski (`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`).
- **Animasi Sekuen & Stagger di Setiap Section**:
  - Menambahkan kelas utilitas `.reveal`, `.reveal-1`, `.reveal-2`, `.reveal-3` dengan durasi kencang (~320ms) dan akselerasi natural.
  - Kartu berita ([`src/components/NewsCard.astro`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/components/NewsCard.astro)) masuk secara bertahap (*staggered entrance*) dengan jeda dinamis 45ms per kartu.
  - Mengikuti prinsip Emil Kowalski: tidak pernah menganimasi dari `scale(0)`, melainkan dari `scale(0.985)` + `translateY(14px)` demi kesan fisik yang natural.
- **Hover Jelas & Umpan Balik Taktil (`:active`)**:
  - Seluruh efek *hover* kartu, tombol, link, dan chip dikunci di balik `@media (hover: hover) and (pointer: fine)` agar tidak terjadi *sticky hover bug* pada layar sentuh ponsel.
  - Umpan balik klik/tekan (*press feedback*): tombol dan kartu merespons sentuhan dengan `scale(0.97 - 0.985)` dalam 90ms.
  - Kartu berita menyajikan iluminasi batas aksen (`rgba(61, 255, 154, 0.45)`), kenaikan bayangan dramatis, dan pergeseran ikon panah link (`translateX(4px)`).
- **Desain Responsif & Mobile Native**:
  - Mengatur ukuran kontainer cairan (`min(100% - max(1.5rem, 4vw), 1080px)`).
  - Target sentuh minimal 44px untuk kenyamanan navigasi jari di perangkat genggam.
  - Menghilangkan *tap highlight flash* abu-abu bawaan browser mobile melalui `-webkit-tap-highlight-color: transparent`.
  - Dukungan penuh `@media (prefers-reduced-motion: reduce)` yang mematikan transform gerak bagi pengguna yang sensitif terhadap gerakan.

### 📂 Manajemen Konten & Struktur URL (Opsi A)
- **Organisasi Subfolder Berdasarkan Tanggal Rilis (`YYYY-MM-DD`)**:
  - Mengklasifikasikan seluruh file artikel di [`src/content/news/`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content/news/) ke dalam subfolder tanggal terbitnya (misal: `src/content/news/2026-10-04/slug.md`) agar struktur direktori bersih dan rapi.
  - Memperbarui generator [`scripts/generate-news.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/generate-news.mjs) dan utilitas [`scripts/lib/markdown.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/markdown.mjs) dengan parameter `dateFolder` sehingga artikel baru otomatis disimpan ke subfolder tanggal rilisnya.
  - Memperbarui modul deduplikasi [`scripts/lib/dedupe.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/dedupe.mjs) agar melakukan pemindaian berkas secara rekursif (`readdir(dir, { recursive: true })`) serta melacak slug dasar dan slug relatif.
- **Routing Dinamis Bertanggal & Detail Artikel (`[date]/[slug].astro`)**:
  - Mengubah rute detail artikel menjadi [`src/pages/berita/[date]/[slug].astro`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/pages/berita/%5Bdate%5D/%5Bslug%5D.astro).
  - Format URL permalink artikel konsisten mengusung standar media berita: `/sinyalai-news/berita/YYYY-MM-DD/slug`, selaras dengan kartu berita di beranda dan link pada feed RSS `dist/rss.xml`.
- **Fitur Pagination Berita (9 Berita per Halaman)**:
  - Mengimplementasikan rute paginasi Astro [`src/pages/berita/[...page].astro`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/pages/berita/%5B...page%5D.astro) dengan batas `pageSize: 9` per halaman.
  - Halaman 1 terbit di `/sinyalai-news/berita/` dan halaman berikutnya di `/sinyalai-news/berita/2`, `/sinyalai-news/berita/3`, dst.
  - Dilengkapi kontrol navigasi halaman (tombol Sebelumnya/Selanjutnya, nomor halaman lingkaran dengan efek tekan taktil, serta indikator jumlah artikel) yang terhubung mulus dengan View Transitions.
  - Nomor halaman diringkas otomatis (misal: `1 … 4 5 6 … 20`) agar baris navigasi tidak meluap di layar ponsel seiring bertambahnya arsip.
  - Penanganan feed kosong: indikator jumlah menampilkan "Belum ada sinyal terbit" alih-alih rentang `1–0 dari 0`.

### 🤖 Pipeline & Ingestion Otomatis
- **Penyaring Relevansi AI Otomatis ([`scripts/lib/relevance.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/relevance.mjs))**:
  - Menambahkan modul filter cerdas berbasis pola regex untuk memisahkan pengumuman AI (LLM, GPT, reasoning, agentic, inference, DeepMind, dsb.) dari artikel non-AI pada feed umum korporat (Microsoft, NVIDIA).
  - Menyediakan filter penolakan kata kunci (`excludeKeywords`) untuk memblokir rilis gaming (misal: *GeForce NOW* / *GFN Thursday*).
  - Menandai feed spesifik riset AI (OpenAI, Google DeepMind, Google AI) dengan atribut `"aiFocused": true` agar tidak terkena pemotongan kuota.
- **Aturan Redaksi Baru & Kurasi Pemimpin Redaksi ([`scripts/lib/editor.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/editor.mjs))**:
  - **Kuota Tayang Terukur**: Menetapkan jadwal tayang tetap **3 berita pagi (10:30 WIB)** dan **3 berita malam (22:00 WIB)** (maksimal 6 berita/hari), menghemat konsumsi token API OpenRouter Minimax-M3 lebih dari 60%.
  - **Peran Pemimpin Redaksi**: Mengumpulkan kandidat dari seluruh 8 sumber resmi secara terpadu, lalu memilih 3 sinyal paling berdampak menggunakan 4 pilar prioritas (Rilis Model > Fitur & Skills > Produk & Infrastruktur > Kerjasama Industri > Standar Umum).
  - **Prioritas Hari Ini & Fallback Cerdas**: Memprioritaskan rilis bertanggal hari ini. Jika rilis hari ini kurang dari 3, sistem secara otomatis mengkurasi rilis hari-hari sebelumnya yang belum pernah diterbitkan (*unreleased backlog*).
  - **Diversifikasi Sumber**: Memprioritaskan rilis dari perusahaan teknologi yang berbeda dalam satu edisi tayang agar berita mencakup ekosistem AI secara variatif.
  - **Anti-Duplikasi Ketat**: Melarang penerbitan rilis duplikat, baik dalam satu hari maupun dari arsip hari-hari sebelumnya.
- **Penguatan Ketahanan AI Writer ([`scripts/lib/ai-writer.mjs`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/lib/ai-writer.mjs))**:
  - Menambahkan mode `response_format: { type: "json_object" }` pada muatan API OpenRouter.
  - Menyediakan *parser fallback* berbasis regex untuk mengekstrak judul, ringkasan, dan isi berita jika terdapat karakter kontrol atau baris baru unescaped pada output JSON LLM.
  - Menambahkan sistem *retry* otomatis 1 kali untuk kegagalan jaringan transient serta menaikkan batas waktu *timeout* hingga 90 detik.
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

### 🔎 SEO, GEO Targeting & Metadata
- **Optimasi Meta Tag SEO & GEO Friendly ([`src/layouts/BaseLayout.astro`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/layouts/BaseLayout.astro))**:
  - Menambahkan meta tag penargetan geografis lokal Indonesia (`geo.region: "ID"`, `geo.placename: "Indonesia"`, `geo.position: "-0.789275;113.921327"`, `ICBM`, serta deklarasi bahasa `id-ID` dan `http-equiv="content-language"`).
  - Menyematkan kata kunci industri AI lengkap (`keywords`), hak cipta penerbit (`author: RSAIN`, `publisher: Sinyal AI News`), dan arahan robot pencari dengan *large image preview*.
  - Mengonfigurasi Web App Manifest di [`public/manifest.webmanifest`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/public/manifest.webmanifest) dan tag icon berdefinisi tinggi (`apple-touch-icon`) untuk pratinjau browser, mobile PWA, dan rich snippet.
  - Memperbarui title default menjadi format resmi: `Sinyal AI News — Berita Terkini Dunia AI (Akal Imitasi)`.
- **Koreksi Meta Twitter/X Card**: Memperbaiki spesifikasi tag Twitter di [`src/layouts/BaseLayout.astro`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/layouts/BaseLayout.astro) dari `property=` menjadi standar W3C/X yaitu `<meta name="twitter:...">`.
- **Standar Schema.org `NewsArticle` Lengkap**:
  - Menghasilkan aset logo publisher raster beresolusi tinggi di [`public/logo.png`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/public/logo.png) (512x512 PNG) menggantikan SVG untuk memenuhi kriteria Google Rich Snippets.
  - Menambahkan metadata terstruktur `image`, `dateModified`, `inLanguage`, `about`, dan `isBasedOn` pada halaman detail [`src/pages/berita/[date]/[slug].astro`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/pages/berita/%5Bdate%5D/%5Bslug%5D.astro).
  - Menambahkan field skema opsional `updatedAt` di schema content collection.

### 📰 Konten & Redaksi (Editorial)
- **Penghapusan Artikel Demo Dummy**: Membersihkan 7 file artikel mock awal yang sebelumnya hanya merujuk ke halaman landing umum.
- **Penerbitan 8 Berita Sinyal Industri Resmi**:
  1. **OpenAI**: [Panduan Praktis OpenAI untuk Arsitektur Model Keluarga GPT-6](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content/news/2026-10-02/openai-a-model-guide-for-the-gpt-6-family.md)
  2. **Anthropic**: [Anthropic Kucurkan $100 Juta untuk Claude Frontier Academy](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content/news/2026-10-02/anthropic-anthropic-invests-100-million-to-train-10-000-engineers-and-tackle.md)
  3. **Google DeepMind**: [Google DeepMind Kenalkan Gemini 4 Argon untuk Coding dan Pertahanan Siber](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content/news/2026-09-30/google-gemini-4-argon-our-next-era-of-frontier-intelligence.md)
  4. **Google DeepMind**: [DeepMind Rilis SynthID Bio: Metode Watermarking untuk Biologi Sintetis](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content/news/2026-09-30/google-introducing-synthid-bio.md)
  5. **Microsoft**: [Microsoft Rombak Copilot dengan Fitur Home, Code, dan Autopilot](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content/news/2026-09-25/microsoft-introducing-the-new-copilot-with-home-code-and-autopilot.md)
  6. **NVIDIA**: [NVIDIA Hadirkan DGX Spark 64GB untuk Komputasi Agen AI Lokal](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content/news/2026-10-02/nvidia-nvidia-dgx-spark-64gb-gives-developers-more-ways-to-build-and-scale.md)
  7. **xAI**: [xAI Integrasikan Model Grok ke Lingkungan Koding OpenCode](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content/news/2026-05-21/xai-use-grok-in-opencode.md)
  8. **Meta**: [Meta Rilis SAM Audio, Model Multimodal Pertama untuk Isolasi Suara](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/src/content/news/2026-10-04/meta-meta-rilis-sam-audio-model-multimodal-pertama-untuk-isolasi-suara.md)
- **Aktivasi Sumber Meta AI & xAI**: Mengaktifkan feed RSS berita Meta AI (`ai.meta.com`) dan xAI melalui mirror feed komunitas di [`scripts/sources.json`](file:///c:/Users/cber/hermes-agent-project-2026/sinyalai-news/scripts/sources.json). Kapasitas produksi harian kini mengikuti kuota Pemimpin Redaksi: **maksimal 6 berita per hari** (3 edisi pagi + 3 edisi malam).
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
