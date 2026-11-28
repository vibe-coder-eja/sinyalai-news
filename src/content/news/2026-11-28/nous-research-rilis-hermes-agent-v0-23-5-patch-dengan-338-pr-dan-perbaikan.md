---
title: "Nous Research Rilis Hermes Agent v0.23.5, Patch dengan 338 PR dan Perbaikan Plugin"
summary: "Nous Research (28/11) merilis Hermes Agent v0.23.5 sebagai patch yang menggabungkan sekitar 338 pull request sejak versi sebelumnya. Rilis menyentuh CLI, aplikasi Microsoft Store, Docker, dan Hermes Cloud, dengan catatan lengkap menyusul di v0.24.0."
company: "Nous Research"
source: "https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.5"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-28T03:20:13.000Z
draft: false
sourceTitle: "Hermes Agent v0.23.5"
categories: ["Standar Umum"]
---

Berdasarkan catatan rilis di GitHub, Nous Research (28/11) mengumumkan Hermes Agent v0.23.5 sebagai rilis patch yang menggabungkan sekitar 338 pull request (PR) yang digabung sejak versi v0.23.4. Rilis ini dikemas sebagai versi stabil untuk kanal distribusi GitHub (CLI dan installer), aplikasi Microsoft Store, Docker, dan Hermes Cloud. Nous Research menulis bahwa catatan rilis kurasi penuh untuk periode ini akan diterbitkan bersama v0.24.0.

Pada commit a428f5344f77, jendela pengembangan sejak v0.23.4 memuat 1.262 non-merge commit yang menyentuh 1.146 berkas, dengan total perubahan sekitar +57.989 dan −5.346 baris, 338 PR yang digabung, serta 92 isu yang ditutup. Angka-angka tersebut merupakan klaim perusahaan berdasarkan pengukuran internal pada commit tersebut.

Nous Research juga mendaftarkan sejumlah perubahan yang tidak dijelaskan rinci dalam catatan rilis ini, di antaranya: dukungan protokol program resume OSC 7577 pada CLI dan TUI, pemadatan otomatis obrolan gateway yang menganggur di latar belakang, fitur tail pada read_file dengan offset negatif dan penampilan daftar direktori, respons search_files saat hasil pencarian sudah menjadi jawaban lengkap, pemeriksaan awal plugin berbatas sebelum gateway lokal dijalankan (Desktop, Docker, dan CLI), entri OAuth plugin yang dapat mengunci redirect URI, pemindahan penyedia Solstice ke Interactions API stateless, serta permukaan API plugin baru untuk asal giliran, cara sesi dibuat, penjadwalan cron, dan pembantu keheningan gateway. Daftar panjang perbaikan internal juga disebut menjaga kerja plugin tetap terikat pada profil yang benar saat profil diganti nama, dipindahkan, atau dihapus.

Bagi pengguna yang mengandalkan CLI, pembaruan dapat dilakukan lewat perintah hermes update atau dengan menjalankan ulang installer satu baris. Pengguna Docker dan Hermes Cloud cukup menarik image nousresearch/hermes-agent:stable atau :latest, sementara pengguna Microsoft Store akan menerima pembaruan melalui kanal Store. Aplikasi Desktop yang dipasang dari installer .exe atau .dmj tidak berubah pada rilis ini dan akan diperbarui bersama rilis bundel berikutnya.

Secara umum, istilah patch release merujuk pada pembaruan yang berfokus pada perbaikan dan stabilitas, bukan penambahan fitur besar, sehingga rilis seperti v0.23.5 lazim berfungsi sebagai jembatan menuju rilis mayor atau minor berikutnya. Dalam hal ini, v0.24.0 yang dijadwalkan membawa catatan kurasi lengkap sekaligus daftar kontributor untuk periode sejak v0.23.0.
