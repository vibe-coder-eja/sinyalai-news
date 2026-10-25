---
title: "OpenAI Klaim Habitat dan Azure Cosmos DB Mempercepat Pembacaan Data ChatGPT 12 Kali"
summary: "OpenAI (23/10) melaporkan bahwa Habitat, dengan multi-tenancy, cache global, dan Azure Cosmos DB, membuat pembacaan data untuk ChatGPT 12 kali lebih cepat."
company: "OpenAI"
source: "https://openai.com/index/scaling-storage-one-billion-users-part-two"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-23T17:00:00.000Z
draft: false
sourceTitle: "Rapidly scaling online storage to serve over 1 billion ChatGPT users (Part II)"
categories: ["Penerapan Industri"]
---

Dalam artikel teknis resminya, OpenAI (23/10) menjelaskan bahwa perusahaan telah mengembangkan Habitat, sistem penyimpanan daring yang menopang data ChatGPT, menggunakan multi-tenancy yang andal, cache global, dan Azure Cosmos DB. Menurut OpenAI, perubahan tersebut menghasilkan pembacaan data 12 kali lebih cepat, dengan arsitektur yang ditujukan untuk melayani lebih dari satu miliar pengguna ChatGPT.

Perubahan itu terjadi di lapisan infrastruktur, bukan pada model generatif yang menjawab pesan. Saat pengguna membuka kembali percakapan atau sistem mengambil konteks yang diperlukan, kecepatan pembacaan data dapat memengaruhi waktu tunggu layanan. Multi-tenancy memungkinkan satu infrastruktur melayani banyak pengguna dengan tetap memisahkan data secara logis, sedangkan cache global dapat menyajikan data yang sering diakses dari lokasi yang lebih dekat.

Azure Cosmos DB menjadi salah satu komponen utama dalam rancangan tersebut. Layanan ini merupakan basis data NoSQL terdistribusi milik Microsoft Azure yang dapat menjalankan data di beberapa wilayah. OpenAI memadukannya dengan cache global agar data yang banyak diakses tidak selalu perlu diambil kembali dari sumber utama pada setiap permintaan.

Angka 12 kali merupakan klaim OpenAI, bukan jaminan bahwa setiap pengalaman pengguna akan menjadi 12 kali lebih cepat; waktu respons juga bergantung pada jaringan, lokasi pengguna, dan beban sistem. Secara umum, multi-tenancy berarti satu sistem dipakai bersama banyak pengguna dengan pemisahan logis atas data masing-masing, sedangkan cache global menyimpan sementara data yang sering diakses agar pembacaan berikutnya dapat diselesaikan lebih cepat.
