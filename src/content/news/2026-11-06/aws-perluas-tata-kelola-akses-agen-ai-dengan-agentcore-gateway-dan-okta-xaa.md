---
title: "AWS Perluas Tata Kelola Akses Agen AI dengan AgentCore Gateway dan Okta XAA"
summary: "Tutorial AWS (06/11) memakai Amazon Bedrock AgentCore Gateway sebagai pintu akses tunggal agen AI. Okta XAA mendelegasikan wewenang, kebijakan Cedar mengatur setiap alat, dan Amazon CloudWatch mencatat keputusan izin serta penolakan."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/govern-ai-agent-access-with-okta-cross-app-access-and-amazon-bedrock-agentcore-part-2/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-06T17:09:23.000Z
draft: false
sourceTitle: "Govern AI agent access with Okta Cross App Access and Amazon Bedrock AgentCore – Part 2"
categories: ["Fitur & Skills","Penerapan Industri"]
---

Tutorial resmi AWS (06/11) bagian kedua ini menjelaskan cara memperluas tata kelola akses agen AI dari satu agen menjadi pola bagi ratusan agen dan ribuan alat. Amazon Bedrock AgentCore Gateway menjadi satu pintu depan: agen meneruskan permintaan melalui Gateway, sedangkan Okta Cross App Access (XAA) menentukan wewenang yang dapat didelegasikan. Dengan susunan itu, peran agen tidak lagi memegang izin penukaran token atau akses rahasia penyedia.

Alurnya dimulai ketika pengguna masuk dan lapisan layanan antarmuka menukar token identitasnya dengan ID-JAG, token delegasi yang diterbitkan Okta kepada agen tugas. Agen membawa ID-JAG sebagai token pembawa akses dalam sesi MCP ke Gateway. Pemeriksa masuk hanya menerima token dari agen yang diizinkan. Satu set kebijakan Cedar yang menolak permintaan secara bawaan lalu dinilai saat alat didaftarkan dan setiap kali alat dipanggil. Untuk permintaan yang lolos, AgentCore Identity menukar ID-JAG di server otorisasi Okta untuk sasaran terkait; permintaan yang ditolak tidak melakukan penukaran. Server MCP kemudian memeriksa grup dan cakupan pengguna.

Pola bagian pertama memberi setiap agen ARN lingkungan kerja dan akses langsung ke server MCP. Pada skala perusahaan, hubungan itu menjadi matriks koneksi yang harus diperbarui setiap kali ada alat baru. Pemeriksaan grup yang sama juga tersebar di banyak server dan berisiko berbeda satu sama lain. Bagian kedua memindahkan daftar sasaran ke Gateway serta menyatukan aturan dalam satu set kebijakan, sehingga perubahan dan audit dapat dilakukan dari satu titik.

Pola ini diuji dengan agen kedua, agen pelaporan, yang berjalan di Amazon Elastic Kubernetes Service (Amazon EKS) dan memakai identitas Okta sendiri, tetapi tetap melalui Gateway. Setiap tahap menghasilkan telemetri OpenTelemetry menuju AgentCore Observability, yang dikumpulkan Amazon CloudWatch Transaction Search. Log sistem Okta mengalir melalui Amazon EventBridge, sehingga keputusan izin dan penolakan dapat dibaca bersama.

AWS menyebut tambahan implementasi memerlukan sekitar 90 menit. Biayanya mencakup 0,10 dolar AS per jam untuk bagian pengendali EKS, ditambah biaya node dan pengelolaan Amazon EKS Auto Mode; fitur AgentCore ditagih berdasarkan penggunaan. Cuplikan konfigurasi masih konseptual, bukan solusi lengkap yang siap dipasang, dan kode contoh ditujukan untuk penggunaan nonproduksi. Sebelum dipakai di lingkungan nyata, tim keamanan dan hukum perlu memenuhi persyaratan keamanan, regulasi, serta kepatuhan.

Secara umum, MCP adalah standar penghubung agen dengan alat atau data, ARN adalah pengenal unik sumber daya AWS, dan Cedar merupakan bahasa aturan akses. AWS juga membandingkan XAA dengan persetujuan OAuth per pengguna bagi aplikasi yang tidak dapat menerima pemberian izin dari Okta. Bagi tim yang mengelola banyak agen, Gateway dapat dibayangkan sebagai meja resepsionis: semua permintaan melewati satu pintu sebelum diteruskan, sementara identitas dan log setiap agen tetap dapat dilacak.
