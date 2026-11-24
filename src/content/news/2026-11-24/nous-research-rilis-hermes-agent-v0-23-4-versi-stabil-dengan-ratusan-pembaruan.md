---
title: "Nous Research Rilis Hermes Agent v0.23.4, Versi Stabil dengan Ratusan Pembaruan Kecil"
summary: "Nous Research (24/11) merilis Hermes Agent v0.23.4 sebagai patch release yang menggabungkan sekitar 229 pull request sejak versi sebelumnya. Rilis ini ditujukan untuk CLI, Microsoft Store, Docker, dan Hermes Cloud, dengan catatan lengkap menyusul di v0.24.0."
company: "Nous Research"
source: "https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.4"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-24T08:17:06.000Z
draft: false
sourceTitle: "Hermes Agent v0.23.4"
categories: ["Standar Umum"]
---

Berdasarkan catatan rilis di GitHub, Nous Research (24/11) mengumumkan Hermes Agent v0.23.4, sebuah patch release yang menggabungkan sekitar 229 pull request yang masuk sejak versi v0.23.3. Rilis ini dikemas sebagai versi stabil untuk empat jalur distribusi sekaligus: CLI dan installer di GitHub, aplikasi Microsoft Store, image Docker, serta Hermes Cloud.

Pada commit 8fc03744473, jendela pengembangan sejak v0.23.3 mencatat 1.122 non-merge commit yang menyentuh 1.316 berkas, dengan penambahan sekitar 96.873 baris dan pengurangan 6.703 baris. Angka-angka tersebut menggambarkan pembaruan yang sifatnya menyebar di banyak komponen, bukan satu fitur tunggal yang besar. Nous Research juga menyebutkan ada 229 pull request yang digabungkan dan 281 isu yang ditutup dalam periode yang sama.

Catatan resmi menjelaskan bahwa rincian lengkap dan kurasi perubahan untuk jendela ini akan diterbitkan bersama v0.24.0, yang akan mendokumentasikan seluruh perubahan sejak v0.23.0 beserta kredit kontributor. Artinya, v0.23.4 berfungsi lebih sebagai titik stabil yang bisa diunduh dan dipasang, sementara narasi utuh tentang apa yang berubah akan datang di rilis berikutnya.

Beberapa pembaruan yang sengaja tidak dirinci di catatan v0.23.4 antara lain: dukungan model Gemini 4 Hydrogen, Neon, dan Carbon di Nous Portal, OpenRouter, dan Vertex; perintah `hermes gateway migrate --backends` untuk memindahkan backend serve/dashboard lama ke gateway; perintah `hermes plugins config` untuk mengubah pengaturan plugin dari terminal; kartu persetujuan di aplikasi Desktop untuk permintaan akses folder dan situs pada sandbox; pengumuman identitas klien gateway agar plugin dapat melihat klien mana yang mengirim giliran percakapan; serta berbagai peningkatan performa streaming dan transkrip di Desktop. Nous Research juga menyebut indikator retryable untuk perpindahan profil yang lambat, opsi `hermes dashboard password` tanpa prompt TTY, pengaturan `skills.index_desc_limit` untuk panjang deskripsi indeks skill, konfigurasi managed-scope yang dihormati oleh pembacaan keamanan dan URL-safety, dan sekumpulan besar entri baru di katalog plugin.

Bagi pengguna yang ingin memperbarui, caranya berbeda tergantung jalur instalasi. Pengguna CLI dapat menjalankan `hermes update` atau memasang ulang lewat installer satu baris. Pengguna Docker dan Hermes Cloud cukup menarik image `nousresearch/hermes-agent:stable` atau `:latest`. Aplikasi Microsoft Store akan diperbarui lewat mekanisme Store. Sementara itu, aplikasi Desktop yang dipasang dari installer `.exe` atau `.dmg` tidak berubah di rilis ini dan akan ikut pembaruan pada rilis bundel berikutnya.

Secara umum, istilah patch release merujuk pada rilis yang terutama berisi perbaikan bug, peningkatan stabilitas, dan pembaruan kecil, tanpa memperkenalkan fitur besar yang membutuhkan catatan panjang. Pola seperti ini lazim dipakai oleh proyek perangkat lunak terbuka untuk memastikan pengguna mendapat versi yang aman dan stabil, sambil menyiapkan catatan perubahan naratif yang lebih lengkap di rilis minor atau mayor berikutnya. Pada kasus Hermes Agent, v0.23.4 berperan sebagai jangkar stabil tersebut, sementara v0.24.0 akan menjadi rilis yang merangkum semuanya secara utuh.
