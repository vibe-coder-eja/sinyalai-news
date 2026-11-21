---
title: "AWS Rilis Skill Agent untuk Kurangi Biaya dan Latensi LLM Self-Hosted lewat Distributed KV Caching"
summary: "AWS memperkenalkan distributed KV caching agent skill di Agent Toolkit yang diklaim memangkas biaya inferensi LLM self-hosted hingga 40% dan waktu token pertama hingga 80% menggunakan Amazon ElastiCache."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/cut-self-hosted-llm-cost-and-latency-with-the-distributed-kv-caching-agent-skill/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-21T00:14:26.000Z
draft: false
sourceTitle: "Cut self-hosted LLM cost and latency with the distributed KV caching agent skill"
categories: ["Fitur & Skills","Penerapan Industri"]
---

Berdasarkan tulisan di blog AWS Machine Learning (21/11), Amazon Web Services memperkenalkan distributed KV caching agent skill, fitur terbaru dalam Agent Toolkit for AWS yang membantu tim yang menjalankan large language model (LLM) di server GPU sendiri menekan biaya dan latensi. Solusi ini diklaim dapat memangkas biaya inferensi hingga 40% dan time to first token (TTFT) atau jeda sebelum kata pertama muncul hingga 80% lewat pemanfaatan Amazon ElastiCache sebagai lapisan cache bersama.

Bagi tim yang meng-hosting model AI di GPU sendiri, masalah klasik yang sering dijumpai adalah pekerjaan berulang: setiap kali pengguna mengirim pesan lanjutan, GPU harus menghitung ulang seluruh riwayat percakapan dari awal sebelum bisa menulis satu kata pun. Proses ini disebut prefill, dan pada konteks yang panjang—misalnya ratusan ribu token riwayat kasus hukum—bisa membuat respons pertama memakan waktu belasan detik. Cache KV (key-value) lokal di tiap server biasanya terlalu kecil untuk menyimpan konteks sepanjang itu, apalagi untuk dibagikan ke server lain saat beban kerja berpindah.

Distributed KV caching menjawab masalah itu dengan menambahkan lapisan cache bersama di samping armada GPU. Dengan cara ini, status KV dari sebuah percakapan bisa disimpan dan diambil kembali oleh server mana pun selama berhari-hari, lintas sesi, perpindahan routing, dan kegagalan server. AWS menggabungkan pendekatan ini dengan skill baru di Agent Toolkit yang memungkinkan seorang coding agent—mulai dari Kiro, Claude Code, OpenAI Codex, hingga agent lain yang mendukung Agent Skills—mengevaluasi dan menyiapkan cache tersebut hanya lewat beberapa perintah.

Skill tersebut memandu agent melalui empat tahap utama. Pertama, diagnosis: agent memeriksa armada GPU lewat panggilan describe-instances dan menghitung jumlah Elastic Fabric Adapter (EFA) untuk memastikan workload memang butuh cache bersama. Kedua, perhitungan angka: agent memakai alat bernama KVTrace untuk memperkirakan penghematan dari traffic aktual pengguna, dan berhenti jika estimasi keuntungan tidak menutup biaya cache. Ketiga, penerapan: agent menambahkan LMCache connector ke mesin inferensi vLLM atau SGLang yang sudah berjalan, termasuk pada framework seperti llm-d dan Ray Serve, tanpa mengubah routing atau pengaturan engine yang ada. Keempat, validasi: sebelum traffic produksi dialihkan, agent mengosongkan cache lokal dan memastikan dua percobaan dengan cache termuat menghasilkan output yang sama, karena ketidakcocokan layout bisa membuat hit counter terlihat sehat tetapi jawaban menjadi keliru.

Secara umum, KV cache adalah memori sementara yang menyimpan hasil perhitungan perhatian (attention) dari token-token sebelumnya sehingga model tidak perlu menghitung ulang saat memproses pesan lanjutan. Selama konteks ini muat di cache lokal GPU, proses terasa cepat; begitu konteks melampaui kapasitas atau pengguna berpindah server, prefill harus diulang dari nol. Distributed KV caching memindahkan cache itu ke penyimpanan bersama (dalam rilis ini, ElastiCache for Valkey pada node cache.i8ge.48xlarge) sehingga setiap server di armada bisa mengaksesnya. Pendekatan ini paling terasa manfaatnya pada aplikasi dengan percakapan panjang dan berulang—seperti asisten hukum, coding agent, atau asisten tanya jawab dokumen—yang sebelumnya harus menunggu belasan detik hanya untuk melihat kata pertama muncul kembali.
