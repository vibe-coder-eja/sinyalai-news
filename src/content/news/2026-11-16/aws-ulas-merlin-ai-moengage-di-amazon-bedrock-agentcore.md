---
title: "AWS Ulas Merlin AI MoEngage di Amazon Bedrock AgentCore"
summary: "MoEngage membangun Merlin AI di Amazon Bedrock AgentCore. Agen AI membantu tim pemasaran menyusun dan menganalisis kampanye dari satu percakapan dengan akses data yang terpisah untuk setiap tenant."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/how-moengage-built-agentic-customer-engagement-on-amazon-bedrock-agentcore/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-16T18:16:07.000Z
draft: false
sourceTitle: "How MoEngage built agentic customer engagement on Amazon Bedrock AgentCore"
categories: ["Fitur & Skills","Penerapan Industri"]
---

Dalam artikel resmi AWS (16/11), MoEngage menjelaskan pembangunan Merlin AI, rangkaian agen AI yang membantu tim pemasaran dan produk menyusun, menganalisis, serta menyesuaikan kampanye dari satu percakapan. Solusi ini menggunakan model dasar di Amazon Bedrock dan lingkungan eksekusi di Amazon Bedrock AgentCore. Dengan demikian, pekerjaan yang sebelumnya tersebar antara analitik, pustaka konten, dan pembuat kampanye dapat ditangani dalam satu alur percakapan.

Merlin AI memiliki empat mode kerja. Pertama, agen khusus dalam Merlin AI Studio membantu menulis naskah, membuat visual, menerjemahkan deskripsi audiens menjadi filter, menyusun templat pesan, dan membangun alur pelanggan. Kedua, agen percakapan dapat bekerja lintas kampanye, analitik, segmentasi, dan alur. Ketiga, agen khusus dapat dirancang oleh tim siklus hidup pelanggan dan manajemen hubungan pelanggan untuk bekerja secara berkelanjutan dengan aturan yang ditetapkan tim. Keempat, agen keputusan menentukan pesan, waktu, frekuensi, dan kanal komunikasi bagi setiap pelanggan.

Untuk menghubungkan agen dengan data langsung, MoEngage mengubah API yang sudah dimilikinya menjadi alat berbasis Model Context Protocol atau MCP. MoEngage MCP Connector juga memungkinkan asisten yang mendukung protokol tersebut, seperti Claude atau ChatGPT, accessing segmen, riwayat kampanye, dan pustaka konten secara terisolasi. Pembatasan ini diterapkan pada setiap tenant, yaitu akun atau organisasi yang terpisah, sehingga data pelanggan tidak tercampur.

Seluruh tindakan agen dapat diperiksa melalui catatan aktivitas yang mencatat data yang diambil, keputusan yang dibuat, kanal yang disentuh, dan konten yang dikirim. Tim dapat memberikan kewenangan penuh kepada agen atau meminta persetujuan manusia sebelum tindakan dijalankan. Menurut MoEngage, klien Glance memperoleh kenaikan 38 persen pada tingkat klik notifikasi dorong setelah menggunakan solusi tersebut. Platform ini juga digunakan lebih dari 1.350 merek konsumen di berbagai kanal komunikasi.

Secara umum, MCP merupakan standar yang menghubungkan aplikasi AI dengan data dan tindakan eksternal melalui format yang konsisten. Dengan menjadikan API sebagai alat, MoEngage dapat mempertahankan sistem platform yang telah ada sekaligus menyediakan lapisan baru tempat agen menjalankan rangkaian pekerjaan atas permintaan pengguna.
