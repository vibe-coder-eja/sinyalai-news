---
title: "AWS Jelaskan Empat Lapis Context Engineering untuk Agen AI Produksi Lewat Deep Insight"
summary: "AWS (04/11) mempublikasikan bagian kedua dari seri teknis tentang Deep Insight, solusi analisis data multi-agen sumber terbuka yang menerapkan empat lapis context engineering untuk menjaga agen AI tetap efisien saat menangani tugas produksi jangka panjang."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/four-layers-of-context-engineering-for-production-ai-agents-how-deep-insight-applies-them-in-working-code/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-04T16:30:40.000Z
draft: false
sourceTitle: "Four layers of context engineering for production AI agents: How Deep Insight applies them in working code"
categories: ["Fitur & Skills","Produk Baru"]
---

Berdasarkan tulisan di blog Machine Learning AWS (04/11), perusahaan menjelaskan empat lapis context engineering yang diterapkan pada Deep Insight, solusi analisis data multi-agen sumber terbuka yang dibangun di atas Strands Agents SDK dan Amazon Bedrock AgentCore. Tulisan ini merupakan bagian kedua dari seri yang merangkum praktik teknis untuk menjaga agen AI tetap akurat dan hemat biaya saat memproses tugas produksi yang panjang.

Context engineering adalah disiplin mengelola informasi yang masuk ke jendela konteks (context window) model bahasa besar agar agen bekerja optimal. AWS mencontohkan, jendela konteks 200K token milik Anthropic Claude Sonnet 4.5 yang tersedia di Amazon Bedrock bisa habis dalam hitungan menit saat agen menjalankan analisis data dan pembuatan laporan. Permintaan sederhana seperti "analisis data penjualan dan buat laporan DOCX" dapat melewati tahap pemuatan data, eksplorasi, analisis kategori, pembuatan diagram, validasi statistik, hingga penyusunan laporan akhir, yang secara kumulatif mengonsumsi lebih dari 150K token selama sekitar 15 menit. Bila semua tahap itu diproses dalam satu konteks, jendela bisa meluap di tengah jalan, informasi lama menurunkan akurasi, dan kesalahan kecil mengharuskan seluruh alur diulang dari awal.

Untuk menjawab masalah itu, Deep Insight membagi context engineering menjadi empat lapis yang saling melengkapi. Lapis pertama adalah isolasi konteks lewat arsitektur multi-agen: setiap agen khusus (seperti Coder, Validator, Reporter, Tracker, dan Auditor) memiliki jendela konteks sendiri, dan hanya hasil ringkas yang diteruskan ke orkestrator. Informasi bersama disimpan dalam struktur sederhana berisi pesan terakhir, ringkasan terkompresi, daftar periksa, dan log singkat, sehingga konteks agen yang paling berat pun tetap berada di bawah 25K token.

Lapis kedua adalah pengendalian konteks lewat prompt, termasuk pemuatan keterampilan secara dinamis sehingga system prompt menyusut sekitar 97 persen dibanding bila semua instruksi dimuat di awal. Lapis ketiga adalah eksternalisasi konteks ke sistem berkas: alih-alih menyisipkan keluaran panjang ke dalam konteks, agen menulis dan mengeksekusi skrip lewat satu alat tulis-eksekusi, yang menurut AWS memangkas token yang ditambahkan setiap skrip sekitar 95 persen. Lapis keempat adalah verifikasi oleh agen independen dan mekanisme pengaman yang menangkap kesalahan serta mencegah konteks meluap.

Secara umum, context engineering adalah pendekatan berlapis di mana setiap lapisan menutup keterbatasan lapisan sebelumnya. AWS juga mengumumkan bagian ketiga seri ini akan membahas cara menerapkan Deep Insight dari pengembangan ke produksi di Amazon Virtual Private Cloud (Amazon VPC), termasuk aspek keamanan dan operasional.
