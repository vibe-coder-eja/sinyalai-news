---
title: "NVIDIA Rilis Layanan Otomatis untuk Memulihkan Pelatihan AI Terdistribusi Saat Gagal"
summary: "NVIDIA (02/11) memperkenalkan NVIDIA Recovery, layanan sumber terbuka yang memantau dan memulihkan pekerjaan pelatihan AI di seluruh klaster secara otomatis selama 24 jam, mengurangi waktu henti akibat gangguan perangkat keras maupun perangkat lunak."
company: "NVIDIA"
source: "https://developer.nvidia.com/blog/keep-distributed-training-running-with-automated-workload-recovery/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-02T22:43:05.000Z
draft: false
sourceTitle: "Keep Distributed Training Running with Automated Workload Recovery"
categories: ["Produk Baru"]
---

Berdasarkan tulisan di blog developer NVIDIA (02/11), NVIDIA memperkenalkan NVIDIA Recovery, layanan sumber terbuka yang bekerja tanpa henti untuk memantau dan memulihkan pekerjaan pelatihan AI di seluruh klaster. Layanan ini dirancang untuk menjawab masalah yang makin sering muncul seiring membesarnya skala pelatihan: satu node GPU yang macet, satu rank yang memicu batas waktu komunikasi kolektif, atau satu straggler yang memperlambat seluruh pekerjaan. Masing-masing gangguan bisa ditangani, tetapi tumpukan waktu pemulihan menentukan berapa banyak jam GPU yang benar-benar menghasilkan kemajuan pelatihan.

NVIDIA Recovery merupakan bagian dari NVIDIA DSX OS, portofolio perangkat lunak modular di bawah platform NVIDIA DSX AI Factory. Layanan ini membaca log aplikasi, metrik GPU, dan sinyal scheduler untuk mendeteksi anomali, lalu menjalankan loop pemulihan empat tahap: mendeteksi gangguan, mengaitkan kegagalan ke sumbernya, mengisolasi node yang bermasalah, dan memulai ulang atau menghentikan pekerjaan sesuai kebijakan yang ditetapkan operator. Dengan mengotomatiskan loop ini di tingkat klaster, layanan dapat menangani gangguan yang terjadi bersamaan pada banyak pekerjaan sekaligus, sehingga mengurangi intervensi manual dan menjaga produktivitas pelatihan tetap stabil.

Layanan ini terhubung dengan Slurm, salah satu scheduler populer untuk klaster AI, melalui sebuah Advisor Controller yang dipasang lewat Helm chart. Ada dua mode pemasangan: di dalam klaster atau lewat SSH dari luar, dan keduanya menjaga agar layanan pemulihan tidak bergantung pada kode internal scheduler. NVIDIA menekankan bahwa setiap lapisan dalam tumpukan kesehatan dan ketahanan DSX OS—mulai dari pemantauan node, library pemulihan di dalam pekerjaan seperti NVRx, hingga orkestrasi klaster—dapat beroperasi secara independen. Artinya, operator bisa mengadopsi komponen sesuai kebutuhan atau mengganti salah satunya dengan alat sendiri.

Untuk mengurangi risiko, pemasangan baru secara bawaan berjalan dalam mode monitor: layanan hanya mempublikasikan rekomendasi pemulihan tanpa mengambil tindakan pada scheduler. Cara ini memberi waktu bagi operator untuk menilai kualitas sinyal sebelum mengaktifkan pemulihan otomatis. Setiap deteksi, tindakan, stempel waktu, identitas pekerjaan, dan hasil atribusi kegagalan dicatat dalam jejak audit yang persisten, dan tersedia lewat Recovery Console sebagai dasbor langsung bagi operator.

NVIDIA membagikan data pemantauan produksi dari satu klaster pelatihan antara 9 Juli hingga 9 Oktober: hampir 200 pekerjaan diproses per hari dengan sekitar 8.550 deteksi anomali tercatat, dan latensi rata-rata untuk deteksi serta tindakan pemulihan masing-masing 69 dan 94 detik. Kode sumber tersedia di repositori dsx-ai-factory/NVIDIA-Recovery, disertai panduan quickstart untuk pemasangan lokal tanpa GPU fisik dan panduan operator untuk mode in-cluster maupun SSH.

Secara umum, pelatihan AI terdistribusi berarti sebuah model dilatih oleh banyak GPU yang bekerja bersama di satu atau beberapa klaster. Istilah goodput merujuk pada porsi waktu komputasi yang benar-benar menghasilkan kemajuan pelatihan, bukan sekadar berjalan. Karena satu kegagalan kecil bisa membuat seluruh pekerjaan menunggu, layanan pemulihan otomatis seperti ini berupaya menjaga agar goodput tetap tinggi meski gangguan tak terhindarkan terjadi.
