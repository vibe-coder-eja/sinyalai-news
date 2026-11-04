---
title: "AWS Jelaskan Distilasi Pengetahuan untuk Efisiensi Agen di Amazon SageMaker AI"
summary: "AWS menjelaskan distilasi pengetahuan tingkat urutan di Amazon SageMaker AI untuk melatih model kecil dari jejak kerja model pengajar, sehingga biaya pemanggilan agen AI dapat ditekan setelah pelatihan."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/build-efficient-agents-with-knowledge-distillation-on-amazon-sagemaker-ai/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-02T17:01:31.000Z
draft: false
sourceTitle: "Build efficient agents with knowledge distillation on Amazon SageMaker AI"
categories: ["Rilis Model","Fitur & Skills","Penerapan Industri"]
---

Dalam tulisan teknisnya, AWS (02/11) menjelaskan penggunaan distilasi pengetahuan tingkat urutan (SeqKD) di Amazon SageMaker AI untuk memindahkan perilaku agen dari model pengajar besar dan mutakhir ke model pelajar yang lebih kecil. Model pengajar membangkitkan jejak kerja multi-langkah, lalu AWS mempertahankan contoh yang berhasil menyelesaikan tugas dan melatih model pelajar melalui penyetelan terawasi. Menurut AWS, model pelajar kemudian dapat melayani permintaan dengan biaya lebih rendah sehingga model pengajar tidak perlu dipanggil pada setiap langkah.

Perubahan ini berdampak langsung pada tim yang menjalankan agen AI dalam skala produksi. Dalam contoh asisten belanja, satu permintaan memicu rangkaian pencarian katalog, pemeriksaan kandidat, pengecekan syarat, dan pemilihan rekomendasi. Setiap langkah merupakan pemanggilan model yang ditagih secara terpisah, sehingga biaya per tugas menumpuk bagi setiap pengguna. AWS menyebut model kecil lebih cepat dan murah untuk dijalankan, tetapi kualitasnya biasanya lebih rendah. SeqKDuitos untuk memindahkan perilaku model pengajar agar model pelajar dapat mempertahankan sebagian besar kualitas pada biaya dan kecepatan model kecil.

SeqKD hanya membutuhkan keluaran teks dari model pengajar, tanpa akses ke bobot, nilai logit, atau infrastruktur pembelajaran penguatan. Metode ini dapat digunakan ketika model pengajar bersifat tertutup dan hanya dapat diakses melalui antarmuka pemrograman aplikasi (API). Pada agen, data yang dipindahkan berupa jejak kerja terurut yang memuat penalaran, pemanggilan alat, serta hasil observasi, dengan setiap langkah bergantung pada langkah sebelumnya. Karena contoh keluaran guru disimpan sebagai data, data tersebut dapat digunakan kembali untuk melatih atau menguji model pelajar lain tanpa perlu membangkitkannya kembali.

Dalam panduannya, AWS menjelaskan proses membangkitkan jejak kerja berkualitas tinggi, menilai hasilnya dengan sistem penilaian terprogram, dan mempertahankan jejak kerja yang berhasil menyelesaikan tugas. Data tersebut kemudian disusun untuk penyetelan terawasi, dilatih pada infrastruktur tanpa server di Amazon SageMaker AI, lalu dievaluasi dengan tolok ukur yang tidak digunakan selama pelatihan. AWS juga mencantumkan kebutuhan akun AWS, peran pengelolaan identitas dan akses (IAM) untuk Amazon SageMaker AI, izin baca dan tulis pada wadah penyimpanan Amazon S3, serta izin untuk memanggil model pengajar.

Secara umum, distilasi pengetahuan menggunakan keluaran model guru untuk melatih model pelajar. AWS menyebut model turunan DeepSeek-R1 sebagai contoh penerapan teknik ini, dengan penalaran model pengajar besar dipindahkan ke modelpenalaran kecil melalui penyetelan terawasi.
