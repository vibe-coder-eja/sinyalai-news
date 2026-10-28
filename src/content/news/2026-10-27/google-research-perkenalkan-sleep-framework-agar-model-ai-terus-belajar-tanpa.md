---
title: "Google Research Perkenalkan Sleep Framework agar Model AI Terus Belajar Tanpa Kehilangan Pengetahuan Lama"
summary: "Google Research (27/10) memperkenalkan sleep framework, pendekatan continual learning untuk LLM yang meniru siklus tidur manusia agar model dapat menyerap fakta baru dan mempertajam penalaran tanpa melupakan kemampuan lama."
company: "Google"
source: "https://research.google/blog/the-sleep-framework-a-new-way-for-llms-to-retain-knowledge-in-continual-learning/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-27T17:35:00.000Z
draft: false
sourceTitle: "The sleep framework: A new way for LLMs to retain knowledge in continual learning"
categories: ["Standar Umum"]
---

Berdasarkan tulisan di blog Google Research (27/10), Ali Behrouz dan Vahab Mirrokni memperkenalkan sleep framework, sebuah pendekatan continual learning untuk large language model (LLM) yang menambahkan fase tidur agar model dapat terus memperbarui pengetahuan setelah dirilis. Selama ini, LLM yang sudah dilatih cenderung statis: ia hanya mengetahui informasi sampai batas tanggal pelatihannya dan sulit menyerap fakta baru tanpa melupakan kemampuan yang sudah dikuasai. Masalah tersebut dikenal sebagai catastrophic forgetting, yaitu gejala di mana model yang diperbarui dengan data baru justru kehilangan kemampuannya pada tugas-tugas sebelumnya.

Sleep framework membagi kerja model ke dalam dua fase yang bergantian. Pada active atau wake phase, model menerima masukan, memprosesnya, dan menyimpan informasi sementara di memori jangka pendek. Pada sleep phase, model berhenti memproses masukan baru dan mengalihkan komputasinya untuk mengkonsolidasi memori jangka pendek menjadi pengetahuan jangka panjang yang tersimpan di parameter model. Dengan siklus bolak-balik ini, Google Research menyebut model dapat terus menyerap fakta baru, mempertahankan konteks panjang hingga 10 juta token, dan meningkatkan kemampuan penalaran yang kompleks.

Secara teknis, fase tidur dijalankan lewat dua mekanisme utama. Pertama, memory consolidation: model membuka blok memori tambahan berarsitektur Mixture-of-Experts (MoE) dengan struktur low-rank, lalu memindahkan pengetahuan jangka pendek yang rapuh ke parameter jangka panjang yang lebih stabil melalui teknik Generalized Knowledge Distillation (GKD) yang dipadukan dengan reinforcement learning. Setelah proses ini selesai, parameter sementara di-reset agar kapasitas siap dipakai pada sesi aktif berikutnya. Kedua, dreaming: model menjalankan loop perbaikan mandiri dengan membangkitkan data latihan sintetis, menyaring contoh terbaik lewat gradient-based data selection, lalu melakukan supervised fine-tuning pada contoh terpilih untuk mengasah kemampuan penalaran.

Google Research menekankan bahwa istilah tidur dan mimpi di sini hanya metafora. Seluruh proses berlangsung di dalam arsitektur model yang tetap dan aturan pelatihan yang ditentukan manusia, bukan perubahan kode sumber model. Klaim performa, termasuk kemampuan mempertahankan konteks hingga 10 juta token dan peningkatan penalaran, merupakan hasil yang dilaporkan Google Research sendiri dan belum diverifikasi secara independen.

Secara umum, continual learning adalah cabang machine learning yang mempelajari cara agar model bisa belajar berkelanjutan dari data baru setelah deployment, bukan hanya sekali saat pelatihan. Istilah catastrophic forgetting merujuk pada kecenderungan jaringan saraf melupakan tugas lama ketika dilatih ulang dengan tugas baru, dan Mixture-of-Experts adalah arsitektur yang membagi kapasitas model ke dalam beberapa sub-jaringan spesialis agar tiap jenis masukan ditangani oleh bagian yang paling relevan.
