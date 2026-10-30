---
title: "Microsoft Kembangkan Platform Evaluasi Copilot Berbasis Data Sintetis"
summary: "Microsoft (30/10) mengembangkan platform evaluasi yang menyimulasikan organisasi sintetis untuk menguji Microsoft Copilot tanpa memakai data pelanggan sensitif. Pendekatan ini menggabungkan generator kueri otomatis, pemeriksaan kualitas, dan tiga lingkungan uji lintas industri."
company: "Microsoft"
source: "https://www.microsoft.com/en-us/research/blog/from-synthetic-enterprise-data-evaluations-to-real-microsoft-copilot-ai-confidence/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-30T13:05:28.000Z
draft: false
sourceTitle: "From synthetic enterprise data evaluations to real Microsoft Copilot AI confidence"
categories: ["Produk Baru","Penerapan Industri","Riset & Kebijakan"]
---

Microsoft (30/10) menjelaskan pengembangan Industry Evaluation Data Generation Platform, sistem untuk mengevaluasi Microsoft Copilot pada skala perusahaan tanpa memakai data pelanggan yang memuat informasi sensitif. Platform ini membangun lingkungan kerja sintetis, menghasilkan kueri uji secara otomatis, dan memakai kerangka kualitas terstruktur untuk memeriksa apakah Copilot menjalankan tugas sesuai kebutuhan pengguna serta bersandar pada informasi yang tepat.

Microsoft memakai contoh penggunaan Copilot untuk merangkum rapat dan membuat daftar tindakan yang perlu diambil tim. Sistem evaluasinya dinilai dari apakah ringkasan tersebut akurat, lengkap, dan sesuai dengan isi transkrip. Dalam istilah Microsoft, setiap lingkungan simulasi disebut tenant, yaitu ruang organisasi terisolasi yang memiliki pengguna, data, dan konfigurasi sendiri. Di dalamnya terdapat struktur perusahaan, riwayat komunikasi, rapat, surel, serta dokumen yang menyerupai kondisi kerja nyata.

Agar skenario pengujian tidak terlalu berbeda dari organisasi sebenarnya, Microsoft membentuk data sintetis berdasarkan sumber publik. Basis data pekerjaan O*NET dari Departemen Tenagakerja Amerika Serikat dipakai untuk menyusun peran dan tanggung jawab karyawan, sedangkan lowongan kerja daring membantu membentuk jabatan, struktur pelaporan, dan komposisi departemen. Dokumen yang diajukan kepada Securities and Exchange Commission atau SEC juga menjadi dasar untuk skala perusahaan, unit bisnis, dan konteks keuangannya. Menurut Microsoft, seluruh sumber tersebut telah ditinjau oleh tim hukum dan kebijakan perusahaan.

Lingkungan sintetis tersebut juga berubah seiring waktu. Riwayat rapat, jadwal proyek, utas surel, dan perubahan organisasi berkembang dalam beberapa minggu sehingga Copilot dapat diuji dengan pertanyaan yang bergantung pada waktu, seperti keputusan yang diambil pada Kamis lalu atau perubahan sejak tinjauan kuartal terakhir. Microsoft membangun tiga lingkungan dengan karakter berbeda: farmasi yang mencakup pengajuan regulasi dan tinjauan uji klinis, pasar modal yang menyimulasikan transaksi dan kepatuhan, serta perusahaan teknologi informasi yang Dirty mencakup perencanaan sprint, tinjauan kode, dan koordinasi peluncuran produk.

Setiap lingkungan sepenuhnya sintetis. Menurut Microsoft, pemeriksaan keamanan konten otomatis dijalankan untuk menjaga agar data yang dihasilkan tidak memuat materi berbahaya atau informasi yang dapat mengidentifikasi seseorang. Microsoft menyebut keseluruhan sistem ini sebagai baseline evaluasi terstandar pertama untuk Microsoft Copilot.

Secara umum, lingkungan sintetik memungkinkan pengujian dilakukan berulang tanpaURSORSETENNA memakai data bisnis rahasia, sekaligus membantu tim menemukan kasus yang tidak Always terlihat dalam benchmark umum. Namun, hasil pengujian terkontrol tidak otomatis menjamin jawaban yang sama di setiap organisasi karena hak akses, konfigurasi, kualitas dokumen, dan konteks nyata dapat memengaruhi cara Copilot bekerja.
