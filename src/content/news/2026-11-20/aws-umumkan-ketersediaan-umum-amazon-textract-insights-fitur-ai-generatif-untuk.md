---
title: "AWS Umumkan Ketersediaan Umum Amazon Textract Insights, Fitur AI Generatif untuk Dokumen"
summary: "Amazon Textract Insights dari AWS kini tersedia umum. Fitur ini memungkinkan pengguna mengekstrak data dari dokumen campuran menggunakan deskripsi bahasa alami, dengan skor kepercayaan dan rujukan halaman untuk setiap nilai."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/announcing-amazon-textract-insights-verifiable-generative-ai-for-documents/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-20T20:22:00.000Z
draft: false
sourceTitle: "Announcing Amazon Textract Insights: Verifiable generative AI for documents"
categories: ["Fitur & Skills","Produk Baru"]
---

Berdasarkan rilis resmi AWS (20/11), Amazon Web Services mengumumkan ketersediaan umum Amazon Textract Insights, fitur berbasis AI generatif di dalam layanan Amazon Textract. Fitur baru ini memungkinkan organisasi mendeskripsikan field yang dibutuhkan dalam bahasa alami, lalu mengirimkan satu dokumen atau paket berisi banyak dokumen campuran untuk diproses. Hasilnya dikembalikan dalam bentuk terstruktur, lengkap dengan skor kepercayaan dan rujukan halaman untuk setiap nilai, tanpa perlu melatih model.

Amazon Textract adalah layanan AWS untuk mengekstrak teks dan data dari dokumen hasil pindaian atau formulir kertas. Dengan tambahan Insights, AWS ingin menjawab kebutuhan industri seperti layanan keuangan, asuransi, kesehatan, dan sektor publik yang menangani dokumen beragam, mulai dari formulir pajak, slip gaji, laporan bank, hingga catatan tulisan tangan. Selama ini, tim teknologi biasanya membangun pipeline khusus yang menggabungkan optical character recognition atau OCR, pemilah dokumen, dan model bahasa besar, atau menggunakan model bahasa besar secara umum yang hasilnya sulit dilacak ke halaman asalnya.

Lewat Amazon Textract Insights, pengguna cukup membuat blueprint berupa JSON Schema yang berisi deskripsi field dalam bahasa alami dan tipe inferensi, apakah nilainya dibaca langsung dari halaman atau ditarik dari keseluruhan isi dokumen. AWS menyediakan blueprint publik untuk dokumen umum seperti W-2, Form 1040, Form 1098, paspor, dan akta kelahiran. Pengguna juga bisa membuat blueprint sendiri untuk dokumen spesifik bisnis mereka. Untuk paket dokumen campuran, beberapa blueprint dapat digabung dalam satu proyek, lalu satu file berisi hingga 3.000 halaman diunggah dari Amazon Simple Storage Service (S3). Sistem akan memecah paket menjadi sub-dokumen, mencocokkannya dengan blueprint yang sesuai, lalu mengekstrak field yang diminta.

Setiap nilai yang dikembalikan memiliki skor kepercayaan dan informasi halaman serta koordinat tempat nilai itu diambil. Pendekatan ini memungkinkan auditor atau peninjau memverifikasi hasil terhadap dokumen asli, sehingga otomatisasi bisa diperluas ke dokumen yang sebelumnya harus diperiksa manual. AWS juga memperbarui mesin pembaca Amazon Textract Core dengan peningkatan akurasi, penanganan tabel padat dan tulisan tangan yang lebih baik, serta perluasan dukungan bahasa menjadi 40 bahasa untuk API DetectDocumentText dan AnalyzeDocument. API Amazon Textract yang sudah ada tidak berubah.

Secara umum, blueprint dalam konteks ini merujuk pada cetak biru atau templat yang mendefinisikan data apa yang ingin diambil dari sebuah dokumen, mirip dengan formulir isian yang kolom-kolomnya sudah ditentukan di awal. Sementara page-level grounding adalah kemampuan sistem menunjukkan dari halaman dan posisi mana sebuah nilai diambil, sehingga pengguna bisa menelusuri kembali ke sumber aslinya saat memeriksa hasil.
