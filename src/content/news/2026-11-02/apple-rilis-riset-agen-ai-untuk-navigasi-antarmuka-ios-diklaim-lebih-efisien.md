---
title: "Apple Rilis Riset Agen AI untuk Navigasi Antarmuka iOS, Diklaim Lebih Efisien dari Model Besar"
summary: "Berdasarkan publikasi riset Apple (02/11), agen AI kecil dilatih dengan reinforcement learning online untuk menavigasi aplikasi iOS secara langsung. Pendekatan ini memisahkan peran perencana dan eksekutor, serta diklaim mengungguli model besar seperti Gemini pada uji tertentu."
company: "Apple"
source: "https://machinelearning.apple.com/research/planning-grounding-ui-navigation"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-02T00:00:00.000Z
draft: false
sourceTitle: "Online Dense Reinforcement Learning with Planning-Grounding Agent for UI Navigation on Live iOS Apps"
categories: ["Rilis Model","Fitur & Skills"]
---

Berdasarkan publikasi di Machine Learning Research Apple (02/11), tim riset Apple memperkenalkan kerangka kerja reinforcement learning (RL) online untuk melatih agen navigasi antarmuka pengguna (UI) yang beroperasi langsung di aplikasi iOS sungguhan. Riset ini berangkat dari dua keterbatasan yang mereka identifikasi: model bahasa-penglihatan (VLM) berukuran besar memang mumpuni menavigasi UI, tetapi biaya inferensinya terlalu tinggi untuk pemakaian rutin; sementara model kecil yang dilatih dengan supervised fine-tuning (SFT) cenderung menghafal urutan langkah dan mudah gagal saat menemui situasi yang sedikit berbeda.

Untuk menjawab itu, Apple membagi agen menjadi dua komponen khusus. Komponen pertama adalah Planning agent yang bertugas merancang langkah-langkah umum untuk menyelesaikan tugas, misalnya "buka aplikasi, cari menu tertentu, lalu tekan tombol". Komponen kedua adalah UI Grounding model yang menerjemahkan rencana itu menjadi tindakan nyata di layar, seperti menentukan koordinat tombol yang harus ditekan. Pemisahan peran ini membuat model kecil tetap ringan karena tidak perlu menebak seluruh strategi sekaligus dengan detail piksel.

Selama pelatihan, agen tidak hanya diberi tahu berhasil atau tidak di akhir tugas. Apple menambahkan sinyal reward bertahap dari sebuah LLM-as-a-Judge yang menilai setiap langkah, sehingga agen tahu apakah ia sudah makin dekat ke tujuan atau justru melenceng. Optimasi dilakukan dengan algoritma PPO yang sudah umum di RL, ditambah teknik baru bernama GiGPPO untuk menstabilkan proses belajar dengan memanfaatkan kondisi-kondisi visual serupa dari pelatihan paralel. Untuk menopang pelatihan online berskala besar, Apple membangun infrastruktur yang mengorkestrasi ratusan perangkat iOS virtual secara bersamaan.

Pada benchmark UINavBench, iOSWorld, dan AndroidWorld, agen RL online Apple disebut mengungguli baseline SFT dan RL dengan reward terminal saja, sekaligus mempercepat konvergensi pelatihan. Versi 8B parameternya diklaim mencapai peningkatan hampir tujuh kali lipat atas baseline SFT dalam generalisasi ke lingkungan Android yang belum pernah dilihat, serta mengalahkan Gemini-3.5-Flash dan menyamai Gemini-3.1-Pro pada aplikasi iOS nyata.

Secara umum, reinforcement learning adalah metode melatih agen lewat coba-coba yang diberi umpan balik positif atau negatif, mirip cara seseorang belajar dari keberhasilan dan kesalahan. Dalam konteks UI, pendekatan ini menarik karena melatih agen langsung di aplikasi hidup, bukan di simulasi statis, sehingga lebih siap menghadapi variasi tampilan dan perilaku aplikasi di dunia nyata. Riset semacam ini menjadi bagian dari upaya perusahaan-perusahaan teknologi membangun asisten yang bisa mengoperasikan ponsel atas nama pengguna, misalnya untuk mengisi formulir atau menavigasi menu yang berulang.
