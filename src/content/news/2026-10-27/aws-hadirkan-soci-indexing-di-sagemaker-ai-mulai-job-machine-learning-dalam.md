---
title: "AWS Hadirkan SOCI Indexing di SageMaker AI, Mulai Job Machine Learning dalam Hitungan Detik"
summary: "AWS mengumumkan dukungan SOCI indexing untuk job training dan processing di Amazon SageMaker AI. Teknologi ini menunda unduh penuh container image sehingga container bisa mulai berjalan dalam hitungan detik, bukan menit, tanpa mengubah definisi job."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/announcing-soci-indexed-images-for-faster-sagemaker-ai-jobs/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-27T17:00:39.000Z
draft: false
sourceTitle: "Announcing SOCI-indexed images for faster SageMaker AI jobs"
categories: ["Produk Baru","Riset & Kebijakan"]
---

Berdasarkan rilis resmi AWS (27/10), Amazon SageMaker AI kini mendukung Seekable OCI (SOCI) indexing untuk job training dan processing. Teknologi ini membuat container image tidak perlu diunduh seluruhnya sebelum job bisa berjalan, sehingga waktu tunggu yang biasanya memakan menit bisa dipangkas menjadi hitungan detik.

Bagi tim yang sering menjalankan eksperimen machine learning, menunggu container image selesai diunduh sebelum job benar-benar dimulai adalah bagian yang paling mengganggu. AWS menyebut, untuk image deep learning modern yang ukurannya bisa lebih dari 10 GB, unduhan penuh bisa menambah beberapa menit di setiap job. Waktu itu tetap dihitung sebagai biaya pemakaian, meskipun belum ada pelatihan model yang berjalan. SOCI indexing menjawab masalah ini dengan cara yang cukup sederhana: container langsung dimulai, lalu file lain diunduh di latar belakang sambil kode pengguna berjalan.

Cara kerjanya dimulai dari SOCI index, sebuah berkas metadata yang memetakan setiap file di dalam container image. Indeks ini disimpan terpisah di Amazon Elastic Container Registry (ECR) sebagai artefak berstandar OCI, sehingga image asli dan tanda tangan digitalnya tetap valid. Saat job SageMaker AI dibuat, layanan otomatis memeriksa apakah image yang dipilih memiliki SOCI index. Jika ada, image dimuat secara bertahap; jika tidak ada atau gagal dibaca, job tetap berjalan dengan mekanisme unduh standar seperti sebelumnya. Pengguna tidak perlu mengubah definisi job, entry point, maupun data channel.

AWS menyediakan dua jalur adopsi. Pengguna cukup menunjuk AWS Deep Learning Container (DLC) yang sudah diindeks sebelumnya, atau menambahkan indeks ke image milik sendiri. Karena indeks adalah artefak terpisah, image digest dan tanda tangan yang sudah ada tidak berubah.

Dalam pengujian internal AWS, hasilnya cukup konsisten di berbagai ukuran image dan tipe instance. Untuk image 1,8 GB, unduh standar memakan 48 detik, sementara SOCI lazy loading hanya butuh beberapa detik. Pada image 35,4 GB, unduh standar memakan 7 menit 17 detik, sedangkan SOCI tetap di kisaran belasan detik. Pada image 13,2 GB yang diuji di 13 kombinasi tipe dan ukuran instance, unduh standar berkisar 3 menit 16 detik hingga 4 menit 20 detik, sementara SOCI konsisten di 6 sampai 8 detik, sekitar 34 kali lebih cepat di setiap konfigurasi. AWS juga melaporkan bahwa performa training secara keseluruhan tidak terdampak di luar penalti kecil pada epoch pertama, karena file yang dibutuhkan sudah tersedia lebih awal.

Secara umum, container image adalah paket berisi sistem operasi, pustaka, dan kode yang dibutuhkan sebuah job machine learning untuk berjalan. Ide lazy loading di sini mirip dengan cara layanan streaming memutar video: pemutar tidak mengunduh seluruh film dulu, melainkan memulai dari potongan yang dibutuhkan dan mengunduh sisanya sambil pengguna menonton. SOCI menerapkan pola serupa pada container image, sehingga job bisa segera berjalan tanpa harus menunggu seluruh paket tiba.

Klaim performa pada artikel ini merujuk pada benchmark internal AWS.
