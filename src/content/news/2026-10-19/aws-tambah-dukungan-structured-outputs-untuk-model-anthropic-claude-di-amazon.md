---
title: "AWS Tambah Dukungan Structured Outputs untuk Model Anthropic Claude di Amazon Bedrock"
summary: "Amazon Web Services (AWS) mengumumkan fitur structured outputs untuk semua model Anthropic Claude di Amazon Bedrock. Fitur ini menghasilkan JSON yang sesuai skema tanpa parsing manual, sehingga integrasi untuk ekstraksi data, agen, dan otomasi jadi lebih andal."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/structured-outputs-for-anthropic-claude-models-on-amazon-bedrock/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-19T23:32:19.000Z
draft: false
sourceTitle: "Structured outputs for Anthropic Claude models on Amazon Bedrock"
categories: ["Rilis Model","Fitur & Skills"]
---

Amazon Web Services (AWS) mengumumkan (19/10) bahwa Amazon Bedrock, layanan untuk menjalankan model bahasa besar dari berbagai penyedia, kini mendukung fitur structured outputs untuk semua model Anthropic Claude. Fitur ini tersedia di dua jalur akses, yaitu endpoint bedrock-runtime dan bedrock-mantle, sehingga pengguna yang memakai Boto3 maupun Messages API bisa mendapatkan respons JSON yang langsung mengikuti skema yang mereka tentukan.

Selama ini, hasil dari model bahasa bersifat probabilistik: teks yang keluar bisa saja menyimpang dari format yang diinginkan, sehingga developer harus menulis kode tambahan untuk memvalidasi, memperbaiki, atau meminta ulang jawaban. Dengan structured outputs, AWS menerapkan constrained decoding, yaitu teknik yang membatasi token yang boleh dihasilkan model agar selalu sesuai dengan JSON Schema yang diberikan. Hasilnya, setiap respons dijamin valid sebagai JSON, tipe data tiap field terjaga, dan field wajib selalu muncul. Developer tidak lagi perlu menulis retry logic atau validasi tambahan untuk menangani keluaran yang rusak.

Fitur ini juga mencakup strict tool use di endpoint bedrock-mantle, yang memastikan parameter yang dikirim ke tool selalu cocok dengan skema input. AWS menyebutkan beberapa contoh penggunaan, mulai dari mengekstrak field wajib dari laporan keuangan dan dokumen kepatuhan, mengisi catatan klinis ke rekam medis elektronik, memperkaya katalog produk, menganalisis kontrak, hingga merutekan tiket dukungan secara otomatis. Structured outputs juga dapat dipakai bersama batch inference untuk memproses permintaan dalam jumlah besar secara asinkron, dan di endpoint bedrock-runtime fitur ini mendukung cross-Region inference sehingga bisa dipakai lintas wilayah AWS tanpa pengaturan tambahan. Bagi yang butuh respons langsung, hasil bisa di-stream sebagai event bertipe.

Secara umum, JSON Schema adalah cara standar untuk mendeskripsikan bentuk data, misalnya field "nama" harus berupa teks dan field "usia" harus berupa angka. Constrained decoding bekerja dengan menyusun aturan tata bahasa dari skema tersebut, lalu membatasi pilihan kata demi kata yang boleh dipilih model saat menulis jawaban. Permintaan pertama dengan skema baru mungkin sedikit lebih lambat karena AWS perlu menyusun grammar artifact, tetapi hasilnya disimpan di cache selama 24 jam sehingga permintaan berikutnya dengan skema yang sama berjalan lebih cepat. Mengubah struktur skema akan memicu kompilasi ulang, sedangkan mengubah hanya nama atau deskripsi field tidak mempengaruhi cache.
