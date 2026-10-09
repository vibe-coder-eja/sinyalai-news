---
title: "Google Rilis EmbeddingGemma 2, Model Embedding Multimodal Ringan untuk Perangkat Lokal"
summary: "Google merilis EmbeddingGemma 2, model embedding multimodal dengan 740 juta parameter yang mampu memproses teks, gambar, audio, dan video secara langsung di perangkat."
company: "Google"
source: "https://deepmind.google/blog/embeddinggemma-2-an-open-lightweight-multimodal-embedding-model/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-06T19:57:04.000Z
draft: false
archived: true
---

Google DeepMind meluncurkan EmbeddingGemma 2, model embedding multimodal sumber terbuka yang dirancang untuk pemrosesan langsung pada perangkat keras konsumen. Model ini dibangun di atas arsitektur Gemma 4 dan dirilis di bawah lisensi Apache 2.0, memiliki 740 juta parameter, serta mampu memetakan kombinasi teks, gambar, audio, dan video ke dalam ruang embedding terpadu. Peluncuran ini melanjutkan versi sebelumnya yang telah diunduh lebih dari 20 juta kali oleh komunitas developer.

EmbeddingGemma 2 menggunakan desain modular dengan komponen teks berkapasitas 270 juta parameter, serta encoder opsional untuk visi (170 juta parameter) dan audio (300 juta parameter). Model ini mendukung jendela konteks 8K token, mampu memproses hingga 5,5 menit audio, 29 gambar, atau 58 bingkai video dalam satu pemrosesan. Dalam benchmark MTEB Code, model ini mencatatkan peningkatan skor sebesar 9,92 poin, dari 68,76 menjadi 78,68, serta menunjukkan performa unggul pada tugas teks multibahasa, visi, dan audio di kelas sub-1B parameter.

Untuk efisiensi penyimpanan, EmbeddingGemma 2 menerapkan teknik Matryoshka Representation Learning (MRL) yang memungkinkan pemangkasan dimensi vektor output dari 768 menjadi 512, 256, atau 128 sesuai kebutuhan. Dengan kuantisasi, model ini hanya memerlukan sekitar 191 MB RAM aktif untuk beban kerja teks saja dan 567 MB untuk mode multimodal penuh pada Google Pixel 11 Pro. Bobot model tersedia di Hugging Face dan Kaggle, serta dapat dijalankan melalui framework seperti transformers, LiteRT, MLX, Ollama, dan llama.cpp. Google juga menyediakan aplikasi demo di Google AI Edge Gallery untuk fitur pencarian media instan dan pelacakan momen video berbasis kueri teks atau audio.
