---
title: "NVIDIA Megatron Core: Cara Menyiapkan Data Pasar untuk Peramalan Berbasis AI"
summary: "NVIDIA (24/11) mempublikasikan panduan teknis untuk menyiapkan data pasar menggunakan Megatron Core dan Megatron-LM, mencakup alur praproses, format tensor, serta contoh pelatihan model peramalan return dan volume perdagangan."
company: "NVIDIA"
source: "https://developer.nvidia.com/blog/prepare-market-data-for-forecasting-with-nvidia-megatron-core/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-24T17:00:00.000Z
draft: false
sourceTitle: "Prepare Market Data for Forecasting with NVIDIA Megatron Core"
categories: ["Standar Umum"]
---

NVIDIA (24/11) merilis panduan teknis yang menjelaskan cara menyiapkan data pasar untuk model peramalan berbasis AI menggunakan NVIDIA Megatron Core dan repositori Megatron-LM. Panduan tersebut ditujukan bagi peneliti kuantitatif yang ingin melatih model transformer untuk memprediksi pergerakan harga dan volume perdagangan di berbagai horizon waktu.

Megatron Core adalah pustaka sumber terbuka berisi komponen yang dioptimalkan untuk GPU agar model transformer dapat dilatih dalam skala besar. Megatron-LM menggabungkan pustaka tersebut dengan skrip pelatihan yang sudah dikonfigurasi sebelumnya, termasuk skrip praproses khusus untuk data pasar finansial. Skrip ini mengubah berkas Parquet berisi bar intraday, yakni ringkasan harga dan volume dalam interval waktu tertentu, menjadi tensor yang siap dipakai model. Prosesnya dilakukan secara terpisah dari loop pelatihan, sehingga peneliti bisa menyiapkan data sekali lalu menjalankan berbagai eksperimen tanpa mengulang praproses dari awal.

Secara umum, bar pasar adalah satu baris data per instrumen per satuan waktu, memuat harga penutupan, volume, dan statistik lain. Skrip praproses mengelompokkan bar-bar berurutan dari satu instrumen pada satu hari perdagangan menjadi patch, lalu menggeser jendela konteks dengan panjang tetap di atas patch tersebut. Sebagai contoh, delapan bar per patch dan 32 patch per jendela menghasilkan 256 observasi dalam 32 posisi model. Setiap jendela membawa identitas instrumen dan posisi sesi perdagangan, sehingga model dapat mempelajari pola spesifik instrumen dalam parameter yang dipakai bersama.

Untuk mencegah kebocoran data antar-split, skrip membagi data berdasarkan tanggal dengan masa embargo, dan menghitung statistik target hanya dari data pelatihan. Pendekatan ini menghindari bias yang muncul ketika informasi masa depan ikut masuk ke perhitungan fitur. Tensor yang dihasilkan disimpan sebagai train.pt, val.pt, test.pt, dan meta.pt, lalu dimuat oleh data loader berbasis memory-mapped yang berbagi batch di dalam tiap tensor-parallel group agar pelatihan terdistribusi tetap efisien.

Panduan ini juga menekankan pemisahan antara antarmuka data dan arsitektur model. Peneliti dapat mengganti arsitektur, optimizer, atau durasi pelatihan tanpa mengubah format dataset, karena metadata seperti ukuran patch, panjang konteks, dan horizon peramalan sudah terekam di dalam berkas tensor. Format baris yang konsisten juga memungkinkan data dari vendor berbeda atau skema sampling berbeda, misalnya tick satu menit atau sub-menit, masuk ke pipeline yang sama tanpa perlu menulis ulang loader.

Secara umum, istilah tensor merujuk pada struktur data multidimensi yang menjadi format standar untuk masukan dan keluaran model AI. Praproses di luar loop pelatihan adalah praktik umum dalam machine learning karena mempercepat iterasi eksperimen: peneliti cukup mengubah konfigurasi model tanpa menunggu data diproses ulang. NVIDIA menyediakan README praproses yang merinci persiapan lingkungan, format berkas masukan, opsi konfigurasi, dan format tensor keluaran bagi peneliti yang ingin mencoba pipeline ini dengan data pasar mereka sendiri.
