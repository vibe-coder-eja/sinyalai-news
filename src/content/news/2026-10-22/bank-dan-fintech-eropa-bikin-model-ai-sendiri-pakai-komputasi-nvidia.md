---
title: "Bank dan Fintech Eropa Bikin Model AI Sendiri Pakai Komputasi NVIDIA"
summary: "NVIDIA (22/10) mengumumkan di GTC Berlin bahwa sejumlah bank dan perusahaan keuangan Eropa membangun model AI milik sendiri di atas infrastruktur mereka, menggunakan model berbobot terbuka dan akselerator NVIDIA untuk deteksi fraud, riset, dan layanan pelanggan."
company: "NVIDIA"
source: "https://blogs.nvidia.com/blog/european-financial-services-organizations-open-models-proprietary-intelligence/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-22T05:00:56.000Z
draft: false
sourceTitle: "Leading European Financial Services Organizations Embrace Open Models to Build Proprietary Intelligence"
categories: ["Rilis Model","Penerapan Industri"]
---

Pada konferensi GTC Berlin, NVIDIA (22/10) memaparkan bagaimana lembaga keuangan Eropa — mulai dari bank tradisional, neobank, hingga perusahaan pembayaran — mulai membangun kecerdasan buatan versi mereka sendiri. Pendekatan ini mengandalkan model berbobot terbuka (open weight models) yang dijalankan di infrastruktur milik perusahaan, dengan akselerator NVIDIA sebagai mesin penggeraknya. Tujuannya agar data sensitif tetap berada di dalam dinding perusahaan dan biaya bisa lebih terkendali.

Revolut menjadi salah satu contoh paling menonjol. Perusahaan fintech asal Inggris itu membangun PRAGMA, sebuah model fondasi tunggal yang menopang seluruh tumpukan teknologi mereka. Model ini dilatih dan dijalankan memakai toolkit NVIDIA cuDF serta perangkat lunak Dynamo-Triton di atas GPU NVIDIA Blackwell Ultra. Menurut Revolut, sistem ini sudah melayani sekitar 80 juta pelanggan dan dirancang agar bisa ditingkatkan tiga kali lipat. "PRAGMA menjawab pertanyaan apakah model fondasi bisa beroperasi pada skala miliaran transaksi dan lintas domain," ujar Pavel Nesterov, kepala divisi AI Revolut.

Starling Bank memperkenalkan "Starling Intelligence", lapisan kecerdasan yang menopang kemampuan AI mereka, yang dilatih di atas infrastruktur cloud kedaulatan Inggris milik Civo menggunakan data transaksi milik bank sendiri. Lloyds Banking Group membangun ATUM, model fondasi transaksi yang mengubah miliaran transaksi menjadi kecerdasan yang bisa dipakai ulang, dipercepat dengan GPU NVIDIA RTX PRO 6000 Blackwell. Sementara itu, bank asal Belanda bunq menjalankan asisten agennya bernama Finn di atas model berbobot terbuka dan melaporkan kualitas setara model tertutup terkemuka dengan biaya 60 persen lebih murah per jawaban.

Di sisi riset dan analisis pasar, LSEG bekerja sama dengan NVIDIA untuk mempercepat pemrosesan data historis tick hingga 10 kali lebih cepat menggunakan Polars GPU engine. RavenPack membangun jalur pembuatan dataset di Bigdata.com yang mengubah hipotesis riset dalam bahasa biasa menjadi dataset siap pakai untuk backtesting, berjalan di atas model NVIDIA Nemotron yang sudah disesuaikan. Untuk deteksi penipuan, Stripe melaporkan pipeline data 42 kali lebih cepat dan penghematan biaya 92 persen pada platform Stripe Radar saat pengujian offline, menggunakan Ray Data yang dipercepat GPU NVIDIA.

Secara umum, model berbobot terbuka adalah model AI yang bobot atau parameternya bisa diunduh dan disesuaikan oleh pihak lain, berbeda dengan model tertutup yang hanya bisa diakses lewat API penyedia. GPU akselerator adalah chip khusus yang dirancang untuk menjalankan komputasi paralel masif, jauh lebih cepat daripada prosesor biasa untuk tugas pelatihan dan inferensi AI. Dengan kombinasi keduanya, lembaga keuangan bisa melatih model pada data transaksi, suara, dan dokumen mereka sendiri tanpa harus mengirim data keluar, lalu menjalankan model itu di server internal mereka. NatWest, misalnya, sedang membangun teknologi pengenalan suara yang memahami aksen dan dialek Inggris menggunakan model wicara NVIDIA Nemotron, sementara Santander menjadi pengguna awal keluarga model NVIDIA Kumo untuk data keuangan terstruktur. Modulr juga membangun model khusus untuk berbagai bagian operasi pembayaran berbasis NVIDIA Nemotron-3-Ultra-550B.
