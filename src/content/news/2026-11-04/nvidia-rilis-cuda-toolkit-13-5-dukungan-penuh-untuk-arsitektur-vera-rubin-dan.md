---
title: "NVIDIA Rilis CUDA Toolkit 13.5: Dukungan Penuh untuk Arsitektur Vera Rubin dan Fitur Baru untuk Pengembang"
summary: "NVIDIA mengumumkan ketersediaan umum CUDA Toolkit 13.5 yang membawa dukungan produksi untuk arsitektur GPU Vera Rubin, perluasan dukungan Windows on Arm ke DGX Station, serta pembaruan pada penjadwalan GPU, pustaka, dan alat pengembangan."
company: "NVIDIA"
source: "https://developer.nvidia.com/blog/nvidia-cuda-13-5-brings-nvidia-vera-rubin-ga-support/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-04T18:46:07.000Z
draft: false
sourceTitle: "NVIDIA CUDA 13.5 Brings NVIDIA Vera Rubin GA Support"
categories: ["Standar Umum"]
---

Berdasarkan rilis resmi NVIDIA di blog developer-nya (04/11), CUDA Toolkit 13.5 resmi tersedia untuk umum. Rilis ini membawa dukungan penuh untuk arsitektur GPU Vera Rubin, yang sebelumnya hanya tersedia dalam akses awal bagi pengembang dan kini siap dipakai di lingkungan produksi perusahaan. Selain itu, dukungan Windows on Arm yang sudah stabil sejak CUDA 13.4 kini meluas ke NVIDIA DGX Station untuk Windows.

Salah satu pembaruan utama ada pada cara aplikasi membagi sumber daya GPU. CUDA 13.5 memperkenalkan penyempurnaan locality domain, yaitu fitur yang membagi streaming multiprocessor (SM) atau unit pemroses utama di dalam GPU ke dalam kelompok sesuai kedekatan fisik. Pengembang kini bisa memilih antara partisi SM yang seragam di seluruh domain, atau partisi yang menyertakan seluruh SM yang tersedia. API cudaDevSmResourceSplit() membantu aplikasi menemukan jumlah SM di tiap partisi sehingga beban kerja bisa dibagi secara lebih merata.

Layanan NVIDIA Multi-Process Service (MPS) versi 3 juga mendapat pembaruan besar. MPS adalah mekanisme yang memungkinkan beberapa proses berbagi satu GPU dengan lebih efisien. Versi terbaru menambahkan weighted timeslicing, yaitu pengaturan agar proses yang membutuhkan lebih banyak waktu komputasi mendapat giliran lebih panjang. Ada pula fitur SM partition load balancing dengan kemampuan pinjam-meminjam: sebuah partisi bisa meminjam SM dari partisi lain saat sibuk, atau meminjamkan SM saat tidak ada klien yang aktif. NVIDIA juga menambahkan routing berbasis cgroup, mekanisme pengelompokan proses di Linux, agar kebijakan sumber daya MPS bisa mengikuti struktur proses yang digunakan peluncur beban kerja, serta fallback berbasis polling untuk pemantauan memori ketika notifikasi cgroup tidak tersedia.

Di sisi pustaka dan kompiler, CUDA Tile, fitur untuk menulis kernel yang berjalan efisien di GPU, kini mendukung komunikasi multi-GPU melalui NVLink dan NVSwitch, teknologi interkoneksi berkecepatan tinggi antar-GPU NVIDIA. CUDA Tile juga membuka pratinjau publik interoperabilitas SIMT, sehingga kernel Tile bisa memanggil fungsi dari pustaka seperti NVSHMEM, CCCL Coop, Warp, dan MathDx. Sementara itu, CUDA Python cuda.core 1.2 memperkenalkan copy_batch() untuk salinan memori secara berkelompok, serta pembaruan CUDA Graph yang lebih fleksibel tanpa perlu membuat ulang struktur graf. Pustaka CCCL 3.5 menambahkan API tuning publik untuk CUB, pemindaian floating-point yang dapat direproduksi, pemilihan Top-K secara berkelompok yang terintegrasi dengan FlashInfer, serta reduksi berbasis data dengan cuda::args::deferred.

Secara umum, CUDA adalah platform perangkat lunak inti dari NVIDIA yang menjembatani kode aplikasi dengan perangkat keras GPU. Toolkit ini menyediakan kompiler, pustaka, dan alat debugging yang dipakai peneliti serta praktisi untuk menjalankan komputasi paralel, mulai dari pelatihan model AI hingga simulasi ilmiah. Bagi tim yang mengelola banyak beban kerja di satu GPU, pembaruan MPS di CUDA 13.5 memberi cara baru untuk membagi sumber daya secara lebih adil dan adaptif, sementara dukungan Vera Rubin memastikan aplikasi yang ditulis hari ini siap memanfaatkan arsitektur GPU generasi berikutnya saat perangkat keras tersebut tersedia.
