---
title: "Microsoft Copilot Harness Tersedia di Foundry untuk Agen Multi-Model"
summary: "Microsoft Copilot harness kini tersedia melalui Microsoft Foundry, memberi pengembang dan pelanggan perusahaan lapisan terkelola untuk membangun agen multi-model yang memakai alat, memilih model sesuai tugas, serta dapat dijalankan melalui SDK atau layanan awan."
company: "Microsoft"
source: "https://blogs.microsoft.com/blog/2026/10/28/introducing-the-microsoft-copilot-harness-unlocking-the-potential-of-truly-multi-model-agentic-work/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-28T16:51:35.000Z
draft: false
sourceTitle: "Introducing the Microsoft Copilot harness: Unlocking the potential of truly multi-model agentic work"
categories: ["Fitur & Skills","Produk Baru"]
---

Menurut rilis resmi Microsoft (28/10), Copilot harness kini tersedia melalui Microsoft Foundry. Mekanisme ini memberi pengembang dan pelanggan perusahaan cara terkelola untuk membangun agen yang dapat bernalar, memakai alat, serta menyelesaikan tugas kompleks dan berkepanjangan. Model yang digunakan dapat diganti sesuai kebutuhan tanpa mengganti harness atau bagian lain dari tumpukan teknologi.

Copilot harness berfungsi sebagai lapisan orkestrasi di sekitar model AI. Lapisan ini menyediakan instruksi, konteks, lingkungan eksekusi, dan kendali agar agen dapat bekerja. Tim rekayasa GitHub membangunnya, dan Microsoft kini menggunakan harness tersebut dalam Copilot Code, Copilot Studio, aplikasi GitHub Copilot, CLI, dan VS Code. Pengembang dapat menentukan instruksi, keterampilan, alat, serta model, sementara Microsoft menjalankan siklus agen dan lingkungan eksekusi terisolasi dengan tata kelola dan pengoptimalan sejak awal.

Microsoft menyatakan harness dapat bekerja dengan lebih dari 20 model AI berkemampuan terdepan. Pelanggan juga dapat membawa kunci akses model sendiri. Sistem designed untuk mengarahkan tugas ke model atau beberapa model yang paling sesuai, sehingga pengguna tidak harus membangun serta mengelola sistem pengarah model secara mandiri ketika pilihan model berkembang. Harness juga mendukung standar terbuka seperti MCP, keterampilan agen, dan ekstensi.

Copilot harness dapat diunduh melalui SDK atau dijalankan sebagai layanan yang dikelola Microsoft Foundry. Menurut perusahaan, komponen eksekusi harness baru saja dipindahkan ke Rust untuk mengurangi overhead sesi dan mempercepat waktu menuju token pertama, yaitu bagian awal respons yang dihasilkan model. Microsoft menyatakan perubahan tersebut menurunkan beban kerja dan menambah efisiensi, platform tetap terbuka serta interoperabel, dan harness yang sama telah dipakai pada skala jutaan pengguna dan ratusan kasus penggunaan nyata.

Secara umum, MCP merupakan standar terbuka yang menghubungkan agen AI dengan data dan alat eksternal. Dengan orkestrasi terpusat dalam Copilot harness, tim dapat mengatur instruksi, akses alat, dan pilihan model dalam satu lapisan, sehingga pembaruan model tidak mengharuskan seluruh aplikasi dibangun ulang.
