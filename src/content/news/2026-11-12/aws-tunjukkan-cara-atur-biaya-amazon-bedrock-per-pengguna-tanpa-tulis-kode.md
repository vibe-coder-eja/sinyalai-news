---
title: "AWS Tunjukkan Cara Atur Biaya Amazon Bedrock per Pengguna Tanpa Tulis Kode"
summary: "AWS (12/11) mempublikasikan panduan untuk melacak dan membatasi pengeluaran Amazon Bedrock per identitas pengguna hanya dengan fitur bawaan AWS, tanpa perlu menulis kode aplikasi. Pendekatan ini mengandalkan penandaan IAM, laporan CUR 2.0, dan AWS Budgets untuk menegakkan batas belanja secara otomatis."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/tokenomics-at-scale-track-and-cap-amazon-bedrock-spend-per-iam-principal-with-cur-2-0-and-aws-budgets/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-12T19:29:55.000Z
draft: false
sourceTitle: "Tokenomics at scale: Track and cap Amazon Bedrock spend per IAM principal with CUR 2.0 and AWS Budgets"
categories: ["Fitur & Skills","Penerapan Industri","Riset & Kebijakan"]
---

AWS (12/11) mempublikasikan panduan teknis yang menjelaskan cara organisasi melacak dan membatasi pengeluaran Amazon Bedrock per identitas pengguna, cukup dengan fitur bawaan AWS tanpa perlu menulis kode aplikasi. Langkah ini menjawab kebutuhan umum di kalangan CFO dan CTO: mengetahui berapa biaya yang dikeluarkan tiap orang atau tim, menetapkan batas, dan melakukannya tanpa beban operasional tambahan.

Selama ini, AWS mengakui bahwa atribusi biaya generative AI memang bukan perkara mudah. Pada tulisan sebelumnya, AWS bersama Jamf pernah membahas pendekatan berbasis Lambda dan Athena untuk menegakkan batas secara hampir real-time, tetapi solusi itu menuntut kode yang harus dikelola sendiri. Panduan terbaru ini menawarkan jalur yang lebih ringan: tiga tahap yang disebut attribute, report, dan enforce.

Tahap pertama, attribute, memanfaatkan fakta bahwa Amazon Bedrock secara otomatis mencatat identitas IAM (IAM principal) untuk setiap permintaan inferensi. Jika tiap pengguna sudah memakai peran IAM sendiri, cukup tambahkan principal tags pada peran tersebut. Jika beberapa orang berbagi satu peran, panduan menyarankan penggunaan session tags yang dilewatkan saat peran diasumsikan, misalnya melalui AssumeRoleWithWebIdentity dengan klaim OIDC atau AssumeRoleWithSAML dengan atribut PrincipalTag. Setelah tag diterapkan, tag tersebut perlu diaktifkan sebagai cost allocation tags di konsol AWS Billing agar muncul di data penagihan.

Tahap kedua, report, menggunakan AWS Cost Explorer untuk tampilan cepat di konsol, atau AWS Cost and Usage Reports (CUR) 2.0 untuk analisis rinci per baris. Data ekspor CUR 2.0 dikirim ke bucket Amazon S3 dan bisa di-query dengan Amazon Athena jika diperlukan. Tahap ketiga, enforce, memakai AWS Budgets yang ruang lingkupnya difilter ke Amazon Bedrock dan identitas tertentu. Saat ambang batas terlampaui, budget action akan menempelkan kebijakan Deny IAM secara otomatis, sehingga akses ke Amazon Bedrock terhenti sampai ditinjau ulang.

Secara umum, IAM principal adalah identitas yang dipakai saat seseorang atau aplikasi memanggil layanan AWS, bisa berupa pengguna IAM maupun peran IAM. Session tags adalah label sementara yang ikut menempel pada sesi saat peran diambil, sehingga satu peran bersama bisa menandai pengguna yang berbeda dari waktu ke waktu. CUR 2.0 adalah format laporan penggunaan dan biaya terbaru dari AWS yang lebih terstruktur dan ramah kueri SQL dibanding versi sebelumnya. Kombinasi ketiganya memungkinkan tim keuangan melihat pengeluaran per individu, sementara tim teknis tetap punya pagar otomatis yang mencegah tagihan membengkak tanpa pengawasan.

AWS menekankan beberapa prasyarat sebelum menerapkan pola ini: akses Amazon Bedrock sudah aktif, izin untuk menandai IAM principal dan mengaktifkan cost allocation tags, AWS CLI yang sudah dikonfigurasi, serta akses ke AWS Billing Console. Tag yang baru diaktifkan juga butuh waktu hingga sekitar 24 jam untuk mulai mengisi data penagihan, dan aktivasi tidak berlaku surut, sehingga tag sebaiknya diaktifkan sebelum data historis dibutuhkan.
