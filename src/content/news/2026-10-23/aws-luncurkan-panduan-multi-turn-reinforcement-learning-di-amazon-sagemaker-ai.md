---
title: "AWS Luncurkan Panduan Multi-Turn Reinforcement Learning di Amazon SageMaker AI"
summary: "AWS menerbitkan panduan praktis untuk melatih model dengan Multi-Turn Reinforcement Learning di Amazon SageMaker AI. Contohnya melatih model bermain Wordle berdasarkan hasil akhir rangkaian tindakan, tanpa label untuk setiap langkah."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/multi-turn-reinforcement-learning-on-amazon-sagemaker-ai-a-hands-on-guide/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-23T17:48:54.000Z
draft: false
sourceTitle: "Multi-Turn Reinforcement Learning on Amazon SageMaker AI: A hands-on guide"
categories: ["Standar Umum"]
---

AWS (23/10) menerbitkan panduan praktis untuk menggunakan *Multi-Turn Reinforcement Learning* atau MTRL di Amazon SageMaker AI. Metode ini melatih model berdasarkan hasil akhir dari rangkaian tindakan, bukan contoh jawaban pada setiap langkah, dan panduan tersebut memakainya untuk melatih model bermain Wordle.

MTRL relevan untuk tugas seperti menyusun laporan pengeluaran atau menyaring tiket dukungan. Dalam kedua kasus, keputusan berikutnya bergantung pada tindakan sebelumnya, sehingga biasanya tidak ada satu rangkaian langkah yang dapat disalin. MTRL memberi nilai imbalan setelah rangkaian itu selesai, sehingga model dapat belajar menilai kontribusi setiap tindakan berdasarkan hasil keseluruhan.

Dalam eksperimen AWS, MTRL meningkatkan tingkat penyelesaian Wordle model gpt-oss-20b dari 61 persen menjadi 84 persen pada kata yang tidak digunakan untuk pelatihan dengan tingkat penalaran default. Pada tingkat penalaran rendah yang digunakan selama pelatihan, tingkat penyelesaian naik dari 15 persen menjadi 69 persen. Menurut AWS, proses tersebut melibatkan 105.486 percobaan dan membutuhkan sekitar 339 dolar AS untuk token pelatihan.

Cara kerjanya memisahkan dua komponen. Amazon SageMaker AI menjalankan pekerjaan pelatihan dan model kebijakan, sedangkan Amazon Bedrock AgentCore menjalankan agen, lingkungan permainan, serta fungsi pemberi imbalan. Untuk setiap percobaan, SageMaker AI mengirim satu kata rahasia ke AgentCore. Agen meminta keputusan model, mencoba menebak kata Wordle hingga enam kali, menerima masukan tentang posisi dan keberadaan setiap huruf, lalu mengembalikan satu nilai imbalan setelah permainan berakhir.

Pembaruan model menggunakan *Group Relative Policy Optimization* atau GRPO. AWS menjelaskan bahwa teknik ini membandingkan nilai imbalan dari beberapa percobaan atas kata yang sama, kemudian memperbarui adapter *Low-Rank Adaptation* pada model. Dengan demikian, pengguna tidak perlu menyediakan label yang menunjukkan urutan langkah ideal untuk setiap permainan.

Contoh Wordle juga menunjukkan mengapa biaya dapat meningkat pada tugas multi-langkah. Setiap giliran memerlukan model membaca kembali riwayat percakapan, sedangkan token yang digunakan untuk memperbarui model biasanya menjadi komponen terbesar. Dalam eksperimen tersebut, AWS mencatat penggunaan 491,6 juta token praproses, 159,7 juta token sampel, dan 643,3 juta token pelatihan. AgentCore ditagih secara terpisah berdasarkan penggunaan vCPU dan memori.

AWS menyatakan bahwa dataset, agen, dan model hasil pelatihan tetap berada di akun AWS pengguna serta tidak digunakan untuk melatih model dasar. Pilihan deployment dalam panduan ini adalah gpt-oss-20b, salah satu model yang didukung pada saat tulisan dibuat, dengan adapter LoRA. Menurut AWS, pengguna tidak perlu menentukan instance atau ukuran klaster karena layanan menyediakan infrastruktur pelatihan dan pengambilan sampel secara serverless.

Secara umum, MTRL berbeda dari *fine-tuning* pengawasan karena tidak memerlukan jawaban ideal untuk setiap langkah. Pendekatan ini terutama berguna ketika hasil proses dapat dinilai secara otomatis, tetapi banyak urutan yang dapat berhasil. Bagi tim yang menjalankan alur kerja internal, penggunaan infrastruktur dan biaya token pelatihan tetap perlu dipertimbangkan.
