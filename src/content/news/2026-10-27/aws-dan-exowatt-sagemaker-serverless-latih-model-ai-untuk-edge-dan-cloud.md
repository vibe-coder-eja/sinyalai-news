---
title: "AWS dan Exowatt: SageMaker serverless latih model AI untuk edge dan cloud"
summary: "AWS (27/10) menjelaskan bagaimana Exowatt menggunakan Amazon SageMaker AI serverless model customization untuk membangun pipeline AI berulang yang menghasilkan model fine-tuning bagi edge dan cloud, dengan akurasi lebih tinggi dari frontier model dan biaya hingga 49 kali lebih rendah."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/exowatt-beats-frontier-models-on-accuracy-with-sagemaker-serverless-model-customization/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-27T16:50:55.000Z
draft: false
sourceTitle: "Exowatt beats frontier models on accuracy with SageMaker serverless model customization"
categories: ["Rilis Model"]
---

Berdasarkan tulisan di blog AWS (27/10), perusahaan energi Exowatt menggunakan Amazon SageMaker AI serverless model customization untuk membangun pipeline AI yang dapat diulang. Pipeline itu menghasilkan model-model fine-tuning khusus untuk dua target deployment, yaitu perangkat edge dan cloud, dengan klaim akurasi lebih tinggi dibanding frontier model dan biaya hingga 49 kali lebih rendah.

Exowatt mengembangkan sistem energi modular berbasis tenaga surya, termasuk produk andalannya Exowatt P3, yang menangkap cahaya matahari lewat lensa optik, menyimpannya sebagai panas dalam baterai termal berdurasi panjang, lalu menyalurkan listrik sesuai kebutuhan lewat mesin panas. Sistem ini dirancang untuk menyalakan pusat data secara langsung di belakang meteran, tanpa harus menunggu antrean interkoneksi jaringan listrik yang bisa memakan waktu bertahun-tahun. Seiring armada Exowatt tumbuh dari bangku uji menuju manufaktur dan ribuan unit yang dipasang di lapangan, lapisan kecerdasan buatan yang mengoperasikan sistem-sistem ini juga harus ikut berkembang.

Tantangan utamanya adalah triase alarm secara real time di setiap lokasi. Setiap situs Exowatt terus menghasilkan alarm, mulai dari komponen yang beroperasi di luar spesifikasi, koneksi yang terputus, hingga pembacaan tegangan di luar jangkauan. Saat armada membengkak menjadi ribuan unit, operator manusia tidak bisa memantau setiap situs secara langsung. Exowatt membutuhkan agen AI yang mampu membaca status alarm di setiap lokasi dan mengambil atau merekomendasikan tindakan lanjutan secara otonom.

Model frontier umum tidak bisa menjawab kebutuhan ini karena tiga alasan. Pertama, tugasnya bersifat spesifik dan propietari, bergantung pada perangkat keras, data, serta logika operasi Exowatt sendiri. Kedua, agen harus mampu berjalan di edge tanpa GPU dan sering tanpa koneksi internet, sehingga tidak bisa bergantung pada panggilan ke model frontier di cloud. Ketiga, biaya tidak ekonomis bila setiap keputusan operasional di ribuan situs dialihkan ke model frontier.

Exowatt mengatasi keterbatasan ini dengan pendekatan fine-tuning di SageMaker AI serverless. Alih-alih memilih instans GPU dan menunggu kapasitas tersedia, tim menjalankan eksperimen beberapa kali sehari karena kapasitas pelatihan dialokasikan sesuai permintaan. Pipeline yang sama menghasilkan model untuk dua target: model Qwen3-1.7B yang dikuantisasi untuk triase alarm di edge, dan model Qwen3-14B untuk analisis pasar energi di cloud. Setelah evaluasi, model terbaik didaftarkan di SageMaker AI Model Registry.

Tujuh layanan AWS menopang pipeline ini tanpa perlu mengelola instans, klaster, maupun endpoint, termasuk Amazon S3 untuk data dan artefak model, SageMaker AI serverless untuk fine-tuning dan evaluasi, Amazon Bedrock untuk parafrase dan pembandingan dengan frontier model, serta SageMaker AI Inference untuk meng-hosting model Qwen3-14B bagi Cloud EMS. Dengan pipeline ini, Exowatt dapat menjalankan proses dari data operasional mentah menjadi model yang sudah dievaluasi dalam hitungan hari, bukan bulan.

Secara umum, fine-tuning adalah proses melatih ulang sebuah model AI yang sudah ada dengan data khusus agar kemampuannya lebih terfokus pada tugas tertentu. Istilah edge merujuk pada perangkat komputasi yang berada di lokasi lapangan, bukan di pusat data, sehingga pemrosesan terjadi dekat dengan sumber data. Pendekatan serverless berarti kapasitas komputasi disediakan secara otomatis sesuai kebutuhan tanpa harus memesan atau mengelola server terlebih dahulu.
