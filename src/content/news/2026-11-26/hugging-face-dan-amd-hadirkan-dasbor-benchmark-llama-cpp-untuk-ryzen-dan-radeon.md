---
title: "Hugging Face dan AMD Hadirkan Dasbor Benchmark llama.cpp untuk Ryzen dan Radeon"
summary: "Hugging Face (26/11) merilis dasbor benchmark llama.cpp × AMD yang menampilkan kinerja inferensi lokal pada perangkat keras AMD Ryzen dan Radeon, termasuk Radeon 8060S dan Radeon AI Pro R9700S."
company: "Hugging Face"
source: "https://huggingface.co/blog/ggml-org/llamacpp-amd-bench"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-26T11:37:17.000Z
draft: false
sourceTitle: "Introducing the llama.cpp benchmark dashboard for AMD Ryzen and Radeon"
categories: ["Rilis Model","Produk Baru","Riset & Kebijakan"]
---

Hugging Face (26/11) memperkenalkan dasbor benchmark llama.cpp × AMD yang dapat diakses publik lewat platformnya. Dasbor ini memungkinkan siapa pun membandingkan kinerja pemrosesan perintah dan pembangkitan teks pada perangkat keras AMD Ryzen dan Radeon, dengan memilih kombinasi model, tingkat kuantisasi, dan versi build llama.cpp secara langsung. Tujuannya sederhana: membuat perubahan performa dari waktu ke waktu mudah ditelusuri oleh komunitas developer AMD.

Pengguna dapat memilih perangkat keras, model, dan build llama.cpp lewat bilah konfigurasi di sisi kiri dasbor. Untuk saat ini, pilihan perangkat keras yang tersedia adalah Radeon 8060S (gfx1151) dan Radeon AI Pro R9700S (gfx1201). Setelah kombinasi dipilih, dasbor menampilkan dua metrik utama yang diukur dalam token per detik: PP512, yaitu kecepatan model memproses 512 token masukan tanpa pembangkitan, dan TG128, yaitu kecepatan membangkitkan 128 token dari konteks kosong. Keduanya dimulai dari kedalaman konteks nol agar hasil antar-konfigurasi bisa dibandingkan secara apples-to-apples.

Tiga tab utama membantu pengguna menggali data. Tab Overview membandingkan berbagai tingkat kuantisasi untuk satu kombinasi perangkat keras, model, dan build. Tab Build history menelusuri perubahan PP512 dan TG128 dari satu rilis build ke build berikutnya untuk kombinasi yang sama. Tab Context scaling menunjukkan bagaimana throughput pembangkitan turun atau bertahan saat konteks yang sudah ada makin panjang, sebuah skenario yang umum dijumpai saat percakapan dengan model berlangsung lama.

Data yang ditampilkan dasbor diambil langsung dari Storage Bucket publik ggml-org/install.sh-benches-data di Hugging Face, sehingga siapa pun bisa mengunduh hasil mentah, membuat grafik sendiri, atau membandingkannya dengan pengukuran lokal. Benchmark dijalankan mingguan lewat GitHub Actions menggunakan alat llama-bench dengan Flash Attention aktif dan nonaktif, masing-masing sebanyak 10 kali pengulangan per konfigurasi. Model yang diuji mencakup Inkling 2 Mini, Qwen, Gemma, gpt-oss, dan LFM, baik arsitektur padat maupun mixture-of-experts, dengan format GGUF mulai dari Q4_K_M, Q8_0, hingga presisi lebih tinggi seperti BF16 dan F16.

Secara umum, llama.cpp adalah perangkat lunak sumber terbuka yang menjalankan model bahasa besar langsung di komputer pribadi tanpa harus mengirim data ke server luar, sementara kuantisasi adalah teknik memadatkan model agar lebih ringan dengan sedikit mengorbankan akurasi. Bagi pengguna yang penasaran seberapa cepat laptop atau PC bertenaga AMD mereka bisa menjalankan model AI tertentu, dasbor ini pada dasarnya menjawab pertanyaan itu dengan angka yang bisa diverifikasi sendiri. Hugging Face juga mengundang komunitas untuk memberi masukan soal model dan skenario beban kerja yang ingin ditambahkan di pengukuran berikutnya.
