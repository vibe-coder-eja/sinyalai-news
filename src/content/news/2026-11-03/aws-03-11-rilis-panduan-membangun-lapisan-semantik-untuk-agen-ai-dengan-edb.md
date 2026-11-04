---
title: "AWS (03/11) rilis panduan membangun lapisan semantik untuk agen AI dengan EDB Postgres AI dan Bedrock AgentCore"
summary: "AWS (03/11) mempublikasikan panduan teknis membangun lapisan semantik untuk agen AI di dalam EDB Postgres AI, lalu menghubungkannya ke Amazon Bedrock AgentCore lewat protokol MCP."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/build-a-semantic-layer-for-agentic-ai-with-edb-postgres-ai-and-amazon-bedrock-agentcore/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-03T16:41:13.000Z
draft: false
sourceTitle: "Build a semantic layer for agentic AI with EDB Postgres AI and Amazon Bedrock AgentCore"
categories: ["Fitur & Skills","Riset & Kebijakan"]
---

Berdasarkan panduan teknis yang dipublikasikan AWS (03/11), tim data dan rekayasawan kini bisa membangun lapisan semantik untuk agen AI langsung di dalam basis data operasional Postgres, lalu menghubungkannya ke Amazon Bedrock AgentCore lewat protokol Model Context Protocol (MCP). Tujuannya agar agen yang menjawab pertanyaan bisnis tidak lagi menebak-nebak arti kolom, melainkan membaca definisi yang sudah tertata di satu tempat yang sama dengan datanya.

Lapisan semantik adalah semacam "kamus bisnis" yang hidup berdampingan dengan data. Alih-alih menulis ulang penjelasan setiap kolom di prompt atau dokumentasi terpisah, definisi disimpan di samping tabel menggunakan perintah standar Postgres seperti COMMENT ON. Hubungan antar tabel yang biasanya hanya dipahami analis senior kini bisa dipetakan lewat foreign key, sehingga agen otomatis memahami jalur penggabungan data. Dengan begitu, ketika seorang pengguna bertanya "siapa pelanggan dengan pengeluaran terbesar di tiap provinsi?", agen tidak keliru membaca harga sebagai harga satuan atau melewatkan kolom yang letaknya tersembunyi di tabel lain.

Dalam panduan ini, AWS menggandeng EDB Postgres AI sebagai tempat menyimpan lapisan semantik tersebut lewat ekstensi AIDB. AIDB menambahkan kemampuan untuk membuat semantic knowledge base (SemKB) dan semantic alias di atas skema Postgres yang sudah ada. Di sisi lain, Amazon Bedrock AgentCore menjadi runtime untuk agen, dengan AgentCore Gateway yang menangani autentikasi masuk dan identitas keluar. Model yang dipakai untuk perencanaan dan penyusunan jawaban adalah Anthropic Claude di Amazon Bedrock. Contoh kasus yang dipakai adalah Customer 360 (C360), yaitu pandangan menyeluruh tentang seorang pelanggan, dengan data dari empat tabel: pelanggan, lokasi, pembelian, dan produk.

Salah satu bagian yang paling menarik adalah cara pengaturan aksesnya. AWS menunjukkan bagaimana peran (role) Postgres yang berbeda, lengkap dengan GRANT dan row-level security, bisa menghasilkan jawaban berbeda untuk pertanyaan yang sama tanpa mengubah kode agen atau prompt-nya. Artinya, satu agen yang sama bisa dipakai oleh tim pemasaran, tim keuangan, dan analis risiko, dan masing-masing hanya melihat data yang sesuai dengan kewenangannya. Jejak audit juga tercatat rapi: AIDB menyimpan trace OpenTelemetry sebagai baris biasa di skema aidb_otel, sehingga bisa ditelusuri dengan kueri SQL standar.

Secara umum, pendekatan ini menarik karena menyatukan tiga lapisan yang selama ini sering terpisah: model bahasa yang merencanakan kueri, lapisan makna yang menjelaskan data, dan runtime yang mengatur identitas serta akses. Dengan menyimpan semuanya di Postgres, perusahaan tidak perlu membangun sistem tata kelola tambahan di luar basis data. Bagi tim yang sudah mengelola Postgres untuk operasional, ini berarti lebih sedikit komponen baru untuk dipelajari dan diawasi. AWS juga menyebutkan bahwa pola C360 yang sama sebelumnya sudah dibahas dengan pendekatan berbeda, seperti knowledge graph dari Stardog, virtualisasi data dari Denodo, model dimensional dari AtScale, dan linked models dari Strategy Mosaic, sehingga pembaca bisa membandingkan arsitektur mana yang paling cocok untuk kebutuhan mereka.

Panduan lengkap, termasuk diagram arsitektur dan contoh kode untuk membangun SemKB, mendaftarkan endpoint MCP ke AgentCore Gateway, serta mengatur kebijakan akses berbasis peran, tersedia di blog AWS Machine Learning.
