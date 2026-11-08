---
title: "AWS Paparkan Cara Bangun Server MCP Serverless di ECS Fargate untuk Akses Data Lake Agen AI"
summary: "AWS (06/11) membagikan panduan membangun server Model Context Protocol (MCP) serverless di Amazon ECS Fargate yang menjadi gerbang terpusat antara agen AI dan data lake perusahaan, dengan penambahan dataset cukup lewat berkas JSON."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/serverless-mcp-server-for-ai-agent-data-lake-access-on-amazon-ecs-fargate/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-06T17:13:13.000Z
draft: false
sourceTitle: "Serverless MCP server for AI agent data lake access on Amazon ECS Fargate"
categories: ["Fitur & Skills","Penerapan Industri"]
---

Tim AWS (06/11) menjelaskan di blog Machine Learning mereka cara membangun server Model Context Protocol (MCP) tanpa server di Amazon ECS dengan AWS Fargate. Tujuannya sederhana: menjadi gerbang terpusat antara agen AI dan data lake perusahaan, sehingga setiap agen tidak lagi menulis kode integrasi sendiri untuk setiap dataset.

Selama ini, tim yang membangun aplikasi berbasis AI sering menghubungkan agen langsung ke basis data dan API tanpa perantara bersama. Akibatnya, setiap dataset baru menuntut kode kustom, kontrol akses tersebar, dan penambahan sumber data bisa memakan waktu berhari-hari. Server MCP yang dirancang AWS menjawab pola itu dengan pendekatan berbasis metadata: menambah dataset baru cukup dengan menambahkan satu berkas JSON, lalu server mengenalinya secara otomatis pada sinkronisasi berikutnya.

Arsitektur yang dipublikasikan AWS membagi sistem menjadi empat lapisan yang bisa diskalakan dan di-deploy secara terpisah: lapisan klien, lapisan server MCP, lapisan perkakas (tools), dan lapisan penyegaran basis pengetahuan. Permintaan pengguna dari aplikasi seperti web chat, Slack, plugin IDE, atau agen eksternal masuk lewat Amazon Route 53 dan Application Load Balancer dengan HTTPS serta AWS WAF. Autentikasi ditangani Amazon Cognito, sesi disimpan di Amazon DynamoDB, lalu permintaan diteruskan ke lapisan server MCP yang berjalan di Amazon ECS Fargate.

Di lapisan server MCP, agen AI yang ditenagai Amazon Bedrock mengorkestrasi perkakas yang dibangun dengan FastMCP, sebuah kerangka Python untuk membangun server MCP. Amazon Bedrock Guardrails diterapkan pada setiap interaksi model. Untuk lapisan data, kueri SQL dijalankan lewat Amazon Athena dan Amazon Redshift terhadap data lake, sementara pencarian semantik ditangani Amazon Bedrock Knowledge Bases. Penyerapan data ke Amazon S3 dan basis pengetahuan dijalankan oleh AWS Lambda.

Salah satu bagian yang ditekankan adalah pemetaan konteks: konfigurasi JSON menentukan tabel mana saja yang relevan untuk domain bisnis tertentu, sehingga server hanya mencari di tabel yang relevan saat agen menghasilkan SQL. AWS melaporkan latensi interaksi akhir-ke-akhir berada di kisaran 15 sampai 20 detik dalam pengujian mereka. Kontrol akses dipusatkan di lapisan server MCP, sehingga audit keputusan akses data memiliki satu titik tunggal.

Secara umum, Model Context Protocol adalah standar yang memungkinkan agen AI memanggil perkakas atau sumber data eksternal secara terstruktur, sementara serverless berarti tim tidak perlu mengelola server sendiri karena kapasitas ditangani otomatis oleh penyedia komputasi awan. Pendekatan berbasis metadata seperti ini membuat penambahan dataset baru tidak lagi memerlukan perubahan kode pada agen, melainkan cukup pembaruan pada katalog yang menjadi acuan bersama.
