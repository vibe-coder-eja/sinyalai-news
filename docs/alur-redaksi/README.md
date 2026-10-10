# Alur Redaksi Sinyal AI

Diagram alur redaksi dari jadwal otomatis sampai artikel tayang, lengkap dengan tabel aturan teknis dan status tinjauan. Setiap versi disimpan sebagai satu berkas HTML mandiri, sehingga perubahan aturan redaksi dari waktu ke waktu mudah dibandingkan.

## Versi

| Berkas | Menggambarkan kode pada | Tanggal | Catatan |
|---|---|---|---|
| [`v0.7.0.html`](v0.7.0.html) | rilis v0.7.0 | 2026-10-10 | Aturan penulisan baru (straight news, by line), validasi gaya otomatis, pembanding topik, fokus edisi pagi dan malam, penyetelan skor, jalur rilis. Mencakup 8 feed RSS. |

Setiap berkas menggambarkan kode pada versi di kolom kedua, bukan pada versi repo saat ini. Bandingkan dengan `CHANGELOG.md` untuk perubahan setelahnya. Perubahan pada pipeline berita yang belum tergambar di versi terbaru, misalnya sumber baru di v0.8.0 (parser HTML dan feed Atom GitHub), baru muncul di versi diagram berikutnya.

## Cara membuka

Buka berkas `.html` langsung di browser. Halaman memuat font dari Google Fonts jika ada internet, dan tetap terbaca tanpa itu.

## Cara memperbarui

1. Ubah isi di `generate.py`: diagram per tahap, baris `rules` (tabel aturan), butir `issues` (status tinjauan), dan teks pengantar.
2. Jalankan dengan nama berkas versi baru:
   ```
   python3 docs/alur-redaksi/generate.py docs/alur-redaksi/v0.8.0.html
   ```
3. Tambahkan satu baris di tabel **Versi** di atas.
4. Jangan menimpa berkas versi lama. Versi lama adalah riwayatnya.

Nilai di tabel aturan diambil dari kode (`scripts/`, `.github/workflows/`), bukan dari dokumen lain. Saat memperbarui, cocokkan dengan kodenya.
