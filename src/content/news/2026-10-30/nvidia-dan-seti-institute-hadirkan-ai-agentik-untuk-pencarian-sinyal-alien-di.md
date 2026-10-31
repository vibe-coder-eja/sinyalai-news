---
title: "NVIDIA dan SETI Institute Hadirkan AI Agentik untuk Pencarian Sinyal Alien di Teleskop Radio"
summary: "NVIDIA (30/10) mengumumkan kolaborasi dengan Breakthrough Listen dan SETI Institute yang memakai platform Holoscan serta AI agentik untuk mengolah data teleskop radio Allen Telescope Array secara real-time, mempercepat pencarian sinyal kecerdasan luar bumi."
company: "NVIDIA"
source: "https://blogs.nvidia.com/blog/ai-joins-the-search-for-extraterrestrial-signals/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-30T15:00:10.000Z
draft: false
sourceTitle: "Things That Go Beep in the Night: Agentic AI Joins the Search for Extraterrestrial Signals"
categories: ["Fitur & Skills"]
---

Berdasarkan tulisan di blog resminya, NVIDIA (30/10) mengumumkan kolaborasi dengan Breakthrough Listen dan SETI Institute yang membawa AI agentik ke pencarian sinyal kecerdasan luar bumi. Di Allen Telescope Array, sebuah jaringan teleskop radio di California Utara, agen AI kini bisa mengarahkan antena, mengkalibrasi instrumen, memperbaiki data yang masuk, dan menjalankan model AI hanya lewat perintah bahasa alami.

Bagi astronom yang biasa menunggu berminggu-minggu sampai data teleskop selesai diproses, perubahan ini terasa langsung. Alih-alih menyimpan aliran data dalam jumlah besar ke hard drive, sistem baru menarik data sensor langsung ke memori GPU dan mengolahnya saat itu juga. Agen kemudian bisa fokus menangkap sinyal, memperbaiki kesalahan, dan menampilkan hasilnya dalam hitungan jam, bukan minggu atau tahun.

Inti sistem ini adalah platform NVIDIA Holoscan, yang menjadi tulang punggung pemrosesan data. Pustaka bernama DAQIRI memungkinkan teleskop mengalirkan data sensor hingga terabit per detik langsung ke memori GPU, sementara kerangka pemrosesan sinyal CyberEther—dikembangkan SETI Institute—menjalankan komputasi menggunakan pustaka CUDA-X seperti cuFFT dan cuBLAS. Sebuah orkestrator berbasis web bernama Nexus berfungsi sebagai penghubung agen: ia menyediakan satu sumber informasi mengenai status instrumen, sumber daya komputasi, dan alur pemrosesan, sehingga peneliti bisa memantau kehilangan paket, membaca spektogram secara langsung, dan menulis ulang blok pemrosesan sinyal lewat perintah bahasa alami.

Seluruh sistem berjalan di GPU NVIDIA RTX PRO 6000 Blackwell dengan kapasitas penanganan 2,4 terabit per detik dan inferensi yang dilakukan di lokasi, tepat di samping instrumen. NVIDIA menyebut pendekatan ini sebagai "observatorium agentik"—teleskop yang tidak hanya mengumpulkan data, tetapi juga bisa bertindak berdasarkan data itu secara mandiri.

Pipa pemrosesan ini sudah menunjukkan hasil nyata: sistem berhasil mendeteksi pulsar—sisa bintang yang berputar cepat dan memancarkan denyut seperti mercusuar kosmik—di Nebula Kepiting secara real-time untuk pertama kalinya menggunakan AI. Andrew Siemion, peneliti utama Breakthrough Listen, mengatakan bahwa temuan dari observatorium baru ini mungkin lebih mirip dengan sistem yang menciptakannya daripada dengan manusia, namun ia menilai hal itu bukan sesuatu yang perlu ditakuti, melainkan terobosan dalam cara menerjemahkan sinyal.

NVIDIA menambahkan bahwa tim sedang mengevaluasi model terbuka seperti NVIDIA Nemotron untuk kasus yang membutuhkan pemrosesan lokal dan cepat, termasuk kemungkinan menjalankan sistem secara luring di sisi terjauh bulan.

Secara umum, istilah AI agentik merujuk pada sistem yang tidak hanya menjawab pertanyaan, tetapi bisa mengambil keputusan dan menjalankan tindakan secara mandiri untuk mencapai tujuan yang diberikan. Dalam konteks astronomi radio, pendekatan ini membantu peneliti menyaring derau kosmik yang sangat besar dan menemukan pola yang mungkin luput dari metode manual.
