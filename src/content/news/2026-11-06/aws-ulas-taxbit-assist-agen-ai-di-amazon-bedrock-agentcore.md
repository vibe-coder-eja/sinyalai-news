---
title: "AWS Ulas Taxbit Assist, Agen AI di Amazon Bedrock AgentCore"
summary: "AWS (06/11) menjelaskan Taxbit Assist, agen AI di Amazon Bedrock AgentCore yang menjawab pertanyaan produk perpajakan dengan sumber, pemeriksaan hak akses, keamanan, dan pemantauan kualitas."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/taxbit-assist-a-grounded-role-aware-ai-agent-on-amazon-bedrock-agentcore/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-06T16:49:42.000Z
draft: false
sourceTitle: "Taxbit Assist: A grounded, role-aware AI agent on Amazon Bedrock AgentCore"
categories: ["Fitur & Skills","Penerapan Industri","Riset & Kebijakan"]
---

Dalam artikel teknisnya, AWS (06/11) menjelaskan bahwa Taxbit membangun Taxbit Assist di Amazon Bedrock AgentCore, platform untuk membangun, menghubungkan, dan mengoperasikan agen AI. Taxbit Assist tertanam di dasbor platform perpajakan aset digital dan membantu tim kepatuhan memahami produk melalui jawaban yang mencantumkan sumber, memeriksa hak akses, serta mengakui jika informasi tidak ditemukan. Arsitekturnya memisahkan penyaringan pertanyaan, pencarian dokumen, penalaran model, dan tindakan yang diizinkan agar jawaban dapat ditelusuri serta sesuai dengan peran pengguna.

Sebelum Taxbit Assist tersedia, informasi penggunaan dasbor tersebar di situs publik, dokumentasi API, artikel pusat bantuan, dan pengetahuan yang belum ditulis. Taxbit sendiri membantu bursa, penyedia pembayaran, serta pialang menghitung keuntungan atau kerugian, mengumpulkan dokumen pajak, dan submits informasi perpajakan. Menurut analitik produksi internal Taxbit, lebih dari 55 persen pengguna yang bertanya kepada Assist kembali mengajukan pertanyaan dalam 24 jam berikutnya. Sebagai contoh, pengguna yang tidak memahami status formulir sebelumnya perlu mencari penjelasan sendiri atau membuka tiket dukungan.

Saat pertanyaan dikirim, antarmuka percakapan meneruskannya bersama identitas terverifikasi pengguna, meliputi email, ID organisasi, dan peran dasbor. Amazon Bedrock Guardrails menyamarkan informasi pribadi yang teridentifikasi dan dapat menghentikan pesan sebelum model dipanggil._taxbit kemudian mencari bagian dokumen yang relevan melalui Amazon Bedrock Knowledge Bases, menggunakan Amazon S3 Vectors sebagai penyimpanannya. Kandidat jawaban diurutkan ulang, lalu model memeriksa hak pengguna terhadap fitur dan peran sebelum mengarahkan alur kerja. Jawaban dikirim secara bertahap dengan tautan sumber, sementara memori AgentCore mempertahankan konteks dalam percakapan.

Taxbit Assist merupakan aplikasi Python kecil yang dibuat dengan Strands Agents SDK dan memiliki delapan alat: pencarian basis pengetahuan, dua pemeriksaan hak akses, empat alat untuk menangani tiket dukungan, serta informasi waktu saat ini. Pada versi ini, agen tidak dapat membaca data pajak pelanggan dan hanya dapat menulis tiket milik pengguna yang meminta bantuan. Identitas pengguna dikunci ke setiap alat melalui closure, yaitu ikatan kode yang menahan nilai sebelum dapat dilihat model. Dengan demikian, model dapat memutuskan apakah perlu memeriksa izin, tetapi tidak dapat mengubah identitas yang diperiksa. Masukan pengguna juga dibersihkan di batas sistem agar injeksi prompt, yaitu upaya membuat model mengabaikan aturan, tidak dapat meniru konteks tepercaya.

Setiap permintaan menghasilkan jejak OpenTelemetry ke Amazon CloudWatch untuk membantu evaluates kualitas jawaban berdasarkan lalu lintas produksi. Profil inferensi lintas wilayah menggunakan awalan geografi yang mengikuti wilayah penempatan untuk mendukung residensi data. Taxbit menyatakan perusahaan tidak melatih atau menyetel ulang model, sedangkan Amazon Bedrock menyatakan platform tidak menggunakan prompt dan respons lengkap untuk melatih model. Taxbit juga mengoperasikan Assist sesuai ISO/IEC 42001, memiliki sertifikasi ISO/IEC 27001 dan ISO/IEC 27701, serta memegang laporan SOC 2 Tipe II. Secara umum, pendekatan Retrieval Augmented Generation atau RAG membuat jawaban lebih mudah ditelusuri karena model bekerja berdasarkan potongan dokumen yang dipilih, bukan semata-mata dari pengetahuan yang tersimpan dalam parameternya.
