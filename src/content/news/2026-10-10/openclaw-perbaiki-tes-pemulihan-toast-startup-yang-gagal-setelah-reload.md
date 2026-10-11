---
title: "OpenClaw Perbaiki Tes Pemulihan Toast Startup yang Gagal Setelah Reload"
summary: "OpenClaw (10/10) merilis perbaikan pada tes end-to-end pemulihan toast startup yang sempat gagal setelah reload draf privat, sehingga tidak lagi menghambat pull request UI lain tanpa mengubah perilaku produk."
company: "OpenClaw"
source: "https://github.com/openclaw/openclaw/releases/tag/release-publish%2F9cf7fc279c26-1791664994"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-10T20:37:42.000Z
draft: false
sourceTitle: "release-publish/9cf7fc279c26-1791664994: fix(ui): restore startup toast recovery test after reload (#168634)"
categories: ["Penerapan Industri"]
---

OpenClaw (10/10) memperbaiki cacat pada tes end-to-end pemulihan toast startup yang sebelumnya gagal setelah halaman dimuat ulang saat draf privat dibuang. Perbaikan ini tidak membawa perubahan yang terlihat oleh pengguna, tetapi mengembalikan tes agar bisa lolos dan tidak lagi menghambat pull request UI lain yang sebenarnya tidak terkait.

Masalah muncul setelah commit 4606ea59b7d41e3880f7a32c0d1a429c6e4382f5 (#168506) yang membuat observer kesiapan otomasi menjadi pemuatan lambat (lazy). Setelah reload yang dipicu dialog, pengamatan terhadap `sessions.send` hanya membuktikan bahwa Gateway mulai memutar ulang, bukan bahwa hook kesiapan renderer sudah termuat. Akibatnya, helper navigasi sinkron berikutnya membaca impor lambat itu dan menerima nilai `undefined`, lalu melempar pesan "Control UI readiness hook is unavailable".

Solusinya adalah menunggu helper roster awal dan kesiapan sebelum melakukan navigasi di cabang toast. Pendekatan ini mempertahankan pemuatan lambat di produksi dan seluruh assertion serta batas waktu yang sudah ada, tanpa menambah jalur pemulihan atau navigasi alternatif. Pada pengujian dengan bundle produksi berbasis Chromium, skenario toast recovery lolos 3 dari 3 kali dalam sekitar 31,9 detik, dengan total durasi pengujian 155,67 detik.

Secara umum, tes end-to-end adalah skrip otomatis yang mensimulasikan alur penggunaan nyata untuk memastikan sebuah fitur tetap berjalan setelah perubahan kode. Istilah "lazy loading" merujuk pada pola pemuatan modul hanya saat dibutuhkan, bukan saat aplikasi pertama kali dijalankan, sehingga waktu muat awal bisa lebih cepat. Karena perbaikan ini murni pada sinkronisasi tes dan tidak menyentuh kode produk, dampaknya terbatas pada proses rekayasa internal OpenClaw.
