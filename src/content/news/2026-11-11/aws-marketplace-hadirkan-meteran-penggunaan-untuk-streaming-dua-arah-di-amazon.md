---
title: "AWS Marketplace Hadirkan Meteran Penggunaan untuk Streaming Dua Arah di Amazon SageMaker AI"
summary: "AWS (11/11) mengumumkan dukungan meteran berbasis penggunaan untuk inferensi streaming dua arah di Amazon SageMaker AI. Deepgram menjadi mitra peluncuran, membawa penagihan STT dan TTS berbasis pemakaian ke AWS Marketplace."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/introducing-usage-based-pricing-for-amazon-sagemaker-ai-bidirectional-streaming/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-11T15:10:23.000Z
draft: false
sourceTitle: "Introducing usage-based pricing for Amazon SageMaker AI bidirectional streaming"
categories: ["Produk Baru","Kerjasama Industri","Penerapan Industri"]
---

AWS (11/11) memperkenalkan mekanisme meteran berbasis penggunaan untuk inferensi streaming dua arah di Amazon SageMaker AI. Fitur ini memungkinkan penyedia model yang menjual lewat AWS Marketplace menghitung biaya perangkat lunak berdasarkan pemakaian nyata pelanggan selama sesi streaming langsung, bukan lagi berdasarkan tarif per jam yang tetap. Deepgram, perusahaan AI untuk pengenalan suara, menjadi mitra peluncuran dan menjadi pihak pertama yang menawarkan penagihan berbasis pemakaian untuk layanan Speech-to-Text (STT) dan Text-to-Speech (TTS) di marketplace tersebut.

Selama ini, penagihan perangkat lunak di AWS Marketplace untuk inferensi request-response bekerja dengan melaporkan jumlah unit lewat header respons HTTP. Pola itu cukup untuk API yang menjawab satu permintaan dengan satu respons. Streaming dua arah punya sifat berbeda: klien mengirim audio dan menerima transkrip secara berkelanjutan lewat HTTP/2 event stream, sementara SageMaker AI berkomunikasi dengan server model lewat WebSocket. Sesi bisa berlangsung 30 detik atau 30 menit, dan total pemakaian baru diketahui ketika sesi berakhir. Header respons tunggal tidak cukup untuk mencatat pemakaian yang terus bertambah selama sesi berjalan.

Solusi dari AWS menambahkan satu koneksi WebSocket kedua di samping jalur inferensi yang sudah ada. Saat sesi streaming dua arah dimulai, SageMaker AI membuka dua koneksi ke server model: koneksi data untuk lalu lintas inferensi, dan koneksi metadata khusus untuk data meteran. Server model cukup mengembalikan satu header pada respons upgrade WebSocket untuk mengaktifkan fitur ini. Kedua koneksi membawa header identitas sesi yang sama, sehingga server model bisa menghubungkan catatan meteran dengan sesi inferensi yang sedang berjalan. Catatan meteran dikirim sebagai frame JSON pada koneksi metadata, idealnya secara bertahap seiring pemakaian bertambah, dengan batas satu pesan per detik per koneksi dan ukuran maksimal 512 byte per pesan.

Secara umum, streaming dua arah adalah pola komunikasi di mana klien dan server saling bertukar data secara real-time tanpa menunggu satu pihak selesai lebih dulu. Pola ini umum dipakai pada aplikasi yang mengandalkan respons cepat, seperti transkripsi panggilan, agen suara, dan captioning langsung. Dengan meteran berbasis penggunaan, biaya perangkat lunak mengikuti pemakaian aktual, sementara biaya infrastruktur endpoint SageMaker AI tetap dihitung terpisah selama endpoint aktif. Pelanggan menerima tagihan tergabung di AWS, termasuk tarif yang dinegosiasikan lewat private offer, tanpa perlu mengelola hubungan penagihan terpisah dengan penyedia model.

AWS menekankan bahwa pengiriman catatan meteran lewat jaringan tidak otomatis berarti pemakaian tercatat sebagai tagihan. Penyedia model tetap perlu memvalidasi unit yang dilaporkan terhadap laporan AWS Marketplace dan tagihan pembeli. Bila koneksi metadata gagal terbentuk atau terputus, inferensi tetap berjalan secara bawaan; penyedia model dapat memilih untuk menghentikan inferensi jika meteran wajib tersedia, dengan konsekuensi mengorbankan ketersediaan demi kelangsungan penagihan.
