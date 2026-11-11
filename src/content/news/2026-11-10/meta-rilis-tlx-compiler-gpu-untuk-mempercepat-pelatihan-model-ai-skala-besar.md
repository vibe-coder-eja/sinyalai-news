---
title: "Meta Rilis TLX, Compiler GPU untuk Mempercepat Pelatihan Model AI Skala Besar"
summary: "Meta memperkenalkan Triton Low-Level Extensions (TLX), perluasan dari bahasa pemrograman Triton yang memberi kontrol lebih detail atas eksekusi GPU tanpa mengorbankan kemudahan penggunaan. TLX sudah dipakai di workload produksi Meta, termasuk pelatihan model bahasa besar."
company: "Meta"
source: "https://engineering.fb.com/2026/11/10/open-source/tlx-a-hardware-native-gpu-compiler-for-production-ml/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-10T16:59:31.000Z
draft: false
sourceTitle: "How We Built TLX: A Hardware-Native GPU Compiler for Production ML at Scale"
categories: ["Fitur & Skills","Produk Baru"]
---

Berdasarkan tulisan di blog resminya, Meta (10/11) memperkenalkan Triton Low-Level Extensions (TLX), sebuah perluasan dari bahasa pemrograman Triton yang dirancang untuk membantu para insinyur mengoptimalkan kinerja GPU tanpa kehilangan sisi produktif dari Triton itu sendiri. TLX menambahkan kemampuan orkestrasi eksplisit di tingkat warp group dan cluster, sehingga fitur-fitur perangkat keras terbaru bisa langsung dimanfaatkan oleh penulis kode. Menurut Meta, TLX sudah menunjukkan peningkatan performa pada pelatihan sistem rekomendasi, inferensi rekomendasi, dan pelatihan awal model bahasa besar (LLM) berskala besar.

Bagi tim yang sehari-hari bergulat dengan ribuan kernel GPU, kabar ini menarik karena menyentuh lapisan yang sering luput dari perhatian: bagaimana instruksi-instruksi itu benar-benar dijalankan di atas chip. Selama beberapa tahun terakhir, arsitektur GPU modern seperti NVIDIA Hopper dan Blackwell menuntut cara baru dalam mengorkestrasi kerja. Sebagian unit komputasi harus fokus memindahkan data secara asinkron, sebagian lain menjalankan perkalian matriks di tensor core, dan semuanya harus saling koordinasi dalam satu kernel. Tanpa abstraksi yang tepat, menulis kode untuk pola seperti ini biasanya memakan waktu berminggu-minggu dan penuh dengan baris-baris yang spesifik untuk satu generasi perangkat keras.

TLX mencoba mengisi celah itu. Ia bukan compiler baru, melainkan lapisan tambahan di atas Triton yang memberi programmer kendali langsung atas warp group, perpindahan memori asinkron, tensor memory, dan eksekusi lintas cluster, sambil tetap mempertahankan gaya penulisan kernel yang ringkas ala Triton. Hasilnya, menurut Meta, iterasi optimasi yang dulu butuh berhari-hari bisa dipangkas menjadi hitungan jam, dan kernel yang dihasilkan mampu menyaingi implementasi CUDA yang ditulis tangan. Di internal Meta sendiri, TLX sudah menjalankan workload produksi mulai dari pelatihan model rekomendasi hingga pretraining LLM besar, baik pada GPU NVIDIA maupun AMD.

Secara umum, Triton adalah bahasa pemrograman tingkat tinggi yang banyak dipakai untuk menulis kernel GPU, yaitu potongan kode yang berjalan langsung di atas prosesor grafis dan menangani komputasi inti sebuah model AI. Karena posisinya di tengah tumpukan perangkat lunak, peningkatan di lapisan ini bisa dirasakan oleh banyak workload sekaligus, baik untuk pelatihan maupun inferensi. Dengan hadirnya TLX, Meta ingin memastikan bahwa ketika vendor GPU merilis kemampuan baru, tim ML tidak perlu menunggu compiler mengejar ketertinggalan, melainkan bisa langsung menulis kernel yang memanfaatkan fitur tersebut tanpa harus kembali ke kode tingkat rendah yang panjang dan rapuh.
