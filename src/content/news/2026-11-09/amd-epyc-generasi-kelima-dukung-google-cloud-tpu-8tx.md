---
title: "AMD EPYC Generasi Kelima Dukung Google Cloud TPU 8tx"
summary: "Google Cloud TPU 8tx memakai AMD EPYC generasi kelima sebagai CPU host. Menurut AMD dan Google Cloud, kombinasi ini menghadirkan confidential computing berbasis perangkat keras untuk memproses data dan model AI sensitif."
company: "AMD"
source: "https://ir.amd.com/news-events/press-releases/detail/1304/amd-epyc-expands-its-leadership-at-the-foundation-of-ai"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-09T08:00:00.000Z
draft: false
sourceTitle: "AMD EPYC Expands Its Leadership at the Foundation of AI"
categories: ["Standar Umum"]
---

Berdasarkan rilis resmi AMD (09/11), AMD EPYC generasi kelima menjadi CPU host, yaitu processor pengendali utama, untuk Google Cloud TPU 8tx. Menurut AMD dan Google Cloud, sistem ini merupakan sistem TPU cloud pertama yang menerapkan confidential computing dengan keamanan yang ditegakkan oleh perangkat keras, atau perlindungan data ketika sedang diproses. Kolaborasi tersebut menggabungkan EPYC, kemampuan keamanan AMD Infinity Guard, dan kompatibilitas x86 dengan akselerator TPU untuk menjalankan inferensi, penyesuaian halus, serta pembelajaran penguatan pada beban kerja AI yang sensitif.

Dalam susunan tersebut, TPU atau Tensor Processing Unit menjalankan perhitungan AI yang berat, sedangkan EPYC menyiapkan data, menjadwalkan pekerjaan, dan mengelola komunikasi berkecepatan tinggi dengan TPU. Dalam satu alur sederhana, aplikasi mengirim permintaan, EPYC menyiapkan bahan yang dibutuhkan, TPU menjalankan model, lalu hasilnya dikembalikan kepada aplikasi. Inferensi berarti menggunakan model terlatih untuk menghasilkan jawaban, sedangkan penyesuaian halus berarti melatih ulang model dengan data tambahan. Sebagai ilustrasi umum, sebuah tim teknologi informasi dapat menjalankan agen AI untuk mencari jawaban di dalam dokumen internal. EPYC menjadi jalur pengendali proses, sementara TPU membantu menghitung jawaban dari dokumen tersebut.

Proteksi data pada TPU 8tx menggunakan Secure Encrypted Virtualization atau SEV yang tersedia di dalam EPYC. Sebelum TPU yang terhubung memperoleh akses langsung ke memori terlindungi, identitas dan konfigurasi keamanannya diperiksa terlebih dahulu. AMD dan Google Cloud menyatakan bahwa perintah pengguna, bobot model, dan data antara tetap terenkripsi di memori CPU serta selama perpindahan menuju akselerator. Eksekusi pada TPU juga berlangsung dalam isolasi perangkat keras, sehingga perlindungan tidak hanya berlaku pada CPU.

Kerja sama AMD dan Google Cloud mencakup penggunaan EPYC pada virtual machine Compute Engine C4D, N4D, H4D, Z4D, dan G4. Teknologi SEV AMD juga digunakan dalam layanan Google Cloud seperti Confidential VMs, Confidential GKE, Confidential Space, Confidential Managed Service for Apache Spark, dan Confidential Dataflow. TPU 8tx memperluas penggunaan tersebut ke beban kerja AI yang dipercepat dengan TPU. Menurut klaim AMD, EPYC telah menjadi pilihan CPU host di lebih dari 10 penyedia cloud berskala besar dan laboratorium AI, termasuk pada sistem yang memakai AMD Instinct GPU, Nvidia GPU, serta chip akselerator khusus.

Secara umum, confidential computing melengkapi enkripsi saat data disimpan dan saat ditransmisikan dengan perlindungan ketika data sedang dihitung. Dalam TPU 8tx, lapisan tersebut menghubungkan CPU EPYC dengan akselerator Google Cloud, sehingga data sensitif dapat diproses dalam lingkungan cloud sambil tetap berada dalam kontrol enkripsi dan isolasi yang dikelola perangkat keras.
