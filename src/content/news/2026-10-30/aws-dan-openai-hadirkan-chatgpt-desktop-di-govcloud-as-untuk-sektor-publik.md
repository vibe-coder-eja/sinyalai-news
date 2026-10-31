---
title: "AWS dan OpenAI Hadirkan ChatGPT Desktop di GovCloud AS untuk Sektor Publik"
summary: "AWS mengumumkan ketersediaan aplikasi ChatGPT desktop melalui Amazon Bedrock di AWS GovCloud (US), memungkinkan instansi pemerintah AS memakai model OpenAI dengan identitas, endpoint, dan kontrol jaringan GovCloud."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/configure-the-chatgpt-desktop-app-with-amazon-bedrock-in-aws-govcloud-us/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-30T17:27:45.000Z
draft: false
sourceTitle: "Configure the ChatGPT desktop app with Amazon Bedrock in AWS GovCloud (US)"
categories: ["Riset & Kebijakan"]
---

Aplikasi ChatGPT desktop kini dapat dijalankan di atas Amazon Bedrock pada AWS GovCloud (US), menurut tulisan di blog resmi AWS (30/10). Lewat integrasi ini, organisasi yang wajib menggunakan infrastruktur GovCloud—termasuk instansi pemerintah Amerika Serikat—bisa mengakses model-model frontier OpenAI tanpa meninggalkan batas wilayah dan identitas AWS yang sudah mereka kelola.

Secara praktis, pengguna di instansi pemerintah dapat memakai dua kemampuan utama dari aplikasi ChatGPT desktop. Fitur Work dirancang untuk tugas-tugas besar yang butuh perencanaan, riset, dan penyusunan dokumen akhir, sementara Codex adalah agen pemrograman yang membantu menulis, menguji, dan meninjau kode. Inferensi model dialihkan lewat Responses API di Amazon Bedrock, sehingga permintaan dari aplikasi desktop tidak langsung menyentuh server OpenAI, melainkan melewati endpoint AWS yang sudah diatur oleh tim keamanan instansi.

Bagi pembaca yang belum familiar: Amazon Bedrock adalah layanan AWS yang menyediakan akses ke berbagai model bahasa besar melalui satu API terpadu, sementara AWS GovCloud (US) adalah region AWS khusus yang memenuhi persyaratan kepatuhan tertentu untuk workloads pemerintah AS. Dalam rilis ini, lalu lintas inference diarahkan ke endpoint Amazon Bedrock Mantle di region us-gov-west-1, dengan kontrol akses memakai AWS Identity and Access Management (IAM) dan kebijakan jaringan GovCloud yang sudah ada.

Rilis ini juga menekankan beberapa hal yang relevan untuk tim keamanan dan pengadaan TI. Pemrosesan data tetap berada di region AWS yang dipilih, sehingga membantu memenuhi syarat residensi data. Tidak ada lisensi per-kursi atau komitmen per-pengembang—pembayaran dilakukan berbasis token. Fitur Zero Data Retention (ZDR) juga didukung, artinya prompt dan respons diproses tanpa disimpan secara permanen oleh AWS maupun dibagikan ke penyedia model, sebuah pengaturan yang berguna untuk informasi sensitif dan memenuhi tata kelola data yang ketat.

AWS juga mengingatkan bahwa menggunakan GovCloud dan mengikuti panduan ini tidak otomatis melegitimasi sebuah workload. Instansi tetap bertanggung jawab meninjau model, layanan AWS, region, endpoint, kontrol workstation, repositori, kredensial, dan aliran data terhadap rencana keamanan sistem serta proses otorisasi internal mereka. Konfigurasi yang dibagikan dalam tulisan AWS menggunakan mode sign-in API, kebijakan perangkat terkelola, profil AWS bernama, serta pembatasan jaringan yang hanya mengizinkan akses ke endpoint Amazon Bedrock yang disetujui sambil menonaktifkan koneksi keluar lain—sehingga tim keamanan bisa menguji dan mendokumentasikan penempatan sebelum meluluskan pemakaian yang lebih luas.

Secara umum, pola integrasi seperti ini lazim dipakai ketika sebuah organisasi ingin memakai model AI pihak ketiga tetapi tetap mempertahankan kontrol identitas, jaringan, dan audit di atas infrastruktur cloud sendiri. Dengan menyiapkan file requirements.toml dan config.toml sebelum aplikasi dijalankan, administrator bisa menetapkan aturan yang tidak dapat diubah oleh pengguna, misalnya daftar endpoint yang boleh dihubungi dan tingkat izin yang tersedia, sehingga pemakaian AI di lingkungan kerja tetap sesuai kebijakan keamanan instansi.
