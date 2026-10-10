# Alur Redaksi Sinyal AI

Diagram alur redaksi dari jadwal otomatis sampai artikel tayang, lengkap dengan tabel aturan teknis dan status tinjauan. Setiap versi disimpan sebagai satu berkas HTML mandiri, sehingga perubahan aturan redaksi dari waktu ke waktu mudah dibandingkan.

## Versi

| Berkas | Menggambarkan kode pada | Tanggal | Catatan |
|---|---|---|---|
| [`v0.7.0.html`](v0.7.0.html) | rilis v0.7.0 | 2026-10-10 | Aturan penulisan baru (straight news, by line), validasi gaya otomatis, pembanding topik, fokus edisi pagi dan malam, penyetelan skor, jalur rilis. Mencakup 8 feed RSS. |
| [`v0.8.0.html`](v0.8.0.html) | rilis v0.8.0 | 2026-10-10 | Tambah tahap "Sumber dan pengambilan" (19 sumber: RSS/Atom, HTML, manual). Menggambarkan kode apa adanya, termasuk bagian yang belum tersambung: sumber HTML dan page tidak dipakai `generate-news.mjs`, dan tag kandidat rilis GitHub tidak disaring. |
| [`v0.8.1.html`](v0.8.1.html) | v0.8.0 + perbaikan (belum dirilis) | 2026-10-10 | Sumber HTML tersambung lewat `selectActiveSources`, sumber page dan `enabled: false` dilewati, tag kandidat GitHub dibuang, topik rilis GitHub = repo + versi. Dinamai v0.8.1 karena akan dirilis sebagai versi itu. |

Setiap berkas menggambarkan kode pada versi di kolom kedua, bukan pada versi repo saat ini. Bandingkan dengan `CHANGELOG.md` untuk perubahan setelahnya. Berkas lama adalah snapshot beku; pembuat di `generate.py` hanya menghasilkan v0.8.0 dan v0.8.1.

## Cara membuka

Buka berkas `.html` langsung di browser. Halaman memuat font dari Google Fonts jika ada internet, dan tetap terbaca tanpa itu.

## Cara memperbarui

1. Ubah isi di `generate.py`: diagram per tahap, baris `rules` (tabel aturan), butir `issues` (status tinjauan), dan teks pengantar.
2. Jalankan dengan nama berkas versi baru dan nomor versinya:
   ```
   python3 docs/alur-redaksi/generate.py docs/alur-redaksi/v0.8.1.html 0.8.1
   ```
   Argumen versi hanya mengatur perbedaan antara `0.8.0` (kode apa adanya) dan `0.8.1` (sesudah perbaikan). Untuk versi berikutnya, tambahkan cabang baru di `generate.py` atau buat perubahan langsung pada isinya.
3. Tambahkan satu baris di tabel **Versi** di atas.
4. Jangan menimpa berkas versi lama. Versi lama adalah riwayatnya.

Nilai di tabel aturan diambil dari kode (`scripts/`, `.github/workflows/`), bukan dari dokumen lain. Saat memperbarui, cocokkan dengan kodenya.
