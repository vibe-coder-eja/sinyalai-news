# Reset Konten Berita

Mengganti seluruh berita tayang dengan berita baru yang mengikuti aturan redaksi terbaru, tanpa menghapus berita lama.

## Alur

1. Merge PR yang memuat alat reset (workflow `reset-konten.yml`, `scripts/archive-all.mjs`, opsi `--ignore-archived` dan `--for-date`). Alat ini tidak mengubah isi situs.
2. Tab **Actions → Reset Konten Berita (RSAIN) → Run workflow**. Isi tanggal (bawaan `2026-10-09,2026-10-10,2026-10-11`), kuota (bawaan 3), dan nama branch.
3. Workflow bekerja di branch baru dari `main`: mengarsipkan semua berita lama (`archived: true`), menulis ulang edisi pagi untuk tiap tanggal, lalu menjalankan tes dan build. Bila tidak ada berita baru, workflow gagal dan tidak mendorong apa pun.
4. Tinjau branch hasilnya, buka PR ke `main`, dan merge sekali. Berita lama dan baru berganti dalam satu langkah, jadi situs tidak pernah kosong.

## Aturan per tanggal

- `--for-date=YYYY-MM-DD` hanya memilih rilis yang tanggal sumbernya jatuh pada hari UTC itu, sehingga artikel masuk ke folder tanggal yang diminta.
- Edisi `pagi` dipakai untuk penilaian skor dan gaya tulis. Kuota 3 per tanggal.
- `--ignore-archived` membuat arsip lama tidak ikut dedupe, jadi sumber yang sama boleh ditulis ulang. Antar-artikel baru, dedupe URL, topik, dan batas 2 berita per perusahaan tetap berlaku.
- Tanggal diproses berurutan, jadi hari berikutnya tidak mengulang sumber hari sebelumnya.

## Bila kuota tidak terpenuhi

Jendela satu hari lebih sempit dari jendela edisi biasa (2 hari). Bila ada tanggal yang kurang dari 3 berita, log run memuat peringatan "Kuota edisi belum terpenuhi". Jalankan ulang dengan kuota atau tanggal lain, atau tambah berita manual.

## Mengembalikan berita lama

Berkas lama masih ada di repo. Hapus baris `archived: true` pada artikel yang ingin ditayangkan lagi, atau revert merge-nya.
