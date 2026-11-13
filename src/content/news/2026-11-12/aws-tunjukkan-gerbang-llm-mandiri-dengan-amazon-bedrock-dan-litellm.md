---
title: "AWS Tunjukkan Gerbang LLM Mandiri dengan Amazon Bedrock dan LiteLLM"
summary: "Panduan AWS (12/11) menjelaskan penggunaan LiteLLM di AWS Fargate sebagai gerbang API kompatibel OpenAI menuju Amazon Bedrock, lengkap dengan kunci per pengguna, kontrol biaya, kuota model, dan observability."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/building-a-self-service-llm-gateway-with-amazon-bedrock-and-litellm/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-12T18:41:12.000Z
draft: false
sourceTitle: "Building a self-service LLM gateway with Amazon Bedrock and LiteLLM"
categories: ["Rilis Model"]
---

AWS (12/11) mempublikasikan panduan untuk membangun gerbang model bahasa besar (LLM) layanan mandiri yang menghubungkan developer dengan model dasar di Amazon Bedrock melalui LiteLLM yang berjalan di AWS Fargate. Solusi ini menyediakan antarmuka pemrograman aplikasi (API) yang kompatibel dengan OpenAI, sehingga developer cukup menggunakan satu alamat layanan dan kunci API pribadi. Sementara itu, tim platform memperoleh kontrol biaya per pengguna, isolasi kuota, serta pemantauan kinerja model.

 bagi pengguna tools seperti Claude Code, Continue, dan Cursor, perubahan utama terletak pada berkurangnya kebutuhan konfigurasi awal. Alat pemrograman tersebut dapat diarahkan ke satu titik akhir API tanpa terhubung langsung ke Amazon Bedrock. Developer juga dapat mengganti model, mengatur model cadangan, atau memindahkan penyedia model tanpa mengubah konfigurasi pada alat yang digunakan.

Dalam topologi produksi yang dijelaskan AWS, permintaan pengguna melewati Amazon Route 53, Amazon CloudFront, dan Application Load Balancer sebelum mencapai LiteLLM di AWS Fargate. LiteLLM memverifikasi kunci API per pengguna, menyimpan metadata kunci dan catatan pengeluaran di Amazon RDS dengan PostgreSQL, serta menggunakan Amazon ElastiCache untuk Valkey sebagai cache dan koordinasi batas penggunaan. Rahasia dikelola melalui AWS Secrets Manager. Sementara itu, profil inferensi Amazon Bedrock dipanggil dengan peran tugas AWS Identity and Access Management yang memiliki izin terbatas. Amazon CloudWatch mencatat permintaan per menit, token per menit, serta alarm kuota.

Setiap model, termasuk contoh Claude Sonnet dan Claude Haiku, dapat memperoleh profil inferensi tersendiri yang dikelola melalui AWS Cloud Development Kit. Pendekatan tersebut memisahkan konfigurasi LiteLLM dari versi model di Amazon Bedrock sekaligus menyediakan isolasi kuota per model. Untuk pengamatan tingkat aplikasi, LiteLLM dapat dipadukan dengan Langfuse, perangkat lunak sumber terbuka untuk melacak prompt, mengukur latensi, dan menelusuri kesalahan.

 Panduan tersebut memerlukan akun AWS, akses model Amazon Bedrock, izin AWS Identity and Access Management, dan LiteLLM. LiteLLM mendokumentasikan komponen AI Gateway gratis untuk sampai lima pengguna, dengan lisensi diperlukan di atas jumlah tersebut. Namun, fitur penerbitan kunci API mandiri yang diuraikan dalam panduan hanya tersedia pada LiteLLM Enterprise, yang juga mencakup sistem masuk tunggal, audit log, peran administrasi terdelegasi, dan dukungan. Contoh pada panduan tidak memasukkan Amazon Bedrock Guardrails, tetapi AWS menyatakan bahwa kontrol kecerdasan buatan yang sesuai perlu ditambahkan sebelum sistem digunakan secara produksi.
