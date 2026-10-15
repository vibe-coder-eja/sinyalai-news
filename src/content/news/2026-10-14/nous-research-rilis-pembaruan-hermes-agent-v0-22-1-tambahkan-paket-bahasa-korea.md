---
title: "Nous Research Rilis Pembaruan Hermes Agent v0.22.1, Tambahkan Paket Bahasa Korea dan Brasil"
summary: "Nous Research (14/10) merilis Hermes Agent v0.22.1 sebagai pembaruan kecil berisi perbaikan untuk Windows Store, pembaruan plugin, dan penambahan paket bahasa Korea serta Brasil."
company: "Nous Research"
source: "https://github.com/NousResearch/hermes-agent/releases/tag/v0.22.1"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-14T23:59:24.000Z
draft: false
sourceTitle: "Hermes Agent v0.22.1"
categories: ["Rilis Model","Fitur & Skills"]
---

Berdasarkan catatan rilis di repositori GitHub, Nous Research (14/10) mengumumkan pembaruan Hermes Agent v0.22.1. Rilis ini dikategorikan sebagai patch, artinya fokusnya adalah perbaikan dan penyempurnaan kecil, bukan penambahan fitur besar. Pengguna yang mengandalkan Hermes Agent di Windows Store menjadi kelompok yang paling terdampak langsung karena sebagian perbaikan ditujukan untuk kanal distribusi tersebut.

Di sisi fitur, pembaruan menambahkan parameter bawaan untuk model Nemotron Super 3.5 pada agen, serta menata ulang daftar pilihan model di antarmuka baris perintah (CLI) agar kumpulan model pilihan muncul di posisi teratas. Bagi pengguna yang sering berpindah-pindah model, perubahan kecil ini mempersingkat langkah saat memilih model yang biasa dipakai.

Bagian katalog plugin mendapat tambahan paling banyak dalam rilis ini. Nous Research (14/10) memasukkan paket bahasa Korea (hermes-lang-ko) dan bahasa Portugis Brasil (hermes-lang-pt-br) untuk versi desktop, sehingga antarmuka Hermes Agent kini tersedia dalam lebih banyak bahasa. Katalog juga kedatangan plugin komunitas dari Lightning AI beserta pembatas laju (rate limit)-nya, kartu katalog wait-ledger, pembaruan aux-ledger ke versi 1.4.0, serta plugin openinvest dan TeamoRouter. Penambahan Hermes AAC 0.1.0 dan hermes-agent-mixer v0.2.0 ikut memperkaya pilihan integrasi yang bisa dipasang pengguna.

Di balik layar, sebagian besar perubahan teknis menyentuh cara kerja internal agen: cara sesi, pekerja (worker), dan perintah diproses agar lebih konsisten, terutama saat terjadi perubahan otoritas atau pemulihan sesi. Misalnya, perintah --resume dan -c di gateway kini dapat menerima judul sesi dan opsi --create-if-missing, sehingga pengguna bisa melanjutkan atau membuat sesi lewat nama yang mudah diingat. Perubahan lain memastikan pembaruan model lokal dilakukan secara atomik, artinya perubahan diterapkan sekaligus atau tidak sama sekali, sehingga mengurangi risiko keadaan yang tidak konsisten.

Secara umum, rilis patch seperti ini lazim dilakukan untuk menstabilkan perangkat lunak setelah pembaruan besar: memperbaiki bug, menutup celah kecil, dan menyiapkan fondasi sebelum fitur berikutnya diperkenalkan. Pembaruan v0.22.1 memberi gambaran bahwa Nous Research sedang merapikan lapisan teknis Hermes Agent sembari memperluas dukungan bahasa dan katalog plugin untuk komunitas penggunanya.
