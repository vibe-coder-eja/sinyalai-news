---
title: "AWS Ungkap Cara Amazon Marketplace Menilai Kualitas Konten Produk Lewat SageMaker AI"
summary: "Amazon Marketplace menggunakan Amazon SageMaker AI untuk menilai kualitas A+ Content secara menyeluruh dengan model bahasa-penglihatan, sinyal keterbacaan OCR, dan classifier CatBoost, lalu menghasilkan rekomendasi perbaikan bagi penjual."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/how-amazon-marketplace-evaluates-content-quality-with-amazon-sagemaker-ai/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-05T18:06:43.000Z
draft: false
sourceTitle: "How Amazon Marketplace evaluates content quality with Amazon SageMaker AI"
categories: ["Rilis Model","Kerjasama Industri","Penerapan Industri"]
---

Amazon Marketplace menilai kualitas A+ Content—widget media di halaman detail produk Amazon—secara otomatis menggunakan Amazon SageMaker AI, sebagaimana dijelaskan AWS (05/11) dalam unggahan di blog Machine Learning-nya. Pendekatan ini dirancang untuk membantu penjual, mulai dari merek besar dengan tim desain internal hingga merek kecil dengan sumber daya terbatas, menjaga konsistensi kualitas konten yang memuat teks, gambar, dan video.

Alih-alih menilai setiap aset secara terpisah, sistem merender halaman produk utuh menjadi satu tangkapan layar, lalu menyerahkannya ke vision-language model (VLM) untuk dinilai secara holistik. Hasil skor VLM kemudian digabungkan dengan sinyal keterbacaan dari OCR dalam classifier CatBoost—pustaka gradient-boosted decision tree—yang dilatih menggunakan anotasi dari penilai ahli. Dengan cara ini, skor yang dihasilkan lebih selaras dengan standar kualitas internal Amazon Marketplace.

Setiap keputusan kualitas juga dijelaskan menggunakan SHAP, metode explainability yang menandai faktor paling berpengaruh di balik sebuah skor. Penjual tidak hanya mendapat angka, tetapi juga rekomendasi perbaikan yang diprioritaskan, misalnya inkonsistensi antara spesifikasi produk di daftar fitur dan foto gaya hidup, atau penempatan modul yang membuat pelanggan melihat konteks dapur sebelum produk utamanya. Seluruh pipeline, mulai dari penyerapan data, anotasi, penyajian model, hingga pemantauan produksi, dijalankan di atas Amazon SageMaker AI.

AWS juga menyebutkan komponen tambahan berbasis difusi yang dapat menghasilkan aset visual baru dari sinyal kualitas tersebut, meski rincian teknisnya tidak diuraikan lebih lanjut dalam unggahan ini. Pendekatan ini diposisikan sebagai cara menilai cerita produk secara utuh, bukan sekadar memeriksa setiap gambar atau teks satu per satu.

Secara umum, vision-language model adalah model AI yang menggabungkan encoder gambar dengan model bahasa besar, sehingga mampu menerima gambar dan instruksi sekaligus mengembalikan penilaian dalam bentuk teks. Sementara itu, A+ Content sendiri adalah fitur Amazon yang memungkinkan penjual memperkaya halaman produk dengan modul visual tambahan di luar spesifikasi baku, sehingga variasi kualitas antar-penjual menjadi tantangan tersendiri yang coba dijawab oleh sistem ini.
