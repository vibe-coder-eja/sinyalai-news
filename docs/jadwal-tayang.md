# Jadwal Tayang Tepat Waktu

Target: **Edisi Pagi 10:35 WIB** dan **Edisi Malam 22:05 WIB**.

## Masalahnya

Cron bawaan GitHub Actions (`on: schedule`) tidak menjamin ketepatan. Pada 6–10 Oktober 2026 run edisi pagi terlambat 6,5–7,3 jam dan run edisi malam terlambat 4–5,5 jam. Semua run sukses; hanya terlambat.

## Solusinya

| Lapisan | Peran |
| --- | --- |
| Pemicu eksternal (cron-job.org) | **Utama.** Memanggil `workflow_dispatch` tepat waktu dengan nama edisi eksplisit. |
| Cron GitHub di `auto-news.yml` | **Cadangan.** Dilewati bila edisi yang sama sudah tayang dalam 10 jam terakhir. |

Penjaga cadangan membaca penanda `edition=<nama>` di pesan commit `chore(news): automated edition broadcast`. Bila pemicu eksternal gagal atau tidak menghasilkan artikel, cron GitHub yang molor tetap menayangkan edisi itu.

Run `workflow_dispatch` (pemicu eksternal atau manual dari tab Actions) selalu jalan dan tidak melewati penjaga.

## Aturan isi per edisi

| | Pagi | Malam |
| --- | --- | --- |
| Batas usia rilis | 2 hari | 2 hari |
| Urutan | Semua rilis 1–2 hari terakhir bersaing sejajar berdasarkan skor | Rilis hari ini didahulukan, sisanya diisi dari backlog 2 hari |

Tanggal artikel tetap mengikuti tanggal rilis sumber. Edisi pagi 11 Oktober bisa berisi artikel bertanggal 10 atau 9 Oktober. `--max-age-days=N` pada skrip masih bisa menimpa batas ini.

Bila run tidak diberi nama edisi (`edition: auto`), edisi ditebak dari jam WIB saat run dimulai: pagi 04:00–18:59, malam 19:00–03:59. Rentang dibuat longgar karena run terjadwal bisa molor.

## Memasang pemicu eksternal (sekali saja)

### 1. Buat token GitHub

1. GitHub → Settings → Developer settings → **Fine-grained personal access tokens** → Generate new token.
2. **Repository access**: *Only select repositories* → `vibe-coder-eja/sinyalai-news`.
3. **Permissions → Repository permissions → Actions: Read and write**. Izin lain tidak perlu.
4. Pilih masa berlaku (maks. 1 tahun) dan catat tanggal kedaluwarsanya. Salin tokennya.

### 2. Buat dua cron job di cron-job.org

Akun gratis cukup. Atur **Time zone: Asia/Jakarta** pada tiap job.

| Job | Jadwal | Body |
| --- | --- | --- |
| Sinyal AI Pagi | setiap hari 10:35 | `{"ref":"main","inputs":{"edition":"pagi"}}` |
| Sinyal AI Malam | setiap hari 22:05 | `{"ref":"main","inputs":{"edition":"malam"}}` |

Pengaturan yang sama untuk keduanya:

- **URL**: `https://api.github.com/repos/vibe-coder-eja/sinyalai-news/actions/workflows/auto-news.yml/dispatches`
- **Request method**: `POST`
- **Headers**:
  - `Authorization: Bearer <TOKEN>`
  - `Accept: application/vnd.github+json`
  - `X-GitHub-Api-Version: 2022-11-28`
  - `Content-Type: application/json`
- Respons sukses adalah **HTTP 204** tanpa isi. Aktifkan notifikasi gagal-eksekusi di cron-job.org.

### 3. Uji

Klik *Test run* pada job. Run baru bernama "Automated News Pipeline (RSAIN)" akan muncul di tab Actions dengan event `workflow_dispatch`. Untuk uji tanpa menayangkan, tambahkan `"dryRun":"true"` di `inputs`.

## Perawatan

- Token kedaluwarsa → pemicu eksternal gagal (HTTP 401) dan hanya cron cadangan yang berjalan, jadi tayang tetap terjadi tetapi terlambat. Perbarui token sebelum tanggal kedaluwarsa.
- Peringatan **"Kuota edisi belum terpenuhi"** muncul di ringkasan run Actions bila artikel yang tayang kurang dari kuota.

## Kuota tidak terpenuhi

Bila rilis dalam batas usia edisi (2 hari) kurang dari kuota, pipeline mengulang seleksi dengan batas cadangan 7 hari. Jika kuota masih belum terpenuhi, langkah akhir workflow membuka issue "Kuota edisi belum terpenuhi: <edisi>, <tanggal>" (satu per edisi per hari) dan membuat run gagal bila 0 berita tayang, sehingga GitHub mengirim notifikasi. Situs tetap di-deploy sebelum run ditandai gagal.
