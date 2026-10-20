---
title: "Meta Benticah Arsitektur Agen AI untuk Meningkatkan Keandalan Produksi"
summary: "Meta (19/10) menjelaskan bahwa orkestrator tipis memisahkan pengarah dan pemeriksaan keandalan dari penalaran domain, lalu meneruskannya ke agen khusus dengan konteks terbatas."
company: "Meta"
source: "https://engineering.fb.com/2026/10/19/ml-applications/thin-orchestrator-ai-agent-architecture/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-19T15:30:37.000Z
draft: false
sourceTitle: "The Thin Orchestrator: How We Made Our AI Agents More Reliable by Giving the Router Less to Do"
categories: ["Fitur & Skills"]
---

Meta (19/10) menjelaskan bahwa pola “thin orchestrator” atau orkestrator tipis dapat meningkatkan keandalan agen AI dengan memisahkan tugas pengarah dari penalaran domain. Dalam implementasinya, orkestrator bersifat deterministik dan hanya meneruskan pekerjaan ke agen khusus yang masing-masing memiliki konteks terbatas.

Awalnya, Meta menggunakan satu agen AI untuk mengotomasi proses penambahan kolom data di seluruh sistem rekomendasi. Agen tersebut diberi pengetahuan tentang konfigurasi, pembuatan kode, jalur pemrosesan, validasi, serta pola pengisian data dari lebih dari 10 sumber. Pendekatan ini sering berhasil dalam demonstrasi, tetapi mengalami halusinasi ketika digunakan di lingkungan produksi.

Menurut Meta, masalahnya bukan semata-mata karena prompt kurang baik atau konteks terlalu kecil. Ketika satu agen menerima terlalu banyak pengetahuan, konsep dari satu subsistem dapat tercampur dengan konsep subsistem lain. Agen tersebut juga dapat menerapkan pola pembuatan kode yang tidak sesuai dengan sumber data yang sedang ditangani.

Perusahaan kemudian membandingkan pendekatan itu dengan sistem yang dikendalikan orkestrator deterministik. Orkestrator membaca kebutuhan tugas, memeriksa apakah target sudah ada, mengumpulkan informasi yang diperlukan, menjalankan pemeriksaan keandalan, lalu menyerahkan pekerjaan kepada agen khusus yang sesuai. Orkestrator tidak menulis kode, membuat konfigurasi, atau melakukan penalaran domain.

Sebanyak 14 agen khusus menangani bidang yang berbeda. Agen manajemen skema mengetahui sistem konfigurasi, agen pengisian data memahami pembuatan kode untuk setiap sumber, dan agen validasi menangani pemeriksaan kualitas serta sistem build. Setiap agen hanya menerima pengetahuan yang relevan dengan tanggung jawabnya, sehingga konteks yang tidak diperlukan tidak ikut masuk ke dalam proses penalaran.

Meta juga menggunakan templat alur kerja untuk menentukan urutan tahap pekerjaan. Untuk penambahan kolom, urutannya meliputi skema, validasi, pengisian, dan pengujian. Alur untuk migrasi pipeline memakai rangkaian yang berbeda, tetapi menggunakan agen yang sama. Dengan demikian, tim dapat menambah kasus penggunaan melalui urutan kerja baru tanpa harus membangun kumpulan agen AI tambahan.

Dalam penggunaan sehari-hari, pola ini dapat diibaratkan sebagai koordinator yang membagi berkas kerja kepada spesialis yang memahami dokumen tertentu. Koordinator memeriksa apakah berkas lengkap dan apakah setiap tahap yang diperlukan sudah tersedia, tetapi tidak mencoba mengedit isi berkas secara bersamaan dengan semua ahli.

Menurut Meta, pendekatan tersebut menghasilkan peningkatan efisiensi dan akurasi, tetapi angka yang disebutkan dalam tulisan berasal dari pengalaman perusahaan dan belum merupakan pembanding independen. Secara umum, pemisahan konteks merupakan cara untuk mengurangi gangguan antar tugas: agen tidak perlu menyimpan seluruh sistem sekaligus, sehingga keputusan yang diambil lebih mudah dibatasi pada domain tertentu.
