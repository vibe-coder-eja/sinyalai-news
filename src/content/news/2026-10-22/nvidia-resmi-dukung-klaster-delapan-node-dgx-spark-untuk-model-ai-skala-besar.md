---
title: "NVIDIA Resmi Dukung Klaster Delapan Node DGX Spark untuk Model AI Skala Besar"
summary: "NVIDIA mengumumkan dukungan resmi untuk klaster delapan node DGX Spark dengan memori unified hingga 1 TB, memungkinkan eksekusi lokal model besar seperti GLM 5.3 (753B) dari Z.ai. Backend kolektif baru bernama RoCEnante meningkatkan kecepatan decode hingga 4,43x pada delapan node."
company: "NVIDIA"
source: "https://developer.nvidia.com/blog/running-frontier-class-ai-models-across-8-nvidia-dgx-spark-nodes/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-22T16:00:00.000Z
draft: false
sourceTitle: "Running Frontier-Class AI Models Across 8 NVIDIA DGX Spark Nodes"
categories: ["Produk Baru"]
---

Berdasarkan rilis resmi NVIDIA (22/10), perusahaan mengumumkan dukungan resmi untuk klaster delapan node DGX Spark, yang menggabungkan memori unified hingga 1 TB dan memungkinkan eksekusi lokal model-model AI berskala besar. Pengumuman ini disampaikan di acara GTC Berlin dan menandai perluasan kemampuan workstation AI desktop NVIDIA untuk menangani beban kerja yang sebelumnya membutuhkan infrastruktur pusat data.

Dukungan delapan node dalam NVIDIA Sync dijadwalkan hadir pada akhir tahun ini. Fitur Cluster Assistant di NVIDIA Sync menangani proses penyiapan dan manajemen perangkat, sehingga pengembang dapat menghubungkan beberapa unit DGX Spark untuk membentuk klaster terdistribusi. Setiap unit DGX Spark menyediakan memori unified 128 GB; empat node menghasilkan 512 GB, dan delapan node mencapai total 1 TB.

Kapasitas memori ini membuka peluang untuk menjalankan model-model kelas frontier secara lokal, termasuk model GLM 5.3 (753B) dari Z.ai yang berukuran sekitar 470 GB dalam format NVFP4. NVIDIA melaporkan bahwa model ini dapat berjalan pada klaster 8x 128 GB, menjadikannya salah satu model terbuka terbesar yang dapat disajikan secara lokal. Dalam pengujian awal, GLM 5.3 Flash menghasilkan sekitar 80 token per detik pada klaster delapan node, cukup untuk pengembangan lokal secara interaktif.

Untuk mempercepat komunikasi antar-node, NVIDIA memperkenalkan backend kolektif bernama RoCEnante yang dioptimalkan untuk klaster berbasis switch. Backend ini mengurangi latensi all-reduce pada operasi tensor-parallel decode dengan pola pesan kecil dan jumlah rank yang terbatas. Hasil benchmark menggunakan Qwen3.8-27B-NVFP4 menunjukkan peningkatan kecepatan decode dari sekitar 12 token per detik pada satu node menjadi 52 token per detik pada delapan node. Dengan RoCEnante, kecepatan decode mencapai 4,43x pada delapan node, dibandingkan 3,05x tanpa backend tersebut—peningkatan efisiensi scaling sebesar 45%.

NVIDIA juga memaparkan hasil pre-training model nanochat dari awal pada delapan node, yang mencapai speedup 7,79x dengan efisiensi scaling 97,4%, menunjukkan performa training yang mendekati linear untuk model kecil pada klaster desktop. Untuk orkestrasi multi-model, NVIDIA NeMo Switchyard dapat mengarahkan permintaan antara pool model pada klaster delapan node bersama, meningkatkan throughput agregat hingga 3x ketika sebagian besar lalu lintas dialihkan ke model yang lebih kecil.

Secara umum, memori unified adalah arsitektur di mana CPU dan GPU berbagi ruang memori yang sama, sehingga mengurangi kebutuhan transfer data antar komponen. Istilah "frontier-class" merujuk pada model AI dengan skala dan kemampuan tertinggi yang tersedia saat ini, biasanya dengan ratusan miliar parameter. Backend kolektif seperti RoCEnante berfungsi mengoptimalkan komunikasi antar-unit pemrosesan saat model dijalankan secara terdistribusi.
