---
title: "AWS dan AssemblyAI Pangkas Biaya Inferensi Ucapan hingga 70 Persen Lewat Arsitektur Spot"
summary: "AWS (13/11) menjelaskan arsitektur yang dipakai AssemblyAI untuk menjalankan layanan ucapan-ke-teks dalam skala besar di Eropa. Kombinasi Amazon ECS, instans Spot GPU, dan antrean SQS memangkas biaya sekitar 70 persen sambil tetap memenuhi komitmen layanan."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/cost-optimizing-assemblyai-speech-to-text-inference-on-aws-with-amazon-ec2-spot/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-13T19:35:35.000Z
draft: false
sourceTitle: "Cost-optimizing AssemblyAI speech-to-text inference on AWS with Amazon EC2 Spot"
categories: ["Penerapan Industri"]
---

Berdasarkan tulisan di blog AWS Machine Learning (13/11), AssemblyAI menjalankan layanan ucapan-ke-teks (speech-to-text) berskala ribuan instans GPU di AWS dengan arsitektur yang memangkas biaya sekitar 70 persen dibanding penggunaan instans On-Demand penuh. Kunci penghematan datang dari pemanfaatan Amazon EC2 Spot Instances—kapasitas komputasi cadangan AWS yang dijual dengan diskon besar—dipadukan dengan Amazon ECS sebagai orkestrator kontainer dan Amazon SQS sebagai antrean tugas.

Layanan AssemblyAI dipakai untuk mentranskrip audio, mendeteksi pembicara, menyunting informasi identitas pribadi, hingga analisis sentimen. Pelanggan datang dari industri teknologi, media, kesehatan, hingga keuangan, termasuk sektor yang mensyaratkan data audio tetap berada di wilayah Eropa. Karena itulah arsitektur ini dirancang untuk menjaga SLA (Service Level Agreement) sekaligus memenuhi aturan residensi data di region seperti Europe (London) eu-west-2.

Tantangan utamanya adalah sifat instans Spot: AWS bisa mengambilnya kembali dengan peringatan dua menit bila kapasitas dibutuhkan pihak lain. Untuk menyerap gangguan itu tanpa mengganggu pelanggan, AssemblyAI memisahkan pengiriman tugas dari eksekusinya lewat antrean SQS. Saat instans Spot menerima notifikasi interupsi, Amazon EventBridge memicu fungsi Lambda yang mengembalikan tugas yang sedang berjalan ke antrean utama, sehingga instans sehat lain bisa mengambil alih. Tugas yang gagal berulang kali diarahkan ke Dead Letter Queue untuk ditelusuri.

Agar pasokan instans Spot lebih stabil, armada GPU sengaja disebar ke beberapa keluarga instans—g4dn dengan GPU NVIDIA T4, g5 dengan A10G, dan g6 dengan L4—serta ke beberapa Availability Zone. Strategi alokasi price-capacity optimized dari EC2 Spot memilih kolam kapasitas dengan harga terendah dan ketersediaan tertinggi, sehingga peluang interupsi mengecil. Kapasitas On-Demand tetap dipertahankan sebagai baseline agar layanan tidak pernah kosong.

Secara umum, instans Spot adalah cara AWS menjual kapasitas komputasi yang tidak terpakai dengan harga jauh lebih murah, dengan risiko instans bisa dihentikan sewaktu-waktu. Pola yang dipakai AssemblyAI—mencampur Spot dan On-Demand, menyebar ke banyak tipe instans, serta memisahkan antrean dari eksekusi—sering dijadikan rujukan untuk workload AI yang berat tapi toleran terhadap jeda singkat, seperti transkripsi audio atau pemrosesan gambar massal.
