---
title: "AWS Perluas Amazon SageMaker AI dengan Kemampuan Persiapan Data"
summary: "AWS menambah kemampuan persiapan data di Amazon SageMaker AI untuk membuat data sintetis, menilai kualitas dataset, melabeli data, meminta tinjauan manusia, dan mentransformasinya melalui Python SDK serta keterampilan AI-ML."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/announcing-ai-data-preparation-capabilities-in-amazon-sagemaker-build-high-quality-datasets-for-model-development-workflows/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-17T19:40:01.000Z
draft: false
sourceTitle: "Announcing AI data preparation capabilities in Amazon SageMaker: Build high-quality datasets for model development workflows"
categories: ["Fitur & Skills","Produk Baru","Riset & Kebijakan"]
---

AWS memperluas Amazon SageMaker AI dengan kemampuan persiapan data untuk membantu tim kecerdasan buatan menyiapkan data pelatihan dan evaluasi dalam satu alur kerja. Berdasarkan rilis resmi AWS (17/11), pengguna dapat membuat data sintetis, menilai dan memperbaiki dataset, melabeli data secara otomatis, serta meminta tinjauan manusia melalui Python SDK API dan keterampilan AI-ML dari notebook atau IDE.

Bagi data scientist, proses pengumpulan dan penandaan contoh sering menjadi bagian yang paling lama sebelum model dapat dilatih. Kemampuan baru ini menyediakan beberapa komponen yang dapat digunakan sendiri atau dirangkai, sesuai kebutuhan proyek.

Pada pelabelan otomatis, Amazon SageMaker AI dapat menandai data yang belum berlabel atau menggunakan sekumpulan contoh berlabel sebagai titik awal. Tugas bawaan mencakup klasifikasi, pengenalan entitas bernama,(question answering), penilaian berurutan, dan peringkasan, sedangkan pengguna dapat menentukan tugas khusus. Untuk tugas dengan jawaban terbatas, beberapa model menilai setiap baris dan tingkat kesepakatannya digunakan sebagai skor keyakinan.

Data dengan keyakinan di bawah ambang batas dapat dimasukkan ke antrean peninjauan di Amazon SageMaker Studio. Antarmuka peninjauan tersebut menggunakan Label Studio Community Edition, dan ahli bidang dari luar dapatstorms mengaksesnya melalui tautan pada kotak aplikasi mitra. Koreksi dari peninjau kemudian digunakan untuk memperbaiki proses pelabelan berikutnya, serta menghasilkan metrik konsensus dan laporan pelabelan.

Pembuatan data sintetis menghasilkan data pelatihan, evaluasi, atau pengujian dari sebuah spesifikasi. Hasilnya dapat dipandu dengan data awal dan dokumen milik pengguna, lalu sistem membuat alur pembuatan data berbasis kode yang dapat ditinjau, diubah, digunakan kembali, dan diskalakan. Fitur penilaian kualitas memeriksa aturan bisnis, metrik bawaan, serta metrik berbasis LLM-as-a-judge. Proses ini juga dapat menemukan duplikasi, kemiripan, derau label, dan kebocoran jawaban.

Untuk transformasi, pengguna dapat menjelaskan perubahan yang diperlukan dalam bahasa sehari-hari agar kode dibuat secara otomatis, memakai operasi bawaan seperti penghapusan duplikasi, penggabungan, pembagian, dan penyaringan, atau menjalankan kode Python sendiri secara berskala. Tim yang membangun model khusus dapat menggabungkan kemampuan tersebut untuk membuat dataset evaluasi, mengubah data ke format yang sesuai dengan teknik pelatihan, memeriksa kualitasnya, lalu melatih model melalui kustomisasi model di Amazon SageMaker AI.

AWS menyatakan fitur ini dapat diakses melalui SageMaker Python SDK secara langsung atau melalui agen AI-ML yang menjalankan API sesuai praktik data science yang ditetapkan. Secara umum, SDK adalah perangkat antarmuka yang menghubungkan program dengan layanan cloud, sedangkan keterampilan AI-ML memungkinkan agen AI memanggil API tersebut. AWS juga mencatat penggunaan fitur pembuatan data sintetis oleh Splunk, yang disebut perusahaan asal Cisco, untuk mengembangkan model evaluasi produk Agent Observability.
