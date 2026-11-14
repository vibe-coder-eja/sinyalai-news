---
title: "NVIDIA Buka Akses DLA di Jetson AGX Orin Lewat Python, Tanpa Perlu Tulis Kode C++"
summary: "NVIDIA (13/11) merilis modul cuda.bindings.cudla yang memungkinkan developer menjalankan inferensi di Deep Learning Accelerator Jetson AGX Orin langsung dari Python. API yang sama juga tersedia di laptop RTX Spark, membawa akselerasi DLA ke ranah pengembangan AI di Windows."
company: "NVIDIA"
source: "https://developer.nvidia.com/blog/run-native-dla-inference-in-python-on-nvidia-jetson-agx-orin-using-cudla/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-13T18:57:10.000Z
draft: false
sourceTitle: "Run Native DLA Inference in Python on NVIDIA Jetson AGX Orin Using cuDLA"
categories: ["Standar Umum"]
---

Developer yang bekerja di perangkat edge—mulai dari robotika hingga kamera pintar—kini bisa menjalankan model kecerdasan buatan langsung dari Python tanpa harus menulis kode C++ untuk mengatur akselerator. Berdasarkan tulisan di blog developer NVIDIA (13/11), modul cuda.bindings.cudla yang diperkenalkan lewat proyek CUDA Python versi 13.3.0 membuka akses ke NVIDIA Deep Learning Accelerator (DLA) pada Jetson AGX Orin lewat Python. Modul ini merupakan lapisan tipis hasil generasi otomatis Cython di atas API C++ cuDLA, dan dirancang untuk alur kerja hybrid-mode di mana CUDA stream mengoordinasikan eksekusi DLA bersama pekerjaan GPU lain.

DLA adalah akselerator fungsi tetap yang dirancang untuk operasi umum jaringan saraf seperti konvolusi dan pooling. Dengan memindahkan sebagian inferensi ke DLA, aplikasi bisa menghemat daya dan membebaskan GPU untuk tugas lain. Selama ini pengelolaan runtime DLA menuntut kode C++, sehingga cuDLA Python melengkapi alur kerja yang sudah ada: kompilasi model tetap memakai TensorRT, sementara orkestrasi runtime dan inferensi bisa dilakukan sepenuhnya di Python.

Siklus inferensi utuh berjalan dalam sembilan langkah: inisialisasi CUDA, pembuatan perangkat DLA dalam mode hybrid, pemuatan loadable yang sudah dikompilasi langsung dari memori, introspeksi tensor descriptor, alokasi buffer GPU, pendaftaran buffer ke cuDLA, penyalinan data input yang sudah dipra-proses, pengiriman task pada CUDA stream, dan sinkronisasi untuk membaca hasil. Semua pemanggilan cuDLA akan memunculkan exception Python saat gagal, sehingga developer bisa memakai pola try/finally untuk pembersihan sumber daya dan menangani kesalahan secara granular lewat enum cudla.Status.

Yang menarik, API Python cuDLA yang sama juga berlaku pada NVIDIA RTX Spark, laptop pengembangan AI berbasis Windows. Dengan begitu, developer yang menulis kode untuk Jetson bisa menjalankan logika inferensi yang sama di laptop tanpa perlu menulis ulang integrasi. Untuk memulai, developer di Jetson Orin yang menjalankan JetPack tidak perlu memasang SDK cuDLA terpisah karena pustaka libcudla.so sudah tersedia bersama instalasi JetPack. Satu hal yang perlu diperhatikan adalah Python bawaan JetPack bisa jadi lebih lama dari versi 3.10 yang menjadi syarat minimum, sehingga pemasangan Python 3.12 dari PPA deadsnakes mungkin diperlukan sebelum menginstal cuda-bindings versi 13.3.0 atau lebih baru.

Secara umum, istilah loadable merujuk pada berkas biner yang dihasilkan oleh alat TensorRT trtexec dan berisi jaringan saraf dalam format yang bisa dijalankan langsung oleh perangkat keras DLA. Setelah model dikompilasi menjadi loadable, inferensi tidak lagi membutuhkan TensorRT—cukup libcudla.so yang sudah tersedia di JetPack. Contoh kompilasi yang dibagikan NVIDIA menargetkan TensorRT 11.4.1 dengan CUDA 13.4 Update 1 di Jetson AGX Orin dengan JetPack 7.2.2 atau lebih baru, menggunakan model ONNX berpresisi FP16 dengan dimensi input tetap dan flag --useDLACore=0 untuk menargetkan mesin DLA pertama, serta --buildDLAStandalone agar loadable tidak bergantung pada TensorRT saat inferensi. Perlu dicatat bahwa TensorRT 11 menurunkan presisi dari tipe tensor model, sehingga flag --fp16 dan --int8 sudah tidak didukung. Tidak semua lapisan jaringan kompatibel dengan DLA, sehingga tahap pra-pemrosesan—termasuk konversi format gambar—tetap berjalan di GPU sebelum data diteruskan ke DLA lewat CUDA stream.
