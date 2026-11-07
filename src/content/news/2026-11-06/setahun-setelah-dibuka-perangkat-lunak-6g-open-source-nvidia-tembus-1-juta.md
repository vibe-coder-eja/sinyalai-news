---
title: "Setahun Setelah Dibuka, Perangkat Lunak 6G Open Source NVIDIA Tembus 1 Juta Unduhan"
summary: "NVIDIA (06/11) melaporkan bahwa perangkat lunak Aerial dan Sionna miliknya telah diunduh lebih dari 1 juta kali dan dipakai oleh 8.000 lembaga riset. Alat open source ini membantu peneliti membangun jaringan 6G berbasis AI, mulai dari komunikasi robot hingga penerima sinyal pintar."
company: "NVIDIA"
source: "https://blogs.nvidia.com/blog/telco-open-source-tools-research-6g-networks/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-06T16:00:35.000Z
draft: false
sourceTitle: "How NVIDIA Open Source Tools Are Helping Researchers Build Next-Generation 6G Networks"
categories: ["Standar Umum"]
---

Setahun setelah NVIDIA merilis perangkat lunak nirkabel Aerial sebagai proyek open source, alat tersebut kini dipakai oleh lebih dari 8.000 lembaga riset dan akademisi di seluruh dunia, dengan total unduhan yang telah melampaui 1 juta kali. Berdasarkan rilis resmi NVIDIA (06/11), pertumbuhan adopsi Aerial dan Sionna mencapai sekitar sepuluh kali lipat dalam setahun terakhir. Keduanya merupakan bagian dari rangkaian perangkat lunak gratis yang dirancang untuk mempercepat pengembangan jaringan 6G generasi berikutnya, dengan menggabungkan simulasi, pelatihan AI, dan pengujian pada sistem nirkabel nyata.

Rilis ini menyoroti empat arah riset yang sedang dikerjakan komunitas pengguna. Pertama, komunikasi robot yang lebih cepat. Di King's College London, sebuah lengan robot berkamera dihubungkan ke modul NVIDIA Jetson AGX Orin yang menjalankan Sionna. Alih-alih mengirim gambar utuh ke server, robot mengirim deskripsi ringkas tentang objek, posisi, dan hubungannya. Dalam eksperimen pemilahan buah dan penumpukan kubus, pendekatan ini memangkas waktu penyelesaian tugas hingga 52,6% dan meningkatkan tingkat keberhasilan dibanding pengiriman gambar berkala.

Kedua, penerima sinyal yang belajar dari lingkungan. SoftBank menggabungkan penerima neural ke dalam NVIDIA Aerial CUDA-Accelerated RAN (ACAR) dan mengujinya dengan ponsel 5G komersial. Dalam pengujian dengan gangguan, penerima neural menghasilkan throughput uplink lebih tinggi di 15 skenario yang diuji, dengan puncak kenaikan sekitar 60%. Sementara itu, peneliti ETH Zurich menggunakan NVIDIA Aerial Testbed untuk menyesuaikan penerima neural berdasarkan kondisi lokal, sehingga menurunkan tingkat kesalahan blok lebih dari sepertiga dibanding model bawaan.

Ketiga, pengelolaan energi jaringan. Tim University of Leeds merancang sistem yang memprediksi permintaan jaringan 10 menit ke depan dan memutuskan kapan base station bisa tidur tanpa memutus koneksi pengguna. Pengujian dilakukan dengan perangkat 5G portabel berbasis NVIDIA DGX Spark dan digital twin sebagai pembanding. Hasilnya, konsumsi daya radio access network turun 45,6% dibanding mode penuh, tanpa mengorbankan konektivitas perangkat.

Keempat, simulasi yang lebih cepat. Centre Tecnològic de Telecomunicacions de Catalunya (CTTC) mengintegrasikan model saluran radio berbasis GPU dari ACAR ke dalam simulator 5G-LENA. Dalam evaluasi awal, waktu simulasi turun dari sekitar tiga jam menjadi 10 sampai 20 menit, tergantung konfigurasi, sehingga peneliti bisa membandingkan lebih banyak desain sebelum membangun perangkat keras.

Secara umum, jaringan 6G dirancang untuk menggabungkan konektivitas, komputasi, dan sensing dalam satu platform berbasis perangkat lunak. Istilah AI-native 6G merujuk pada jaringan yang komponennya, mulai dari penerima sinyal hingga pengelolaan base station, ditenagai atau dioptimalkan oleh kecerdasan buatan. Dengan menyediakan Aerial, Sionna, dan Aerial Testbed secara terbuka, NVIDIA memungkinkan peneliti menguji ide, membandingkan hasil, dan membangun di atas pekerjaan satu sama lain tanpa harus menunggu perangkat keras khusus tersedia terlebih dahulu.
