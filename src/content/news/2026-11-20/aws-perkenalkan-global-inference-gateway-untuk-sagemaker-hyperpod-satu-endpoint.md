---
title: "AWS Perkenalkan Global Inference Gateway untuk SageMaker HyperPod, Satu Endpoint Lintas Region"
summary: "AWS memperkenalkan Global Inference Gateway pada SageMaker HyperPod, satu endpoint terkelola yang merutekan permintaan inferensi ke berbagai klaster di satu atau lintas region dengan failover otomatis."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/introducing-amazon-sagemaker-hyperpod-global-inference-gateway-one-endpoint-across-regions-and-clusters/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-20T22:35:24.000Z
draft: false
sourceTitle: "Introducing Amazon SageMaker HyperPod Global Inference Gateway: One endpoint across Regions and clusters"
categories: ["Produk Baru"]
---

Amazon SageMaker HyperPod memperkenalkan Global Inference Gateway, sebuah gateway terkelola yang merutekan permintaan inferensi ke seluruh klaster HyperPod yang didaftarkan, baik di satu region maupun lintas region, berdasarkan rilis resmi AWS (20/11). Layanan ini menjadi lapisan kedua dari arsitektur Inference Gateway yang sebelumnya hanya bekerja di dalam satu klaster.

Sebelumnya, tim yang menjalankan beberapa model di banyak klaster harus mengelola banyak endpoint sekaligus. Saat terjadi lonjakan trafik, permintaan bisa menumpuk di satu klaster yang sudah jenuh sementara GPU di klaster lain, termasuk di region berbeda, justru menganggur. Tanpa gateway global, klien harus memilih klaster sendiri, dan saat satu klaster gagal, engineer harus mengubah konfigurasi secara manual untuk memindahkan trafik. Global Inference Gateway menjawab masalah itu dengan satu endpoint yang memilih klaster terbaik, mengalihkan trafik secara otomatis ketika ada klaster yang gagal, dan menangani autentikasi lewat AWS Signature Version 4 (SigV4) serta AWS Identity and Access Management (IAM) di atas AWS PrivateLink.

Secara umum, AWS PrivateLink adalah layanan yang memungkinkan koneksi privat antar-layanan AWS tanpa melewati internet publik, sehingga lalu lintas tetap berada di dalam jaringan AWS. Dalam arsitektur ini, setiap permintaan yang masuk ke endpoint regional gateway akan diautentikasi, lalu diteruskan ke klaster yang paling sesuai melalui PrivateLink. Di dalam klaster, Inference Gateway yang sudah ada sebelumnya tetap memilih pod model yang tepat berdasarkan sinyal seperti utilisasi KV cache dan kedalaman antrean.

Pengguna hanya perlu melakukan dua langkah untuk menyiapkan gateway: memublikasikan klaster yang ingin dibuka untuk perutean, lalu membuat gateway dengan memanggil CreateGlobalInferenceGateway beserta daftar klaster yang akan dirutekan. AWS menangani penyediaan fleet perutean, konektivitas privat, sertifikat TLS, pemeriksaan kesehatan, dan failover. Klaster yang gagal akan otomatis ditinggalkan oleh gateway tanpa perubahan di sisi klien.

Jinhyung Park, VP (AI Platform) di Bagelcode, mengatakan dalam rilis yang sama bahwa uji coba beta Global Inference Gateway memungkinkan timnya merutekan permintaan lintas dua region melalui satu endpoint dan tetap melayani trafik saat satu klaster tidak lagi bisa menyajikan model, sehingga failover lintas region tercapai tanpa membangun lapisan perutean sendiri.

Secara umum, istilah KV cache merujuk pada memori yang digunakan model bahasa besar untuk menyimpan representasi tengah dari token yang sedang diproses; utilisasinya menjadi salah satu petunjuk seberapa penuh kapasitas pemrosesan sebuah pod pada saat tertentu.
