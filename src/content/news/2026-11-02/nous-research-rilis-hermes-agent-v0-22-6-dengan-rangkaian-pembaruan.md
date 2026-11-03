---
title: "Nous Research Rilis Hermes Agent v0.22.6 dengan Rangkaian Pembaruan"
summary: "Nous Research (02/11)idepress Hermes Agent v0.22.6 sebagai rilis patch yang menggabungkan sekitar 776 pull request pada CLI, Docker, Hermes Cloud, Microsoft Store, dan komponen terkait."
company: "Nous Research"
source: "https://github.com/NousResearch/hermes-agent/releases/tag/v0.22.6"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-02T17:18:36.000Z
draft: false
sourceTitle: "Hermes Agent v0.22.6"
categories: ["Standar Umum"]
---

Nous Research (02/11) outperform Hermes Agent v0.22.6 sebagai rilis patch yang menggabungkan sekitar 776 pull request yang telah digabung sejak versi v0.22.5. Pembaruan ini Released untuk CLI dan installer, aplikasi Microsoft Store, Docker, serta Hermes Cloud.

Menurut catatan rilis, periode sejak v0.22.5 mencakup 3.448 commit non-merge pada 4.316 file yang berubah, 776 pull request yang digabung, dan 385 issue yang ditutup. Rilis ini juga menambahkan Hermes Web App yang disajikan melalui listener gateway, termasuk panel Desktop Web Access untuk membukanya melalui jaringan lokal atau URL sendiri dengan login Nous. Plugin Desktop juga dapat dimuat melalui tab browser.

Pembaruan lainnya mencakup perintah /model reset untuk menghapus model yang dikunci pada suatu sesi tanpa menghapus riwayat, kunci per-skill terhadap tulisan otonom, serta kompresi lanjutan yang dapat diaktifkan secara opsional. Pada fitur jadwal, pengguna dapat membatalkan tugas dengan hermes cron, menetapkan kebijakan untuk tugas yang terlewat, dan menggunakan tombol Stop pada editor cron Desktop.

Bagi pengguna yang menjalankan agen AI melalui beberapa antarmuka, perubahan ini membuat pengelolaan sesi, plugin, dan tugas terjadwal lebih mudah dikendalikan. Namun, pembaruan Desktop yang dipasang melalui installer .exe atau .dmg tidak berubah pada rilis ini. Pembaruan tersebut akan dikirim pada rilis bundling berikutnya.

CLI dapat diperbarui dengan hermes update atau menjalankan kembali perintah installer satu baris. Untuk Docker dan Hermes Cloud, image yang dapat digunakan adalah nousresearch/hermes-agent:stable atau :latest. Catatan rilis terperinci untuk seluruh perubahan sejak v0.22.0, termasuk kredit kontributor, akan disertakan pada v0.23.0. Secara umum, Hermes Agent adalah perangkat lunak agen AI yang dapat digunakan melalui antarmuka baris perintah, aplikasi desktop, Docker, atau layanan cloud. Pilihan saluran pembaruan menentukan komponen mana yang memperoleh perubahan terlebih dahulu.
