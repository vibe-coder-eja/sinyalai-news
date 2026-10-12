---
title: "NVIDIA Buka Arsitektur Vera Rubin di OCP Summit untuk Percepat Pembangunan Pabrik AI"
summary: "NVIDIA merilis desain rak dan modul komputasi Vera Rubin ke komunitas Open Compute Project agar pabrik AI bisa dibangun dengan standar terbuka. Perusahaan juga menambahkan komponen perangkat lunak sumber terbuka untuk platform DSX AI Factory."
company: "NVIDIA"
source: "https://blogs.nvidia.com/blog/ocp-global-summit-vera-rubin-scale-ai-factories/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-12T15:00:25.000Z
draft: false
sourceTitle: "OCP Global Summit: Amid Ecosystem Adoption, NVIDIA Opens Vera Rubin Architecture to Help Scale AI Factories Worldwide"
categories: ["Kerjasama Industri"]
---

Di tengah pesatnya pertumbuhan infrastruktur AI berskala raksasa, NVIDIA (12/10) mengumumkan kontribusi desain arsitektur Vera Rubin ke komunitas Open Compute Project (OCP) lewat acara OCP Global Summit di San Jose. Langkah ini dimaksudkan agar berbagai pihak—mulai dari pembuat server hingga operator pusat data—punya acuan bersama saat membangun "pabrik AI" generasi berikutnya.

Pabrik AI sendiri adalah istilah yang merujuk pada fasilitas berisi ribuan chip pemroses grafis (GPU) yang bekerja serentak untuk melatih dan menjalankan model kecerdasan buatan. Kalau diibaratkan, pabrik ini seperti gardu listrik digital: butuh rak-rak komputer, pendingin, jaringan, dan pasokan daya yang semuanya harus saling cocok. Karena itulah NVIDIA mendorong agar desain-desain kuncinya, termasuk spesifikasi rak Vera Rubin dan rak CPU Vera, dibuka ke publik lewat arsitektur MGX. Dengan cara ini, tiap vendor bisa membuat komponen yang tetap bisa dipasang di sistem NVIDIA tanpa perlu merancang ulang dari nol.

Salah satu sorotan utama adalah pembaruan spesifikasi MGX 1.2, yang kini mendukung pendingin cair hingga 5.000 ampere dan menampung rak berkapasitas 250 kilowatt. Angka ini menggambarkan seberapa besar daya yang dibutuhkan satu rak AI modern—cukup untuk menyalakan rumah tangga dalam jumlah banyak sekaligus. Selain itu, MGX 1.2 memperkenalkan komputasi tanpa kipas, desain modular, dan dukungan rak standar 19 inci, sehingga perakitan, perawatan, dan penggantian komponen bisa dilakukan lebih cepat.

Bersama perusahaan-perusahaan teknologi besar, NVIDIA juga mempublikasikan standar terbuka untuk desain pabrik AI dan ketahanan jaringan listrik, serta memperkenalkan komponen jaringan baru bersama Meta, Cisco, dan Google. Di sisi perangkat lunak, NVIDIA menambahkan empat komponen sumber terbuka pada platform DSX AI Factory: Config Manager untuk mengatur konfigurasi switch secara otomatis, Cluster Readiness Engine yang menguji kesehatan GPU sebelum pelatihan berjalan, Rack Management Service untuk memperlakukan rak sebagai satu unit yang bisa dikelola, dan Cluster API Provider yang mempercepat penyiapan perangkat keras menjadi klaster siap pakai.

Secara umum, istilah open source atau sumber terbuka berarti kode atau desain perangkat bisa dipakai, dipelajari, dan dikembangkan oleh siapa pun. Bagi penyedia layanan awan (cloud) dan integrator sistem, kontribusi NVIDIA ini memungkinkan mereka membangun dan mengoperasikan infrastruktur AI tanpa harus selalu menunggu pembaruan tertutup dari satu vendor. Bagi pengguna akhir, dampaknya tidak langsung terasa, tetapi fondasi yang lebih terbuka berpotensi menekan biaya dan mempercepat ketersediaan layanan AI di kemudian hari.
