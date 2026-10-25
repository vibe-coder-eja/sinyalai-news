---
title: "AWS Uraikan Stream Ucapan Agen AI dengan Kokoro TTS di SageMaker AI"
summary: "AWS (22/10) menjelaskan penggunaan Kokoro-82M di Amazon SageMaker AI untuk mengubah jawaban agen AI menjadi audio per kalimat, sehingga pemutaran dapat dimulai sebelum seluruh respons selesai."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/stream-low-latency-speech-from-ai-agents-using-kokoro-tts-on-amazon-sagemaker-ai/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-22T17:45:58.000Z
draft: false
sourceTitle: "Stream low-latency speech from AI agents using Kokoro TTS on Amazon SageMaker AI"
categories: ["Rilis Model","Fitur & Skills"]
---

Dalam panduan teknisnya, AWS (22/10) menjelaskan cara menjalankan model text-to-speech atau TTS Kokoro-82M di Amazon SageMaker AI agar suara agen AI dikirim per kalimat. Setiap kalimat yang telah dihasilkan agen diteruskan ke model TTS untuk disintesis, lalu potongan audionya dikirim ke browser tanpa menunggu seluruh respons selesai. Dengan alur ini, pemutaran dapat dimulai lebih awal sehingga pengguna tidak harus menunggu dalam hening selama jawaban panjang diproses.

AWS menggunakan contoh agen yang membutuhkan waktu lima detik untuk menghasilkan jawaban beberapa paragraf. Menurut AWS, sintesis satu kalimat dapat memerlukan sekitar 600 milidetik, tetapi integrasi yang memproses jawaban sekaligus baru memulai sintesis setelah seluruh teks tersedia. Pendekatan streaming memindahkan setiap kalimat ke proses suara segera setelah emerges dari respons, sehingga kalimat pertama dapat terdengar sementara bagian berikutnya masih disiapkan.

Kokoro-82M memiliki 82 juta parameter dan ditempatkan di dalam kontainer khusus pada endpoint waktu nyata Amazon SageMaker AI. Endpoint adalah alamat layanan yang menerima permintaan secara langsung. AWS menjalankan model pada instans ml.g5.xlarge, satu GPU atau cip akselerator, dan menyebut ukuran tersebut cukup untuk menjaga latensi serta biaya inferensi rendah. Kontainer menyediakan dua jalur: `POST /invocations` untuk satu input lengkap dengan respons yang dialirkan, dan `WS /invocations-bidirectional-stream` untuk satu koneksi yang tetap terbuka selama pertukaran beberapa pesan.

Pengiriman audio ke browser dapat memakai Server-Sent Events, yaitu format HTTP untuk menerima data secara bertahap dari server, atau transport binary terpadu. Pada jalur WebSocket menuju kontainer SageMaker AI, seluruh pesan klien tiba sebagai bingkai binary. Kode contoh karena itu perlu menerima bingkai tersebut secara eksplisit; penggunaan `receive_text()` saja dapat memicu kesalahan meskipun status endpoint tetap `InService`. Setelah satu pesan selesai diproses, kontainer kembali menunggu pesan berikutnya pada koneksi yang sama. Penutupan koneksi dilakukan hanya ketika klien mengirim pesan `close`.

Deployment contoh memakai dua alat CLI yang membungkus stack AWS CDK v2. Perintah `speech-infra deploy` membangun endpoint Kokoro beserta izin IAM dan penyimpanan model, sedangkan `agent-infra deploy` menyiapkan runtime Amazon Bedrock AgentCore untuk agen Strands. Endpoint harus tersedia lebih dahulu karena runtime agen memanggil layanan suara tersebut. AWS juga memperingatkan bahwa kontainer sampel memakai versi lama PyTorch dengan advisory PYSEC-2026-2286, yang sudah diperbaiki pada PyTorch 2.10.0; peninjauan dan peningkatan versi diminta sebelum implementasi dipakai di luar tahap pembuktian nilai. Secara umum, streaming memindahkan data dalam potongan yang dapat langsung dikirim, sedangkan WebSocket mempertahankan jalur komunikasi untuk pertukaran data berikutnya.
