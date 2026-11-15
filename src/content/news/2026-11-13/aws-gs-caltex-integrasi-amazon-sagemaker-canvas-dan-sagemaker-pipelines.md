---
title: "AWS: GS Caltex Integrasi Amazon SageMaker Canvas dan SageMaker Pipelines"
summary: "GS Caltex mengotomatiskan serah-terima model dari Amazon SageMaker Canvas ke Amazon SageMaker Pipelines. Perusahaan melaporkan waktu penempatan turun dari sekitar seminggu menjadi beberapa jam, inferensi batch berjalan setiap 30 menit, dan biaya inferensi berkurang."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/production-mlops-at-gs-caltex-with-amazon-sagemaker-canvas-part-1/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-13T23:22:09.000Z
draft: false
sourceTitle: "Production MLOps at GS Caltex with Amazon SageMaker Canvas, part 1"
categories: ["Standar Umum"]
---

GS Caltex, perusahaan energi dan kimia asal Korea Selatan, mengotomatiskan perpindahan model dari Amazon SageMaker Canvas ke Amazon SageMaker Pipelines agar model yang dibuat oleh insinyur proses dapat digunakan dalam alur produksi. Dengan memakai kembali alur praproses dan model yang telah divalidasi, perusahaan melaporkan waktu penempatan model turun dari sekitar seminggu menjadi beberapa jam serta menjalankan inferensi batch setiap 30 menit. AWS (13/11) menjelaskan implementasi operasi machine learning (MLOps) tersebut dalam karangan resminya.

Perubahan ini memengaruhi pembagian kerja antara insinyur proses dan insinyur machine learning (ML). SageMaker Canvas memungkinkan insinyur proses membangun dan memvalidasi model tanpa menulis kode, dengan memanfaatkan pengetahuan mereka tentang variabel dan data di balik suatu proses. Insinyur ML kemudian mengubah aset tersebut menjadi langkah-langkah dalam alur produksi. Sebelum otomatisasi, mereka harus menetapkan lokasi data produksi, menyediakan konfigurasi model, serta menyambungkan pekerjaan praproses dan inferensi.

Dalam alur yang baru, serah-terima model dan alur praproses dilakukan secara otomatis. Untuk setiap versi model baru, insinyur ML masih memeriksa format data dan hasil prediksi sebelum menyetujui model di Model Registry, yang menyimpan versi model dan status persetujuannya. SageMaker Pipelines dikonfigurasi untuk menjalankan alur praproses, inferensi, serta penanganan kegagalan. Amazon EventBridge kemudian memulai setiap jadwal inferensi, SageMaker Pipelines mengambil data dari Amazon S3, alur Data Wrangler dijalankan melalui SageMaker Processing, dan SageMaker Batch Transform menghasilkan prediksi atas kelompok data. Hasil inferensi disimpan kembali di S3, sedangkan status setiap langkah dan log dapat diperiksa melalui Amazon CloudWatch.

GS Caltex juga melaporkan bahwa jadwal inferensi batch tersebut mengurangi kebutuhan akan titik akhir yang harus berjalan terus-menerus dan menurunkan biaya inferensi. Secara umum, inferensi batch memproses sekumpulan data sekaligus according to jadwal yang ditetapkan. Dengan model, alur praproses, dan jadwal disatukan dalam satu alur kerja, tim dapat memakai model yang sama untuk produksi, memantau setiap eksekusi, serta memperbarui versi tanpa mengubah proses manual secara terpisah.
