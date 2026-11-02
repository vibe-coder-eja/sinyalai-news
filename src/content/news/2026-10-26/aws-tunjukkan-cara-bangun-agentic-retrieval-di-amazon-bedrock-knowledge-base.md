---
title: "AWS Tunjukkan Cara Bangun Agentic Retrieval di Amazon Bedrock Knowledge Base Lewat CDK"
summary: "AWS (26/10) mempublikasikan panduan membangun sistem agentic retrieval di atas Managed Amazon Bedrock Knowledge Base menggunakan AWS CDK. Agen dapat memilih basis pengetahuan, mengambil jawaban berulang, dan menyajikan jawaban dengan kutipan, lengkap dengan tujuh lapisan observabilitas dan evaluasi otomatis."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/build-agentic-retrieval-on-a-managed-amazon-bedrock-knowledge-base-with-cdk/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-26T17:15:14.000Z
draft: false
sourceTitle: "Build agentic retrieval on a Managed Amazon Bedrock Knowledge Base with CDK"
categories: ["Fitur & Skills","Penerapan Industri","Riset & Kebijakan"]
---

Berdasarkan panduan resmi AWS (26/10), perusahaan tersebut mempublikasikan contoh arsitektur untuk membangun sistem agentic retrieval di atas Managed Amazon Bedrock Knowledge Base menggunakan AWS Cloud Development Kit (CDK). Sistem ini dirancang untuk menjawab pertanyaan yang jawabannya tersebar di lebih dari satu sumber dokumen, sesuatu yang sulit ditangani oleh pendekatan retrieval augmented generation (RAG) konvensional yang hanya melakukan satu kali pencarian.

Dalam panduan tersebut, AWS menjelaskan bahwa agen yang dibangun dapat memutuskan apakah perlu mengambil informasi, basis pengetahuan mana yang akan dituju, dan apakah perlu melakukan pencarian ulang sebelum menyusun jawaban akhir. Proses ini dimungkinkan lewat AgentCore Gateway, yang mengekspos setiap basis pengetahuan sebagai alat berstandar Model Context Protocol (MCP), serta AgenticRetrieveStream, API yang melakukan perencanaan multi-langkah, pencarian ulang, dan mengembalikan jawaban beserta kutipan sumbernya. Seluruh alur ini dikemas sebagai satu aplikasi CDK dalam Python, sehingga cukup satu perintah untuk menyebarkan semua komponen dan CDK yang menentukan urutan penyiapannya.

Salah satu perubahan utama dibanding panduan serupa yang diterbitkan AWS pada Agustus 2024 adalah penggunaan Managed Knowledge Base. Sebelumnya, pengguna harus menyiapkan sendiri koleksi dan indeks OpenSearch Serverless, lengkap dengan pengelolaan OpenSearch Compute Units (OCUs). Kini Amazon Bedrock mengelola proses ingestion, penyimpanan, pengindeksan, dan retrieval secara internal, termasuk embedding dan reranking dengan model yang dikelola layanan, sehingga tidak ada basis data vektor yang perlu disiapkan atau dipatch secara manual. Fitur agentic retrieval sendiri hanya tersedia pada Managed Knowledge Base.

AWS juga menekankan pentingnya observabilitas dan evaluasi yang dibangun sejak awal, bukan ditambahkan belakangan. Solusi ini menyertakan dua dasbor Amazon CloudWatch yang mencakup tujuh lapisan telemetri, mulai dari keputusan agen, pemanggilan alat, hingga kualitas jawaban. Selain itu, tersedia dua bentuk evaluasi: on-demand untuk pengujian sesaat dan continuous untuk pemantauan berkelanjutan, keduanya disediakan dari satu deployment yang sama.

Secara umum, RAG adalah teknik untuk memperkaya jawaban model bahasa dengan potongan dokumen yang relevan dari basis pengetahuan tertentu. Istilah agentic retrieval merujuk pada pendekatan di mana agen AI tidak hanya mengambil informasi satu kali, tetapi dapat melakukan beberapa kali pencarian, memilih sumber yang berbeda, dan menyusun jawaban secara bertahap. Pendekatan ini biasanya lebih akurat untuk pertanyaan kompleks, tetapi juga lebih sulit dioperasikan karena setiap pertanyaan dapat menghasilkan alur pemrosesan yang berbeda, sehingga telemetri dan evaluasi menjadi kebutuhan utama, bukan sekadar pelengkap.
