---
title: "AWS: Epsilon Gunakan Amazon Nova Act untuk Pengujian Antarmuka"
summary: "AWS (29/10) menguraikan layanan pengujian antarmuka Epsilon yang dibangun dengan Amazon Nova Act dan Amazon Bedrock AgentCore Browser Tool. Tim menulis skenario dalam bahasa Inggris dan menjalankan pengujian melalui peramban terkelola untuk melengkapi regresi Playwright."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/building-intent-driven-ui-testing-with-amazon-nova-act/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-29T18:20:27.000Z
draft: false
sourceTitle: "Building intent-driven UI testing with Amazon Nova Act"
categories: ["Fitur & Skills"]
---

Berdasarkan tulisan resmi AWS (29/10), Epsilon, perusahaan data, teknologi, dan layanan pemasaran yang merupakan bagian Publicis Groupe, membangun layanan pengujian antarmuka berbasis niat dengan Amazon Nova Act dan Amazon Bedrock AgentCore Browser Tool. Tim produk menyusun skenario dalam bahasa Inggris, menjalankannya melalui peramban terkelola, lalu memperoleh hasil untuk setiap langkah. Solusi ini memperluas cakupan pengujian tanpa menuntut setiap tim menyiapkan infrastruktur peramban sendiri.

Epsilon sebelumnya mengandalkan Playwright untuk pengujian regresi, yaitu pemeriksaan otomatis atas fungsi aplikasi yang sudah dikenal. Metode tersebut tetap dipertahankan karena hasilnya dapat ditentukan secara pasti. Namun, skrip Playwright bergantung pada selektor CSS dan struktur halaman sehingga perubahan visual dapat membuat pengujian gagal meskipun fungsi utamanya masih bekerja. Dalam praktiknya, hal ini seperti tombol yang tetap dapat diklik tetapi warnanya berubah: pemeriksaan berbasis posisi elemen bisa salah menilai, sedangkan pemeriksaan berbasis tujuan dapat memverifikasi aksi yang sebenarnya dimaksud pengguna.

Alur pengujian baru dimulai ketika pengguna mengirim alamat halaman sasaran dan daftar langkah ke API atau antarmuka pemrograman platform. Sistem kemudian mendaftarkan alur tersebut sebagai definisi kerja Amazon Nova Act di AWS. Saat dijalankan, Celery, kerangka kerja Python untuk memproses pekerjaan secara asinkron, membuka sesi di Amazon Bedrock AgentCore Browser Tool. Amazon Nova Act menjalankan setiap instruksi melalui Chrome DevTools Protocol, termasuk kondisi tertentu seperti melewati kotak sped guide jika muncul. Sistem mengambil tangkapan layar setiap langkah, mencatat status lulus atau gagal, menghitung tingkat keberhasilan keseluruhan, lalu menyimpan hasil JSON, tangkapan layar di Amazon Simple Storage Service, dan ID sesi.

Browser Tool menyediakan sesi peramban sementara dan terisolasi, sehingga Epsilon tidak perlu mengelola berkas biner peramban, server tampilan, atau masa pakai sesi secara manual. Tool ini menyediakan tampilan langsung untuk pengamatan dan pengambilalihan oleh manusia, termasuk saatWV berhadapan dengan CAPTCHA atau autentikasi multifaktor. Rekaman sesi dapat dikirim ke Amazon S3, sementara AWS CloudTrail menyediakan jejak audit. Autentikasi Nova Act menggunakan rantai kredensial AWS standar dan peran tugas, tanpa distributor kunci API terpisah. Menurut AWS, integrasi dengan AWS Security Token Service AssumeRole juga memungkinkan setiap tim menjalankan pengujian di akun AWS miliknya sendiri dengan peran akses terbatas untuk menjaga isolasi dan keterlacakan.

Layanan ini dikelola oleh Tim Agentic Platform Epsilon yang beranggotakan 50 insinyur dan menyediakan infrastruktur bersama bagi tim produk. Secara umum, Amazon Nova Actacting sebagai model yang memahami instruksi testing lalu menerjemahkannya menjadi tindakan di peramban, sedangkan Browser Tool menyediakan lingkungan eksekusi yang terkelola. Pendekatan berbasis niat ini melengkapi pengujian regresi deterministik dengan pemeriksaan tujuan yang lebih mudah dibaca dan lebih tahan terhadap perubahan tampilan antarmuka.
