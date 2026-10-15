---
title: "Nous Research Rilis Hermes Agent v0.22.2: Perbaikan Gateway dan Stabilitas di Laptop"
summary: "Nous Research merilis Hermes Agent v0.22.2 pada 15/10 sebagai pengganti rilis 0.22.1 yang sempat keliru membangun dari commit yang salah. Pembaruan ini memulihkan gateway agar bisa berjalan kembali setelah reboot, sekaligus membuat sesi panjang dengan model lokal di laptop lebih tahan gangguan."
company: "Nous Research"
source: "https://github.com/NousResearch/hermes-agent/releases/tag/v0.22.2"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-15T08:21:32.000Z
draft: false
sourceTitle: "Hermes Agent v0.22.2"
categories: ["Standar Umum"]
---

Berdasarkan catatan rilis di GitHub, Nous Research (15/10) mengumumkan Hermes Agent v0.22.2. Rilis ini pada dasarnya memperbaiki versi 0.22.1 yang sebelumnya terbangun dari commit yang keliru, sehingga membawa pekerjaan gateway yang belum siap dan membuat aplikasi Microsoft Store kadang macet di layar "Connecting". Versi 0.22.2 menggantikan fungsi tersebut dengan perbaikan yang memang ditujukan untuk 0.22.1.

Sorotan utama pembaruan ini ada pada dua hal: gateway dan sesi model lokal. Pada sisi gateway, layanan ini kembali bisa hidup otomatis setelah komputer di-restart. Sebelumnya, di Linux, sistem kadang memberikan PID (nomor identifikasi proses) awal ke proses lain yang tidak terkait, sehingga gateway yang dikelola lewat systemd, launchd, atau Docker menolak untuk berjalan karena mengira sudah ada gateway lain yang aktif. Sekarang Hermes mencatat boot tempat ia mulai berjalan, dan bila tidak bisa memastikan, ia bertanya ke host lock, semacam kunci yang hanya dipegang gateway yang benar-benar hidup.

Sementara itu, sesi panjang dengan model lokal di laptop kini lebih tahan banting. Permintaan ke model lokal selalu menampilkan progres pembacaan prompt di bilah status, waktu diam tidak dihitung saat laptop dalam keadaan tidur, server lokal yang sempat pulih diberi kesempatan mencoba lagi alih-alih diputus permanen, dan kompresi percakapan tidak kehabisan waktu saat server masih membaca konteks yang panjang. Pada laptop Windows dengan memori terintegrasi (unified memory), peluncuran model dan cache prompt kini disesuaikan dengan memori yang tersedia. Nous Research juga mengakui satu masalah yang belum teratasi: sesi yang berjalan di gateway 0.22.1 tidak bisa dihapus di 0.22.2.

Secara umum, gateway dalam konteks ini adalah komponen yang menjembatani permintaan antara aplikasi dan model AI, mirip pintu gerbang yang mengatur lalu lintas data. Istilah boot epoch merujuk pada penanda waktu saat sistem pertama kali dinyalakan, yang dipakai untuk membedakan proses yang benar-benar hidup sejak booting dengan proses lain yang kebetulan mendapat nomor sama. Daftar perubahan di lini rilis 0.22 juga mencakup pembaruan katalog plugin, penambahan paket bahasa Korea dan Brasil, serta beberapa penyesuaian pada profil model dan proses rilis untuk Windows Store dan macOS.
