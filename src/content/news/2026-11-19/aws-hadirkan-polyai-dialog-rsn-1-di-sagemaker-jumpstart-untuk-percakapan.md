---
title: "AWS Hadirkan PolyAI Dialog-RSN-1 di SageMaker JumpStart untuk Percakapan Telepon Real-Time"
summary: "AWS mengumumkan ketersediaan PolyAI Dialog-RSN-1 di AWS Marketplace dan Amazon SageMaker JumpStart per 19/11. Model penalaran ini dirancang untuk menangani percakapan telepon secara real-time dengan memproses audio pemanggil secara langsung."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/polyai-dialog-rsn-1-is-now-on-amazon-sagemaker-jumpstart/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-19T17:28:47.000Z
draft: false
sourceTitle: "PolyAI Dialog-RSN-1 is now on Amazon SageMaker JumpStart"
categories: ["Rilis Model"]
---

Berdasarkan rilis resmi AWS (19/11), PolyAI Dialog-RSN-1, model penalaran (reasoning model) yang dirancang khusus untuk percakapan kompleks secara real-time, kini tersedia di AWS Marketplace dan Amazon SageMaker JumpStart. Ini menjadi model pertama dari PolyAI yang dapat diakses melalui AWS Marketplace.

Dialog-RSN-1 bekerja dengan cara mendengar audio pemanggil secara langsung, menalar kebutuhan mereka, dan merespons dalam satu proses tunggal (single pass). Tidak ada tahap terpisah untuk mengubah suara menjadi teks (speech-to-text) atau model penalaran tambahan untuk menentukan kapan harus berbicara. Pendekatan ini memungkinkan agen suara (voice agent) menangkap nada, keraguan, dan waktu bicara yang biasanya hilang jika hanya mengandalkan transkrip teks. Bayangkan pusat layanan pelanggan yang menerima ratusan panggilan setiap jam: model ini dapat mendeteksi frustrasi sejak awal dan merespons sebelum situasi memburuk.

Bagi pelanggan AWS, model ini dapat dipasang sebagai endpoint (titik akses) di Amazon SageMaker langsung dari lingkungan AWS milik pelanggan sendiri. Proses deployment dilakukan dengan satu klik dari konsol SageMaker AI melalui Model Hub, atau menggunakan SageMaker Python SDK dalam beberapa baris kode. SageMaker JumpStart menyiapkan tumpukan layanan (serving stack) yang sudah dikonfigurasi, sehingga pelanggan tidak perlu memilih kontainer atau tipe instans secara manual. AWS menyediakan profil optimasi bernama, seperti latency optimized untuk meminimalkan waktu tanggap dan throughput optimized untuk lalu lintas panggilan tinggi.

Endpoint berjalan sepenuhnya di dalam akun AWS pelanggan, di dalam VPC (Virtual Private Cloud) mereka, dengan kontrol akses melalui IAM (Identity and Access Management) dan pemantauan menggunakan Amazon CloudWatch. Audio dan transkrip pemanggil tetap berada dalam batas infrastruktur yang dikendalikan pelanggan, membantu memenuhi persyaratan residensi data dan auditabilitas. Model ini mendukung protokol OpenAI Realtime, sehingga klien Realtime yang sudah ada dapat terhubung dengan mengubah base URL. Audio masuk menggunakan format 16-bit PCM mono pada 16 atau 24 kHz, dengan koneksi hingga 30 menit, dan saat ini hanya mendukung bahasa Inggris.

Secara umum, Amazon SageMaker JumpStart adalah pusat model machine learning di dalam Amazon SageMaker AI yang berfungsi sebagai katalog untuk menemukan, menguji, dan menerapkan model pihak ketiga ke lingkungan produksi. Sementara itu, model penalaran (reasoning model) adalah jenis model AI yang tidak hanya menghasilkan jawaban, tetapi juga melakukan proses berpikir bertahap untuk memahami konteks dan mengambil keputusan yang lebih tepat, dalam hal ini menentukan kapan dan bagaimana merespons pemanggil di tengah percakapan yang sedang berlangsung.
