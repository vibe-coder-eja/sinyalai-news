---
title: "Google Luncurkan Tool Retrieval Pratinjau di Gemini API"
summary: "Google anonymity_tool_search in pratinjau untuk Gemini Interactions API, memungkinkan agen memuat skema parameter alat hanya saat dibutuhkan sehingga penggunaan token dan latensi dapat berkurang."
company: "Google"
source: "https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-tool-retrieval/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-19T18:00:00.000Z
draft: false
sourceTitle: "Introducing Tool Retrieval in the Gemini API"
categories: ["Rilis Model","Produk Baru"]
---

Google (19/11) meluncurkan Tool Retrieval dalam pratinjau untuk Gemini Interactions API. Fitur ini memungkinkan agen menyimpan pustaka alat secara lengkap, lalu memuat skema parameter hanya ketika tugas membutuhkan alat tertentu, sehingga jumlah token masukan, latensi, dan biaya dapat berkurang ketika agenPEN331 dengan banyak alat.

Bagi pengembang yang menghubungkan satu agen ke puluhan atau ratusan fungsi, pengiriman seluruh skema parameter pada setiap permintaan dapat memperbesar konteks dan membuat pilihan alat kurang tepat. Dengan Tool Retrieval, model tetap melihat nama dan deskripsi alat yang ditunda, tetapi detail parameternya baru diambil ketika diperlukan. Pengembang dapat mengaktifkannya dengan menambahkan alat `tool_search` dan menetapkan `defer_loading: true` pada alat yang ingin ditunda.

Pencarian, pemuatan skema, dan pemanggilan fungsi berlangsung dalam satu permintaan API. Google menyediakan pendekatan sisi server tanpa indeks terpisah yang harus dibangun atau di-host, sedangkan pengembang yang menggunakan registry, embedding index, atau filter izin sendiri dapat menjalankan pencarian di sisi klien. Fitur ini juga dapat digunakan bersama prefix caching dan server MCP jarak jauh; pada MCP, seluruh alat yang diekspos server dapat dimuat secara on-demand.

Menurut Google, Tool Retrieval kompatibel dengan Gemini 3.6 dan model yang lebih baru, termasuk semua model Gemini 4, melalui Interactions API. Fitur ini tidak memiliki biaya tambahan tersendiri; token masukan dan keluaran tetap dikenakan tarif standar model yang digunakan. Biaya tambahan mencakup blok kecil token masukan untuk `tool_search` dan skema yang dimuat, sehingga penghematan bergantung pada apakah skema yang tidak dimuat lebih banyak daripada skema yang benar-benar digunakan.

Secara umum, Tool Retrieval adalah mekanisme untuk memilih dan memuat informasi alat secara selektif. Dalam pemanggilan fungsi biasa, pengembang mendefinisikan kemampuan yang dapat dipanggil model. Dengan Tool Retrieval, definisi lengkap sebuah fungsi tetap berada di luar konteks awal dan dimasukkan ketika model memerlukan format parameter tersebut.
