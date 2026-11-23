---
title: "NVIDIA Perluas Dukungan Slurm agar Komputer Kuantum Bisa Terhubung ke Pusat Superkomputer"
summary: "NVIDIA mengumumkan perluasan Slurm agar prosesor kuantum dari berbagai pembuat bisa diintegrasikan ke pusat superkomputer melalui satu antarmuka. Langkah ini menyatukan alur kerja komputasi klasik dan kuantum yang sebelumnya terpisah."
company: "NVIDIA"
source: "https://blogs.nvidia.com/blog/slurm-quantum-computing-supercomputing/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-16T16:00:47.000Z
draft: false
sourceTitle: "NVIDIA Expands Slurm to Bring Quantum Computing Into Supercomputing"
categories: ["Fitur & Skills","Produk Baru"]
---

Berdasarkan rilis resmi NVIDIA (16/11), perusahaan memperluas dukungan Slurm—sistem penjadwalan sumber daya yang banyak dipakai di pusat superkomputer—agar prosesor kuantum dari berbagai vendor dapat terhubung ke infrastruktur HPC (high-performance computing) yang sudah ada. Selama ini, setiap penambahan prosesor kuantum atau pusat superkomputer baru menuntut perangkat lunak integrasi yang berbeda-beda; dengan perluasan ini, pembuat QPU (quantum processing unit) cukup menyediakan satu berkas antarmuka yang bisa dipakai di banyak pusat.

Bagi peneliti yang sehari-hari mengelola beban kerja di superkomputer, perubahan ini berarti komputasi kuantum tidak lagi memerlukan alur kerja terpisah. Slurm versi 26.11, yang akan tersedia akhir bulan ini, membangun kerja sama sebelumnya dengan IBM dan Pasqal serta memanfaatkan antarmuka terbuka QRMI dan QDMI yang sudah dikenal di komunitas. Penjadwal yang sama kini bisa mengalokasikan sumber daya klasik dan kuantum sekaligus, sehingga aplikasi hibrida kuantum-klasik—misalnya yang dikembangkan dengan platform CUDA-Q—bisa dijalankan tanpa pindah-pindah sistem.

Perluasan ini sudah diadopsi oleh enam pihak: Alice & Bob, IBM, IQM, Pasqal, Quantinuum, dan MQSC. Artinya, pusat superkomputer yang ingin menambahkan prosesor kuantum tidak perlu lagi membangun solusi khusus untuk setiap vendor; cukup mengandalkan integrasi yang sudah disiapkan pembuat QPU. NVIDIA juga mengumumkan pembaruan pada platform CUDA-Q di konferensi SC26, termasuk CUDA-Q QEC untuk riset koreksi kesalahan kuantum, lapisan primitif toleran-gangguan, CUDA-Q Algorithms untuk komponen aplikasi kuantum yang bisa dipakai ulang, serta CUDA-Q Pulse untuk membantu perancang perangkat keras membentuk pulsa kontrol qubit.

Secara umum, Slurm adalah perangkat lunak sumber terbuka yang berfungsi sebagai manajer sumber daya dan penjadwal kerja di kluster superkomputer, mirip peran pengatur lalu lintas bagi ribuan tugas komputasi. Komputer kuantum memakai qubit dan logika yang berbeda dari komputer klasik, sehingga menggabungkan keduanya biasanya memerlukan jembatan perangkat lunak khusus. Dengan pendekatan satu antarmuka untuk banyak vendor, hambatan integrasi yang selama ini berulang-ulang diharapkan berkurang, dan peneliti di bidang kimia komputasi, fisika nuklir, serta ilmu material bisa mengakses pemrosesan kuantum lewat alur kerja yang sudah mereka kenal.
