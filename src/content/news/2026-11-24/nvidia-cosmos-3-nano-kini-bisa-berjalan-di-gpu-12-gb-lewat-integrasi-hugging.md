---
title: "NVIDIA Cosmos 3 Nano Kini Bisa Berjalan di GPU 12 GB lewat Integrasi Hugging Face Diffusers"
summary: "NVIDIA (24/11) merilis panduan dan adapter Cosmos-Framework yang memungkinkan model video Cosmos 3 Nano dijalankan di GPU konsumen dengan VRAM 12 GB. Pendekatan ini menyimpan bobot model di RAM sistem dan memindahkannya ke GPU saat dibutuhkan, dengan dukungan tujuh mode generasi termasuk teks-ke-video dan gambar-ke-video."
company: "NVIDIA"
source: "https://developer.nvidia.com/blog/how-to-run-nvidia-cosmos-3-on-local-ai-devices-using-hugging-face-diffusers/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-24T18:44:05.000Z
draft: false
sourceTitle: "How to Run NVIDIA Cosmos 3 on Local AI Devices Using Hugging Face Diffusers"
categories: ["Rilis Model"]
---

NVIDIA (24/11) mempublikasikan panduan teknis untuk menjalankan Cosmos 3 Nano, model dasar dunia yang menghasilkan video dari teks, gambar, dan masukan lain, di perangkat AI lokal dengan GPU yang hanya memiliki VRAM 12 GB. Kunci kemampuannya adalah paket offloading Cosmos-Framework yang bekerja sama dengan pustaka Hugging Face Diffusers, sehingga bobot model disimpan di RAM sistem dan dialirkan ke GPU saat proses generasi berlangsung.

Cosmos 3 Nano adalah model omnimodal terbuka untuk pengembangan AI fisik, dengan dua jalur pelengkap di dalam transformernya: jalur pemahaman yang menafsirkan prompt dan masukan pengondisi, serta jalur generasi yang menghasilkan video. Adapter baru ini mengoordinasikan kapan kedua jalur tersebut berjalan dan mengelola memori untuk proses denoising, variational autoencoder (VAE) yang mengkodekan serta mendekode video, dan pemeriksaan keamanan. Adapter mendukung tujuh mode generasi, antara lain teks-ke-video, gambar-ke-video, video-ke-video, generasi suara, generasi aksi, dan generasi dengan panduan kontrol, melalui pipeline modular Diffusers.

Untuk menekan penggunaan memori GPU lebih jauh, NVIDIA menyediakan checkpoint FP8 dengan presisi campuran yang mempertahankan BF16 scaled dot-product attention pada lapisan attention. Hasil benchmark pada GPU GeForce RTX 5070, 5080, 4090, dan 5090 menunjukkan latensi pipeline dan puncak penggunaan memori untuk tiap resolusi dan mode. Menurut NVIDIA, RTX 5070 dapat menyelesaikan teks-ke-video 720p dalam 2.624,9 detik dengan puncak memori 9,94 GiB menggunakan BF16. Pengguna yang ingin iterasi lebih cepat pada GPU 12 GB dapat menurunkan resolusi ke 480x848 atau 240x432.

Paket offloading bekerja dengan empat mekanisme: bobot checkpoint yang tidak sedang dibutuhkan tetap di RAM sistem dalam format BF16 atau FP8, blok transformer berikutnya dipindahkan ke GPU saat diperlukan, setiap perkalian matriks dan operasi attention dijalankan di CUDA, dan adapter mengelola memori untuk denoising, VAE, serta pemeriksaan keamanan. Checkpoint tetap berada di disk antar-pemakaian, sementara RAM sistem menjadi tempat penyimpanan sementara bobot yang tidak sedang di GPU. NVIDIA menguji lingkungan dengan sekitar 128 GB RAM sistem dan GPU konsumen CUDA-enabled menggunakan PyTorch dengan Python 3.12.

Cosmos 3 Nano beserta cabang FP8-nya tersedia untuk diunduh di Hugging Face, sementara contoh kode dan perintah benchmark berada di repositori Cosmos-Framework. NVIDIA juga merujuk pada panduan optimasi memori Diffusers untuk CPU offloading dan dokumentasi pipeline Cosmos 3 untuk alur generasi yang didukung.

Secara umum, world foundation model adalah model besar yang mensimulasikan aspek dunia fisik untuk melatih dan menguji sistem AI fisik seperti robot. Pendekatan CPU offloading memungkinkan model yang lebih besar dari kapasitas VRAM dijalankan di perangkat konsumen dengan mengorbankan latensi dan menambah lalu lintas data antara RAM sistem dan GPU melalui jalur PCIe, sehingga bukan solusi untuk penggunaan interaktif.
