---
title: "OpenClaw Perbarui Cara Daftar Model Diambil, Pengguna Tak Perlu Tunggu Rilis untuk Akses Model Baru"
summary: "OpenClaw (06/11) membangun ulang sistem penemuan modelnya agar pengguna bisa langsung memakai model baru dari penyedia tanpa harus menunggu pembaruan aplikasi. Daftar model kini diambil dari katalog terpusat, akun penyedia, dan Codex yang terpasang di perangkat pengguna."
company: "OpenClaw"
source: "https://openclaw.ai/blog/use-new-models-in-openclaw-without-an-update/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-06T00:00:00.000Z
draft: false
sourceTitle: "Use new models in OpenClaw without an update"
categories: ["Rilis Model","Produk Baru"]
---

Berdasarkan rilis resmi OpenClaw (06/11), perusahaan membangun ulang sistem penemuan model di aplikasi OpenClaw selama sekitar lima minggu dengan sekitar 80 pull request. Sebelumnya, daftar model tersimpan di dalam paket aplikasi dan hanya bisa berubah saat OpenClaw merilis versi baru, sehingga peluncuran model dari penyedia seperti OpenAI tidak langsung tersedia di OpenClaw. Kini, aplikasi mengambil daftar model dari tiga sumber secara otomatis sehingga peluncuran model baru tidak lagi harus menunggu rilis OpenClaw.

Sumber pertama adalah katalog model yang di-host di catalog.openclaw.ai. Katalog ini diperbarui setiap empat jam dengan menggabungkan data dari models.dev, manifes internal OpenClaw, dan informasi harga, lalu mempublikasikannya. Gateway yang sedang berjalan memeriksa katalog baru di latar belakang dan beralih ke katalog tersebut secara langsung, sehingga daftar model dan harga yang dipakai selalu konsisten dalam satu sesi percakapan. Katalog juga otomatis menghapus model yang sudah ditarik oleh penyedia.

Sumber kedua adalah akun penyedia yang dipakai pengguna untuk masuk. Saat pengguna masuk dengan akun OpenAI, Anthropic, Claude Code, GitHub Copilot, Grok, Ollama, atau OpenCode Go, OpenClaw meminta daftar model dari penyedia tersebut dan menampilkannya, termasuk model yang lebih baru dari versi OpenClaw yang terpasang atau model yang hanya tersedia untuk akun tertentu. OpenClaw juga membaca informasi kemampuan model, seperti tingkat penalaran dan format permintaan, langsung dari daftar penyedia, bukan lagi menebaknya dari nama model.

Sumber ketiga adalah Codex yang sudah terpasang di perangkat pengguna. Sebelumnya, OpenClaw melaporkan versi Codex terbaru ke ChatGPT agar model baru muncul di daftar, tetapi percakapan tetap dijalankan oleh Codex versi lama yang dibundel dalam aplikasi, sehingga model yang membutuhkan versi lebih baru gagal dijalankan. Solusi yang dipakai sekarang: jika Codex versi stabil yang lebih baru dari versi terbundel sudah terpasang di perangkat dan lolos proses handshake, OpenClaw memakai Codex tersebut untuk mengambil daftar model dan menjalankan percakapan. Jika tidak, OpenClaw kembali memakai Codex terbundel. OpenClaw tidak memasang atau memperbarui Codex secara otomatis.

Pembaruan ini juga mencakup perbaikan pada stabilitas daftar model. Daftar yang sebelumnya bisa menyusut drastis karena gangguan sementara kini melakukan percobaan ulang otomatis dengan jeda yang makin panjang hingga 30 menit. Pemuatan ulang Gateway juga dipercepat dari 68–142 detik menjadi 0,6–1,4 detik dengan memakai plugin yang sudah dimuat. Daftar model yang panjang, seperti 466 model dari OpenRouter, kini disertai daftar pendek rekomendasi yang ditampilkan lebih dulu, sementara pencarian tetap menelusuri seluruh model.

Secara umum, pendekatan ini memisahkan data model dari rilis aplikasi: penyedia memperbarui model mereka, dan aplikasi OpenClaw mengambil perubahan itu lewat katalog, akun, atau perangkat lokal. Beberapa hal, seperti dukungan fitur baru yang memerlukan perubahan kode, tetap membutuhkan rilis OpenClaw tersendiri.
