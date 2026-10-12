---
title: "Nous Research Rilis Hermes Agent v0.21.7: Ratusan Perbaikan untuk Pengguna Desktop dan Cloud"
summary: "Nous Research (12/10) merilis Hermes Agent v0.21.7 sebagai patch yang menggabungkan sekitar 204 pull request sejak versi sebelumnya. Pembaruan menyentuh aplikasi desktop, Microsoft Store, Docker, dan Hermes Cloud, dengan fokus pada mekanisme pembaruan, pemulihan sesi, dan koneksi lewat firewall."
company: "Nous Research"
source: "https://github.com/NousResearch/hermes-agent/releases/tag/v0.21.7"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-12T05:53:41.000Z
draft: false
sourceTitle: "Hermes Agent v0.21.7"
categories: ["Standar Umum"]
---

Berdasarkan catatan rilis di repositori GitHub Nous Research (12/10), Hermes Agent v0.21.7 adalah rilis patch yang menggabungkan sekitar 204 pull request sejak versi v0.21.6. Rilis ini dikemas sebagai versi stabil untuk aplikasi desktop di macOS berbasis Apple silicon dan Windows, Microsoft Store serta MSIX, installer, Docker, dan Hermes Cloud. Catatan lengkap untuk periode pengembangan ini akan menyusul bersama rilis v0.22.0.

Salah satu perubahan yang paling terasa adalah cara aplikasi memperbarui dirinya. Pada pemasangan dari kode sumber, perintah `hermes update` kini mengikuti rilis yang sudah ditandai tag, bukan lagi setiap commit di cabang utama. Pengguna yang ingin tetap mengikuti perkembangan harian bisa berpindah lewat `hermes update --set-channel main`. Di aplikasi desktop, pengaturan pembaruan dipindahkan ke menu Settings ▸ About ▸ Updates, lengkap dengan pilihan saluran Stable releases atau Every commit, dan dialog pembaruan kini menampilkan saluran yang sedang dipakai.

Fitur pemulihan sesi juga diperbaiki. Tanda-tanda proses berpikir (reasoning) yang sudah ditandatangani kini dapat diputar ulang setelah perintah `hermes chat --resume` dan pada giliran berikutnya di gateway, sehingga pengguna tidak kehilangan jejak penalaran saat melanjutkan percakapan. Model penalaran Bedrock Converse juga tidak lagi ditolak saat sesi dilanjutkan.

Bagi pengguna yang memasang di belakang firewall ketat, pembaruan tidak lagi gagal karena respons 403 dari firewall regional. Pemeriksaan versi stabil kini memakai token GitHub bila tersedia, baik lewat variabel `GITHUB_TOKEN` maupun `gh auth login`, dan menampilkan pesan batas permintaan (rate limit) bila GitHub membatasi akses.

Secara umum, pembaruan otomatis adalah mekanisme umum pada aplikasi modern: aplikasi memeriksa versi terbaru dari server, lalu mengunduh dan memasang pembaruan di latar belakang. Saluran rilis seperti Stable dan Main adalah cara tim pengembangan memberi pilihan antara kestabilan dan akses tercepat ke fitur baru. Pada rilis ini, Nous Research juga mencatat berbagai pembaruan lain yang tidak dirinci di catatan publik, termasuk plugin, keterampilan yang dipasang di tengah sesi, dan integrasi model gambar Krea 2 Medium Turbo dengan fallback ke FAL.

Pengguna aplikasi desktop cukup menunggu pembaruan otomatis, sementara pemasangan lewat Microsoft Store mengikuti pembaruan toko. Pengguna CLI dapat menjalankan `heres update` atau menjalankan ulang installer satu baris. Untuk Docker dan Hermes Cloud, image yang dipakai adalah `nousresearch/hermes-agent:stable` atau `:latest`.
