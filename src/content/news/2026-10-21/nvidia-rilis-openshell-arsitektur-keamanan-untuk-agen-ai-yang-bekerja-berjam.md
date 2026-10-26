---
title: "NVIDIA Rilis OpenShell, Arsitektur Keamanan untuk Agen AI yang Bekerja Berjam-jam Tanpa Awak"
summary: "NVIDIA memperkenalkan OpenShell Reference Architecture, kerangka kerja sumber terbuka yang dirancang untuk mengawasi dan membatasi aktivitas agen AI otonom. Sistem ini menggabungkan empat komponen utama dan dijalankan di atas CPU NVIDIA Vera."
company: "NVIDIA"
source: "https://developer.nvidia.com/blog/how-nvidia-openshell-reference-architecture-secures-and-governs-ai-agent-workloads-at-scale/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-21T09:50:14.000Z
draft: false
sourceTitle: "How NVIDIA OpenShell Reference Architecture Secures and Governs AI Agent Workloads at Scale"
categories: ["Fitur & Skills","Kerjasama Industri","Penerapan Industri"]
---

NVIDIA memperkenalkan OpenShell Reference Architecture, sebuah kerangka kerja sumber terbuka yang dirancang untuk menjaga dan membatasi aktivitas agen AI otonom yang bisa bekerja berjam-jam tanpa pengawasan manusia. Berdasarkan tulisan di blog NVIDIA Developer (21/10), OpenShell memperlakukan beban kerja agen sebagai pihak yang belum tepercaya, lalu memberikan akses hanya saat benar-benar dibutuhkan.

Agen AI otonom adalah program yang mampu menjalankan tugas kompleks secara mandiri, mulai dari membuka berkas, memakai perkakas, menjelajah internet, hingga menurunkan agen lain untuk berkolaborasi. Karena langkah kerjanya ditentukan sambil berjalan, agen bisa saja mengunduh kode, meminta hak istimewa tambahan, atau menyentuh bagian infrastruktur yang sensitif. Menurut NVIDIA, sifat adaptif inilah yang membuat agen kuat, tetapi juga membuat mereka sulit diatur sendiri. Karena itu, keamanan dan tata kelola harus dibangun di luar jangkauan agen, yaitu pada infrastruktur tempat agen dijalankan.

OpenShell sendiri adalah lapisan runtime yang menentukan sistem dan data mana saja yang boleh diakses agen. Di atasnya, Reference Architecture menambahkan empat komponen yang bekerja sama. Gateway menjadi pusat kendali yang mengatur siklus hidup sandbox atau lingkungan terisolasi tempat agen bekerja, sekaligus mengelola kebijakan. Supervisor memeriksa setiap permintaan keluar dari agen, mencocokkannya dengan kebijakan, dan menjadi perantara untuk akses kredensial; komponen ini berjalan terpisah dari sandbox. Sandbox mengisolasi beban kerja agen dan membatasi akses ke sistem berkas serta proses. Sementara itu, Policy Prover melakukan verifikasi formal untuk memastikan izin yang diberikan tidak melampaui batas yang ditetapkan organisasi.

NVIDIA juga membuka ruang bagi operator untuk menambahkan lapisan pengawasan tambahan. Supervisor middleware memungkinkan pemeriksaan, pemblokiran, atau perubahan pada konten yang dikirim dan diterima agen lewat jaringan. Gateway interceptor memberi operator kemampuan menyisipkan aturan tata kelola khusus tanpa harus mengubah gateway itu sendiri. OpenShell turut menyediakan titik-titik integrasi untuk sistem identitas, otorisasi, perlindungan data, dan audit, sehingga organisasi bisa menanamkan kebijakan mereka sendiri.

Seluruh arsitektur ini dijalankan di atas CPU NVIDIA Vera, yang dirancang untuk menangani ribuan loop agen secara bersamaan. Vera membawa 88 inti Olympus rancangan NVIDIA dengan eksekusi out-of-order yang dalam, serta Scalable Coherency Fabric generasi kedua dan memori LPDDR5X. NVIDIA mengklaim kombinasi ini memberikan hingga dua kali lipat performa pada beban kerja agentik tertentu dibanding prosesor x86. Pada pengukuran internal CoreWeave, waktu penyalaan sandbox lebih dari tiga kali lebih cepat dan penyelesaian loop agen 1,8 kali lebih cepat di Vera, dengan satu rak mampu menopang lebih dari 11.000 lingkungan agen secara bersamaan.

Untuk pengawasan perangkat keras, NVIDIA menambahkan BlueField-4 DPU dan NVIDIA Sentry yang mampu mengisolasi pemantauan di tingkat silikon. Jika sebuah agen melanggar kebijakan, sistem dapat mengkarantina agen tersebut dalam hitungan milidetik. Kode sumber OpenShell tersedia di repositori GitHub NVIDIA, sementara panduan penerapan tersedia dalam dokumentasi Secure Agent Workspace Reference Design.

Secara umum, istilah sandbox dalam konteks ini merujuk pada lingkungan komputasi terpisah yang meniru sistem utuh, sehingga apa pun yang dilakukan agen di dalamnya tidak langsung menyentuh sistem utama. Pendekatan semacam ini lazim dipakai untuk menguji perangkat lunak atau menjalankan kode yang belum sepenuhnya dipercaya, dan kini diterapkan pada agen AI agar aktivitasnya bisa diawasi tanpa membatasi kemampuannya beradaptasi.
