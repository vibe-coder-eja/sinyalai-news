---
title: "NVIDIA Percepat Generasi Gambar FLUX 3 Image Klein di GPU Blackwell Lewat TensorRT LLM VisualGen"
summary: "NVIDIA (06/11) merilis panduan optimasi untuk menjalankan model FLUX 3 Image Klein dari Black Forest Labs di GPU Blackwell B200. Lewat runtime TensorRT LLM VisualGen, kombinasi NVFP4, caching, dan paralelisme multi-GPU memangkas latensi generasi gambar hingga 4,45 kali."
company: "NVIDIA"
source: "https://developer.nvidia.com/blog/speed-up-image-generation-with-flux-3-image-klein-on-nvidia-blackwell-gpus/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-06T22:20:20.000Z
draft: false
sourceTitle: "Speed Up Image Generation with FLUX 3 Image Klein on NVIDIA Blackwell GPUs"
categories: ["Fitur & Skills","Produk Baru","Penerapan Industri"]
---

Berdasarkan panduan teknis NVIDIA (06/11), perusahaan merilis konfigurasi dan optimasi untuk menjalankan model FLUX 3 Image Klein dari Black Forest Labs di GPU Blackwell B200 lewat runtime TensorRT LLM VisualGen. Model ini menggabungkan Qwen3-VL-4B-Instruct untuk pemrosesan teks, diffusion transformer untuk membentuk gambar, dan autoencoder untuk menghasilkan serta mengedit gambar beresolusi tinggi. NVIDIA menyediakan varian Base dan distilled agar developer bisa memilih antara kualitas dan kecepatan sesuai kebutuhan.

Bagi tim yang menjalankan fitur generasi gambar di aplikasi desain atau editor visual, latensi menjadi perhatian utama: satu gambar melewati model dengan miliaran parameter secara bertahap, dan resolusi yang lebih tinggi membuat proses ini makin berat. NVIDIA menjawabnya dengan serangkaian optimasi pada TensorRT LLM VisualGen, termasuk kuantisasi NVFP4, kernel GEMM yang difusikan, perhatian (attention) presisi rendah, caching, dan paralelisme multi-GPU. Hasilnya, pada pengujian internal NVIDIA di resolusi 2048x2048 pada satu GPU B200, kombinasi optimasi mencapai peningkatan kecepatan hingga 3,46 kali untuk text-to-image dan 4,45 kali untuk image-to-image dibanding inference BF16 tanpa kompilasi.

Kuantisasi NVFP4 menjadi titik awal optimasi. Menurut NVIDIA, NVFP4 menghasilkan text-to-image hingga 1,62 kali lebih cepat dan image-to-image hingga 1,58 kali lebih cepat dibanding BF16. Setelah itu, perhatian difokuskan pada tahap denoising yang menyita lebih dari 84 persen total waktu pemrosesan. NVIDIA menguji beberapa pendekatan: perhatian FP8 dari cuDNN dan VC-Attention, dengan VC-Attention FP8 pada anggaran perbaikan 0,005 memberikan peningkatan 1,18 kali untuk model Base maupun distilled di 2048x2048. Sol-Attention sparse attention dengan τ=1,0 dan 12 langkah dense awal mempercepat denoising plus decoding Base hingga 1,30 kali, sementara 16 langkah dense mengunggulkan fidelitas dengan 1,24 kali. Cache-DiT step caching hampir memangkas latensi Base setengahnya, mencapai 1,94 kali lebih cepat di 2048x2048 dengan skor LPIPS 0,033.

Untuk beban kerja yang lebih berat, NVIDIA juga menunjukkan penskalaan multi-GPU. Dengan classifier-free guidance dan paralelisme Ulysses pada delapan GPU B200, latensi median text-to-image untuk model Base turun dari 14,90 detik menjadi 3,00 detik, dengan peningkatan kecepatan denoising 6,01 kali. Varian distilled turun dari 2,73 detik menjadi 1,08 detik dengan peningkatan 4,44 kali.

Secara umum, diffusion transformer adalah arsitektur model yang menghasilkan gambar bertahap dari noise acak hingga gambar utuh, dan kuantisasi adalah teknik menurunkan presisi angka perhitungan agar lebih ringan tanpa mengubah hasil secara berarti. NVIDIA menyediakan konfigurasi YAML siap pakai beserta instruksi deployment di repositori TensorRT LLM, sehingga developer dapat menyesuaikan optimasi ini dengan beban kerja masing-masing.
