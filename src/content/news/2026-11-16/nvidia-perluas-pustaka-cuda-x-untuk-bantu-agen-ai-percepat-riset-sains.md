---
title: "NVIDIA Perluas Pustaka CUDA-X untuk Bantu Agen AI Percepat Riset Sains"
summary: "NVIDIA (16/11) mengumumkan perluasan pustaka CUDA-X dengan modul baru seperti cuPhoton, cuPotential, dan cuSpa yang memungkinkan agen AI mempercepat riset di bidang astrofisika, fusi nuklir, biologi sel tunggal, dan penemuan obat."
company: "NVIDIA"
source: "https://blogs.nvidia.com/blog/cuda-x-libraries-agents-accelerate-scientific-discovery/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-16T16:00:16.000Z
draft: false
sourceTitle: "NVIDIA CUDA-X Libraries Give Agents the Tools to Accelerate Scientific Discovery"
categories: ["Fitur & Skills","Penerapan Industri","Riset & Kebijakan"]
---

Berdasarkan rilis resmi NVIDIA (16/11), perusahaan memperluas pustaka CUDA-X dengan modul-modul baru yang dirancang agar agen AI dapat membantu peneliti mempercepat penemuan ilmiah di berbagai bidang, mulai dari astrofisika hingga biologi sel tunggal. Perluasan ini mencakup cuPhoton untuk pemrosesan data optik dan fotonika, cuPotential untuk simulasi molekuler, serta cuSpa untuk analisis spasial sel.

Bagi peneliti yang biasa menunggu berminggu-minggu agar hasil simulasi selesai diolah, pembaruan ini berpotensi mengubah ritme kerja harian. Agen AI yang berjalan di atas pustaka CUDA-X dapat mengarahkan simulasi secara interaktif, menyaring data dalam jumlah besar, dan menyajikan hasil yang sebelumnya hanya bisa didapat setelah eksperimen berakhir. Dengan begitu, peneliti bisa mengambil keputusan lebih cepat, misalnya menentukan arah eksperimen berikutnya atau menyesuaikan desain reaktor.

Salah satu contoh paling mencolok datang dari Event Horizon Telescope, jaringan teleskop radio global yang digunakan untuk memotret lubang hitam. Korelasi data dari teleskop tersebut biasanya memakan waktu lebih dari sebulan. Dengan modul NVIDIA cuPhoton.xBeam, proses yang sama kini selesai dalam delapan menit. Modul ini berhasil mengorelasikan pengamatan jet lubang hitam J1924 dan 3C279, membuka kemungkinan rekonstruksi citra galaksi lubang hitam Messier 87* secara real time. Seluruh alur kerja, mulai dari pemuatan data hingga visualisasi, dapat berjalan pada sistem multi-GPU terdistribusi atau pada NVIDIA DGX Spark yang ringkas.

Di bidang energi fusi, peneliti Pacific Fusion menggunakan modul cuPhoton.xLens untuk mengekstraksi wawasan dari simulasi plasma secara langsung, sembari simulasi masih berjalan. Modul ini dapat digandengkan dengan agen berbasis NVIDIA Nemotron yang berjalan di sistem yang sama, sehingga analisis bersifat interaktif dan dapat membantu mengarahkan simulasi untuk desain target serta ruang reaktor fusi.

Untuk penemuan obat, NVIDIA cuPotential—yang dibangun di atas riset dari Simons Foundation's Flatiron Institute dan D. E. Shaw Research—mempercepat perangkat lunak simulasi molekuler hingga tiga kali lipat dengan kestabilan dan akurasi yang lebih baik. Pustaka ini mempercepat pembuatan data sintetis untuk model AI generatif, menemukan situs pengikatan molekuler yang sebelumnya tidak dikenal, serta menghitung kekuatan interaksi molekuler. NVIDIA bekerja sama dengan Schrödinger dan komunitas perangkat lunak molekuler seperti AMBER, NAMD, GROMACS, LAMMPS, serta Open Molecular Software Foundation untuk membawa akselerasi cuPotential ke berbagai mesin dinamika molekuler. Perusahaan seperti Cadence, Fathom Therapeutics, Topos Bio, Genesis Molecular AI, dan Terray Therapeutics mulai mengadopsinya untuk penemuan obat.

Di sisi lain, Daviator—kumpulan kernel GPU untuk Vienna Ab initio Simulation Package—akan segera tersedia di NVIDIA ALCHEMI, menjanjikan perhitungan mekanika kuantum hingga 22 kali lebih cepat dan biaya hingga 75 persen lebih rendah. Sementara itu, pustaka jaringan NVIDIA DAQIRI di Lawrence Berkeley National Laboratory menghubungkan detektor mikroskop elektron berkecepatan tinggi ke pemrosesan GPU, memungkinkan analisis dilakukan bersamaan dengan berlangsungnya eksperimen.

Untuk biologi sel tunggal, pustaka cuSpa yang baru dibuka sebagai sumber terbuka mempercepat kalkulasi poligon sel hingga 900 kali lipat dibanding CPU, memungkinkan pembuatan grafik spasial berskala besar untuk model pasien dan kanker di Memorial Sloan Kettering Cancer Center. Kerangka kerja rapids-singlecell, yang dikembangkan bersama scverse, mempercepat analisis sel tunggal dan tersedia dalam satu kontainer yang siap dipakai agen AI. Therna Biosciences melaporkan pemrosesan data 200 kali lebih cepat untuk desain terapeutik, dan 10x Genomics mengintegrasikan rapids-singlecell ke platform Sentira barunya. Terakhir, pustaka HMMER yang dipercepat GPU—juga sumber terbuka—mempercepat anotasi sekuens protein hingga 84 kali lebih cepat di Basecamp Research, mempercepat persiapan data untuk model fondasi biologis.

Secara umum, pustaka CUDA-X adalah kumpulan perangkat lunak yang berjalan di atas GPU NVIDIA untuk mempercepat komputasi ilmiah tertentu, mulai dari simulasi fisika hingga pemrosesan citra. Agen AI yang dimaksud di sini adalah program yang dapat menjalankan tugas secara otonom, seperti menganalisis data dan mengusulkan langkah selanjutnya, sehingga peneliti tidak perlu menunggu hasil akhir sebelum memutuskan arah eksperimen. Kombinasi keduanya memungkinkan peneliti mengolah data dalam skala yang sebelumnya mustahil dilakukan dalam waktu singkat.
