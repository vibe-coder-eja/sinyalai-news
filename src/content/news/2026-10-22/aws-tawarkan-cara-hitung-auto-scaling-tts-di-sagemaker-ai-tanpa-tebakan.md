---
title: "AWS Tawarkan Cara Hitung Auto Scaling TTS di SageMaker AI Tanpa Tebakan"
summary: "AWS (22/10) mempublikasikan panduan deploy model text-to-speech Kokoro-82M di Amazon SageMaker AI dengan kebijakan auto scaling yang diturunkan dari dua pengukuran langsung pada endpoint, bukan dari tebakan."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/stop-guessing-auto-scaling-targets-for-tts-on-amazon-sagemaker-ai/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-22T16:30:06.000Z
draft: false
sourceTitle: "Stop guessing auto scaling targets for TTS on Amazon SageMaker AI"
categories: ["Rilis Model","Penerapan Industri","Riset & Kebijakan"]
---

Tim yang menjalankan model text-to-speech (TTS) di Amazon SageMaker AI sering menebak-nebak ambang batas auto scaling. Tebakan yang keliru bisa membuat GPU menganggur dan biaya membengkak, atau membuat latensi melewati janji layanan (SLO) saat lonjakan trafik terjadi. Berdasarkan tulisan di blog resminya, AWS (22/10) membagikan pendekatan yang menggantikan tebakan itu dengan dua angka yang diukur langsung dari endpoint yang sudah berjalan: Q_max, yaitu concurrency tertinggi yang masih bisa dilayani satu instance tanpa melanggar SLO, dan T_total, yaitu durasi penuh sebuah scale-out dari awal hingga instance baru siap melayani.

Dari dua angka tersebut, tim bisa menurunkan ambang scale-out, ambang scale-in, dan cooldown lewat perhitungan sederhana. AWS menggunakan Kokoro-82M, model TTS dengan 82 juta parameter, sebagai contoh. Model ini dijalankan di dalam kontainer khusus pada endpoint real-time SageMaker AI, dan seluruh deployment diatur lewat AWS CDK. Setiap angka yang muncul di panduan berasal dari pengukuran terhadap deployment nyata di repositori aws-samples yang dirujuk dalam tulisan tersebut.

Alasan pendekatan ini dibuat cukup jelas: metrik auto scaling bawaan SageMaker AI biasanya dirancang untuk panggilan request/response singkat atau untuk serving large language model (LLM) dengan satuan token per detik. TTS tidak cocok dengan pola itu. Sebuah permintaan TTS menahan koneksi terbuka selama beberapa detik tanpa ada loop generasi token yang bisa dipasang metrik. Kokoro-82M sendiri bersifat non-autoregressive, turunan StyleTTS2 dengan decoder ISTFTNet, dan menghasilkan satu ucapan utuh dalam satu lintasan. Yang menentukan apakah sebuah instance TTS kelebihan beban sebenarnya sederhana: berapa banyak permintaan yang sedang antre dan berjalan di instance itu pada saat yang sama.

Karena itulah panduan ini menggunakan ConcurrentRequestsPerModel, metrik native yang diterbitkan SageMaker AI sendiri, sehingga kontainer tidak perlu memancarkan metrik kustom yang rentan salah konfigurasi. AWS CDK yang dipakai dalam contoh ini hanya memasang resource auto scaling setelah rencana pengukuran untuk model tersebut benar-benar ada, sehingga konfigurasi hasil tebakan tidak akan pernah diam-diam masuk ke produksi.

Secara umum, auto scaling adalah mekanisme cloud yang menambah atau mengurangi jumlah instance secara otomatis mengikuti beban. Pada layanan dengan latensi sensitif seperti TTS, menentukan kapan harus menambah kapasitas menjadi penting: menambah terlalu cepat berarti membayar GPU yang jarang dipakai, menambah terlalu lambat berarti pengguna mendengar suara yang tertunda. Pendekatan AWS di sini berusaha membuat keputusan itu berangkat dari data, bukan dari perkiraan.
