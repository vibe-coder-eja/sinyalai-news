---
title: "AWS Jelaskan Bangun Bayer Crop Science dengan Amazon Bedrock AgentCore"
summary: "Bayer Crop Science membangun Agentic Decision Engine di Amazon Bedrock AgentCore agar pengguna dapat memahami alur kerja analitik melalui bahasa alami. Platform iniESTR menjalankan 22 agen spesialis dan disebut menyelesaikan sekitar 80 persen pertanyaan tanpa bantuan insinyur."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/how-bayer-crop-science-built-an-agentic-decision-engine-on-amazon-bedrock-agentcore-with-aws-unified-operations/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-23T16:21:36.000Z
draft: false
sourceTitle: "How Bayer Crop Science built an agentic decision engine on Amazon Bedrock AgentCore with AWS Unified Operations"
categories: ["Fitur & Skills"]
---

AWS (23/10) melaporkan bahwa Bayer Crop Science membangun Agentic Decision Engine (ADE) di Amazon Bedrock AgentCore untuk membantu pemulia tanaman, analis, dan peneliti memahami hasil analitik melalui pertanyaan dalam bahasa alami. Platform iniESTR menghubungkan data genomik, uji lapangan, citra, kondisi lingkungan, dan keluaran model, sehingga pengguna dapat mengetahui alasan sebuah alur kerja gagal tanpa harus mencari informasi di berbagai sistem.

ADE memakai pendekatan multiagen. Supervisor Agent menerima pertanyaan, menentukan agen spesialis yang sesuai, lalu menggabungkan jawaban bila permintaan melintasi beberapa bidang. Dalam fase pertama, Bayer menyebut sekitar 80 persen pertanyaan pengguna dapat diselesaikan tanpa keterlibatan insinyur. Untuk kasus kegagalan alur kerja fenotipe, diagnosis yang sebelumnya membutuhkan lebih dari satu jam untuk mencari log dan menunggu dukungan insinyur disebut dapat diselesaikan dalam waktu kurang dari 10 menit.

Platform iniESTR sudah menjalankan 22 agen spesialis di produksi. Domain Expert Agent menjawab pertanyaan konseptual melalui Retrieval Augmented Generation (RAG), yaitu metode yang memberi model konteks dari sumber data tertentu. Operational Agent mengambil status dan hasil alur kerja secara langsung, Troubleshooting Agent menganalisis telemetri, sedangkan Visualization Agent membuat grafik atau menampilkan dasbor yang sudah tersedia. Pola Models as Skill juga mengubah kode serta dokumentasi model menjadi definisi keterampilan yang dapat diakses agen.

Amazon Bedrock AgentCore menjadi lapisan runtime yang menjalankan agen dan menyediakan isolasi sesi, akses alat dengan kendali AWS Identity and Access Management (IAM), serta dukungan terhadap framework dan model pilihan tim. Tim Bayer menjalankan orkestrasi LangGraph sendiri di atas layanan tersebut, sementara Amazon DynamoDB menyimpan status proses bertahap, Amazon Aurora PostgreSQL menyimpan catatan sesi dan analitik, Amazon ElastiCache menyimpan cache jawaban, Amazon S3 menjadi sumber konten, Amazon OpenSearch Serverless menyediakan indeks pencarian, dan Amazon CloudWatch mengumpulkan telemetri. AgentCore Gateway mengekspos API internal sebagai alat Model Context Protocol (MCP) tanpa menaruh autentikasi dan otorisasi di dalam kode agen.

Untuk menyiapkan sistem, Bayer bergandeng dengan AWS Unified Operations. Program iniESTR menyediakan Technical Account Manager dan Spesialis Insinyur Domain AI Generatif yang bekerja bersama tim Bayer dari desain hingga produksi. Tim melakukan tiga kali pertemuan teknis setiap minggu untuk meninjau keputusan rancangan dan panduan teknis.

Arsitektur ADE terdiri dari pengalaman pengguna, orkestrasi agen, agen spesialis, serta alat dan sumber data yang dipanggil agen. Dengan antarmuka berbasis React dan akses melalui Microsoft Entra ID, ADE menyatukan konteks yang sebelumnya tersebar di API, dokumentasi, metadata, dasbor, dan log. Secara umum, pendekatan ini memindahkan pencarian konteks dari aplikasi dan sistem pemantauan ke satu antarmuka bahasa alami, tetapi tetap bergantung pada izin pengguna, tata kelola data, serta keakuratan jawaban agen.
