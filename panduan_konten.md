# 📖 Panduan Prosedur Pengelolaan Konten — Sinyal AI

Dokumen ini berisi panduan teknis langkah demi langkah untuk mengelola konten berita, mengonfigurasi pipeline otomatisasi berbasis AI, dan menambahkan sumber berita baru pada platform SinyalAI.

---

## 1. Menambah Artikel Berita

### A. Prosedur Manual (Manual Editorial)
Gunakan metode ini jika Anda ingin menulis berita kustom secara langsung tanpa melalui pipeline otomatis.

1. **Buat File Markdown Baru**:
   Buat file baru dengan ekstensi `.md` di dalam folder:
   `src/content/news/`  
   *(Nama file akan otomatis menjadi URL slug berita Anda, misalnya `openai-gpt-5.md` akan diakses di `/berita/openai-gpt-5`)*.

2. **Isi Struktur Frontmatter & Konten**:
   Tulis metadata berita di bagian paling atas file (diapit oleh penanda `---`) dan ikuti dengan konten Markdown Anda:
   ```markdown
   ---
   title: "Judul Berita Resmi"
   summary: "Ringkasan 1-2 kalimat untuk tampilan halaman utama."
   company: "Nama Perusahaan (misal: OpenAI)"
   source: "https://openai.com/blog/news-link"
   publishedAt: 2026-07-15
   draft: false
   ---

   ## Ringkasan Pembaruan
   Tulis poin-poin berita atau artikel lengkap di sini menggunakan standar format Markdown...
   ```
   > [!IMPORTANT]
   > - Tautan pada field `source` **wajib menggunakan protokol HTTPS** (skema HTTP akan ditolak oleh sistem validasi).
   > - Setel nilai `draft: false` untuk langsung mempublikasikan artikel. Artikel dengan `draft: true` tidak akan dibangun saat proses build static web.

3. **Kompilasi Ulang Website**:
   Lakukan build static web untuk memperbarui konten publik:
   ```bash
   npm run build
   ```

---

### B. Prosedur Otomatis / AI (Automated & AI Workflow)
Sistem memiliki pipeline otomatisasi draf bawaan yang dapat digabungkan dengan kecerdasan buatan.

#### Alur Kerja Pipeline Saat Ini:
1. **Jalankan Script Pengambil Umpan (Fetcher)**:
   Jalankan script untuk mengunduh rilis RSS terbaru:
   ```bash
   npm run fetch:signals
   ```
   *Script akan menyaring data duplikat, memeriksa validitas HTTPS, merapikan ringkasan berdasarkan batas kata terdekat, dan menulis draf baru dengan status `draft: true`.*
2. **Review & Terbitkan**:
   Buka file draf baru yang dihasilkan di folder `src/content/news/`, review rangkumannya, lalu ubah status `draft: true` menjadi `draft: false`.

#### Alur Kerja Otomatisasi AI Penuh (Roadmap):
Untuk memprogram AI agar meringkas dan menerbitkan berita secara otonom:
1. **Integrasikan LLM API**:
   Hubungkan script parser ke penyedia API LLM (seperti Gemini API atau Grok API) dengan mengirimkan konten asli dari RSS.
2. **Prompt Terstruktur**:
   Instruksikan LLM untuk mengonversi tulisan ke bahasa Indonesia dengan struktur:
   - **Highlights**: Inti berita.
   - **Yang Baru**: Poin pembaruan teknis.
   - **Dampak**: Dampak langsung bagi developer Indonesia.
3. **Pemasangan Scheduler**:
   Gunakan GitHub Actions (Cron) untuk menjalankan pipeline secara berkala:
   ```yaml
   # .github/workflows/fetch.yml
   on:
     schedule:
       - cron: '0 */6 * * *' # Jalan otomatis setiap 6 jam
   ```

---

## 2. Menambahkan Sumber Berita Baru

Untuk mendaftarkan blog resmi atau RSS feed baru dari pelaku industri AI ke dalam sistem pelacakan otomatis:

1. **Buka Konfigurasi Sumber**:
   Buka file konfigurasi sumber di:
   `scripts/sources.json`

2. **Daftarkan Objek Sumber**:
   Tambahkan blok konfigurasi baru di dalam array `sources`. Contoh konfigurasi:
   ```json
   {
     "id": "anthropic",
     "company": "Anthropic",
     "type": "rss",
     "url": "https://www.anthropic.com/index.xml",
     "home": "https://www.anthropic.com/news",
     "enabled": true,
     "trusted": true,
     "notes": "Umpan RSS resmi dari News Anthropic"
   }
   ```

   > [!WARNING]
   > - Pastikan `"type"` bernilai `"rss"`. Jika bernilai `"page"`, sistem hanya akan menganggapnya sebagai catatan bookmark manual dan tidak akan di-fetch otomatis.
   > - Tautan pada `"url"` **harus diawali dengan `https://`** untuk mematuhi keamanan jaringan.
   > - Tentukan `"trusted"` dengan `true` jika itu feed resmi langsung, atau `false` jika menggunakan repositori mirror komunitas/pihak ketiga.

3. **Uji Coba Validasi**:
   Verifikasi apakah konfigurasi baru berhasil ditangkap dengan mode simulasi (*dry-run*) menggunakan CLI flag khusus:
   ```bash
   node scripts/fetch-signals.mjs --source nama-id-unik --dry-run
   ```
   *Jika output menampilkan list item berita tanpa adanya error, konfigurasi baru telah siap digunakan secara reguler.*
