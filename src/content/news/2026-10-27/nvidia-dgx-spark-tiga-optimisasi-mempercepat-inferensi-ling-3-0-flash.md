---
title: "NVIDIA DGX Spark: Tiga optimisasi mempercepat inferensi Ling-3.0-flash"
summary: "Pada DGX Spark, kernel MoE Humming, kuantisasi FP8, dan prediksi multi-token meningkatkan throughput inferensi Ling-3.0-flash 42,5% serta menurunkan latensi rata-rata 24,5% menurut pengujian NVIDIA."
company: "NVIDIA"
source: "https://developer.nvidia.com/blog/3-ways-to-boost-moe-inference-on-nvidia-dgx-spark/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-27T15:00:00.000Z
draft: false
sourceTitle: "3 Ways to Boost MoE Inference on NVIDIA DGX Spark"
categories: ["Produk Baru","Riset & Kebijakan"]
---

NVIDIA (27/10) menjelaskan tiga cara mempercepat inferensi Ling-3.0-flash dari Inclusion AI pada DGX Spark: mengganti kernel MoE dengan Humming, mengompres lapisan keluaran menggunakan FP8, dan employs prediksi multi-token melalui lapisan NEXTN. Menurut NVIDIA, kombinasi ketiga teknik tersebut meningkatkan throughput atau jumlah token yang dapat dihasilkan per detik sebesar 42,5% dan menurunkan latensi rata-rata 24,5% pada pengujian GSM8K, tanpa perubahan akurasi yang dapat dideteksi secara statistik.

NVIDIA Ohm Sung/profile? only Latin. No, just craft.

Profil awal menunjukkan bahwa proses penulisan jawaban terikat oleh bandwidth memori, atau kemampuan GPU membaca bobot model dari memori. Ling-3.0-flash memiliki 124 miliar parameter secara keseluruhan, tetapi hanya 5,1 miliar parameter aktif untuk setiap token. Arsitektur mixture-of-experts atau MoE mengarahkan setiap token ke delapan dari 512 expert khusus, ditambah satu expert yang dipakai bersama. Dua bagian terberat adalah perhitungan MoE dan LM head, lapisan keluaran yang menilai 157.184 kemungkinan token berikutnya.

Optimasi pertama mengganti backend FlashInfer MXFP4 dengan Humming, pustaka kernel atau kode khusus untuk perhitungan GPU. Humming menggunakan NVRTC dari CUDA Runtime untuk menyusun dan mengompilasi CUBIN saat aplikasi berjalan, kemudian menyimpan hasil kompilasi di cache sesuai ukuran model, tipe data, dan arsitektur GPU. Dalam pengujian dengan 32.000 token input dan 2.000 token output, Humming menurunkan waktu per token dari 27,71 milidetik menjadi 25,35 milidetik serta menaikkan throughput menjadi 39,45 token per detik, atau 9,3% di atas konfigurasi dasar.

Optimasi kedua mengubah bobot LM head dari BF16 menjadi FP8 secara daring ketika lapisan itu dibuat. Format FP8 membutuhkan data yang lebih sedikit untuk dibaca dibandingkan BF16, sehingga volume pembacaan bobot LM head berkurang setengahnya. DIGABUNGKAN dengan Humming, waktu per token turun menjadi 22,76 milidetik dan throughput mencapai 43,94 token per detik, atau 21,7% di atas konfigurasi dasar. Pengaturan ini diaktifkan melalui `SGLANG_ENABLE_FP8_LM_HEAD=1` dan tidak dapat digunakan bersama opsi `--enable-fp32-lm-head`.

Optimasi ketiga memakai prediksi multi-token dengan lapisan NEXTN yang sudah tersedia dalam Ling-3.0-flash. Model menyusun beberapa kandidat token berikutnya, lalu memverifikasinya bersama agar lebih banyak teks selesai dalam satu putaran. Pada beban kerja sintetis, rata-rata 3,90 token tambahan diterima per putaran dan throughput meningkat 185,1% di atas konfigurasi dasar. Angka tersebut merupakan hasil pengujian teknik ini secara terpisah; peningkatan 42,5% pada GSM8K terjadi ketika ketiga optimisasi digabungkan.

Penggunaan bersama tetap bergantung pada konfigurasi yang tepat karena NVIDIA membahas masalah integrasi yang dapat membuat kombinasi tersebut lebih lambat daripada kondisi awal. Kode dan panduan deployment tersedia dalam Ling cookbook serta notebook MXFP4. Ling-3.0-flash juga menyediakan jendela konteks native 256.000 token yang dapat diperluas hingga satu juta token. Jendela konteks adalah jumlah teks yang dapat diproses sekaligus, sehingga ruang tersebut mendukung instruksi panjang dan alur kerja agen AI. Penalaran dapat diaktifkan untuk tugas kompleks atau dinonaktifkan ketika respons cepat lebih diperlukan.
