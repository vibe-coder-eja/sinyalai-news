---
title: "Meta Sebar Luaskan Sistem Catching JiTTests untuk Tangkap Bug Sebelum Masuk Produksi"
summary: "Meta (29/10) mengumumkan bahwa pendekatan Catching JiTTests, yang menggunakan model bahasa besar untuk menangkap bug secara otomatis, kini sudah diterapkan penuh di infrastruktur perusahaan. Sistem ini menghasilkan tes yang gagal untuk memperlihatkan perilaku kode yang keliru, lalu memfilter hasil lemah dengan kombinasi aturan dan ensemble LLM sebelum melibatkan manusia."
company: "Meta"
source: "https://engineering.fb.com/2026/10/29/security/catching-bugs-before-they-land-jittestings-human-on-the-loop-approach-at-full-scale/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-29T16:00:12.000Z
draft: false
sourceTitle: "Catching Bugs Before They Land: JiTTesting’s Human-on-the-Loop Approach at Full Scale"
categories: ["Rilis Model","Penerapan Industri","Riset & Kebijakan"]
---

Meta (29/10) mengumumkan bahwa pendekatan bernama Catching JiTTests, yang menggunakan model bahasa besar (LLM) untuk menangkap bug secara otomatis, kini sudah diterapkan penuh di infrastruktur perusahaan dan bukan lagi sekadar prototipe riset. Dalam tulisan di blog tekniknya, tim engineering Meta menjelaskan bahwa sistem ini menghasilkan tes eksekusi yang sengaja dirancang gagal untuk memperlihatkan perbedaan perilaku yang diperkenalkan oleh sebuah perubahan kode, sehingga bug bisa teridentifikasi sebelum kode tersebut masuk ke produksi.

Bagi tim engineering yang setiap hari berurusan dengan ratusan juta baris kode yang terus berubah, pendekatan tradisional sering kali kalah cepat. Catching JiTTests mencoba menjawab satu pertanyaan sederhana: untuk setiap perubahan kode yang diajukan, bagaimana caranya otomatis membuat tes yang menemukan bug paling parah dengan tingkat positif benar yang tinggi, tanpa menghambat kecepatan kerja insinyur. Meta melaporkan bahwa dalam lima bulan sejak pertama kali memperkenalkan konsep ini, sistem sudah dijalankan pada perubahan kode sehari-hari dan membantu insinyur menemukan lebih banyak bug dengan beban tinjauan yang lebih ringan.

Cara kerjanya berbeda dari kebanyakan pendekatan berbasis AI untuk mencegah bug. Jika peninjauan kode berbasis LLM atau agen AI biasanya meniru proses yang dilakukan manusia, Catching JiTTests menghasilkan tes yang bisa dijalankan dan menunjukkan perbedaan perilaku konkret. Pendekatan ini memang memerlukan langkah komputasi yang lebih banyak, tetapi diklaim mampu menangkap kelas bug yang luput dari tinjauan kode berbasis LLM atau agen.

Untuk menyaring hasil yang lemah atau positif palsu, Meta merangkai dua alur kerja yang berjalan beriringan. Alur pertama bersifat intent-aware, yaitu LLM dipakai untuk menebak niat dan risiko dari sebuah perubahan kode, lalu mengarahkan pembuatan tes ke titik-titik yang paling mungkin gagal. Alur kedua disebut dodgy diff, yang memperlakukan setiap perubahan kode seolah-olah merupakan mutant atau bug, lalu membuat tes untuk mengekspos perbedaan perilakunya tanpa menebak niat. Hasil dari kedua alur ini kemudian dinilai oleh ensemble yang disebut LLM-as-Judge, yaitu kumpulan LLM yang memberi suara untuk memilah tangkapan lemah menjadi kemungkinan positif benar atau positif palsu, dibantu oleh penyaring berbasis aturan bernama RubFake. Hanya kandidat yang lolos penyaringan ini yang akhirnya dibawa ke tinjauan manusia, dengan tujuan menjaga konsistensi pelabelan sekaligus mengurangi frekuensi insinyur dipanggil untuk memeriksa tangkapan lemah.

Seluruh proses berjalan dalam lima tahap dan dijalankan pada kapasitas komputasi yang tidak terpakai di malam hari, dengan target perubahan kode yang sehari sebelumnya dinilai berisiko menggunakan mekanisme mirip Diff Risk Score. Meta juga merilis makalah berjudul "Just-in-Time Catching Test Generation at Meta" yang merinci penerapan awal dan pengujian sistem ini.

Secara umum, istilah mutation-guided test generation merujuk pada teknik membuat versi kode yang sengaja dimutasi untuk meniru kemungkinan bug, lalu menulis tes yang mampu membedakan perilaku versi asli dan versi mutan tersebut. Pendekatan seperti ini sudah lama dipakai dalam rekayasa perangkat lunak untuk menguji kualitas perangkat uji, dan kini dipadukan dengan LLM agar bisa dijalankan secara otomatis pada skala kode yang sangat besar.
