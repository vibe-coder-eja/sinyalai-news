---
title: "AWS Sambut Model Open-Weight Reflection Beam untuk Pengodean Agenik"
summary: "AWS (16/10) mengumumkan dukungan deployment untuk Reflection Beam, model open-weight 501 miliar parameter dari Reflection AI yang dirancang untuk tugas pengodean agenik dan jangka panjang. Model ini tersedia lewat Amazon SageMaker JumpStart di dua region AS."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/introducing-reflection-beam-an-open-weight-model-for-agentic-coding-on-aws/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-16T15:23:10.000Z
draft: false
sourceTitle: "Introducing Reflection Beam: an open-weight model for agentic coding on AWS"
categories: ["Rilis Model","Fitur & Skills","Produk Baru"]
---

AWS (16/10) mengumumkan cara menjalankan Reflection Beam, model kecerdasan buatan open-weight dari Reflection AI yang dirancang untuk membantu pekerjaan pengodean secara agenik. Beam dapat dipakai untuk memperbaiki kode, memanggil alat, membaca hasil, dan menyelesaikan alur kerja bertahap yang panjang, sehingga developer tidak harus mengawasi setiap langkah kecil secara manual.

Beam adalah model bahasa besar dengan arsitektur sparse mixture-of-experts. Dari total 501 miliar parameter yang dimilikinya, hanya sekitar 23 miliar yang aktif pada satu waktu untuk memproses satu bagian teks. Pola ini membuat komputasi per token lebih ringan dibanding model padat dengan ukuran setara. Reflection menyebut panjang konteks efektif Beam mencapai 1 juta token, artinya model bisa membaca dan mengingat potongan kode atau dokumen yang sangat panjang dalam satu sesi kerja.

Bobot model ini dirilis secara terbuka di Hugging Face dengan lisensi Apache 2.0, sehingga peneliti dan developer bisa memeriksa, menyesuaikan, atau menjalankan model di infrastruktur sendiri. Beam 1.0 tersedia dalam tiga varian checkpoint, yaitu BF16, FP8, dan NVFP4, yang menawarkan kebutuhan memori dan kompatibilitas perangkat keras berbeda. AWS menyediakan dua jalur deployment utama. Jalur pertama adalah Amazon SageMaker JumpStart real-time endpoint, yaitu layanan terkelola penuh yang menyiapkan model, kontainer, dan titik akhir HTTPS tanpa perlu mengelola server sendiri. Jalur kedua adalah Amazon SageMaker HyperPod Inference, yang memberi kontrol lebih dalam lewat Kubernetes untuk mengatur GPU terdistribusi, runtime SGLang atau vLLM, serta konfigurasi paralelisme.

Pada saat peluncuran, Beam sudah bisa diakses melalui SageMaker JumpStart di region US East (N. Virginia) dan US East (Ohio). AWS juga membagikan panduan teknis untuk memperkirakan kebutuhan memori berdasarkan ukuran bobot, KV cache, panjang konteks, dan overhead runtime, sehingga developer bisa memilih tipe instans yang sesuai, seperti ml.p5.48xlarge dengan GPU H100 untuk varian FP8 atau ml.p6-b200.48xlarge dengan GPU B200 untuk NVFP4.

Secara umum, model open-weight berbeda dari model tertutup seperti yang ditawarkan lewat API komersial: bobot model diublikasikan sehingga siapa pun bisa mengunduh, memeriksa, dan menyesuaikannya. Istilah agentic coding merujuk pada kemampuan AI untuk tidak hanya menulis kode, tetapi juga memecah tugas menjadi langkah-langkah, menggunakan alat bantu seperti compiler atau basis data, dan mengevaluasi hasilnya sebelum lanjut ke langkah berikutnya. Dengan Beam yang berjalan di AWS, tim rekayasa perangkat lunak punya pilihan untuk mengadopsi model ini lewat jalur terkelola yang cepat atau jalur Kubernetes yang lebih fleksibel sesuai kebutuhan skala dan kontrol mereka.
