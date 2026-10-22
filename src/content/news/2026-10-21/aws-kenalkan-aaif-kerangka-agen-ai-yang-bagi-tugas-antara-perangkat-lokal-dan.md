---
title: "AWS Kenalkan AAIF, Kerangka Agen AI yang Bagi Tugas Antara Perangkat Lokal dan Cloud"
summary: "AWS (21/10) memperkenalkan Adaptive Agentic Intelligence Framework (AAIF) berbasis Strands Agents, yang memakai model kecil di perangkat lokal untuk tugas rutin dan mengalihkan permintaan rumit ke Amazon Bedrock. Pendekatan ini dirancang untuk menekan biaya, mengurangi latensi, dan memungkinkan operasi tanpa koneksi internet."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/adaptive-agentic-intelligence-framework-using-strands-agents/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-21T21:23:26.000Z
draft: false
sourceTitle: "Adaptive agentic intelligence framework using Strands Agents"
categories: ["Rilis Model","Fitur & Skills"]
---

AWS (21/10) memperkenalkan Adaptive Agentic Intelligence Framework (AAIF), sebuah kerangka kerja agen AI yang dibangun di atas Strands Agents dan membagi beban kerja antara perangkat lokal serta cloud. Alih-alih mengirim setiap permintaan ke satu model besar di cloud, AAIF memakai model bahasa kecil atau small language models (SLM) untuk menangani tugas-tugas sederhana secara langsung di perangkat, lalu hanya memanggil model besar di Amazon Bedrock ketika permintaan benar-benar rumit.

Bagi tim yang mengelola banyak permintaan otomatis setiap hari, pendekatan ini berarti sebagian besar pekerjaan ringan tidak perlu menunggu bolak-balik ke server pusat. Tugas seperti membaca data sensor atau memeriksa status perangkat bisa selesai di tempat dengan latensi rendah, sementara analisis yang butuh penalaran panjang tetap ditangani model besar di cloud. Hasilnya, menurut AWS, biaya API bisa ditekan dan sistem tetap bisa berfungsi saat koneksi internet terputus.

AAIF membagi pemrosesan ke dalam tiga lapisan. Lapisan pertama adalah orkestrasi pintar, yaitu SLM ringan bernama llama3.2:1b yang bertugas memilah setiap permintaan masuk dan menentukan apakah tugas itu cukup diselesaikan secara lokal atau perlu diteruskan ke cloud. Lapisan kedua adalah pemrosesan lokal, yang menjalankan SLM melalui Ollama untuk tugas rutin seperti mengambil telemetri perangkat dan menganalisis gambar lewat llama3.2-vision. Lapisan ketiga adalah pemrosesan cloud, yang memanggil model-model frontier di Amazon Bedrock lewat pustaka boto3 untuk analisis pola yang lebih kompleks dan rekomendasi strategis.

Dalam contoh implementasi yang dibagikan AWS, skenario yang dipakai adalah pemantauan Internet of Things (IoT). Agen Strands di tengah sistem menghubungkan runtime Ollama yang menampung model orkestrator dan model visi, sekaligus mengekspos tiga alat: get_device_telemetry untuk membaca data sensor lokal, analyze_camera_feed untuk memproses umpan kamera di perangkat, dan get_expert_insights yang menghubungi Amazon Bedrock saat diperlukan. Permintaan pengguna mengalir masuk, diklasifikasikan oleh SLM orkestrator, lalu diarahkan ke alat lokal atau endpoint cloud sesuai tingkat kesulitannya.

Fleksibilitas menjadi salah satu sorotan utama. Arsitektur ini bisa dijalankan sepenuhnya di perangkat edge seperti Raspberry Pi dengan memori 8 GB, sepenuhnya di cloud dengan semua inferensi lewat Amazon Bedrock, atau dalam mode hybrid yang memadukan kecepatan lokal dengan kekuatan penalaran cloud. Kuncinya adalah pemisahan antara logika routing di SLM orkestrator dan alat pemrosesan, sehingga keduanya bisa diganti atau dikonfigurasi ulang sesuai perangkat keras dan konektivitas yang tersedia.

Secara umum, Strands Agents adalah SDK dari AWS untuk membangun agen AI yang bisa memanggil alat atau fungsi tertentu secara dinamis, sementara Ollama adalah perangkat lunak yang memungkinkan menjalankan model bahasa besar secara lokal di komputer atau server sendiri. Istilah edge dalam konteks ini merujuk pada perangkat yang berada di dekat sumber data, seperti sensor di pabrik atau kamera di lapangan, sehingga pemrosesan tidak harus selalu dikirim ke pusat data. Dengan membagi tugas berdasarkan kompleksitas, AAIF mencoba menjawab dilema klasik antara biaya, kecepatan, dan kemampuan: tidak semua pertanyaan butuh model terbesar, dan tidak semua perangkat harus selalu terhubung ke cloud.
