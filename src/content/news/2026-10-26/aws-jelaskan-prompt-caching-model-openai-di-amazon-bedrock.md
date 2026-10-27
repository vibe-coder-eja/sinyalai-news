---
title: "AWS Jelaskan Prompt Caching Model OpenAI di Amazon Bedrock"
summary: "AWS menjelaskan prompt caching untuk model OpenAI di Amazon Bedrock. Mekanisme ini memakai kembali konteks prompt yang identik agar agen AI dapat mengurangi biaya input dan latensi."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/groundhog-day-for-ai-agents-prompt-caching-patterns-for-using-openai-models-on-amazon-bedrock/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-26T17:27:20.000Z
draft: false
sourceTitle: "Groundhog Day for AI agents: Prompt caching patterns for using OpenAI models on Amazon Bedrock"
categories: ["Fitur & Skills"]
---

Dalam artikel blog resminya, AWS (26/10) menjelaskan pola prompt caching untuk menjalankan model OpenAI di Amazon Bedrock. AWS menyebut mekanisme tersebut menyimpan bagian prompt yang sama agar dapat dipakai ulang pada permintaan berikutnya, sehingga agen AI tidak perlu terus memproses instruksi, definisi alat, dan riwayat percakapan dari awal.

Agen AI biasanya bekerja dalam beberapa putaran: ia memanggil sebuah alat, membaca hasilnya, lalu menentukan langkah berikutnya. Karena model bahasa besar tidak memiliki memori internal antara permintaan, konteks sebelumnya harus disertakan kembali agar percakapan tetap konsisten. Bagi pengembang, ini ibarat mencetak ulang panduan kerja, daftar alat, dan catatan percakapan setiap kali agen mengambil langkah baru.

Ketika model membaca prompt, tahap yang disebut prefill memproses setiap token dan membentuk key-value vector atau KV, yaitu kondisi kerja model sebelum menghasilkan token berikutnya. Prompt caching menyimpan kondisi tersebut untuk input yang identik. Permintaan berikutnya dapat memuat bagian yang sudah tersimpan dan hanya memproses isi baru. Menurut AWS, pola ini dapat menekan biaya input serta menjaga agen tetap responsif.

AWS memperkenalkan dua pendekatan. Explicit caching menggunakan penanda prompt_cache_breakpoint untuk menentukan bagian prompt yang akan disimpan, sedangkan implicit caching membiarkan Amazon Bedrock menemukan bagian yang dapat dipakai ulang ketika percakapan bertambah. Keduanya dapat dijalankan bersama. Untuk instruksi dan daftar alat yang relatif tetap, contoh AWS memakai cache eksplisit dengan masa simpan 30 menit. Prefix yang dapat digunakan ulang harus mencapai minimal 1.024 token, sementara prompt_cache_key menghubungkan permintaan yang-boyosh meant untuk berbagi cache.

Agar hasil cache tetap recognized, instruksi dan definisi alat harus memiliki teks serta urutan serialisasi yang sama persis. Elemen yang berubah, seperti tanggal, nama pengguna, atau nomor permintaan, sebaiknya ditempatkan setelah batas cache. Server Model Context Protocol atau MCP serta mekanisme pengiriman alat lainnya juga perlu diindeks agar konsisten. Dalam pengujian AWS, prefix sekitar 4.000 token menulis 4.120 token pada permintaan pertama dan membaca 4.120 token pada permintaan berikutnya. Prefix statis juga dapat dipakai oleh sesi baru atau agen pembantu, sementara tiap percakapan tetap memiliki riwayat terpisah.

Secara umum, prompt cache bukan memori pribadi model, melainkan penyimpanan sementara untukPotongan input yang identik. Karena itu, penataan instruksi, alat, dan batas cache merupakan bagian dari desain agen AI, bukan sekadar pengaturan teknis di belakang layar.
