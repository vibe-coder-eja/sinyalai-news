---
title: "NVIDIA Vera Rubin Ungguli Semua Tolok Ukur MLPerf, Klaim Lonjakan Efisiensi untuk Agen AI"
summary: "NVIDIA (16/11) mengumumkan debut platform Vera Rubin di benchmark MLPerf Training v6.1 dan MLPerf Endpoints, mengklaim kemenangan di seluruh kategori serta peningkatan lebih dari 10 kali lipat throughput per watt untuk beban kerja agen AI dibanding generasi sebelumnya."
company: "NVIDIA"
source: "https://blogs.nvidia.com/blog/mlperf-training-endpoints-vera-rubin/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-16T16:00:25.000Z
draft: false
sourceTitle: "NVIDIA Sweeps MLPerf Training and Endpoints as Vera Rubin Debuts With Leading Performance"
categories: ["Fitur & Skills","Riset & Kebijakan"]
---

Platform NVIDIA Vera Rubin mencatatkan diri di puncak hasil benchmark MLPerf Training v6.1 dan MLPerf Endpoints pada debutnya, menurut rilis resmi NVIDIA (16/11). Dalam pengujian yang diterbitkan MLCommons tersebut, NVIDIA mengklaim menyapu seluruh kategori MLPerf Training dan menjadi satu-satunya pihak yang mengirimkan hasil di setiap benchmark pada putaran ini, mencakup model bahasa besar, image generation, recommender system, hingga reinforcement learning post-training.

Bayangkan sebuah agen perjalanan yang merencanakan dan memesan tiket pesawat, atau agen IT yang mendeteksi masalah sebelum pengguna melapor. Agen semacam ini bekerja lewat banyak langkah: bernalar, memanggil alat, lalu mengecek ulang hasilnya. Setiap langkah menghasilkan token, dan pusat data AI dibatasi oleh kapasitas listrik. Karena itu, semakin banyak token yang bisa dihasilkan per detik untuk setiap watt daya, semakin banyak agen yang bisa dilayani sekaligus. Pada benchmark MLPerf Endpoints untuk model Kimi K3 yang dirancang untuk alur kerja agen, sistem Vera Rubin NVL72 disebut menghasilkan lebih dari 10 kali lipat throughput per watt dibanding sistem GB300 NVL72 pada kecepatan respons yang sebanding.

Untuk pelatihan, NVIDIA melaporkan bahwa Vera Rubin NVL72 memberikan hingga 2 kali lipat performa per GPU dibanding sistem GB300 NVL72 yang sudah dioptimalkan. Pada benchmark DeepSeek-V3, platform ini disebut mempertahankan efisiensi sekitar 97 persen saat GPU diperbanyak dari 256 menjadi 1.024 unit, memangkas waktu pelatihan dari sekitar 16 menit menjadi sekitar 4 menit. NVIDIA juga menjalankan benchmark pada 10.240 GPU berbasis GB300, skala terbesar di putaran ini, yang kemudian disamai oleh Microsoft Azure dengan 10.240 GPU berbasis GB200.

Hasil pada skala besar seperti ini hanya bermakna bila ribuan GPU bisa bekerja bersama secara efisien. NVIDIA mengandalkan NVLink untuk menghubungkan GPU di dalam satu sistem agar bertindak sebagai satu kesatuan, lalu menggunakan jaringan InfiniBand Quantum-X800 dan Ethernet Spectrum-X untuk menghubungkan sistem-sistem tersebut di seluruh pusat data. Kombinasi perangkat keras dan perangkat lunak ini memungkinkan pelatihan model yang lebih besar dengan waktu yang lebih singkat.

Hasil benchmark ini dikumpulkan dari 20 mitra NVIDIA, termasuk ASUS, Azure, Cisco, CoreWeave, Crusoe, Dell, Google Cloud, HPE, Lambda, Nebius, Oracle, dan Supermicro. NVIDIA juga menyebut performa Vera Rubin memimpin pada benchmark independen seperti SemiAnalysis AgentX dan Artificial Analysis AgentPerf.

Secara umum, MLPerf adalah serangkaian benchmark terbuka yang dijalankan MLCommons untuk mengukur kecepatan dan efisiensi pelatihan serta inferensi sistem AI, sehingga hasil dari berbagai vendor bisa dibandingkan secara apples-to-apples. Istilah throughput per watt merujuk pada berapa banyak pekerjaan yang bisa diselesaikan sistem untuk setiap satuan daya listrik yang dikonsumsi, metrik yang semakin penting karena pusat data AI menghadapi keterbatasan energi dan pendinginan. Hasil Vera Rubin di MLPerf Endpoints untuk Kimi K3 berstatus provisional dan menunggu verifikasi MLCommons, sementara hasil GB300 sudah terverifikasi.
