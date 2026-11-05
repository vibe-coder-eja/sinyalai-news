---
title: "AWS: U Mobile Bangun AiDaH di Amazon Bedrock AgentCore, Tiket Gangguan Turun hingga 84,5%"
summary: "U Mobile Malaysia membangun AiDaH, platform operasi telko berbasis AI agen di Amazon Bedrock AgentCore, yang kini menangani lebih dari 150 skenario operasional di enam divisi dan menurunkan volume tiket gangguan hingga 84,5%."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/how-u-mobile-built-agentic-telco-operations-with-amazon-bedrock-agentcore/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-04T16:23:33.000Z
draft: false
sourceTitle: "How U Mobile built agentic telco operations with Amazon Bedrock AgentCore"
categories: ["Fitur & Skills","Produk Baru"]
---

Operator 5G asal Malaysia, U Mobile, membangun AiDaH (AI-Driven Agentic Helpdesk), platform operasi berbasis AI agen yang berjalan di atas Amazon Bedrock AgentCore dari AWS. Berdasarkan tulisan di blog AWS (04/11), platform ini kini menangani lebih dari 150 skenario operasional yang terdokumentasi di enam divisi bisnis, sembilan bulan setelah peluncuran produksi. Pengukuran internal U Mobile menunjukkan volume tiket gangguan turun hingga 84,5% di kategori-kategori utama.

Bagi tim layanan pelanggan yang setiap hari harus berpindah-pindah layar untuk memeriksa log, mengecek kelayakan pelanggan, dan merujuk kebijakan internal, pekerjaan semacam ini sering kali menghabiskan waktu sebelum satu baris balasan pun sempat ditulis. AiDaH dirancang untuk mengambil alih bagian investigasi itu: sistem menarik konfigurasi roaming pelanggan, memverifikasi kelayakan, menemukan titik kegagalan, lalu menyusun rencana perbaikan yang tinggal dikonfirmasi oleh agen manusia. Titik keputusan tetap berada di tangan manusia saat ada perubahan pada akun pelanggan aktif.

Lompatan dari asisten AI biasa ke AI agen terletak pada kemampuan menavigasi banyak sistem sekaligus, menganalisis hasilnya, dan mengusulkan tindakan. U Mobile membangun AiDaH bersama AWS dan mitra AWS, Axrail, dengan fondasi Amazon Bedrock AgentCore, layanan untuk membangun, menghubungkan, dan mengoptimalkan agen dalam skala besar menggunakan framework dan model apa pun. Dua kemampuan teknis yang menjadi pertimbangan utama: runtime agen yang dikelola penuh sehingga tim tidak perlu mengoperasikan infrastruktur agen sendiri, serta memori bawaan yang mempertahankan konteks percakapan antar giliran tanpa perlu penyimpan data terpisah.

Arsitektur AiDaH tersusun dalam enam lapisan dan dijalankan di region Asia Pasifik (Singapura). Staf berinteraksi lewat Microsoft Teams, pilihan yang sengaja diambil agar pengguna tidak perlu mempelajari aplikasi baru. Platform ini juga menerapkan kontrol akses berbasis peran dan pagar pembatas bawaan agar bisa dipakai lintas divisi dengan aman.

Secara umum, AI agen merujuk pada sistem yang tidak hanya menjawab pertanyaan, tetapi dapat mengambil tindakan di sistem lain secara otonom, misalnya membuka tiket, menjalankan perintah, atau memperbarui konfigurasi, setelah melewati tahap penalaran bertahap. Bedrock AgentCore adalah layanan AWS yang menyediakan runtime, memori, dan alat integrasi untuk membangun agen semacam itu tanpa harus mengelola server sendiri. Pendekatan seperti ini mulai banyak dipakai di industri yang sistem internalnya tersebar di banyak aplikasi, seperti telekomunikasi, perbankan, dan ritel, di mana satu masalah pelanggan biasanya membutuhkan koordinasi lintas sistem sebelum bisa diselesaikan.
