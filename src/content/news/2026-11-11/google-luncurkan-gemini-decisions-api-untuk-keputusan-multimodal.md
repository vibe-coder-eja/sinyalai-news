---
title: "Google Luncurkan Gemini Decisions API untuk Keputusan Multimodal"
summary: "Google memperkenalkan Gemini Decisions API dengan model Gemini Decision 1 untuk menilai hingga 1.000 pertanyaan pada input teks, gambar, audio, video, dan PDF sekaligus. Setiap jawaban membawa probabilitas dan skor keyakinan untuk mengarahkan kasus ambigu ke cadangan atau tinjauan manusia."
company: "Google"
source: "https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-11T18:00:00.000Z
draft: false
sourceTitle: "Gemini Decisions API: Fast, calibrated multimodal decisions"
categories: ["Rilis Model","Fitur & Skills"]
---

Dalam rilis resmi Google (11/11), perusahaan memperkenalkan Gemini Decisions API, titik akses baru dalam Gemini API yang didukung model Gemini Decision 1. Alat ini membantu developer membuat keputusan atas kandidat terbatas secara cepat dari beberapa jenis media. Developer dapat mulai membangun melalui Google AI Studio dengan memperoleh kunci API dan dokumentasi Python, JavaScript, dan REST; Google juga menyediakan tingkat tanpa biaya untuk prototipe.

Developer dapat mengirim satu input berupa teks, gambar, audio, video, atau PDF, dengan batas 256.000 token, lalu mengajukan hingga 1.000 pertanyaan independen dalam satu permintaan. Pertanyaan dapat berupa pemeriksaan ya/tidak, pilihan dari 2 hingga 255 opsi, atau penilaian dengan pedoman berurutan. Hasil setiap pertanyaan mencakup probabilitas dan skor keyakinan 0 hingga 1, sehingga kode dapat meneruskan kasus ambigu ke jalur cadangan atau peninjau manusia.

Menurut klaim Google, Decisions API mengembalikan skor kandidat tanpa menghasilkan jawaban token demi token. Latensi keseluruhan dilaporkan 150-250 milidetik, dengan waktu komputasi model median 50-100 milidetik pada konteks hingga 16.000 token. Google juga mengklaim model ini mencapai posisi teratas dan galat kalibrasi terendah dalam rangkaian uji. Biayanya 0,10 dolar AS per 1 juta token masukan dan nol dolar untuk token keluaran; masukan utama ditagih sekali per permintaan meski banyak pertanyaan dinilai.

Pengguna yang relevan mencakup developer aplikasi AI, tim operasi, dan pembuat sistem yang membutuhkan pemeriksaan aturan, pemilihan alat, penilaian konten, atau perutean model. Dalam penggunaan internal, Google menyebutkan Gemini Notebook memakai API untuk memilih model dan tingkat penalaran, dengan klaim latensi kueri sehari-hari turun hingga 40%. Stitch Rapid memakainya untuk menghasilkan rancangan alur produk yang dapat diuji, sedangkan Search memakainya sebagai lapisan keamanan untuk alat MCP.

Secara umum, API atau antarmuka pemrograman aplikasi adalah jalur yang menghubungkan perangkat lunak dengan kemampuan model, sedangkan token adalah unit masukan yang diproses model. Kalibrasi merujuk pada kesesuaian skor keyakinan dengan kemungkinan sebenarnya. Skor tersebut membantu menemukan kasus yang perlu ditinjau, tetapi tidak menjamin kebenaran keputusan model.
