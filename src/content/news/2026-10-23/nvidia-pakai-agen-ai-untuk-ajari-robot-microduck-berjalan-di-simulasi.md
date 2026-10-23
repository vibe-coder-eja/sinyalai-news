---
title: "NVIDIA pakai agen AI untuk ajari robot Microduck berjalan di simulasi"
summary: "NVIDIA (23/10) mempublikasikan panduan teknis yang menunjukkan bagaimana agen AI seperti Hermes, Nemotron, dan Astra dipakai untuk merancang, membangun, dan melatih robot Microduck melewati rintangan di lingkungan simulasi Isaac Sim."
company: "NVIDIA"
source: "https://developer.nvidia.com/blog/using-ai-agents-to-teach-robots-like-microduck-to-walk-in-simulation/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-23T14:58:32.000Z
draft: false
sourceTitle: "Using AI Agents to Teach Robots Like Microduck to Walk in Simulation"
categories: ["Fitur & Skills","Riset & Kebijakan"]
---

NVIDIA (23/10) mempublikasikan panduan teknis di blog Developer-nya yang mempraktikkan cara melatih robot berjalan di dunia simulasi. Contoh yang dipakai adalah Microduck, robot kecil bersensor kamera yang harus melewati lintasan berisi rintangan sambil menjaga keseimbangan. Alih-alih menulis kode secara manual, NVIDIA mengandalkan beberapa agen AI—Hermes, NVIDIA Nemotron 3.5 Bolt, dan Astra—untuk menerjemahkan perintah singkat menjadi rencana proyek bertahap, mulai dari rancangan lintasan, pembuatan aset 3D, hingga pelatihan kebijakan navigasi.

Bagi tim robotika, proses semacam ini biasanya memakan waktu berminggu-minggu karena tiap tahap—membangun lingkungan virtual, mengatur fisika, lalu melatih kebijakan gerak—memakai alat berbeda dan harus disambungkan satu per satu. NVIDIA mencoba merangkai semuanya dalam satu alur kerja: NVIDIA RTX Spark menjadi pusat pengembangan lokal, Isaac Lab menangani pembelajaran penguatan di cloud dengan 4.096 lingkungan paralel, Newton memodelkan fisika, dan Omniverse menghasilkan tampilan visual realistis lewat rendering RTX. Hasil pelatihannya kemudian divalidasi lagi secara lokal di RTX Spark sebelum disiapkan untuk tahap sim-to-real, yaitu pemindahan kebijakan dari simulasi ke robot fisik.

Pada tahap persiapan, pengguna cukup menuliskan perintah seperti "bangun dan uji lintasan Microduck dengan tantangan navigasi dan locomotion". Hermes dan Nemotron 3.5 Bolt memecah perintah itu menjadi rencana yang mencakup tinjauan dokumentasi Microduck, rancangan tata letak lintasan, daftar aset yang dibutuhkan, hingga instruksi untuk Astra. Astra kemudian membuat aset 3D dengan bantuan perangkat lunak sumber terbuka seperti FreeCAD untuk geometri dan Blender untuk material, lalu mengekspornya ke format USD agar bisa dipakai di Isaac Sim. Setiap aset diberi catatan tentang bagian yang terlihat, terpotong, atau belum jelas, sehingga tahap berikutnya tidak salah mengira asumsi sebagai fakta.

Setelah lingkungan siap, Isaac Lab menjalankan pelatihan dengan 4.096 lingkungan paralel pada GPU NVIDIA RTX PRO 6000 Blackwell Workstation Edition. Robot belajar dari data kedalaman kamera kepala dan status sendi-sendinya, sehingga kebijakan yang dihasilkan tidak hanya tahu cara berjalan, tetapi juga cara membaca rintangan dan menyesuaikan arah. NVIDIA menekankan bahwa validasi lokal di Isaac Sim—menguji deteksi rintangan, penyesuaian gerak, dan penyelesaian lintasan—menjadi pintu gerbang sebelum kebijakan dipindahkan ke robot fisik, lengkap dengan teknik seperti Better Actuator Models dan domain randomization untuk menjembatani perbedaan antara simulasi dan dunia nyata.

Secara umum, alur sim-to-real adalah pendekatan lazim dalam robotika modern: robot dilatih di dunia virtual yang murah dan aman, lalu pengetahuan itu dipindahkan ke perangkat keras fisik. Agen AI di sini berperan sebagai asisten yang menyusun rencana dan menghasilkan aset, sementara keputusan akhir tentang fisika, kebijakan, dan keamanan tetap berada di tangan peneliti. NVIDIA juga menyediakan tutorial di Hugging Face agar alur kerja ini bisa disesuaikan dengan robot dan tugas lain, sehingga Microduck hanya menjadi contoh awal.
