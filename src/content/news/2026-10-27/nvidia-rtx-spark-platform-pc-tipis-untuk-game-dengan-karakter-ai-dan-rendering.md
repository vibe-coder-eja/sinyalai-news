---
title: "NVIDIA RTX Spark: Platform PC Tipis untuk Game dengan Karakter AI dan Rendering Neural"
summary: "NVIDIA (27/10) memperkenalkan RTX Spark, platform PC Windows berbasis GPU Blackwell untuk laptop tipis dan desktop ringkas, yang menjalankan DLSS 5 dengan neural rendering dan karakter AI berbasis Nemotron secara lokal."
company: "NVIDIA"
source: "https://developer.nvidia.com/blog/nvidia-rtx-spark-powers-neural-rendering-and-ai-characters-in-games/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-27T17:00:00.000Z
draft: false
sourceTitle: "NVIDIA RTX Spark Powers Neural Rendering and AI Characters in Games"
categories: ["Produk Baru"]
---

NVIDIA (27/10) memperkenalkan RTX Spark, platform PC Windows baru yang dirancang untuk pengembangan AI, kreasi konten, dan permainan di laptop tipis serta desktop ringkas. Platform ini digerakkan oleh GPU NVIDIA Blackwell RTX dan CPU NVIDIA Grace, dengan memori terpadu hingga 128 GB, serta dukungan penuh terhadap tumpukan CUDA dan teknologi RTX seperti ray tracing dan DLSS 5.

Bagi pemain, perubahan paling terasa hadir lewat DLSS 5 dengan 3D-Guided Neural Rendering, yang mulai didukung di RTX Spark lewat game NBA 2K27. Menurut NVIDIA, pembaruan model pada bulan Oktober berjalan dua kali lebih cepat dibanding versi September, memangkas beban kerja GPU sekitar setengahnya, dan menurunkan penggunaan VRAM pada resolusi 4K sebesar 20%. Pembaruan ini akan menjadi bawaan di game-game DLSS 5 berikutnya. NVIDIA juga menambahkan Performance Mode (Preset C) pada aplikasi NVIDIA versi beta untuk Frame Generation, dengan sedikit penurunan kualitas gambar demi kecepatan yang lebih tinggi.

Di sisi karakter AI dalam game, NVIDIA ACE memperkenalkan model bahasa kecil Nemotron 3.5 Bolt E4B 4GB yang berjalan langsung di perangkat. NVIDIA menyebut model ini memiliki kualitas rata-rata sekitar 40% lebih tinggi pada benchmark yang relevan dan menghasilkan hingga sekitar 80% lebih sedikit token dibanding model pesaing, sehingga interaksi karakter AI di game bisa lebih responsif. SDK In-Game Inferencing (IGI) tersedia untuk mengakses model ini pada perangkat GeForce RTX dan RTX Spark.

Untuk pengembang, NVIDIA RTX Kit membawa delapan SDK neural rendering ke RTX Spark, termasuk RTX Neural Texture Compression, RTX Mega Geometry, dan RTX Character Rendering untuk rambut serta kulit berbasis path tracing. Alat NVIDIA Nsight sudah mendukung alur kerja grafis pada aplikasi native Arm64, x64 yang diemulasi, dan Arm64EC sejak hari pertama, dengan installer Windows on Arm di Nsight Graphics 2026.3 dan installer tunggal untuk semua versi Windows di Nsight Systems 2026.5. NVIDIA juga merilis cabang RTX Branch untuk Unreal Engine 5.8, lengkap dengan plugin DLSS 4.5 yang sudah mendukung Windows on Arm, serta pembaruan MotionBricks dengan model gerakan manusia SOMA, checkpoint yang dapat diunduh, ekspor ONNX, dan implementasi referensi interaktif berbasis Newton.

Secara umum, neural rendering adalah teknik yang memakai model AI untuk menghasilkan atau meningkatkan bagian dari grafis—misalnya pencahayaan, tekstur, atau geometri—secara real time, sehingga kualitas visual bisa meningkat tanpa membebani GPU secara berlebihan. Istilah small language model (SLM) merujuk pada model bahasa berukuran ringkas yang dirancang untuk berjalan di perangkat lokal dengan sumber daya terbatas, berbeda dari model besar yang biasanya dijalankan di pusat data. Dengan menggabungkan keduanya di satu perangkat, NVIDIA berupaya membawa grafis berkualitas konsol dan karakter yang bisa berdialog secara alami ke dalam laptop tipis dan PC ringkas.
