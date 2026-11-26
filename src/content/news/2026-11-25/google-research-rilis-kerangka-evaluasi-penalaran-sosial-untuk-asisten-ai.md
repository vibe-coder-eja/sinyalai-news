---
title: "Google Research Rilis Kerangka Evaluasi Penalaran Sosial untuk Asisten AI"
summary: "Google Research (25/11) memperkenalkan kerangka evaluasi berbasis simulasi multi-agen untuk mengukur kemampuan asisten AI dalam memahami situasi sosial dari cerita subjektif pengguna. Hasil awal menunjukkan model masih peka pada cara cerita dibingkai dan butuh lebih banyak detail daripada manusia."
company: "Google"
source: "https://research.google/blog/verifiable-social-reasoning-for-llm-assistants/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-25T17:10:27.000Z
draft: false
sourceTitle: "Verifiable Social Reasoning for LLM Assistants"
categories: ["Standar Umum"]
---

Google Research (25/11) memperkenalkan kerangka evaluasi baru yang dirancang khusus untuk menguji kemampuan penalaran sosial atau social reasoning pada asisten berbasis Large Language Model (LLM). Berbeda dari uji penalaran matematika atau kode yang mengandalkan jawaban pasti, kerangka ini menilai seberapa baik model memahami niat dan motif orang lain ketika informasinya datang dari cerita subjektif seorang pengguna.

Dalam pendekatan ini, sebuah simulasi multi-agen dijalankan dengan satu agen target yang memiliki motif tersembunyi. Agen target berinteraksi dengan agen lain, termasuk satu yang mewakili pengguna. Setelah interaksi berlangsung, pengguna tersebut bertanya kepada asisten AI yang sedang diuji dan meminta model menebak motif tersembunyi dari agen target. Karena motif ditentukan oleh sistem sejak awal, jawaban model bisa dibandingkan dengan ground truth yang pasti, sesuatu yang biasanya sulit diperoleh dalam skenario sosial sehari-hari.

Tim peneliti, yang terdiri dari Zorik Gekhman dan Amir Taubenfeld dari Google Research, menemukan beberapa keterbatasan pada model yang diuji. Model ternyata sangat peka terhadap cara pengguna membingkai cerita, misalnya apakah pengguna terdengar percaya diri atau justru penuh insecurity. Model juga membutuhkan lebih banyak detail daripada yang dibutuhkan manusia untuk sampai pada kesimpulan yang benar, dan belum memanfaatkan pertanyaan klarifikasi dengan optimal. Dalam salah satu contoh, model memberikan nasihat yang berpotensi menyakitkan kepada pengguna, padahal cerita yang disampaikan sebenarnya menggambarkan rekan yang berniat membantu.

Kerangka ini bekerja melalui lima tahap: menentukan kategori sosial yang diuji, seperti keinginan, pengetahuan, atau motif, lalu membuat templat skenario dengan struktur multi-adegan, menjalankan simulasi utama antar agen, dan akhirnya menilai apakah asisten mampu menebak motif tersembunyi dengan benar. Untuk menguji pengaruh perspektif pengguna, sistem juga memparameterisasi filter kognitif pada persona pengguna, misalnya mengubah kondisi antara percaya diri dan tidak.

Secara umum, penalaran sosial berbeda dari penalaran logis biasa karena model tidak pernah menyaksikan peristiwa secara langsung. Informasi hanya datang lewat cerita pengguna yang bisa bias, tidak lengkap, atau mencampurkan emosi pribadi. Karena itu, model yang terlalu mengikuti premis pengguna berisiko memperkuat prasangka sepihak dan melewatkan konteks penting. Google Research merilis kerangka dan dataset ini secara terbuka untuk mendorong riset lebih lanjut di bidang penalaran sosial yang dimediasi pengguna.
