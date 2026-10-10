---
title: "Hugging Face Sambut Tulisan Ai2 Soal Anggaran GPU untuk Klaster Penelitian"
summary: "Hugging Face (09/10) memuat tulisan tim Ai2 yang mengganti penjadwal GPU berbasis prioritas dengan sistem anggaran waktu GPU berjenjang. Perubahan ini ditujukan agar riset berdampak tinggi mendapat bagian sumber daya secara transparan, bukan lewat adu prioritas yang rentan dimanipulasi."
company: "Hugging Face"
source: "https://huggingface.co/blog/allenai/impactful-scheduling"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-09T15:20:29.000Z
draft: false
sourceTitle: "Impactful scheduling for GPU clusters"
categories: ["Standar Umum"]
---

Hugging Face (09/10) memuat tulisan dari tim Infrastruktur AI Ai2 yang memaparkan perubahan besar pada cara penjadwalan ribuan GPU di klaster penelitian mereka. Selama ini, permintaan terhadap GPU di Ai2 mencapai dua hingga tiga kali lipat dari kapasitas yang tersedia, sehingga setiap jam kerja GPU diperebutkan banyak proyek sekaligus.

Masalah muncul karena sistem lama berbasis prioritas rentan disiasati. Peneliti dilaporkan menjalankan pekerjaan kosong untuk menahan GPU agar bisa dipakai sewaktu-waktu, sementara prioritas tertinggi akhirnya dipakai hampir semua proyek sehingga jenjang prioritas kehilangan makna. Insinyur yang siaga juga menghabiskan sebagian besar waktu mereka bernegosiasi agar pekerjaan yang tidak bisa dihentikan paksa mau dimatikan ketika GPU perlu pemeliharaan.

Ai2 mengelola ribuan GPU NVIDIA H100, B200, dan B300 yang tersusun dalam klaster berukuran 88 hingga 1.024 GPU. Klaster ini melayani sekitar 150 peneliti internal di berbagai bidang, mulai dari pelatihan model bahasa dan model visual, simulasi robotika, hingga penyempurnaan model untuk kasus penggunaan ilmiah.

Sebagai pengganti, Ai2 membangun sistem baru dengan tiga komponen utama: anggaran waktu GPU, alokasi berjenjang berbasis pangsa yang adil, dan kontrak time-slicing. Alih-alih memberikan prioritas pada pekerjaan yang sudah berjalan, manajer penelitian menentukan terlebih dahulu berapa porsi waktu GPU yang menjadi "dana" bagi tiap proyek dan peneliti. Penjadwal kemudian memakai informasi itu untuk memutuskan pekerjaan mana yang dijalankan ketika GPU kosong.

Pendekatan ini mengubah debat internal dari urusan operasional harian menjadi proses penganggaran yang lebih transparan. Tim peneliti tidak lagi berlomba menaikkan prioritas, melainkan bersaing lewat proposal yang dinilai berdasarkan dampak riset yang dijanjikan.

Secara umum, alokasi sumber daya bersama yang melebihi kapasitas merupakan masalah klasik dalam ekonomi dan ilmu komputer, sering disebut sebagai "tragedy of the commons": pengguna yang bersaing untuk sumber daya terbatas cenderung memaksimalkan keuntungan pribadi sehingga hasil keseluruhan justru tidak optimal. Solusi yang diambil Ai2 mirip dengan privatisasi sebagian sumber daya, tetapi dalam bentuk jatah waktu, bukan kepemilikan fisik GPU, sehingga GPU tetap bisa terpakai penuh ketika pemilik jatah sedang tidak ada pekerjaan.

Rilis ini tidak membahas dampak langsung bagi pengguna di luar Ai2 atau ketersediaan layanan serupa untuk publik.
