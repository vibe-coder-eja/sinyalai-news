---
title: "IBM dan mitra di SC26: langkah konkup memadukan komputer kuantum dengan HPC"
summary: "Di konferensi SC26 Chicago, IBM bersama NVIDIA, AMD, RIKEN, Fermilab, dan Cleveland Clinic memamerkan perangkat lunak, platform, dan hasil riset yang menghubungkan komputer kuantum dengan infrastruktur HPC klasik."
company: "IBM"
source: "https://research.ibm.com/blog/sc26?utm_medium=rss&utm_source=rss"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-16T16:00:00.000Z
draft: false
sourceTitle: "SC26: IBM shows progress in bringing quantum & HPC together"
categories: ["Fitur & Skills","Produk Baru","Kerjasama Industri"]
---

Berdasarkan tulisan di blog riset IBM (16/11), di konferensi SC26 di Chicago, IBM bersama NVIDIA, AMD, RIKEN, Fermilab, dan Cleveland Clinic memamerkan serangkaian perangkat lunak, platform, dan hasil riset yang memperlihatkan bagaimana komputer kuantum mulai menyatu dengan alur kerja HPC (high-performance computing) yang sudah lazim dipakai para peneliti. Arah besarnya disebut IBM sebagai paradigma HPC-plus-quantum: prosesor kuantum, CPU, dan GPU bekerja bersama, dan tiap bagian komputasi menangani porsi masalah yang paling sesuai dengan kemampuannya.

Salah satu sorotan datang dari integrasi perangkat lunak. IBM dan NVIDIA menggabungkan antarmuka sumber daya kuantum sumber terbuka bernama QRMI dengan fitur Hierarchical Resources (HRES) milik Slurm, yaitu workload manager HPC yang dikembangkan NVIDIA. Tujuannya agar Slurm punya visibilitas lebih baik terhadap sumber daya dan beban kerja kuantum yang berjalan di atasnya. IBM dan AMD juga memperkenalkan Pelagos, kerangka kerja sumber terbuka untuk menguji decoder koreksi kesalahan kuantum terhadap miliaran pola kesalahan yang disimulasikan di atas GPU.

Di sisi perangkat keras, IBM dan NVIDIA bersama Fermilab akan meluncurkan platform co-design kuantum modular untuk mengeksplorasi masalah fisika energi tinggi dan fisika nuklir. IBM juga mengumumkan IBM Quantum Nighthawk r2 yang disebut mampu menjalankan hingga 100.000 sampel per detik, atau sekitar 25 kali lipat lebih banyak dibanding generasi Heron, dan dapat dicoba gratis lewat IBM Quantum Open Plan.

Untuk hasil riset, Cleveland Clinic, RIKEN, dan IBM masuk finalis ACM Gordon Bell Prize 2026 berkat simulasi kompleks protein-ligan hingga 12.635 atom menggunakan prosesor IBM Quantum Heron dan HPC klasik lewat metode SQD (sample-based quantum diagonalization). Tim IBM, RIKEN, dan NVIDIA juga memakai superkomputer ROQUO milik RIKEN untuk mempelajari kluster Fe₄S₄, sebuah gugus besi-belerang yang terdapat di dalam protein sel hidup. Menurut IBM, hasilnya mencapai akurasi dalam jarak 4,3 millihartree dari metode klasik DMRG, atau disebut 79 kali lebih dekat dibanding hasil SQD mereka sebelumnya pada sistem yang sama.

Secara umum, komputer kuantum bekerja dengan qubit yang bisa berada di banyak keadaan sekaligus, sehingga berpotensi menangani jenis perhitungan tertentu lebih cepat daripada komputer klasik. Namun qubit sangat rentan terhadap gangguan, itulah sebabnya riset koreksi kesalahan menjadi fokus besar: informasi disebar ke banyak qubit lalu dicek berulang kali, dan decoder bertugas menerjemahkan hasil pengecekan itu menjadi koreksi yang akurat. Karena itulah platform co-design ORNL, IBM, dan AMD yang diumumkan pada 5 November lalu meletakkan perangkat keras klasik tepat di sebelah prosesor kuantum Nighthawk r2 di Poughkeepsie, New York, agar para peneliti bisa menguji decoder pada perangkat keras kuantum sungguhan tanpa harus membangun infrastrukturnya sendiri.
