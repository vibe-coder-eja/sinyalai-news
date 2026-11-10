---
title: "NVIDIA Donasikan Agent Substrate ke CNCF, Jalankan Jutaan Agen AI di Atas Kubernetes"
summary: "NVIDIA (10/11) menyumbangkan Agent Substrate ke CNCF Sandbox. Proyek sumber terbuka ini memungkinkan jutaan sesi agen AI berjalan di atas sedikit worker Kubernetes dengan kepadatan 10 kali lipat dibanding kontainer biasa."
company: "NVIDIA"
source: "https://developer.nvidia.com/blog/agent-substrate-advancing-kubernetes-for-agents-at-scale/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-10T15:00:00.000Z
draft: false
sourceTitle: "Agent Substrate: Advancing Kubernetes for Agents at Scale"
categories: ["Fitur & Skills","Penerapan Industri"]
---

NVIDIA (10/11) mengumumkan bahwa Agent Substrate, runtime sumber terbuka untuk menjalankan agen AI dalam skala besar, kini disumbangkan ke Cloud Native Computing Foundation (CNCF) Sandbox. Proyek ini dirancang agar jutaan agen dan perkakasnya bisa berjalan secara bersamaan di atas infrastruktur Kubernetes dengan kepadatan hingga sepuluh kali lipat dibanding kontainer standar.

Masalah yang dijawab Agent Substrate cukup sederhana: agen AI menghabiskan sebagian besar waktunya untuk menunggu. Kadang menunggu perintah dari manusia, kadang menunggu hasil dari perkakas, dan kadang menunggu respons dari model bahasa besar. Pola ini tidak cocok dengan cara Kubernetes tradisional bekerja, yaitu menyiapkan satu Pod untuk setiap sesi dan mempertahankannya tetap hidup selama sesi berlangsung. Akibatnya, memori dan sumber daya komputasi terpakai untuk sesi yang sebenarnya tidak sedang melakukan apa-apa. Solusi lain, yaitu membuat dan menghapus Pod di setiap giliran kerja, menimbulkan penalti cold start yang memakan waktu beberapa detik dan menghapus kondisi agen yang sudah dibangun.

Agent Substrate mengambil pendekatan berbeda. Proyek ini menyiapkan sekumpulan kecil worker Pod yang selalu siap, lalu memetakan banyak sesi agen ke worker yang tersedia. Saat sebuah sesi menganggur, sistem mengambil snapshot dari kondisi sesi tersebut, termasuk memori dan sistem file, lalu membebaskan worker-nya. Ketika sesi dipanggil lagi, snapshot dipulihkan di worker mana pun yang sedang kosong, sehingga agen dapat melanjutkan pekerjaannya tanpa harus membangun ulang dari awal. Mekanisme ini membuat worker Pod tetap menjadi Pod Kubernetes biasa, sehingga aturan penjadwalan, kuota, dan kebijakan penempatan di klaster tetap berlaku.

Tiga jenis beban kerja menjadi sasaran utama. Pertama, asisten coding yang bergantian antara memanggil model bahasa besar dan bekerja di lingkungannya sendiri, seperti mengklon repositori, menyunting berkas, serta menjalankan build dan pengujian. Kedua, pelatihan pasca-pemrosesan dengan reinforcement learning yang membutuhkan lingkungan CPU berat secara bergelombang, seperti sandbox kode, kompilator, peramban, dan simulator. Ketiga, sandbox GPU berdurasi pendek untuk kompilasi riset dan pembandingan.

Agent Substrate bekerja bersama dua komponen lain di platform NVIDIA DSX AI Factory. NVIDIA Dynamo mengatur inferensi di seluruh worker GPU dan memberikan sinyal seperti perkiraan waktu hingga token pertama serta tingkat kejenuhan pool GPU. Sinyal ini dipakai Agent Substrate untuk memutuskan apakah sebuah agen tetap dijalankan, ditangguhkan selama menunggu inferensi, atau dibangunkan kembali saat respons model hampir selesai. Sementara itu, KAI Scheduler menempatkan worker Pod Agent Substrate berdampingan dengan trainer GPU dan server inferensi.

Secara umum, Kubernetes adalah sistem orkestrasi yang banyak dipakai untuk menjalankan aplikasi dalam kontainer, dengan Pod sebagai unit terkecilnya. Istilah checkpointing di sini berarti menyimpan kondisi lengkap sebuah proses, termasuk memori dan isi sistem file, agar bisa dipulihkan persis seperti semula di kemudian hari. Dengan menyumbangkan Agent Substrate ke CNCF Sandbox, NVIDIA berharap pengembangan runtime untuk agen AI tetap berlangsung secara terbuka di ekosistem Kubernetes, bukan terpecah ke runtime proprietary yang meninggalkan standar yang sudah ada.
