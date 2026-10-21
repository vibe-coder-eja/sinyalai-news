---
title: "Hugging Face dan IBM Research: Agen Layanan Pelanggan dengan \"Memelajaran\" Aturan Tembus Puncak τ²-bench"
summary: "Hugging Face (20/10) mempublikasikan ALTK-Evolve, pendekatan yang menambahkan aturan perilaku hasil pembelajaran ke dalam sistem prompt agen layanan pelanggan. Tanpa memperbarui bobot model, agen berbasis GPT-4.1 mencapai skor tertinggi pada benchmark τ²-bench untuk domain ritel."
company: "Hugging Face"
source: "https://huggingface.co/blog/ibm-research/altk-evolve-bc"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-20T15:19:48.000Z
draft: false
sourceTitle: "ALTK-Evolve: How learned memory tops the τ²-bench leaderboard on customer service tasks without a frontier model"
categories: ["Rilis Model","Penerapan Industri"]
---

Hugging Face (20/10) mempublikasikan tulisan tentang ALTK-Evolve, hasil kolaborasi dengan IBM Research yang menunjukkan bahwa agen layanan pelanggan tidak selalu membutuhkan model terbesar untuk tampil baik. Pendekatan ini menempelkan daftar aturan perilaku hasil "pembelajaran" ke dalam sistem prompt agen, dan hasilnya menempatkan agen berbasis GPT-4.1 di puncak papan peringkat τ²-bench untuk domain ritel.

τ²-bench adalah benchmark dari Sierra yang menguji kemampuan agen dalam percakapan layanan pelanggan dengan pelanggan tiruan berbasis model bahasa. Agen diberi dokumen kebijakan domain dan seperangkat alat, misalnya untuk melihat pesanan, memproses pengembalian, atau menjadwalkan ulang penerbangan. Suatu tugas dianggap selesai hanya bila keadaan basis data di akhir percakapan sesuai dengan yang diharapkan, sehingga metrik yang dipakai bersifat ketat: Pass^4, yaitu persentase tugas yang berhasil pada keempat percobaan independen.

Yang menarik dari ALTK-Evolve adalah cara aturan itu dihasilkan. Sistem menganalisis percobaan agen pada tugas-tugas latihan, lalu menggunakan GPT-4.1 sendiri untuk merangkum keberhasilan dan kegagalan menjadi aturan singkat, misalnya cara memverifikasi identitas pelanggan, mengonfirmasi transaksi, atau memproses pengembalian. Aturan-aturan itu kemudian ditambahkan ke prompt sistem untuk percakapan berikutnya. Tidak ada pembaruan bobot model, tidak ada anotasi manusia, dan model yang sama dipakai untuk mengekstraksi aturan sekaligus menjalankan agen.

Pada benchmark τ²-bench, penambahan aturan ini meningkatkan kemampuan sekaligus keandalan. Akurasi rata-rata naik 4,4 poin di domain ritel (78,1 menjadi 82,5) dan 7,5 poin di domain penerbangan (57,5 menjadi 65,0). Pada metrik Pass^4 yang lebih ketat, kenaikan mencapai 10 poin di kedua domain: ritel melonjak dari 57,5 menjadi 67,5, dan penerbangan dari 35,0 menjadi 45,0. Menurut Hugging Face, peningkatan ini datang dari keputusan yang lebih tepat, bukan dari percakapan yang lebih panjang.

Tulisan ini juga menyoroti bahwa jumlah aturan yang optimal berbeda antar domain. Untuk ritel, semakin banyak aturan cenderung semakin baik, sementara untuk penerbangan, aturan yang terlalu banyak justru bisa membingungkan agen. Penulis merekomendasikan konfigurasi "sup3", yaitu hanya mempertahankan aturan dengan dukungan minimal tiga tugas latihan, sebagai titik tengah yang aman.

Secara umum, istilah "learned memory" atau memori yang dipelajari merujuk pada kemampuan sistem untuk menyimpan dan memakai kembali pelajaran dari interaksi sebelumnya tanpa mengubah parameter model. Pendekatan ini menarik bagi tim yang ingin meningkatkan kinerja agen pada tugas spesifik, misalnya layanan pelanggan, tanpa harus melatih ulang model besar yang mahal. Risiko yang patut diperhatikan adalah aturan yang dihasilkan bisa mencerminkan bias dari data latihan, dan kualitasnya sangat bergantung pada kemampuan model yang dipakai untuk merangkumnya.
