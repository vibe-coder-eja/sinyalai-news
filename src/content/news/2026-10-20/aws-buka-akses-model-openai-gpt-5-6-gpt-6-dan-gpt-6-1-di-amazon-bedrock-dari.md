---
title: "AWS Buka Akses Model OpenAI GPT-5.6, GPT-6, dan GPT-6.1 di Amazon Bedrock dari Kanada"
summary: "AWS mengumumkan ketersediaan model OpenAI GPT-5.6, GPT-6, dan GPT-6.1 di Amazon Bedrock dari Region Kanada melalui cross-Region inference, memungkinkan organisasi Kanada mengakses model-model tersebut tanpa meninggalkan wilayah North America."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/access-openai-gpt-models-on-amazon-bedrock-from-canada-with-cross-region-inference/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-20T16:42:53.000Z
draft: false
sourceTitle: "Access OpenAI GPT models on Amazon Bedrock from Canada with cross-Region inference"
categories: ["Rilis Model"]
---

Berdasarkan tulisan di blog AWS (20/10), organisasi di Kanada kini dapat mengakses model OpenAI GPT-5.6, GPT-6, dan GPT-6.1 di Amazon Bedrock dari Region Canada (Central) dan Canada West (Calgary) melalui mekanisme cross-Region inference. Sebelumnya, tim yang membangun aplikasi generatif di Region Kanada sering kali harus menunggu ketersediaan model-model terbaru atau mengandalkan Region lain di luar Kanada.

Lewat cross-Region inference, aplikasi cukup memanggil endpoint Amazon Bedrock Runtime di Region asal Kanada. AWS kemudian meneruskan permintaan tersebut ke Region tujuan yang didukung untuk diproses. Pendekatan ini memberikan akses ke kapasitas pemrosesan yang lebih luas sehingga aplikasi dapat mempertahankan throughput saat permintaan melonjak, tanpa perlu logika pemilihan Region di sisi aplikasi.

Tiga keluarga model OpenAI tersedia melalui jalur ini. GPT-5.6 hadir dalam varian Sol, Terra, dan Luna; GPT-6 mencakup Astra, Sol, dan Luna; sementara GPT-6.1 tersedia dalam varian Sol. Inferensi diproses di wilayah North America dengan kontrol data-residency yang dijelaskan dalam dokumentasi AWS. Pengguna dapat memilih dua jenis profil: profil geografis AS (awalan us.) yang membatasi pemrosesan di Kanada dan AS, atau profil global (awalan global.) yang menarik kapasitas dari Region AWS komersial lain tempat model tersebut ditempatkan. Profil global untuk GPT-5.6 hanya tersedia dari ca-central-1, sedangkan dari ca-west-1 pengguna memakai profil geografis AS untuk GPT-5.6.

Seluruh model menerima input teks dan gambar serta mengembalikan output teks, dengan jendela konteks 1 juta token, mode penalaran (reasoning), dan dukungan tool calling. GPT-6.1 Sol memiliki kemampuan multimodalitas tambahan pada sisi input dan output. Ketiga keluarga model juga mendukung prompt caching di Amazon Bedrock. Akses tersedia melalui tiga antarmuka pemrograman: OpenAI Responses API, OpenAI Chat Completions API, dan Amazon Bedrock Converse API pada endpoint bedrock-runtime.

Untuk memulai, organisasi memerlukan akun AWS dengan Region ca-central-1 atau ca-west-1 sebagai Region sumber, peran atau pengguna IAM dengan izin memanggil inference profile, serta Python 3.9 atau lebih baru dengan paket openai, boto3, dan aws-bedrock-token-generator terpasang. AWS merekomendasikan kebijakan AmazonBedrockLimitedAccess untuk eksplorasi cepat, atau kebijakan khusus least-privilege untuk beban kerja produksi. Organisasi yang menerapkan Service Control Policies (SCP) dapat memakai condition key bedrock:InferenceProfileArn agar lalu lintas cross-Region inference tetap diizinkan meskipun panggilan langsung ke Region lain dibatasi.

Secara umum, cross-Region inference adalah mekanisme kapasitas yang memungkinkan AWS mendistribusikan beban kerja inferensi ke beberapa Region secara transparan. Bagi tim yang memprioritaskan pemrosesan data tetap di North America demi kepatuhan, profil geografis AS memberikan batasan tersebut; sementara profil global menawarkan fleksibilitas kapasitas lebih besar saat permintaan tidak menentu. Informasi harga tersedia di halaman Amazon Bedrock pricing, dan ketersediaan per model per Region dapat diperiksa melalui model card di Amazon Bedrock User Guide.
