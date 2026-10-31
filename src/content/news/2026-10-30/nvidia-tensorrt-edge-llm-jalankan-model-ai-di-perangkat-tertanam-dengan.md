---
title: "NVIDIA TensorRT Edge-LLM: Jalankan Model AI di Perangkat Tertanam dengan Beberapa Perintah"
summary: "NVIDIA (30/10) merilis TensorRT Edge-LLM, perangkat lunak ringan untuk menjalankan model AI di perangkat tertanam seperti Jetson Thor, DRIVE AGX Thor, dan IGX Thor, dengan pengembangan awal di DGX Spark 64GB."
company: "NVIDIA"
source: "https://developer.nvidia.com/blog/run-ai-models-for-edge-application-development-with-just-a-few-commands/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-30T20:33:18.000Z
draft: false
sourceTitle: "Run AI Models for Edge Application Development with Just a Few Commands"
categories: ["Standar Umum"]
---

Berdasarkan tulisan di blog developer NVIDIA (30/10), TensorRT Edge-LLM adalah perangkat lunak ringan berbasis C++ yang dirancang untuk menjalankan model AI di perangkat tertanam, bukan di server pusat data. Alat ini menjembatani tahap pengembangan di DGX Spark 64GB dengan tahap penerapan di platform seperti Jetson Thor, DRIVE AGX Thor, dan IGX Thor, sehingga pengembang tidak perlu berpindah-pindah kerangka kerja saat aplikasinya siap dipasang di perangkat keras tujuan.

Lewat antarmuka baris perintah bernama trtedge, pengembang cukup mengetik beberapa perintah untuk mengunduh model pilihan dan membangun TensorRT engine yang sudah dioptimalkan. Pada peluncuran pertama, sistem akan mengunduh model sekitar 21 GB dan menyusun engine; peluncuran berikutnya akan memakai engine yang sudah tersimpan di cache. Setelah siap, model bisa diuji langsung di terminal lewat sesi obrolan atau disajikan sebagai API lokal yang kompatibel dengan standar OpenAI, sehingga aplikasi lain bisa mengirim permintaan dan menerima jawaban secara streaming.

NVIDIA juga menyertakan fitur DSpark speculative decoding, yaitu teknik yang memakai model kecil sebagai draf untuk mengusulkan beberapa token sekaligus, lalu diverifikasi oleh model utama dalam satu putaran. Menurut NVIDIA, pada pengujian dengan tiga token draf menggunakan prompt HumanEval, kecepatan rata-rata naik dari 73,4 menjadi 126,9 token per detik, sementara penggunaan memori puncak tetap di 27,9 GB. Angka-angka ini merupakan klaim NVIDIA sendiri dan belum diverifikasi pihak independen.

Secara umum, TensorRT adalah mesin inferensi NVIDIA yang mengubah model AI menjadi bentuk yang lebih efisien untuk dijalankan di GPU, sementara inferensi adalah proses menjalankan model yang sudah jadi untuk menghasilkan jawaban dari data baru. Istilah "edge" merujuk pada komputasi yang terjadi di perangkat dekat sumber data, seperti kamera pintar, robot, atau kendaraan, sehingga respons bisa cepat dan tidak selalu bergantung pada koneksi internet ke pusat data. Contoh pemakaian yang diangkat NVIDIA antara lain memantau kondisi kabin dan perhatian pengemudi, membantu robot memahami lingkungan, serta mengoordinasi armada mesin di lini produksi.

Tulisan tutorial di blog NVIDIA memandu langkah demi langkah: menyiapkan lingkungan dengan Python 3.10 sampai 3.12 dan TensorRT 10.16.1.11, menjalankan sesi obrolan dengan model Nemotron-3.5 Lightning, menyajikan model lewat API lokal, hingga mengaktifkan DSpark untuk mempercepat generasi teks. Pengembang yang ingin mencoba model lain bisa melihat daftar model yang didukung, sementara dokumentasi TensorRT Edge-LLM memuat alur kerja dan kebutuhan spesifik untuk tiap platform target.
