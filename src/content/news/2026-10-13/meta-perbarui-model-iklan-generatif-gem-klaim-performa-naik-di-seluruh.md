---
title: "Meta Perbarui Model Iklan Generatif GEM, Klaim Performa Naik di Seluruh Permukaannya"
summary: "Meta (13/10) memperkenalkan pembaruan model iklan generatif GEM yang kini memakai arsitektur terpusat lintas Facebook, Instagram, dan Reels. Perusahaan mengklaim peningkatan konversi 18,9% dan kenaikan rasio klik 12% di berbagai permukaan dan tujuan iklan."
company: "Meta"
source: "https://engineering.fb.com/2026/10/13/ml-applications/generative-ads-model-gem-scaling-frontier-ads-ai/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-13T16:01:00.000Z
draft: false
sourceTitle: "Meta’s Generative Ads Model (GEM): Scaling the Central Model and Compute Engine for Frontier Ads AI"
categories: ["Rilis Model","Produk Baru","Penerapan Industri"]
---

Meta (13/10) mengumumkan pembaruan besar pada Generative Ads Model (GEM), sistem rekomendasi iklan yang kini digabung menjadi satu model fondasi tunggal untuk seluruh permukaan iklannya. Dalam tulisan di blog tekniknya, tim Meta menjelaskan bahwa GEM generasi 2026 dirancang untuk belajar dari data dan sinyal lintas Facebook, Instagram, Reels, Stories, hingga konversi di luar aplikasi, sehingga satu mesin komputasi pusat dapat melayani berbagai tujuan iklan sekaligus.

Selama setahun terakhir, Meta mengklaim GEM memberikan peningkatan konversi sebesar 18,9% dan kenaikan rasio klik iklan (CTR) sebesar 12% di seluruh permukaan dan objektif iklan. Rinciannya, kontribusi tambahan terhadap konversi tercatat 5,8% di Facebook, 4,1% di Instagram, dan 1,6% pada konversi di luar situs untuk pengguna yang ditargetkan. Angka-angka ini ditulis Meta sebagai hasil internal perusahaan.

Pembaruan ini berpusat pada empat aspek teknis. Pertama, tim membangun arsitektur baru bernama Kunlun yang dirancang bersama perangkat keras GPU terbaru. Meta menyatakan Kunlun memungkinkan kompleksitas model tumbuh 2,5 kali lipat dibanding versi GEM sebelumnya dengan pola penskalaan yang mirip model bahasa besar (LLM), sehingga kapasitas lebih besar dan konteks lebih panjang menghasilkan peningkatan kualitas pemeringkatan. Kedua, teknik pasca-pelatihan bernama LoopFM dipakai untuk memindahkan representasi internal GEM ke model yang melayani pengguna secara langsung, menggandakan transfer intelijen tanpa menambah biaya komputasi atau latensi. Ketiga, GEM dijadikan satu mesin komputasi terpadu yang memprediksi klik dan konversi lintas permukaan secara bersamaan, dengan teknik pencampuran data dan kerangka domain expert agar pembelajaran heterogen dalam skala besar tetap dapat dikelola. Keempat, Meta melatih GEM dengan kernel khusus dan strategi paralelisme lima dimensi di ribuan GPU, menggandakan efisiensi pelatihan menjadi 20–25% model FLOPS utilization (MFU) dan melipatgandakan total FLOPs pelatihan menjadi empat kali lipat.

Secara umum, sistem rekomendasi adalah mesin yang menentukan iklan atau konten apa yang muncul saat seseorang membuka aplikasi, dengan mempertimbangkan riwayat interaksi, minat, dan konteks. Istilah LLM merujuk pada model bahasa besar, yaitu sistem AI dengan banyak parameter yang biasa dipakai untuk memahami dan menghasilkan teks; Meta menggunakan pendekatan serupa untuk iklan. Dengan menggabungkan banyak model terpisah menjadi satu fondasi terpusat, perusahaan berupaya agar penayangan iklan lebih konsisten di seluruh aplikasi dan tujuan kampanye, baik untuk kesadaran merek, pertimbangan, maupun pembelian.
