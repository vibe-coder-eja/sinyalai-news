---
title: "AWS Tambahkan Partitioning GPU NVIDIA MIG di Amazon SageMaker Inference"
summary: "AWS (06/11) menambahkan partitioning GPU berbasis NVIDIA MIG ke Amazon SageMaker Inference, sehingga satu GPU dapat dibagi menjadi partisi terisolasi untuk menjalankan beberapa model dengan alokasi memori dan komputasi terpisah."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/sagemaker-inference-now-supports-multi-instance-gpu-to-maximize-gpu-utilization-for-model-endpoints/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-06T18:01:00.000Z
draft: false
sourceTitle: "SageMaker Inference now supports Multi-Instance GPU to maximize GPU utilization for model endpoints"
categories: ["Produk Baru"]
---

Dalam rilis resmi AWS (06/11), Amazon SageMaker Inference menambahkan partitioning GPU melalui NVIDIA Multi-Instance GPU (MIG). Fitur ini membagi satu GPU, unit pemrosesan grafis yang menjalankan model AI, menjadi beberapa partisi independen. Setiap partisi memperoleh bagian tetap dari unit komputasi serta blok memori khusus, dengan isolasi yang ditegakkan oleh perangkat keras. Model berbeda dapat ditempatkan pada setiap partisi, sementara model yang lebih kecil dapat memakai porsi GPU baru tanpa harus memperoleh satu akselerator penuh.

Menurut AWS, pendekatan ini memungkinkan pelanggan menjalankan lebih banyak model daripada jumlah GPU yang tersedia. Model tetap berada di partisi masing-masing sehingga tidak mengalami penalti pemuatan ketika menerima permintaan. Isolasi perangkat keras juga mencegah lonjakan trafik, kegagalan, atau kesalahan memori pada satu partisi untuk langsung memengaruhi model lain. Dukungan ini relevan bagi tim yang menjalankan beberapa varian model atau menyediakan model terpisah untuk setiap pelanggan dalam satu layanan.

Partitioning hanya berlaku pada endpoint yang memakai inference components, yaitu komponen untuk menjalankan beberapa model dalam satu endpoint dan mengatur komputasi setiap model. Endpoint model tunggal, endpoint tanpa server, serta kumpulan instance dengan konfigurasi berbeda tidak dapat dipartisi. Jumlah partisi bergantung pada GPU dan tidak pernah melebihi tujuh. Layout partisi harus dipilih ketika endpoint dibuat, sedangkan model yang membutuhkan lebih dari satu GPU tetap harus memakai perangkat GPU penuh.

Pengguna menambahkan dua kolom opsional pada panggilan API atau antarmuka pemrograman aplikasi yang sudah digunakan. AWS menangani konfigurasi GPU, penempatan partisi, dan penskalaan. Dengan demikian, pengguna tidak perlu mengelola driver, plugin perangkat, penjadwalan, dan konfigurasi partisi sendiri seperti pada implementasi MIG melalui Kubernetes yang dikelola langsung.

Salesforce, yang membantu menyusun kebutuhan dan memvalidasi implementasi awal, menyatakan sedang menyiapkan pengujian dengan beban kerja produksi yang mewakili penggunaan nyata. Secara umum, MIG membagi satu GPU menjadi beberapa instance komputasi dengan sumber daya terpisah. Berbeda dari multi-model endpoint yang memuat dan unload model secara bergantian, setiap partisi MIG dapat mempertahankan modelnya sendiri dengan sumber daya yang terisolasi.
