---
title: "NVIDIA Mission Control 2.5 Bawa Pemulihan Otomatis ke Lingkungan Kubernetes"
summary: "NVIDIA (26/10) memperluas mesin pemulihan otomatis di Mission Control 2.5 ke beban kerja berbasis Kubernetes yang dikelola lewat NVIDIA Run:ai. Pembaruan ini memungkinkan pelatihan AI skala besar pulih sendiri dari kegagalan perangkat keras maupun perangkat lunak tanpa intervensi manual."
company: "NVIDIA"
source: "https://developer.nvidia.com/blog/how-nvidia-mission-control-2-5-brings-autonomous-recovery-to-kubernetes/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-26T15:00:00.000Z
draft: false
sourceTitle: "How NVIDIA Mission Control 2.5 Brings Autonomous Recovery to Kubernetes"
categories: ["Penerapan Industri"]
---

NVIDIA (26/10) merilis pembaruan Mission Control 2.5 yang membawa kemampuan pemulihan otomatis ke beban kerja berbasis Kubernetes, khususnya yang dikelola lewat NVIDIA Run:ai. Sebelumnya, fitur ini hanya tersedia untuk beban kerja komputasi performa tinggi (HPC) yang memakai penjadwal Slurm. Dengan pembaruan ini, pabrik AI yang menjalankan pelatihan terdistribusi dalam skala besar bisa mengandalkan sistem yang lebih mandiri dalam menangani kegagalan.

Pelatihan model AI berskala besar yang berjalan di ribuan GPU merupakan operasi berisiko tinggi. Sebuah pekerjaan bisa berlangsung berhari-hari hingga berminggu-minggu di ratusan node sekaligus, sehingga gangguan kecil pada perangkat keras, jaringan, atau perangkat lunak berpotensi menggagalkan keseluruhan proses. Pendekatan tradisional yang bergantung pada intervensi manual dan pemantauan reaktif dinilai tidak lagi memadai ketika banyak pekerjaan berjalan bersamaan di infrastruktur bersama.

Mission Control 2.5 menjawab tantangan itu dengan mesin pemulihan otomatis yang bekerja sebagai loop kontrol tiga lapis. Lapisan pertama adalah penjadwal Kubernetes, dalam hal ini NVIDIA Run:ai, yang menempatkan beban kerja pada kapasitas yang tersedia. Lapisan kedua adalah layanan pemulihan pekerjaan otomatis yang memantau pekerjaan berjalan, mengklasifikasikan jenis kegagalan berdasarkan konteks dan riwayat pekerjaan, lalu memutuskan tindakan yang tepat, apakah pekerjaan perlu dimulai ulang, dicoba ulang, atau dijadwalkan ulang. Lapisan ketiga adalah layanan pemulihan perangkat keras otomatis yang mengawasi kondisi node dan GPU, mengisolasi komponen yang bermasalah, serta menjalankan diagnostik agar gangguan tidak merembet ke pekerjaan lain.

Ketika terjadi kegagalan perangkat keras, kedua layanan pemulihan bekerja secara paralel: pekerjaan yang terdampak dimulai ulang atau dijadwalkan ulang, sementara node yang bermasalah langsung dikarantina dan diperiksa. Untuk kesalahan perangkat lunak yang sifatnya sementara, layanan pemulihan pekerjaan cukup mencoba ulang tanpa memicu perbaikan perangkat keras yang tidak perlu. Layanan pemulihan perangkat keras juga dapat mendeteksi penurunan kinerja sejak dini dan mengeluarkan node berisiko dari kumpulan penjadwalan sebelum pekerjaan terganggu.

Secara umum, Kubernetes adalah orkestrator sumber terbuka yang banyak dipakai untuk mengelola aplikasi dalam kontainer, termasuk beban kerja AI. Istilah self-healing infrastructure merujuk pada sistem yang mampu mendeteksi kegagalan dan memulihkan dirinya sendiri dengan sedikit campur tangan manusia. NVIDIA Nemotron adalah keluarga model AI milik NVIDIA yang dipakai di berbagai lini produknya, termasuk untuk membantu menyusun konten teknis seperti tulisan blog ini.
