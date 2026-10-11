---
title: "OpenClaw Perbaiki Tes Pemulihan Toast Startup Setelah Reload"
summary: "OpenClaw (10/10) merilis perbaikan kecil pada tes otomatis UI yang sebelumnya gagal setelah reload halaman. Tidak ada perubahan yang dirasakan pengguna; perbaikan ini hanya mengembalikan sinkronisasi agar pengujian internal bisa berjalan lagi."
company: "OpenClaw"
source: "https://github.com/openclaw/openclaw/releases/tag/release-publish%2F9cf7fc279c26-1791664994"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-10T20:37:42.000Z
draft: false
sourceTitle: "release-publish/9cf7fc279c26-1791664994: fix(ui): restore startup toast recovery test after reload (#168634)"
categories: ["Penerapan Industri"]
---

OpenClaw (10/10) memperbaiki cacat pada tes otomatis antarmuka pengguna yang sebelumnya gagal pada skenario pemulihan toast saat halaman dimuat ulang. Dalam catatan rilisnya, perusahaan menjelaskan bahwa perbaikan ini tidak membawa perubahan yang terlihat oleh pengguna; tujuannya murni mengembalikan tes end-to-end agar bisa lolos kembali dan tidak menghambat pull request lain yang sebenarnya tidak terkait.

Masalah muncul pada skenario pengujian yang meniru alur pengguna saat menutup draf pribadi lalu memuat ulang halaman. Setelah pemuatan ulang, sistem seharusnya menampilkan toast pemulihan, mempertahankan draf pribadi yang terpisah, memutar ulang pesan pertama yang tersimpan tepat satu kali, serta menjaga draf berikutnya dan pesan yang antre di kotak kirim. Sebelumnya, tes pada cabang utama gagal pada kasus toast dengan pesan kesalahan "Control UI readiness hook is unavailable", sementara dua kasus lain masih lolos. Pola kegagalan yang sama juga terlihat pada shard UI dari pull request lain.

Akar masalahnya, menurut OpenClaw, adalah perubahan pada commit sebelumnya yang membuat observer kesiapan otomasi menjadi malas dimuat. Setelah reload yang dipicu oleh dialog, pengamatan terhadap sesi pengiriman hanya membuktikan bahwa Gateway mulai memutar ulang, bukan bahwa hook kesiapan renderer sudah termuat. Akibatnya, helper navigasi sinkron berikutnya mencoba memulai pemuatan malas itu, menerima nilai undefined, dan melemparkan kesalahan. Perbaikan dilakukan dengan menunggu helper roster dan kesiapan awal yang sudah ada sebelum navigasi di cabang toast, sehingga pemuatan malas di produksi tetap terjaga dan semua assertion serta batas waktu yang lama tetap berlaku.

Pada pengujian internal dengan bundle produksi Chromium, skenario toast recovery dilaporkan lulus tiga kali berturut-turut dengan durasi sekitar 31,9 detik, dan keseluruhan rangkaian uji memakan waktu sekitar 155,67 detik. OpenClaw menyebut perubahan ini sebagai "two-way door": kalau dibatalkan, yang kembali hanyalah cacat sinkronisasi pada tes tersebut. Tidak ada perubahan pada kode produk, status yang disimpan, maupun kontrak publik.

Secara umum, istilah end-to-end test merujuk pada pengujian otomatis yang mensimulasikan alur pengguna dari awal sampai akhir, termasuk memuat ulang halaman dan memeriksa apakah elemen seperti toast, yaitu notifikasi kecil yang muncul sebentar di sudut layar, muncul kembali dengan benar. Dalam pengembangan perangkat lunak, memisahkan pemuatan modul menjadi lazy loading adalah cara agar kode hanya diambil saat benar-benar dibutuhkan supaya aplikasi tetap ringan; tantangannya adalah memastikan semua bagian yang bergantung satu sama lain sudah siap sebelum langkah berikutnya dijalankan.
