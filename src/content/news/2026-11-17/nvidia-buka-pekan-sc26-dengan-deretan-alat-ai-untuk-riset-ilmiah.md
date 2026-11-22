---
title: "NVIDIA Buka Pekan SC26 dengan Deretan Alat AI untuk Riset Ilmiah"
summary: "NVIDIA (17/11) memperkenalkan Nemotron for Science, GPU Rubin HPC, dan perluasan platform CPU Vera untuk komputasi berperforma tinggi. Perusahaan juga mengumumkan kerja sama komputasi kuantum bersama IBM dan Fermilab."
company: "NVIDIA"
source: "https://blogs.nvidia.com/blog/ian-buck-sc26/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-17T14:00:10.000Z
draft: false
sourceTitle: "Ian Buck Kicks Off NVIDIA’s Week at SC26 as Science Enters the Age of Agents"
categories: ["Rilis Model","Fitur & Skills"]
---

NVIDIA (17/11) membuka pekan konferensi SC26 di Chicago dengan serangkaian pengumuman yang menyatukan agen AI, simulasi, dan komputasi kuantum untuk dunia riset. Wakil Presiden Hyperscale dan HPC NVIDIA, Ian Buck, memperkenalkan Nemotron for Science, GPU Rubin HPC, serta perluasan platform CPU Vera. Ia juga memaparkan kolaborasi baru di bidang komputasi kuantum bersama IBM dan Fermi National Accelerator Laboratory (Fermilab).

Bagi peneliti yang terbiasa menyusun eksperimen secara manual, perubahan yang ditawarkan terasa dekat dengan cara kerja sehari-hari. Buck menggambarkan agen AI sebagai perangkat lunak yang bisa merencanakan eksperimen, menjalankan kode, dan memeriksa hasilnya di sistem milik peneliti sendiri. Dalam pidatonya, ia mencontohkan agen yang dibangun dengan perangkat NVIDIA di Argonne National Laboratory: cukup diberi satu perintah, agen itu menyusun dan menguji hipotesis, memilih simulasi yang relevan, lalu menemukan dua situs pengikatan baru. Peneliti tetap memegang kendali karena data dan model tetap berada di tangan mereka.

Nemotron for Science menggabungkan model terbuka Nemotron 3.5 Super VL dengan dataset kimia terbuka baru serta resep pelatihan lanjutan untuk ilmu hayati dan kimia. Model ini dapat dijalankan secara lokal di workstation, DGX Spark, atau superkomputer milik peneliti. NVIDIA juga menampilkan agen yang sudah dipakai di berbagai lembaga: GROMACS dari KTH Royal Institute of Technology yang memperbaiki pengaturan rusak secara otomatis, agen di SETI Institute yang memplot garis metanol dari teleskop hanya dengan satu baris perintah, serta Nsight AI Porting Agent yang memindahkan rutin model cuaca WRF ke GPU dengan akselerasi lebih dari lima kali lipat.

Di sisi perangkat keras, Rubin HPC menjadi GPU baru dalam platform Vera Rubin yang dirancang untuk sains, teknik, analitik, dan AI. GPU ini mendukung presisi dari FP64 hingga FP4, menambahkan akselerasi data sparse, dan terhubung melalui NVLink generasi ketujuh dengan lebih dari 50.000 CUDA core, sekitar tiga kali lipat dibanding generasi Hopper. Rubin HPC dijadwalkan tersedia pada 2028. Sementara itu, pusat komputasi iklim Jerman DKRZ memilih CPU Vera untuk superkomputer HLRE-5 yang diharapkan hadir pada awal 2028, bergabung dengan sistem Vera yang sudah diumumkan di Texas Advanced Computing Center.

Di bidang kuantum, NVIDIA, IBM, dan Fermilab mengumumkan rencana platform co-design yang menggabungkan sistem NVIDIA DGX B200 dengan komputer kuantum IBM, termasuk yang menggunakan IBM Quantum Nighthawk. NVIDIA juga memperkenalkan algoritma decoding CUDA-Q bernama TCBP-JOBS yang diklaim memangkas waktu riset koreksi kesalahan dari 12 minggu menjadi 45 menit, dengan target menurunkan latensi decoding dari sekitar 300 mikrodetik menjadi 10. Sebagai penutup, Buck menampilkan salah satu pemasangan pertama switch fotonik co-packaged NVIDIA Photonics di Lambda, yang disebut 15 kali lebih andal terhadap bit error dan link flap.

Secara umum, agen AI untuk sains bekerja dengan menerima perintah dalam bahasa alami, lalu memecahnya menjadi langkah-langkah: memanggil alat, menjalankan simulasi, dan mengevaluasi hasil sebelum melangkah ke tahap berikutnya. CPU berperan menjalankan panggilan alat di antara tiap langkah model, sementara GPU menangani komputasi berat seperti simulasi dan pelatihan. Kombinasi ketiganya menjadi tumpukan baru yang coba ditawarkan NVIDIA untuk mempercepat riset di laboratorium akademik maupun industri.
