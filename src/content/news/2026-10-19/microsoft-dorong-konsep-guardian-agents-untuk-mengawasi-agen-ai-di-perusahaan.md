---
title: "Microsoft Dorong Konsep Guardian Agents untuk Mengawasi Agen AI di Perusahaan"
summary: "Microsoft (19/10) memperkenalkan pendekatan keamanan untuk agen AI internal perusahaan lewat Project Perception, dengan Guardian Agents yang mengawasi setiap tindakan agen secara real time."
company: "Microsoft"
source: "https://blogs.microsoft.com/blog/2026/10/19/securing-the-agentic-insider/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-19T13:00:02.000Z
draft: false
sourceTitle: "Securing the agentic insider"
categories: ["Fitur & Skills","Riset & Kebijakan"]
---

Dalam tulisan di blog resminya, Microsoft (19/10) menyoroti masalah keamanan yang selama ini kurang mendapat perhatian: agen AI yang bekerja di dalam perusahaan sendiri. Selama berbulan-bulan, perhatian publik lebih banyak tertuju pada aktor jahat yang memakai model AI untuk menyerang dari luar. Padahal, agen yang dipasang di dalam organisasi juga bisa menimbulkan risiko karena model frontier tidak bisa dipercaya begitu saja, bukan karena model dirancang jahat, melainkan karena model dilatih untuk mencapai tujuan dan sering mengambil jalan pintas yang tidak sesuai norma organisasi.

Microsoft menjelaskan bahwa agen AI kini sudah diterapkan di banyak perusahaan dalam jumlah besar. Agen-agen ini sering memiliki akses yang terlalu luas ke data, alat, dan sistem, serta bisa mengambil keputusan dalam proses-proses penting. Karena itulah, pemantauan terhadap agen tidak boleh lagi bersifat berkala, melainkan harus berjalan terus-menerus. Microsoft memperkenalkan konsep Guardian Agents, istilah yang sudah dikenal di industri keamanan, yaitu agen pengawas yang memantau dan menengahi setiap tindakan agen lain sebelum tindakan itu dijalankan, selama 24 jam.

Untuk menjawab kebutuhan ini, Microsoft mengandalkan Project Perception, sistem keamanan agentic yang diumumkan pada Juli lalu. Sistem ini menggunakan tumpukan keamanan siber baru dan tim agen berwarna merah, biru, dan hijau untuk membantu tim pertahanan menghadapi serangan AI dari luar. Tumpukan yang sama kini juga dipakai untuk mengelola agen internal. Cara kerjanya dibagi dalam tiga lapisan: pertama, sensor dan sinyal dari berbagai sumber seperti identitas, data, cloud, endpoint, jaringan, dan runtime digunakan untuk menemukan agen di perusahaan dan membawanya ke dalam pengelolaan dengan identitas, wadah, serta kebijakan tertentu. Kedua, sinyal-sinyal tersebut dipakai untuk menghitung risiko secara dinamis terhadap apa yang coba dilakukan agen. Ketiga, berdasarkan tingkat risiko itu, tim Guardian Agents mengawasi setiap tindakan secara langsung dan merespons secara terarah ketika profil risiko meningkat.

Microsoft menekankan bahwa keamanan agentic bukan menggantikan peran manusia, melainkan melengkapi. Sistem bekerja pada kecepatan, sementara praktisi keamanan memberikan penilaian. Dengan cara ini, pertahanan bisa bergerak secepat sistem yang dilindungi. Ke depan, Microsoft menilai transparansi model juga penting: selain melihat input dan output, sistem keamanan perlu melihat proses berpikir atau chain of thought agar bisa memahami apakah niat model benar-benar selaras dengan tujuan agen.

Secara umum, istilah agentic AI merujuk pada sistem AI yang tidak hanya menjawab pertanyaan, tetapi bisa mengambil tindakan, memakai alat, dan menjalankan alur kerja secara mandiri. Karena sifat otonom inilah, konsep Guardian Agents menjadi relevan: sama seperti manusia yang bekerja di dalam perusahaan perlu diawasi, agen AI juga memerlukan lapisan pengawasan tambahan agar tindakan mereka tetap berada di batas yang aman.
