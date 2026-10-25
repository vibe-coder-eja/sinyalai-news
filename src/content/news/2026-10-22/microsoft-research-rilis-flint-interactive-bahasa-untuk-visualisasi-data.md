---
title: "Microsoft Research rilis Flint-interactive, bahasa untuk visualisasi data interaktif dari agen AI"
summary: "Microsoft Research memperkenalkan Flint-interactive, bahasa pemrograman yang memungkinkan agen AI membuat visualisasi data interaktif. Pengguna dapat mengklik, menyaring, memperbesar, dan menghubungkan antar-chart tanpa harus menulis kode visualisasi tingkat rendah."
company: "Microsoft"
source: "https://www.microsoft.com/en-us/research/blog/flint-interactive-a-language-for-creating-interactive-data-visualizations/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-22T16:00:00.000Z
draft: false
sourceTitle: "Flint-interactive: A language for creating interactive data visualizations"
categories: ["Fitur & Skills","Riset & Kebijakan"]
---

Microsoft Research memperkenalkan Flint-interactive, sebuah bahasa pemrograman yang dirancang agar agen AI dapat menghasilkan visualisasi data interaktif secara lebih andal. Berdasarkan rilis resmi Microsoft Research (22/10), bahasa ini dibangun di atas kerangka kerja Flint dan memungkinkan pengguna mengeksplorasi chart lewat klik, penyaringan (filter), pembesaran (zoom), penandaan (highlight), hingga interaksi lintas diagram dalam satu tampilan.

Selama ini, agen AI sudah cukup mahir merangkum data menjadi grafik statis. Namun, ketika pengguna ingin menggali lebih dalam, misalnya membandingkan data antar-chart atau menandai teks terkait dari pilihan di grafik, kemampuan itu sering terhenti. Microsoft menjelaskan bahwa membuat visualisasi interaktif dari nol membutuhkan banyak putaran penalaran, pengodean, dan perbaikan, sehingga memakan biaya komputasi dan rentan menghasilkan tata letak yang berantakan atau interaksi yang rusak.

Flint-interactive menjawab masalah itu dengan memisahkan logika visual dan logika interaksi. Pengguna atau agen cukup menentukan perilaku menggunakan peristiwa semantik tingkat tinggi (semantic events) dan operator pembaruan, sementara compiler Flint menerjemahkan interaksi pengguna menjadi peristiwa yang bermakna dan memperbarui tampilan secara otomatis. Dengan cara ini, beban mengelola ketergantungan kompleks antara interaksi dan logika visual berpindah dari tangan pengguna ke compiler.

Secara praktis, bahasa ini dapat dipakai di tiga lingkungan. Pertama, lewat Flint-MCP dan MCP Apps, pengguna cukup memberi tahu agen apa yang ingin divisualisasikan dan interaksi apa yang diinginkan, lalu agen menghasilkan spesifikasi interaksi bersama spesifikasi chart dan menampilkannya langsung di percakapan. Kedua, lewat Flint Interactive Canvas untuk membangun dasbor, cerita data, atau aplikasi yang menghubungkan chart dengan tabel, teks, dan widget lain. Ketiga, lewat API pemrograman bagi pengembang yang ingin menentukan interaksi khusus, misalnya menyeret titik pada grafik untuk melihat perubahan suhu dan curah hujan berbagai kota sepanjang waktu.

Secara umum, istilah semantic events merujuk pada peristiwa yang merepresentasikan makna di balik tindakan pengguna, bukan sekadar perintah teknis seperti klik atau geser. Dengan pendekatan ini, pembuat visualisasi tidak perlu lagi menulis kode tingkat rendah untuk setiap renderer, melainkan cukup menyatakan apa yang seharusnya terjadi ketika pengguna memilih elemen tertentu. Hasilnya, interaksi yang biasanya membutuhkan ratusan baris kode dapat dirangkum dalam beberapa baris spesifikasi yang lebih mudah dikelola, baik oleh manusia maupun oleh agen AI.
