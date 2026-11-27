---
title: "OpenAI dan iFood: Agen Coding AI Otomatiskan Tugas di 15.000 Repositori"
summary: "OpenAI (24/11) mempublikasikan kisah pelanggan iFood yang membangun Remote Agents Platform untuk mendelegasikan tugas coding ke agen AI berbasis GPT-5.6 Luna lewat REST API. Dalam penggunaan awal untuk keamanan, jumlah kerentanan yang berhasil diperbaiki lebih dari dua kali lipat."
company: "OpenAI"
source: "https://openai.com/business/customer-stories/ifood"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-24T00:00:00.000Z
draft: false
sourceTitle: "How iFood scales coding agents across 15,000 repositories"
categories: ["Standar Umum"]
---

OpenAI (24/11) mempublikasikan kisah pelanggan iFood, perusahaan layanan pesan-antar makanan asal Brasil, yang berhasil menerapkan agen coding AI untuk menangani ribuan tugas teknis di lebih dari 15.000 repositori kode. Platform internal bernama Remote Agents Platform itu mengubah pekerjaan rekayasa perangkat lunak yang berulang menjadi panggilan API sederhana: tim mengirimkan permintaan, agen AI mengerjakan tugas di sandbox jarak jauh, dan hasilnya kembali berupa merge request yang siap ditinjau.

Victor Coelho, Senior Software Engineer di iFood, menjelaskan bahwa tantangan utama bukan pada satu tugas tertentu, melainkan pada skala. Sebelum platform ini ada, setiap tim menangani masalah serupa dengan caranya sendiri dan semuanya menabrak hambatan yang sama: tidak adanya lapisan eksekusi bersama. Remote Agents Platform dirancang untuk mengisi celah itu, sehingga tim bisa fokus pada masalah bisnis dan menyerahkan proses eksekusi ke platform.

Secara teknis, alur kerjanya berjalan dalam tiga langkah. Pengguna mengirim prompt dan kebutuhan lingkungan melalui REST API, platform memproses tugas di runner jarak jauh dalam sandbox terisolasi, dan hasilnya diambil setelah selesai. Eksekusi inti dijalankan oleh model GPT-5.6 Luna, sementara langkah-langkah di awal dan akhir—seperti mengkloning repositori, menyiapkan cabang kerja, hingga menerbitkan merge request—ditangani secara deterministik agar alur kerja tetap dapat diprediksi. Sandbox berjalan di atas Ubuntu dan sudah mencakup toolchain yang dipakai iFood, mulai dari Python, Java, Kotlin, C#, TypeScript, Rust, JavaScript, hingga Go, dengan akses ke layanan internal seperti Nexus, GitLab, Docker, Snyk, Kubernetes, dan AWS.

Pemilihan model tidak hanya mempertimbangkan kecerdasan, tetapi juga keseimbangan antara efisiensi dan kecepatan eksekusi. Coelho menyebut rata-rata biaya sekitar empat sen dolar AS per eksekusi sebagai pertimbangan arsitektur, bukan detail kecil, mengingat volume token yang dikonsumsi di ribuan repositori. Setelah sesi agen selesai, hasilnya diproses menggunakan Structured Outputs dari OpenAI agar sesuai dengan kontrak yang telah ditentukan, sehingga tim bisa menilai apakah tugas benar-benar tuntas.

Penggunaan awal yang sudah berjalan adalah produk keamanan internal yang memindai 15.000 repositori untuk menemukan dependensi rentan dan mencoba memperbaikinya. Coelho menyebut akurasi perbaikan meningkat lebih dari dua kali lipat dibanding pendekatan sebelumnya. Karena berjalan secara asinkron, pengembang bisa meluncurkan perbaikan kode atau analisis performa saat rapat dan tidak perlu memantau prosesnya secara langsung, sehingga pekerjaan rutin tidak lagi bersaing dengan pekerjaan yang membutuhkan penilaian manusia.

Secara umum, istilah sandbox merujuk pada lingkungan terisolasi tempat kode dijalankan tanpa memengaruhi sistem lain, sementara merge request adalah usulan perubahan kode yang diajukan ke repositori untuk ditinjau dan disetujui sebelum digabungkan. Pendekatan iFood menunjukkan satu pola yang makin sering dipakai di industri: pekerjaan teknis berulang didelegasikan ke agen AI melalui API, dan manusia tetap memegang keputusan akhir.
