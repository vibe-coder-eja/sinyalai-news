---
title: "Microsoft Rilis PDD Kit, Alat untuk Verifikasi Formal Kode Buatan Agen AI"
summary: "Microsoft Research (05/11) memperkenalkan PDD Kit, perangkat yang mengubah niat developer menjadi spesifikasi formal dan membuktikan kode buatan agen AI sudah benar untuk setiap masukan. Alat ini diuji pada aplikasi web Pet Store dan berhasil menemukan bug login yang sudah ada."
company: "Microsoft"
source: "https://www.microsoft.com/en-us/research/blog/formally-verifying-agent-written-full-stack-web-apps-with-pdd-kit/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-05T16:00:00.000Z
draft: false
sourceTitle: "Formally verifying agent-written full-stack web apps with PDD Kit"
categories: ["Fitur & Skills"]
---

Berdasarkan rilis resmi Microsoft Research (05/11), PDD Kit adalah perangkat baru yang membantu developer memastikan kode buatan agen AI benar-benar melakukan apa yang diminta. Alat ini mengubah niat developer menjadi spesifikasi formal, lalu membuktikan secara matematis bahwa kode agen memenuhi spesifikasi tersebut untuk setiap kemungkinan masukan. Ketika pembuktian formal tidak memungkinkan, PDD Kit menggunakan pengujian sebagai cadangan.

Bagi tim yang menerima puluhan ribu baris kode dari agen dalam satu kali pengerjaan, membaca setiap baris sudah bukan pilihan realistis. Selama ini, rencana kerja atau spesifikasi dalam bahasa alami menjadi "kontrak" antara developer dan agen, tetapi tidak ada yang memaksa agen benar-benar mengikuti kontrak itu. Agen bisa saja membangun sesuatu yang sedikit berbeda dari yang diminta, lalu menulis tes yang lolos untuk versinya sendiri. Hasilnya, integrasi terus berjalan, cakupan tes terlihat sehat, tetapi celah antara yang diminta dan yang dikirim baru terasa ketika ada laporan bug.

Di sinilah PDD Kit mengambil peran. Ia bekerja berdampingan dengan developer di dalam Chopin, lingkungan perencanaan real-time dari GitHub Next, untuk menyusun niat dalam bahasa yang jelas. Bagian niat yang bisa diformalkan diubah menjadi spesifikasi dalam Verus, bahasa pembuktian untuk Rust yang dikembangkan bersama oleh Microsoft Research dan sejumlah universitas. Bagian yang tidak bisa dibuktikan secara matematis, misalnya yang melibatkan pustaka kriptografi pihak ketiga atau antarmuka pengguna, ditangani lewat pengujian empiris: tes unit, tes end-to-end, hingga otomasi browser. Setiap hasil verifikasi diberi label jelas apakah ia berasal dari bukti formal atau pengujian.

Microsoft menguji PDD Kit pada Pet Store, aplikasi etalase Rust sederhana. Verus tidak hanya memperkuat kode login, tetapi juga mengungkap bug yang sudah ada dan membuktikan tidak ada bug login lain yang lolos dari spesifikasi. Developer dalam uji coba itu hanya meninjau niat, tidak pernah membaca kode hasil agen baris per baris.

Secara umum, verifikasi formal adalah teknik yang biasa dipakai untuk perangkat lunak misi kritis seperti avionik atau protokol keamanan, karena biayanya tinggi dan membutuhkan spesialis. Yang berubah sekarang, menurut Microsoft, adalah agen AI sudah cukup mahir membantu menyusun spesifikasi dan bukti formal, sehingga hambatan masuknya turun. Karena itulah Microsoft menamai pendekatan ini Proof-Driven Development, dengan PDD Kit sebagai perangkat praktisnya. Tujuannya sederhana: menutup celah antara "kode terlihat benar" dan "kode memang benar" ketika tinjauan manual sudah tidak bisa mengejar volume kode yang dihasilkan agen.
