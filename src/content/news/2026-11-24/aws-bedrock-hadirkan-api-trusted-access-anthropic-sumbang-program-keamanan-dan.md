---
title: "AWS Bedrock Hadirkan API Trusted Access, Anthropic Sumbang Program Keamanan dan Kontrol Data Enterprise"
summary: "Amazon Web Services mengumumkan ketersediaan umum API trusted access program di Amazon Bedrock, ditambah pratinjau publik dua program dari Anthropic: Enterprise Frontier Safeguards (EFS) dan Enterprise Data Controls (EDC) untuk model Claude."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/introducing-the-amazon-bedrock-trusted-access-api-with-anthropics-enterprise-frontier-safeguards-and-enterprise-data-controls/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-24T05:01:14.000Z
draft: false
sourceTitle: "Introducing the Amazon Bedrock Trusted Access API with Anthropic’s Enterprise Frontier Safeguards and Enterprise Data Controls"
categories: ["Rilis Model","Produk Baru","Penerapan Industri"]
---

Amazon Web Services (AWS) mengumumkan ketersediaan umum API trusted access program di Amazon Bedrock, lengkap dengan pratinjau publik dua program pertama dari Anthropic, yaitu Enterprise Frontier Safeguards (EFS) dan Enterprise Data Controls (EDC). Berdasarkan rilis resmi AWS (24/11), API baru ini berfungsi sebagai satu pintu bagi pelanggan untuk menemukan, meminta, dan mendaftar di program-program akses terpercaya dari penyedia model, sehingga pengalaman di Bedrock menjadi seragam lintas penyedia.

EFS dan EDC dirancang bersama AWS dan Anthropic untuk memberikan pelanggan kontrol lebih besar terhadap data saat menggunakan model-model Claude paling andal, termasuk Claude Fable, Claude Mythos, serta Claude Opus 5.5 dan Sonnet 5.5 yang digunakan lewat Cyber Verification Program (CVP). Kedua program ini menjawab kebutuhan laboratorium AI frontier akan kebijakan pemantauan keselamatan yang lebih ketat, sekaligus memberi perusahaan ruang untuk mengatur sendiri bagaimana kebijakan itu dipenuhi, mulai dari lokasi penyimpanan data hingga mekanisme peninjauan.

Lewat API ini, tim dapat melihat daftar penawaran, mengecek kelayakan, dan mendaftar dengan langkah yang sama untuk setiap penyedia. Administrator perusahaan mengatur siapa yang boleh mendaftar menggunakan kebijakan IAM dan service control policies yang sudah ada. Status kelayakan terbagi menjadi tiga: eligible untuk yang bisa langsung mendaftar, requestable yang butuh persetujuan dulu, dengan alasan penolakan tersedia di kolom statusReason. Pendaftaran dilakukan di cakupan tempat pelanggan disetujui, bisa di satu akun, seluruh akun dalam organisasi, atau satu proyek Bedrock, dan pelanggan bisa keluar dari program kapan saja.

Pada EFS, data pelanggan disimpan di lingkungan AWS milik pelanggan sendiri. AWS mengoperasikan pemantauan keselamatan otomatis, sementara AWS Key Management Service (KMS) dan bucket Amazon S3 milik pelanggan dipakai untuk mengenkripsi serta menyimpan prompt dan respons. AWS menegaskan tidak ada peninjau manusia dari AWS maupun Anthropic yang mengakses data yang disimpan, dan data tersebut tidak pernah dipakai untuk pelatihan model. Jika pemantauan otomatis menemukan potensi risiko, sebuah Safety Case akan dibuat di bucket pelanggan untuk ditinjau oleh tim internal mereka. Pada EDC, data yang disimpan ditempatkan di penyimpanan yang dikelola Amazon, bukan di akun pelanggan, dengan ketentuan bahwa prompt dan completions tidak disimpan oleh Anthropic.

Secara umum, API trusted access program menyederhanakan tata kelola saat perusahaan memakai beberapa model dari penyedia berbeda di satu platform. Alih-alih menavigasi proses pendaftaran yang berbeda-beda untuk tiap vendor, pelanggan cukup mengikuti alur yang sama di Bedrock. Pendekatan ini juga memberi penyedia model cara terstandarisasi untuk menawarkan program keamanan dan kontrol data tambahan kepada pelanggan yang memenuhi syarat.
