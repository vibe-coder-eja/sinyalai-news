---
title: "NVIDIA Percepat Perhatian NVFP4 di RTX Blackwell Lewat Teknik Register Recycling"
summary: "NVIDIA (25/11) merilis panduan optimasi kernel SageAttention3 untuk GPU RTX PRO 6000 Blackwell yang memakai NVFP4 4-bit. Teknik register recycling memangkas waktu idle Tensor Core hingga 1,64 kali, dan platform Reactor melaporkan penurunan latensi inferensi hingga 15,34% pada model video generatif."
company: "NVIDIA"
source: "https://developer.nvidia.com/blog/how-to-optimize-nvfp4-attention-on-nvidia-rtx-blackwell-through-register-recycling/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-25T19:30:00.000Z
draft: false
sourceTitle: "How to Optimize NVFP4 Attention on NVIDIA RTX Blackwell Through Register Recycling"
categories: ["Rilis Model","Produk Baru"]
---

NVIDIA (25/11) mempublikasikan panduan teknis untuk mempercepat kernel perhatian (attention) NVFP4 pada GPU NVIDIA RTX PRO 6000 Blackwell melalui teknik yang disebut register recycling. Optimalisasi ini membuat kernel SageAttention3 mencapai peningkatan latensi hingga 1,64 kali lipat dibanding versi sebelumnya, dan inti kodenya telah digabungkan ke cabang utama FlashInfer agar bisa diadopsi komunitas luas.

NVFP4 adalah format perkalian matriks 4-bit yang diperkenalkan bersama arsitektur Blackwell. Format ini menawarkan throughput Tensor Core lebih tinggi dibanding BF16 untuk beban kerja attention, tetapi mempertahankan throughput tinggi tersebut bukan perkara mudah: tahapan softmax, perpindahan data, dan penyimpanan sementara harus diatur hati-hati agar Tensor Core tidak menganggur menunggu satu sama lain. Pada GPU Blackwell data center, attention umumnya terhambat oleh softmax; pada varian RTX Blackwell, attention justru terhambat oleh operasi perkalian matriks (MMA) ketika memakai BF16.

Solusi yang diajukan NVIDIA adalah menjadwal ulang pipeline di dalam CTA (cooperative thread array) SageAttention3. Setiap tile skor N128 dipecah menjadi dua slot register N64. Setelah softmax menguantisasi keluaran tile saat ini ke NVFP4, register tersebut langsung dipakai kembali untuk memulai perkalian QK pada tile berikutnya, sehingga pekerjaan tile baru berjalan paralel dengan sisa operasi tile lama. Hasilnya, Tensor Core tetap sibuk tanpa perlu menambah buffer skor kedua.

Dampak di dunia nyata dilaporkan oleh Reactor, platform infrastruktur untuk menyebarkan model video, robotika, dan world model secara real-time. Setelah mengintegrasikan kernel hasil optimasi ini ke stack produksi mereka, Reactor mencatat penurunan latensi inferensi end-to-end hingga 15,34% pada empat beban kerja: LongLive, Helios, OmniDreams, dan Cosmos 3 Nano. Angka-angka tersebut merupakan klaim perusahaan berdasarkan benchmark internal mereka.

Secara umum, attention adalah komponen inti dalam model generatif modern yang menentukan bagian mana dari input atau konteks yang perlu diperhatikan model pada setiap langkah. Pada model video dan world model yang memproses urutan sangat panjang, attention sering menjadi bottleneck komputasi, sehingga setiap peningkatan efisiensi pada tahap ini langsung terasa pada kecepatan respons. NVIDIA menyediakan API NVFP4 attention untuk SM120 dan panduan instalasi di repositori FlashInfer bagi developer yang ingin mencoba optimalisasi ini pada lapisan attention model mereka sendiri.
