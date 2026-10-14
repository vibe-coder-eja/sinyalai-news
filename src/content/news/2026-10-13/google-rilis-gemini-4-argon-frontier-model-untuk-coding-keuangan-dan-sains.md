---
title: "Google Rilis Gemini 4 Argon, Frontier Model untuk Coding, Keuangan, dan Sains"
summary: "Google (13/10) merilis Gemini 4 Argon, model frontier terbaru yang diklaim mampu menangani tugas bertahap di coding, keuangan, hukum, keamanan siber, dan sains. Tersedia lewat API dan aplikasi Gemini dengan harga perkenalan $2 per juta token input."
company: "Google"
source: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-13T16:00:00.000Z
draft: false
sourceTitle: "Gemini 4 Argon: Built to solve your hardest problems"
categories: ["Rilis Model","Penerapan Industri"]
---

Google resmi memperkenalkan Gemini 4 Argon sebagai model AI frontier terbaru mereka. Berdasarkan rilis resmi Google (13/10), model ini sudah tersedia secara global hari ini lewat API di AI Studio dan platform Gemini, untuk pelanggan Google AI Ultra di aplikasi Antigravity, serta pelanggan AI Ultra dan Pro di aplikasi Gemini dan AI Mode di Search.

Gemini 4 Argon dirancang untuk pekerjaan bertahap dan kompleks di bidang coding, keuangan, hukum, keamanan siber, dan sains. Menurut Google, model ini menempati peringkat pertama di Vals Index, benchmark yang mengukur kinerja model pada sektor ekonomi kritis seperti keuangan, coding, hukum, dan pekerjaan pajak. Peringkat dan skor benchmark tersebut merupakan klaim Google berdasarkan rilis tersebut.

Harga perkenalannya adalah $2 per juta token input dan $10 per juta token output, dengan potongan 95 persen untuk token input yang sudah tersimpan di cache. Token adalah satuan teks yang dibaca dan ditulis model, jadi harga itu pada dasarnya adalah biaya yang dibayar developer untuk setiap sejuta potongan teks yang diproses.

Untuk developer yang sering bergulat dengan ratusan ribu baris kode lawas, kehadiran model AI di tahap coding kini makin lazim. Di internal Google, penggunaan Argon oleh tim software engineer disebut sudah membantu pengiriman kode agentic di Antigravity naik lebih dari 35 persen sekaligus memangkas rollback hampir sepertiganya. Angka-angka tersebut merupakan klaim internal Google dalam rilis tersebut.

Beberapa contoh pekerjaan yang dibagikan Google:

- Refactor browser Chrome. Tim Chrome dibantu memisahkan logika inti halaman web dari folder lawas sekitar 6 juta baris kode di dalam codebase Chromium yang totalnya 40 juta baris. Refaktor arsitektur yang biasanya makan waktu berbulan-bulan disebut selesai dalam hitungan minggu.
- Optimalisasi framework Agent Development Kit (ADK), framework milik Google untuk membangun agen enterprise. Lewat sebuah tujuan satu paragraf dan buku aturan .agents/skills, model disebut bekerja secara otonom semalam dan menghasilkan penyesuaian kode yang menurunkan waktu persiapan sesi 40 persen serta mempercepat cold import 21 persen pada aplikasi yang sudah ada. Hasilnya sudah digabungkan ke repositori google/adk-python.
- Akselerasi xTB, salah satu paket kimia kuantum yang dipakai untuk memprediksi bentuk 3D molekul dan menyaring kandidat obat serta material. Peneliti Google memakai Argon untuk membuat xTB 2,3 kali lebih cepat dalam memprediksi struktur molekul dan 1,8 kali lebih cepat untuk pencarian konformer. Kontribusinya sudah disetor ke repositori resmi xTB di GitHub.
- Akselerasi model Gemma 4 E2B, salah satu varian keluarga model terbuka Google. Lewat Argon, tim meraih peningkatan kecepatan inferensi 2,85 kali (dari sekitar 37.900 menjadi lebih dari 108.000 token per detik) pada GPU A100 lewat vLLM, tanpa mengubah kualitas keluaran. Proses yang biasanya makan waktu berbulan-bulan disebut tuntas dalam beberapa hari.

Google juga memamerkan kemampuan visual Argon lewat demo di Google AI Studio: model 3D pagoda dengan arsitektur dan pencahayaan realistis, miniatur meja yang diubah jadi gim racing dengan fisika dan audio, hingga gim 3D lengkap dengan fisika, shader, dan AI lawan yang seluruhnya ditulis dengan Python murni.

Istilah "frontier model" merujuk pada model bahasa besar paling mutakhir dari sebuah perusahaan, biasanya menjadi patokan kemampuan AI terkini. Model frontier pada umumnya dilengkapi penalaran bertahap yang lebih kuat, memori konteks lebih panjang, dan pengetahuan domain yang lebih luas dibanding versi sebelumnya. Gabungan kemampuan itulah yang memungkinkan model-model terkini menuntaskan proyek bertahap seperti refaktor kode atau eksperimen sains, bukan hanya menjawab satu pertanyaan singkat.
