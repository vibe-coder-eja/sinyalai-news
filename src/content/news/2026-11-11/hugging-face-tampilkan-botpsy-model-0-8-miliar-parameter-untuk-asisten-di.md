---
title: "Hugging Face Tampilkan BotPsy, Model 0,8 Miliar Parameter untuk Asisten di Perangkat"
summary: "Hugging Face (11/11) menampilkan BotPsy dari Tether AI Research, model 0,8 miliar parameter untuk tugas agenik dan pemanggilan fungsi yang dapat dijalankan di perangkat. Perusahaan mengklaim model ini unggul pada enam tolok ukur penggunaan alat dalam kelas ukurannya."
company: "Hugging Face"
source: "https://huggingface.co/blog/qvac/botpsy"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-11T05:01:16.000Z
draft: false
sourceTitle: "BotPsy: On-Device Personal Assistant with a Sub-Billion-Parameter Agentic Language Model"
categories: ["Rilis Model","Fitur & Skills"]
---

Hugging Face (11/11) menampilkan pengumuman Tether AI Research tentang BotPsy, model bahasa 0,8 miliar parameter yang dapat dijalankan langsung di perangkat untuk pemanggilan fungsi dan alur kerja agenik. Dibangun di atas Qwen3.5-0.8B, model ini menggunakan alat digital untuk membantu pencarian web, riset, perjalanan, belanja, keuangan, operasional bisnis, pengelolaan perangkat, dokumen, kalender, surel, dan pesan.

Rilis ini menyasar pengembang yang membutuhkan asisten pribadi dengan biaya operasional rendah, serta pengguna yang-processed-data ingin menjalankan kecerdasan buatan secara lokal. Tether AI Research menyebut model kecil dapat memproses pekerjaan rutin secara efisien tanpa harus selalu mengirim data ke model besar di awan. Bagi pengguna, pendekatan ini dapat mengurangi ketergantungan pada penyedia pihak ketiga dan membantu menjaga privasi, sedangkan bagi pengembang, BotPsy menyediakan model khusus penggunaan alat yang tidak terlalu besar.

Menurut klaim perusahaan, BotPsi mengungguli seluruh model yang diuji dengan jumlah parameter hingga 1,2 miliar pada enam tolok ukur penggunaan alat dan kemampuan agenik: BFCL v4, ACEBench, tau-bench, ToolSandbox, Claw-Eval, dan BrowseComp-Plus. Pada tiga tolok ukur utama, skornya naik dari model dasar Qwen3.5-0.8B-Think: BFCL v4 dari 23,4 menjadi 44,0, ACEBench dari 30,1 menjadi 58,7, serta tau-bench dari 23,2 menjadi 51,5. Pada lima dari enam tolok ukur, BotPsy juga melampaui Qwen3.5-2B-Think yang memiliki 2,5 kali lebih banyak parameter.

Kemampuan lainnya terlihat pada percakapan panjang dan kepatuhan terhadap instruksi. Pada tugas beberapa giliran dalam BFCL v4, skor BotPsy meningkat dari 7,5 menjadi 46,1, hampir dua kali lipat Qwen3.5-2B-Think yang memperoleh 23,8. Skor IFEval juga naik dari 59,7 menjadi 90,8, sedangkan IFBench bergerak dari 22,0 menjadi 55,9.

Dalam pengujian keamanan yang dilaporkan Tether AI Research, BotPsi menghasilkan respons tidak aman pada 21 persen kasus, dibandingkan 36 persen pada model dasarnya. Di bawah serangan prompt-injection, yaitu penyisipan instruksi berbahaya ke dalam keluaran alat atau dokumen yang dibaca model, tingkat respons tidak aman turun dari 46 persen menjadi 31 persen. Pada pertanyaan yang sama-sama dijawab dengan benar oleh lima model yang diuji, BotPsy mencapai jawaban dengan sekitar tiga kali lebih sedikit token penalaran dibanding model dasarnya pada GPQA Diamond.

BotPsi tersedia dalam format safetensors serta GGUF dengan varian bf16, Q8, dan Q4. Tether AI Research menyatakan model ini paling sesuai untuk tugas dengan tingkat kesulitan rendah hingga menengah. Perusahaan mengingatkan bahwa BotPsi tetap dapat membuat kesalahan, tidak ditujukan untuk keputusan berisiko tinggi, dan|kinerja|nya menurun pada bahasa dengan sumber daya yang lebih terbatas.

Secara umum, parameter adalah bobot numerik yang dipelajari model selama pelatihan; jumlah parameter berkaitan dengan ukuran model, tetapi tidak otomatis menentukan Mutu. Varian Q8 dan Q4 merupakan cara menyimpan bobot dengan tingkat presisi berbeda agar model lebih mudah dijalankan pada perangkat dengan memori terbatas.hew
