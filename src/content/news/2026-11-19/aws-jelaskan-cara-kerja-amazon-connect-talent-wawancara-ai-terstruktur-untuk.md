---
title: "AWS Jelaskan Cara Kerja Amazon Connect Talent: Wawancara AI Terstruktur untuk Rekrutmen Skala Besar"
summary: "Amazon Web Services (AWS) memperkenalkan Amazon Connect Talent, layanan wawancara kerja berbasis AI yang menerapkan prinsip psikologi I-O untuk menilai kandidat secara konsisten. Layanan ini memisahkan proses wawancara dengan proses penilaian, menggunakan skor 1–5, dan diklaim selaras dengan penilaian psikolog independen lebih dari 89%."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/inside-amazon-connect-talent-the-science-of-structured-ai-interviews/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-19T21:23:20.000Z
draft: false
sourceTitle: "Inside Amazon Connect Talent: The science of structured AI interviews"
categories: ["Fitur & Skills","Riset & Kebijakan"]
---

Amazon Web Services (AWS) memperkenalkan Amazon Connect Talent, layanan wawancara kerja berbasis kecerdasan buatan yang dirancang untuk membantu perusahaan merekrut ratusan hingga ribuan orang dengan cara yang lebih terstruktur. Berdasarkan tulisan di blog AWS (19/11), layanan ini menggabungkan prinsip psikologi industri-organisasi (I-O) yang sudah lama diteliti ke dalam wawancara yang dipimpin AI, sehingga setiap kandidat mendapat pertanyaan dan penilaian yang konsisten.

Bagi tim rekrutmen yang selama ini harus menyusun soal wawancara, melatih pewawancara, lalu menilai jawaban satu per satu, prosesnya sering kali tidak seragam. Connect Talent mencoba menjawab masalah itu dengan tiga pilar desain. Pertama, wawancara dibangun di sekitar kompetensi yang relevan dengan posisi yang dilamar. AWS menjelaskan bahwa sistem memakai deskripsi pekerjaan dan kerangka okupasi yang sudah mapan untuk membuat skorcard (lembar penilaian) berbasis perilaku. Setiap pertanyaan diarahkan untuk mengungkap perilaku tertentu, dan pewawancara AI menyesuaikan pertanyaan lanjutan ketika jawaban kandidat belum cukup memberikan bukti.

Kedua, Connect Talent memisahkan percakapan wawancara dari proses penilaian. AI hanya mengumpulkan bukti dari transkrip jawaban, lalu menyerahkannya ke tahap evaluasi terpisah yang menentukan skor dan mengutip bagian transkrip yang mendukung. Skor tiap kompetensi dihitung dengan rumus tetap pada skala 1 sampai 5. Bila bukti dalam transkrip tidak cukup, sistem tidak memaksakan skor, melainkan menandai kompetensi tersebut agar tim perekrutan bisa meninjaunya. Dengan begitu, kandidat tidak otomatis dirugikan hanya karena jawaban mereka singkat.

Ketiga, layanan ini menyertakan perlindungan keadilan (fairness) sejak tahap desain. Penilaian hanya memakai teks transkrip jawaban, tanpa mempertimbangkan video, nada suara, atau penampilan fisik. Informasi identitas kandidat juga dikeluarkan dari proses penilaian, dan setiap kompetensi dinilai terpisah-pisah agar satu jawaban tidak mempengaruhi penilaian kompetensi lain.

AWS juga memaparkan hasil evaluasi yang dilakukan bersama firma psikologi I-O independen. Pada tahap pembuatan konten wawancara, firma tersebut menemukan bahwa 100% deskripsi pekerjaan yang ditinjau tetap memuat informasi pekerjaan yang penting, 91% kompetensi yang dihasilkan bisa ditelusuri kembali ke deskripsi pekerjaan, 98% pertanyaan wawancara menargetkan kompetensi yang dimaksud, dan 94% sinyal pada rubrik penilaian jelas mengukur kompetensi tersebut. Pada tahap penilaian, Connect Talent disebut selaras dengan keputusan psikolog independen pada 89,3% dari 252 sinyal rubrik yang ditinjau. Angka keselarasan naik menjadi 97,6% ketika kandidat memberikan bukti yang jelas, dan 92,9% untuk sinyal kekhawatiran (concern signals) yang menandai perilaku yang mungkin tidak cocok dengan peran. Cohen’s kappa, ukuran statistik yang memperhitungkan kemungkinan kebetulan, tercatat di angka 0,79.

Secara umum, wawancara terstruktur (structured interview) adalah metode wawancara yang menggunakan pertanyaan dan kriteria penilaian yang sama untuk semua kandidat, sehingga mengurangi subjektivitas pewawancara. Psikologi I-O sendiri adalah cabang psikologi yang mempelajari perilaku manusia di tempat kerja, termasuk cara menilai kecocokan seseorang dengan suatu pekerjaan. Connect Talent pada dasarnya menerjemahkan prinsip-prinsip itu ke dalam perangkat lunak: AI menyusun pertanyaan, menggali jawaban lewat pertanyaan lanjutan, lalu menilai bukti berdasarkan rubrik yang sudah disiapkan, sementara tim perekrutan tetap memegang kendali untuk meninjau dan mengubah konten wawancara sebelum dipakai.
