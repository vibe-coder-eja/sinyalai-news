---
title: "AWS dan Cartesia tawarkan model suara real-time dengan latensi di bawah 100 milidetik"
summary: "AWS (03/11) menjelaskan cara membangun aplikasi suara AI berlatensi sangat rendah bersama mitranya, Cartesia, menggunakan arsitektur State Space Models dan infrastruktur AWS untuk text-to-speech serta speech-to-text."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/building-ultra-low-latency-voice-ai-applications-on-aws/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-03T16:40:54.000Z
draft: false
sourceTitle: "Building ultra-low-latency voice AI applications on AWS"
categories: ["Kerjasama Industri","Penerapan Industri"]
---

Amazon Web Services (AWS) (03/11) mempublikasikan panduan teknis tentang cara membangun aplikasi suara AI dengan latensi sangat rendah, bekerja sama dengan mitranya, Cartesia. Lewat tulisan di blog machine learning AWS, keduanya memperkenalkan pendekatan berbasis State Space Models (SSMs) yang diklaim mampu menghasilkan suara dan transkripsi kurang dari 100 milidetik, sehingga percakapan dengan mesin terasa lebih alami.

Bagi pengguna yang pernah merasa jeda saat berbicara dengan asisten suara terasa terlalu lama, masalah ini memang krusial. Dalam percakapan manusia biasa, jeda antar giliran bicara hanya sekitar 200 milidetik. Jika mesin butuh waktu lebih dari itu untuk menjawab, alur percakapan langsung terasa canggung. AWS dan Cartesia berupaya menjawab tantangan itu dengan dua model produksi: Sonic untuk text-to-speech atau mengubah teks menjadi suara, dan Ink untuk speech-to-text atau mengubah suara menjadi teks. Keduanya dirancang untuk latensi byte pertama di bawah 100 milidetik, dengan Sonic diklaim mampu memulai audio dalam sekitar 90 milidetik.

Sonic mendukung lebih dari 44 bahasa dan menawarkan kemampuan kloning suara dari sampel audio sepanjang 10 detik. Arsitekturnya yang bersifat streaming memungkinkan audio mulai dihasilkan sebelum seluruh teks masukan diterima, sehingga respons terasa lebih cepat. Ink, di sisi lain, dilengkapi fitur turn detection bawaan yang dapat mengenali kapan seorang pembicara sudah selesai berbicara tanpa memerlukan model voice activity detection terpisah. Model ini juga mampu menghasilkan transkripsi sebagian secara real time, sehingga model bahasa besar di belakangnya bisa mulai menyusun jawaban sebelum giliran bicara benar-benar berakhir.

AWS menjelaskan bahwa Sonic tersedia sebagai model package di Amazon SageMaker AI, layanan untuk membangun, melatih, dan men-deploy model machine learning, sehingga tim yang ingin menjaga tata kelola data, kontrol latensi, atau kepatuhan regulasi dapat menjalankan model ini langsung di akun AWS mereka sendiri. Cartesia sendiri merupakan perusahaan intelijen multimodal real-time yang didirikan oleh peneliti yang berkontribusi pada pengembangan arsitektur SSM.

Secara umum, State Space Models adalah keluarga arsitektur neural network yang memproses data secara berurutan dengan membawa "state" atau kondisi internal yang ringkas dari satu langkah ke langkah berikutnya. Pendekatan ini berbeda dari transformer, arsitektur di balik banyak model AI populer saat ini, yang memproses seluruh urutan sekaligus dengan mekanisme attention. Karena transformer membandingkan setiap elemen dengan elemen lain dalam urutan, biaya komputasinya meningkat tajam seiring bertambahnya panjang urutan. SSM menghindari masalah itu dengan memproses data langkah demi langkah, sehingga lebih hemat untuk data streaming seperti suara langsung. Karena itulah SSM dianggap cocok untuk aplikasi suara real-time, di mana kualitas dan kecepatan harus berjalan bersamaan tanpa kompromi.
