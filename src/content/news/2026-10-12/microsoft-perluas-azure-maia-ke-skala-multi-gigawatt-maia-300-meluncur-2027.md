---
title: "Microsoft Perluas Azure Maia ke Skala Multi-Gigawatt, Maia 300 Meluncur 2027"
summary: "Microsoft mengumumkan chip AI Azure Maia 200 sudah masuk tahap produksi dan melayani layanan Copilot, sementara Maia 300 akan diperluas ke skala multi-gigawatt mulai 2027 untuk menopang beban kerja AI berskala besar."
company: "Microsoft"
source: "https://blogs.microsoft.com/blog/2026/10/12/microsoft-to-expand-azure-maia-system-to-multi-gigawatt-deployments/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-12T13:01:29.000Z
draft: false
sourceTitle: "Microsoft to expand Azure Maia system to multi-gigawatt deployments"
categories: ["Standar Umum"]
---

Berdasarkan rilis resmi Microsoft (12/10), perusahaan mengumumkan bahwa keluarga chip AI buatannya, Azure Maia, akan diperluas ke skala multi-gigawatt mulai 2027. Artinya, Maia akan menjadi sistem inferensi utama untuk produk dan layanan Microsoft ke depan. Sebagai bagian dari pengumuman tersebut, Microsoft juga memastikan bahwa Maia 200 kini sudah beroperasi di pusat data produksi, sementara generasi berikutnya, Maia 300, dijadwalkan meluncur pada 2027.

Maia 200, generasi pertama yang kini matang dipakai, sudah melayani beban kerja produksi Microsoft, termasuk Microsoft Copilot. GitHub Copilot dan Microsoft Foundry akan menyusul berjalan di atas Maia 200 sebelum akhir tahun ini. Chip ini menjalankan model dari OpenAI, model internal Microsoft (MAI), dan berbagai keluarga model sumber terbuka. Pemasangan Maia 200 sudah dilakukan di pusat data di Amerika Serikat, Eropa, dan Australia. Microsoft mengklaim sistem ini mampu menghasilkan 1,7 kali lebih banyak token per watt untuk kemampuan AI bawaan di Microsoft Teams, Copilot, dan pengalaman Cowork, dibanding infrastruktur GPU terkemuka.

Maia 300 dirancang dengan sasaran yang berbeda. Microsoft membidiknya untuk jenis beban kerja AI yang sedang naik daun: penalaran dengan konteks panjang, percakapan yang sensitif terhadap latensi, dan tugas agen yang berjalan bertahap dalam waktu lama. Dalam konfigurasi penuh 96 akselerator per rak, Microsoft mengklaim Maia 300 mampu menghasilkan hingga tujuh kali lipat throughput token per rak dibanding Maia 200. Dari sisi efisiensi energi, Microsoft memproyeksikan 40 persen lebih banyak token per megawatt dibanding sistem berbasis GPU terkemuka.

Soal cara kerjanya, ada beberapa hal yang membuat Maia 300 berbeda. Pertama, arsitekturnya memakai prinsip dataflow yang dikelola perangkat lunak, sehingga pergerakan data antar komponen diminimalkan—di sistem inferensi modern, pergerakan data, bukan kekuatan komputasi mentah, sering menjadi penghambat. Kedua, Maia 300 membawa delapan tumpukan memori HBM4 dengan bandwidth puncak 18 TB/s dalam batas daya 950 watt, dengan SRAM di dalam chip yang dipakai sebagai scratchpad yang dikelola perangkat lunak. Ketiga, chip ini menggunakan desain chiplet yang memisahkan fungsi komputasi, pengontrol memori, dan I/O; chiplet komputasinya dibangun di atas proses manufaktur N2P dari TSMC. Keempat, format presisi rendah MXFP4 yang ditingkatkan membantu mengurangi kebutuhan memori dan bandwidth, sehingga jendela konteks bisa lebih besar dalam batas daya yang sama.

Satu rak Maia 300 menggabungkan 96 akselerator dalam batas daya 167 kilowatt, dengan total kapasitas HBM 27,6 TB dan bandwidth 1,7 PB/s. Microsoft juga membangun transport AI kustom di atas infrastruktur Ethernet agar komunikasi antar akselerator dan antar rak tetap lancar saat sistem diperbesar dari satu rak menjadi skala pusat data.

Secara umum, inferensi adalah proses ketika model AI yang sudah terlatih menghasilkan jawaban atau tindakan saat menerima permintaan pengguna—berbeda dengan pelatihan yang berjalan satu kali besar. Karena inferensi dijalankan terus-menerus setiap kali seseorang berinteraksi dengan chatbot, asisten kode, atau fitur AI di aplikasi kantor, efisiensi energi per token menjadi metrik penting. Dengan memperbesar Maia ke skala multi-gigawatt, Microsoft menyiapkan tulang punggung untuk miliaran interaksi AI harian: baris kode yang disarankan GitHub Copilot, ringkasan rapat di Teams, hingga percakapan klinis yang dicatat Dragon Copilot di rumah sakit.
