---
title: "AWS Bedrock AgentCore Punya Pratinjau Langsung untuk Aplikasi Web yang Dibangun Agen Coding"
summary: "Amazon Bedrock AgentCore menambahkan Session endpoints yang memungkinkan developer membuka dan mengetes aplikasi web hasil kerja agen coding secara langsung dari browser, tanpa harus deploy ke hosting terpisah. Setiap sesi agen berjalan di microVM terisolasi dengan URL terautentikasi yang meneruskan permintaan HTTP dan WebSocket ke port yang diizinkan."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/preview-web-apps-live-as-your-coding-agent-builds-them-with-amazon-bedrock-agentcore-runtime/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-30T21:40:03.000Z
draft: false
sourceTitle: "Preview web apps live as your coding agent builds them with Amazon Bedrock AgentCore runtime"
categories: ["Standar Umum"]
---

Berdasarkan tulisan di blog AWS (30/10), Amazon Bedrock AgentCore memperkenalkan kemampuan bernama Session endpoints yang memberi setiap sesi agen coding sebuah URL terautentikasi. Lewat URL itu, developer bisa membuka aplikasi web yang sedang dibangun agen langsung dari browser dan melihat perubahan tampil secara real time, tanpa harus menunggu proses deploy ke layanan hosting lain.

Amazon Bedrock AgentCore adalah platform AWS untuk membangun dan menjalankan agen AI dengan pilihan framework dan foundation model yang fleksibel. Fitur AgentCore runtime menjalankan setiap sesi agen di dalam microVM (mesin virtual ringan dan terisolasi) tersendiri, sehingga pekerjaan satu pengguna tidak bercampur dengan pengguna lain. Session endpoints menjadi jembatan antara sesi agen di cloud dan browser developer di laptop: setiap permintaan HTTP, termasuk method, path, query string, dan body, serta koneksi WebSocket, diteruskan ke port yang memang diizinkan oleh developer.

Bayangkan seorang developer meminta agen untuk membuat dasbor sederhana. Begitu agen selesai menulis satu berkas, perubahan langsung muncul di jendela browser tanpa perlu refresh manual. Begitu pula saat developer meminta perubahan, misalnya mengganti warna tema, langkah-langkah yang dilakukan agen bisa diamati mengalir di sisi kiri layar sementara sisi kanan menampilkan situs yang ikut berubah. Loop seperti ini mempercepat review karena setiap iterasi hanya butuh hitungan detik, bukan satu siklus deploy penuh.

Agar aman, URL Session endpoint tidak bisa diakses begitu saja. Untuk runtime yang menggunakan AWS Identity and Access Management (IAM), setiap permintaan dan handshake WebSocket harus membawa tanda tangan Signature Version 4 (SigV4), yaitu skema penandatanganan permintaan standar AWS. Runtime dengan otorisasi JWT (JSON Web Token, token akses berbasis standar web) memakai bearer token sebagai gantinya. Karena browser biasa tidak bisa menambahkan kredensial ini secara otomatis, AWS menyediakan klien Session endpoint di SDK bedrock-agentcore yang membuka endpoint lokal di mesin developer, biasanya di http://localhost:8088, lalu menambahkan kredensial sebelum meneruskan permintaan ke URL sesi.

Ada beberapa detail teknis yang perlu diperhatikan developer. Port yang boleh diakses diatur saat pembuatan runtime lewat parameter allowedPorts, dengan rentang 8000–12000 dan maksimal lima entri. Port target dipilih lewat prefiks pada hostname, misalnya https://8090--<id-sesi>.runtime.bedrock-agentcore.<region>.on.aws untuk port 8090, meskipun koneksi selalu lewat port 443. URL sesi hanya bertahan selama sesi berjalan, sehingga cocok untuk tahap membangun dan menguji, bukan untuk menyajikan aplikasi ke pengguna akhir. Untuk produksi, AWS menyarankan deployment ke layanan hosting seperti AWS Amplify Hosting.

Secara umum, Session endpoints berbeda dari runtime endpoint yang sudah lebih dulu ada. Runtime endpoint, seperti DEFAULT, dipakai untuk memanggil agen itu sendiri dan mengatur versi mana yang dijalankan, mirip alamat API yang menunjuk ke versi aplikasi tertentu. Session endpoints khusus untuk melihat apa yang sedang dijalankan agen di dalam sesi, seperti pratinjau web. Kode contoh lengkap, termasuk notebook yang memandu langkah-langkah di atas, tersedia di repositori agentcore-samples di GitHub pada folder 14-remote-access.
