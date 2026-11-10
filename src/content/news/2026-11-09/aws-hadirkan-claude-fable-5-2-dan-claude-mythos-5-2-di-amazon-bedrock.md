---
title: "AWS Hadirkan Claude Fable 5.2 dan Claude Mythos 5.2 di Amazon Bedrock"
summary: "AWS mengumumkan ketersediaan Claude Fable 5.2 dan Claude Mythos 5.2 di Amazon Bedrock serta Claude Platform on AWS. Fable 5.2 ditujukan untuk pekerjaan teknis seperti coding dan sains, sementara Mythos 5.2 hanya tersedia lewat program verifikasi untuk keamanan siber dan ilmu hayati."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/introducing-claude-fable-5-2-on-aws/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-09T20:04:37.000Z
draft: false
sourceTitle: "Introducing Claude Fable 5.2 on AWS"
categories: ["Rilis Model","Produk Baru"]
---

Amazon Web Services (AWS) mengumumkan ketersediaan dua model terbaru dari Anthropic, Claude Fable 5.2 dan Claude Mythos 5.2, di Amazon Bedrock dan Claude Platform on AWS. Berdasarkan rilis resmi AWS (09/11), Fable 5.2 merupakan model paling mumpuni dari Anthropic untuk pekerjaan teknis umum, dengan peningkatan pada kemampuan coding dan sains.

Fable 5.2 dirancang untuk menangani persoalan sulit di bidang coding, matematika, dan sains. Model ini mampu menafsirkan perintah yang ambigu, bekerja dalam tahapan bertahap, memverifikasi hasil kerjanya sendiri, serta berjalan tanpa pengawasan selama berjam-jam hingga berhari-hari. Dalam pengujian alignment yang dilakukan Anthropic, Mythos 5.2 dilaporkan lebih jarang halusinasi, menyelesaikan tugas lebih andal, dan melaporkan masalah secara lebih jujur dibanding model-model sebelumnya. Anthropic menyebut Fable 5.2 diharapkan menunjukkan perilaku serupa.

AWS juga menyiapkan mekanisme fallback: jika permintaan terkait keamanan siber ditolak, pengguna dapat mencoba ulang lewat model Opus 4.8, sedangkan permintaan terkait biologi dapat diarahkan ke Opus 5. Pengguna perlu mengatur sendiri logika fallback ini di dalam kode mereka di Amazon Bedrock. Jika permintaan yang ditolak sempat masuk ke prompt cache, sistem akan mengembalikan token kredit fallback sehingga percobaan ulang tetap dikenai tarif cache read, bukan penulisan cache baru.

Claude Mythos 5.2 hanya tersedia melalui program verifikasi Anthropic untuk pekerjaan berisiko tinggi di dua bidang: keamanan siber (untuk rekayasa keamanan, red teaming, dan pengujian penetrasi) serta riset ilmu hayati (khususnya desain biomolekuler dan sintesis riset). AWS menekankan bahwa Mythos 5.2 tidak dapat diakses secara umum.

Untuk Fable 5.2, Anthropic menetapkannya sebagai Covered Model, yang secara default mensyaratkan retensi data hingga 30 hari dan tinjauan keamanan oleh manusia. Di Amazon Bedrock, tinjauan dilakukan oleh personel AWS di dalam lingkungan AWS. Pelanggan dapat mengatur mode aws_review pada akun atau proyek sebelum memanggil model. AWS juga memperkenalkan Enterprise Frontier Safeguards (EFS), hasil kolaborasi dengan Anthropic yang menggabungkan retensi data nol (zero data retention) dengan perlindungan terhadap penyalahgunaan. Hingga EFS tersedia, pelanggan yang memenuhi syarat dapat menggunakan Fable 5.2 dengan retensi data nol untuk penggunaan internal setidaknya hingga 30 Juni 2027.

Untuk mulai mencoba, pengguna dapat membuka konsol Amazon Bedrock, memilih menu Test atau Playground, lalu memilih Fable 5.2 sebagai model. Secara terprogram, model ini dapat dipanggil lewat Anthropic Messages API pada bedrock-runtime melalui Anthropic SDK, atau tetap menggunakan Invoke dan Converse API melalui AWS CLI dan AWS SDK. AWS juga menyediakan skill claude-api di Claude Code untuk membantu tim yang sudah menjalankan model Claude di Amazon Bedrock melakukan migrasi ke Fable 5.2, termasuk pembaruan ID model, penyesuaian pengaturan thinking, dan pembersihan parameter yang sudah usang.

Secara umum, Amazon Bedrock adalah layanan AWS yang memungkinkan pelanggan mengakses berbagai model kecerdasan buatan dari penyedia berbeda melalui satu API terpadu, tanpa perlu mengelola infrastruktur sendiri. Prompt cache adalah mekanisme penyimpanan sementara untuk bagian perintah yang sering dipakai agar tidak diproses ulang, sehingga menekan biaya dan latensi.
