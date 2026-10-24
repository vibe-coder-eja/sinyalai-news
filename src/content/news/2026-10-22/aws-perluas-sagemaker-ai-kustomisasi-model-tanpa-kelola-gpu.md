---
title: "AWS Perluas SageMaker AI: Kustomisasi Model Tanpa Kelola GPU"
summary: "AWS mengumumkan ketersediaan umum training sessions di Amazon SageMaker AI untuk kustomisasi model secara serverless. Tim ML menulis loop pelatihan sendiri sementara AWS menangani alokasi GPU, eksekusi terdistribusi, pemulihan gangguan, dan penyimpanan checkpoint."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/announcing-new-ways-to-customize-models-with-sagemaker-ai-without-managing-gpus/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-22T18:00:04.000Z
draft: false
sourceTitle: "Announcing new ways to customize models with SageMaker AI, without managing GPUs"
categories: ["Rilis Model","Produk Baru"]
---

Berdasarkan rilis resmi AWS (22/10), Amazon SageMaker AI kini menawarkan training sessions dalam ketersediaan umum sebagai bagian dari layanan kustomisasi model serverless. Fitur ini memungkinkan tim pembelajaran mesin menulis dan mengendalikan loop pelatihan pasca-training mereka sendiri—termasuk fungsi loss kustom, sinyal reward, atau reinforcement learning multi-turn—tanpa harus mengelola infrastruktur GPU secara manual. SageMaker AI menangani alokasi GPU, eksekusi terdistribusi, pemulihan gangguan, dan penyimpanan checkpoint.

Bagi praktisi yang terbiasa menavigasi banyak pilihan instance, konfigurasi klaster, dan skrip distributed training, pendekatan ini memindahkan beban operasional ke layanan terkelola. Pengguna tetap memegang kendali atas logika pelatihan: mereka bisa memilih teknik seperti SFT, DPO, RLVR, RLAIF, atau multi-turn RL, menentukan seberapa besar model yang diperbarui lewat Low-Rank Adaptation (LoRA) atau full fine-tuning, dan menggabungkan beberapa teknik secara berurutan. AWS menyediakan cookbook berisi contoh dan use case, ditambah model customization agent skills yang bisa membantu persiapan data, pemilihan teknik, pelatihan, evaluasi, hingga deployment. Agen tersebut dapat bekerja di SageMaker Studio, Kiro, Claude Code, Codex, atau GitHub Copilot.

Salah satu sorotan adalah dukungan untuk multi-turn reinforcement learning, pendekatan yang semakin relevan untuk melatih agen yang menjalankan tugas bertahap seperti pemesanan perjalanan, triase tiket dukungan, atau riset multi-langkah. Dalam implementasinya, loop pelatihan dapat meminta sampler menghasilkan beberapa respons untuk satu prompt, fungsi reward menilai respons tersebut di lingkungan pengguna, lalu trainer menghitung gradien dan memperbarui bobot model. AWS memberikan contoh penerapan Group Relative Policy Optimization (GRPO), metode reinforcement learning yang membandingkan kinerja relatif dari beberapa respons untuk memperbarui model.

Dari sisi biaya, AWS menjelaskan bahwa pengguna hanya membayar token yang diproses SageMaker AI; meteran berhenti saat fungsi reward menilai batch di lingkungan pengguna, dan tidak ada kapasitas yang perlu dipesan. Setiap sesi memakai IAM execution role yang dibuat pengguna, dengan opsi menambahkan kunci AWS KMS dan konfigurasi VPC. Data tetap berada di bucket Amazon S3 milik pengguna di region yang dipilih, begitu pula checkpoint. AWS menyatakan tidak menggunakan data atau bobot hasil kustomisasi untuk melatih model lain. Sebelum deployment, model bisa dievaluasi untuk akurasi, bias, dan keamanan; setelah deployment, guardrail dan pemantauan lewat Amazon CloudWatch dapat diterapkan.

Dua testimoni pelanggan turut disertakan dalam rilis. ImagineSoftware menyebut kontrol rendah terhadap forward pass, backward pass, sampling, dan langkah optimizer membantu tim mereka mengejar performa tingkat produksi untuk model triase penolakan klaim kesehatan. Pelanggan lain melaporkan hasil serupa saat fine-tuning gpt-oss-20b untuk pemanggilan tool agentik multi-turn terhadap knowledge graph Amazon Neptune, dengan menyoroti keandalan fitur checkpoint-and-resume.

Secara umum, post-training adalah tahap menyesuaikan model yang sudah dilatih sebelumnya dengan data atau tujuan spesifik, sehingga lebih relevan untuk konteks pengguna. Reinforcement learning dari human feedback (RLHF) dan variasinya seperti DPO atau RLAIF adalah teknik yang umum dipakai untuk menyelaraskan perilaku model dengan preferensi manusia, sementara LoRA memungkinkan pembaruan model secara efisien dengan melatih hanya sebagian kecil parameter. Dengan memindahkan beban pengelolaan GPU ke layanan serverless, AWS berupaya menurunkan hambatan bagi tim yang ingin bereksperimen dengan kustomisasi model berskala besar.
