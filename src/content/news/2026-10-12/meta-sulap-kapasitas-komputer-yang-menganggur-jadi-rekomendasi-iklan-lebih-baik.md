---
title: "Meta Sulap Kapasitas Komputer yang Menganggur Jadi Rekomendasi Iklan Lebih Baik"
summary: "Meta (12/10) memaparkan sistem baru yang memanfaatkan kapasitas komputasi AI yang sedang tidak terpakai untuk menyaring lebih banyak kandidat iklan dan menjalankan model yang lebih canggih, sehingga rekomendasi iklan berpotensi lebih relevan bagi pengguna."
company: "Meta"
source: "https://engineering.fb.com/2026/10/12/ml-applications/turning-opportunistic-ai-inference-capacity-into-better-ads-recommendations/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-12T16:00:50.000Z
draft: false
sourceTitle: "Turning Opportunistic AI Inference Capacity Into Better Ads Recommendations"
categories: ["Standar Umum"]
---

Meta (12/10) memaparkan sistem rekayasa internal yang memanfaatkan kapasitas komputasi AI yang sedang menganggur di server-server mereka untuk meningkatkan kualitas rekomendasi iklan di platformnya. Ide dasarnya sederhana: alih-alih membiarkan sebagian GPU dan CPU diam karena ketidakseimbangan beban, kapasitas itu dialihkan sementara untuk pekerjaan tambahan pada tahap pemeringkatan iklan. Hasilnya, menurut Meta, iklan yang ditampilkan kepada pengguna diharapkan lebih relevan tanpa menambah pembelian perangkat keras baru.

Sistem ini bekerja lewat dua tuas elastisitas yang saling melengkapi. Tuas pertama, bernama Rank More Ads (RMA), menambah jumlah kandidat iklan yang dievaluasi oleh model pada setiap tahap pemeringkatan. Semakin banyak kandidat yang diperiksa, semakin besar peluang menemukan iklan yang sesuai dengan minat pengguna. Tuas kedua, Serve Better Models (SBM), meningkatkan porsi permintaan yang dilayani oleh model yang lebih besar dan lebih akurat ketika kapasitas tambahan tersedia. Keduanya beroperasi hanya saat ada kapasitas cadangan, sehingga layanan iklan inti tidak terganggu.

Meta menjelaskan tantangan utama sistem ini adalah sifat kapasitas cadangan yang tidak stabil. Kapasitas itu bisa muncul tiba-tiba di satu wilayah atau jenis akselerator tertentu, lalu ditarik kembali sewaktu-waktu ketika beban utama meningkat. Untuk mengatasinya, tim teknik Meta memisahkan secara fisik dan logis kapasitas cadangan dari kapasitas yang melayani lalu lintas dasar, lalu menambahkan mekanisme load shedding (pembuangan beban secara selektif) di sisi server dan klien agar sistem tetap stabil ketika kapasitas mendadak hilang. Dua umpan balik terpisah mengatur volume kandidat RMA dan cakupan model SBM, sehingga keduanya bisa membesar dan mengecil mengikuti ketersediaan kapasitas.

Secara umum, istilah akselerator merujuk pada chip khusus seperti GPU atau TPU yang dipakai untuk menjalankan model AI secara cepat. Pada layanan berskala besar seperti Meta, kapasitas akselerator tidak pernah terdistribusi secara merata: perbedaan waktu puncak, jadwal peluncuran model, dan variasi rasio antara akselerator dengan sumber daya pendukung seperti CPU sering meninggalkan sebagian perangkat keras yang tidak terpakai di satu lokasi meskipun secara keseluruhan kapasitas dianggap menipis. Fenomena ini yang kemudian coba dimanfaatkan oleh sistem baru Meta untuk pekerjaan bernilai tambah seperti pemeringkatan iklan.
