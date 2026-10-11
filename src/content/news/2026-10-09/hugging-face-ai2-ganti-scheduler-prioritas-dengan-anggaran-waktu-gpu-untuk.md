---
title: "Hugging Face: Ai2 Ganti Scheduler Prioritas dengan Anggaran Waktu GPU untuk Klaster H100 dan B200"
summary: "Ai2 membagikan perubahan sistem penjadwalan ribuan GPU riset dari pendekatan berbasis prioritas menjadi anggaran waktu GPU, alokasi fair-share hierarkis, dan kontrak time-slicing agar penelitian berdampak tinggi mendapat sumber daya secara lebih transparan."
company: "Hugging Face"
source: "https://huggingface.co/blog/allenai/impactful-scheduling"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-09T15:20:29.000Z
draft: false
sourceTitle: "Impactful scheduling for GPU clusters"
categories: ["Standar Umum"]
---

Tim infrastruktur AI di Allen Institute for AI (Ai2) memaparkan perubahan mendasar dalam cara mereka menjadwalkan ribuan GPU riset internal. Berdasarkan tulisan di blog Hugging Face (09/10), Ai2 menggantikan scheduler berbasis prioritas lama dengan sistem baru yang memakai anggaran waktu GPU, alokasi fair-share bertingkat, dan kontrak time-slicing. Tujuannya supaya penelitian paling berdampak mendapat sumber daya secara lebih transparan, bukan berdasarkan siapa paling cepat mengklaim GPU.

Bagi sekitar 150 peneliti Ai2 yang sehari-hari menunggu giliran menjalankan eksperimen, persoalan ini menyentuh hal yang konkret. Ai2 mengelola ribuan GPU NVIDIA H100, B200, dan B300 yang tersusun dalam klaster berukuran 88 hingga 1.024 unit. Klaster itu melayani beragam topik, mulai dari pelatihan model bahasa dan model visi-bahasa, simulasi reinforcement learning untuk robotika, hingga post-training untuk agen ilmiah. Permintaan terhadap waktu GPU rata-rata dua hingga tiga kali lipat dari kapasitas yang tersedia, sehingga hampir setiap jam GPU yang kosong langsung diperebutkan banyak pihak sekaligus.

Scheduler lama Ai2 bekerja dengan sistem prioritas plus opsi untuk menolak preemption atau penggantian paksa workload. Pola ini memicu kebiasaan yang merugikan. Peneliti dilaporkan menempatkan workload kosong untuk menahan GPU agar bisa dipakai sewaktu-waktu saat debugging. Pada saat bersamaan, hampir semua job akhirnya ditandai prioritas tertinggi, sehingga tingkatan prioritas yang lebih rendah praktis tidak pernah mendapat GPU. Insinyur yang siaga juga dilaporkan menghabiskan sebagian besar waktu respons tiket untuk bernegosiasi dengan pemilik workload agar mau mematikan job ketika host-nya diketahui bermasalah.

Ai2 lalu mengubah pendekatan: dari memberikan GPU ke memberikan porsi waktu GPU. Pemimpin riset kini berperan seperti investor yang memutuskan alokasi waktu GPU untuk tiap proyek sebelum workload benar-benar ada, dengan pertimbangan dampak strategis. Scheduler kemudian memakai informasi itu untuk memprioritaskan job yang masuk. Perdebatan tentang berapa banyak GPU yang layak untuk tiap proyek pun berpindah dari urusan operasional harian menjadi proses penganggaran administratif yang lebih jelas.

Secara umum, fair-share scheduling adalah metode pembagian sumber daya komputasi yang memberi tiap pengguna atau kelompok bagian proporsional sesuai kebijakan yang ditetapkan di muka, sementara time-slicing memungkinkan satu GPU melayani beberapa workload secara bergantian dalam potongan waktu kecil. Kombinasi keduanya membantu menjaga GPU tetap terisi penuh sekaligus memberi kepastian alokasi bagi tiap tim peneliti.
