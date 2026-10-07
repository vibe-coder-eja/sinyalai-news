# Rencana Perbaikan — Sinyal AI News

> Disusun: 2026-10-07 · Berdasarkan review kode dan hasil build lokal (situs live tidak dapat diakses dari lingkungan review).
> Status: **usulan, belum dieksekusi**. Tidak ada file kode yang diubah.

## Ringkasan

Fondasi teknis sehat (95 test lulus, build 40 halaman berhasil). Masalah utama ada di **pipeline konten otomatis**: berita lama tayang sebagai berita baru, dan konten terbit tanpa review manusia. Perbaikan diurutkan berdasarkan dampak terhadap kredibilitas.

| Fase | Fokus | Prioritas | Estimasi |
|:--|:--|:--|:--|
| 1 | Bug kurasi tanggal | Kritis | ±2 jam |
| 2 | Urutan workflow CI/deploy | Tinggi | ±1 jam |
| 3 | Pembersihan konten tayang | Tinggi | ±2 jam (butuh keputusan redaksi) |
| 4 | Keandalan konten otomatis | Menengah | ±0,5–1 hari |
| 5 | Perbaikan teknis kecil (PWA, SEO, README) | Rendah | ±2 jam |
| 6 | Kebersihan repo dan aset | Rendah | ±1–2 jam |

---

## Fase 1 — Perbaiki bug kurasi tanggal (Kritis)

**Masalah.** `parseFeed` (`scripts/lib/rss.mjs`) mengembalikan field `publishedAt`, tetapi `scripts/lib/editor.mjs` (baris 52–53, 128) dan `scripts/generate-news.mjs` (baris 135) membaca `item.date` yang selalu `undefined`. Akibatnya `isToday()` selalu false, semua kandidat masuk "backlog", dan rilis lama ikut tayang. Selain itu `publishedAt` artikel diisi waktu generate (`editionBatchTimestamp`), bukan tanggal sumber.

**Langkah.**
1. Ganti `item.date` menjadi `item.publishedAt` di `editor.mjs` dan `generate-news.mjs`.
2. Tambah batas usia kandidat (usulan: maksimal 7 hari, konfigurabel lewat `--max-age-days`). Item tanpa tanggal tidak boleh tayang otomatis.
3. Simpan tanggal sumber asli. Opsi: field opsional baru `sourcePublishedAt` di schema `src/content.config.ts` dan tampilkan di halaman artikel; `publishedAt` tetap waktu tayang di Sinyal AI News.
4. Tambah unit test di `scripts/lib/__tests__/` untuk `selectEditorialEdition`: item hari ini diprioritaskan, item di atas batas usia ditolak, item tanpa tanggal ditolak.

**Kriteria selesai.** Test baru lulus; `npm run generate:news -- --dry-run` tidak lagi memilih item berusia lebih dari batas.

## Fase 2 — Urutan workflow (Tinggi)

**Masalah.** `.github/workflows/auto-news.yml` melakukan commit dan push ke `main` sebelum test dan build. Artikel yang merusak build akan sudah masuk repo dan memblokir deploy berikutnya. Selain itu `deploy.yml` dan `auto-news.yml` sama-sama men-deploy ke grup `pages`.

**Langkah.**
1. Pindahkan langkah `npm run test` dan `npm run build` sebelum langkah commit/push.
2. Commit dan push hanya jika test dan build lulus.
3. Evaluasi apakah `deploy.yml` dan deploy di `auto-news.yml` bisa disatukan (satu jalur deploy).

**Kriteria selesai.** Dengan artikel sengaja rusak di mode `workflow_dispatch` + dry run, tidak ada commit yang terdorong.

## Fase 3 — Pembersihan konten yang sudah tayang (Tinggi, perlu keputusan redaksi)

**Masalah.** Beberapa artikel adalah rilis lama dengan tanggal tayang baru, misalnya:
- `2026-10-04/anthropic-…-claude-3-5-sonnet-…` (Claude 3.5 Sonnet / Computer Use)
- `2026-10-07/meta-…-llama-4-scout-…`
- `2026-10-06/xai-…-grok-1-5-…`
- `2026-10-07/openai-…-gpt-5-4-cyber-…`

Sekitar 10 artikel awal juga masih berjudul Inggris (mis. "Use Grok in OpenClaw", "Barclays scales Claude…", "Chatham scales…").

**Keputusan yang dibutuhkan dari Mas Reza.** Untuk setiap artikel di atas, pilih: (a) tarik (`draft: true`), (b) koreksi tanggal sesuai sumber, atau (c) biarkan dengan catatan. Untuk artikel berbahasa Inggris: tulis ulang ke Bahasa Indonesia atau tarik.

**Langkah.**
1. Verifikasi tanggal asli tiap artikel di URL `source`.
2. Terapkan keputusan di atas lewat perubahan front matter.
3. Catat di `CHANGELOG.md`.

## Fase 4 — Keandalan konten otomatis (Menengah)

**Masalah.** Artikel terbit langsung `draft: false`. LLM hanya menerima judul dan cuplikan maksimal 400 karakter, tetapi diminta menulis detail teknis (risiko halusinasi). Tiga feed (Anthropic, xAI, Meta) adalah mirror komunitas bertanda `trusted: false`, namun tetap terbit otomatis.

**Langkah (urut dari paling murah).**
1. Item dari sumber `trusted: false` ditulis sebagai `draft: true` dan menunggu review manual.
2. Ambil teks halaman sumber (dengan batas ukuran dan timeout seperti `fetchFeed`) sebagai konteks tambahan untuk LLM, agar tidak hanya bertumpu pada judul.
3. Validasi keluaran LLM sebelum menulis file: tolak jika ada aksara non-Latin (CJK), panjang `summary` di luar 100–220 karakter, atau tanpa nama perusahaan di `title`. Tambahkan test.
4. Opsional: kirim ringkasan hasil tiap edisi (daftar artikel yang terbit) agar mudah ditinjau pasca-tayang.

## Fase 5 — Perbaikan teknis kecil (Rendah)

1. `public/manifest.webmanifest`: ganti `start_url` dan path ikon dari `/sinyalai-news/...` menjadi `/...` (domain sudah `sinyalai.xyz`).
2. `README.md`: ganti referensi `sinyalai.vercel.app` ke `https://sinyalai.xyz` dan sebutkan deploy via GitHub Pages.
3. JSON-LD di `src/pages/berita/[date]/[slug].astro`: `publisher.name` jadi "Sinyal AI News"; `author` bertipe `Organization`.
4. Pertimbangkan gambar OG per artikel (saat ini semua memakai `og-default.png`).
5. Pertimbangkan self-host font atau `font-display: swap` yang sudah ada plus preload, untuk mengurangi blocking dari Google Fonts.

## Fase 6 — Kebersihan repo dan aset (Rendah)

1. Hapus duplikat `src/logo/sinyal-ai-news-logo-1 (n).*` (±6 MB) setelah memastikan tidak ada yang merujuknya.
2. Pindahkan `audit_report.md`, `walkthrough_audit.md`, `implementation_plan.md` ke `docs/`.
3. Tinjau apakah `.agents/skills` perlu ada di repo produksi.

---

## Verifikasi per fase

Jalankan sebelum tiap push:

```bash
npm test
npm run build
npm run generate:news -- --dry-run   # setelah Fase 1 dan 4 (butuh OPENROUTER_API_KEY)
```

## Urutan eksekusi yang disarankan

Fase 1 → 2 → 3 → 4 → 5 → 6. Fase 1 dan 2 dapat dikerjakan dalam satu branch dan satu PR; Fase 3 menunggu keputusan redaksi; Fase 5–6 dapat digabung.

## Pertanyaan terbuka

- Batas usia berita yang layak tayang: 7 hari cukup, atau lebih ketat (mis. 3 hari)?
- Apakah sumber `trusted: false` boleh tetap tayang otomatis, atau wajib review?
- Apakah `publishedAt` sebaiknya mengikuti tanggal sumber, atau tetap waktu tayang dengan `sourcePublishedAt` terpisah?

---

## Status eksekusi (diperbarui 2026-10-07)

- **Fase 1** selesai: bug `item.date`, batas usia 7 hari, tanggal tayang mengikuti tanggal sumber.
- **Fase 2** selesai: test dan build berjalan sebelum commit/push di `auto-news.yml`.
- **Fase 3** selesai sebagian: 11 artikel bertanggal palsu ditarik (lihat `CHANGELOG.md`). Artikel OpenAI, Google, dan NVIDIA yang tayang 4–7 Okt 2026 masih bertanggal stempel generate dan **belum terverifikasi** terhadap tanggal sumbernya.
- **Fase 4**: item "sumber `trusted: false` jadi draft" dicoret, karena tujuan adalah tayang otomatis untuk semua sumber. Pengaman yang tersisa: validasi keluaran LLM dan konteks halaman sumber.
