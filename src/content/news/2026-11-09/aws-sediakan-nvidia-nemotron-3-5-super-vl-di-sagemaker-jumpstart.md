---
title: "AWS Sediakan NVIDIA Nemotron 3.5 Super VL di SageMaker JumpStart"
summary: "AWS (09/11) menyediakan NVIDIA Nemotron 3.5 Super VL di Amazon SageMaker JumpStart. Model multimodal ini menganalisis teks, gambar, dan video untuk pembacaan dokumen, pemahaman antarmuka, serta tugas agen AI."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/nvidia-nemotron-3-5-super-vl-is-now-available-in-amazon-sagemaker-jumpstart/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-09T20:01:20.000Z
draft: false
sourceTitle: "NVIDIA Nemotron 3.5 Super VL is now available in Amazon SageMaker JumpStart"
categories: ["Rilis Model","Fitur & Skills"]
---

Dalam rilis resmi AWS (09/11), NVIDIA Nemotron 3.5 Super VL tersedia di Amazon SageMaker JumpStart, katalog model terkelola milik AWS. Model ini dapat dipasang melalui SageMaker Studio dengan beberapa langkah atau melalui SageMaker Python SDK dengan beberapa baris kode. Super VL menerima teks, gambar, dan video, lalu menghasilkan teks untuk pembacaan dokumen, pemahaman antarmuka komputer, tanya jawab video, dan alur kerja agen multimodal.

Super VL merupakan model bahasa-visual dalam keluarga Nemotron 3.5. Tulang punggung bahasa hibridanya memiliki 120 miliar parameter, dengan 12 miliar parameter aktif pada setiap token, yaitu unit pemrosesan yang umumnya berbentuk potongan kata atau tanda baca. Arsitektur mixture-of-experts atau campuran komponen ahli mengarahkan setiap token ke kelompok komponen yang relevan sehingga tidak semua parameter bekerja sekaligus. Penyandi C-RADIO mengubah gambar dan bingkai video menjadi informasi yang dapat diproses oleh tulang punggung bahasa. Model mendukung konteks hingga satu juta token, sedangkan kepala Multi-Token Prediction mendukung speculative decoding untuk memperkirakan token berikutnya. Kepala tersebut belum diaktifkan dalam konfigurasi JumpStart.

Contoh pemakaiannya adalah alur pembacaan faktur: gambar faktur dianalisis untuk mengekstraksi teks, tabel, dan grafik, lalu hasilnya dapat diteruskan ke aplikasi lain. Super VL juga dapat merangkum klip MP4 atau menjawab pertanyaan tentang isi visual. Untuk agen komputer, screen grounding membantu menemukan elemen antarmuka, sementara tool calling dan keluaran JSON schema menghubungkan analisis visual dengan tindakan pada aplikasi. Penalaran dapat dikonfigurasi untuk setiap permintaan dan aktif secara bawaan.

JumpStart menyediakan dua varian. NVFP4 menjadi pilihan bawaan dan menggunakan bobot serta aktivasi 4-bit pada GPU Blackwell untuk inferensi yang dioptimalkan. Varian BF16 menyediakan bobot referensi dalam format BF16 dan dapat diunduh untuk pelatihan lanjutan, pembelajaran reinforcement, distilasi, adaptasi domain, atau pembuatan varian terkuantisasi sendiri. Endpoint JumpStart hanya melayani bobot dasar dan tidak memuat adaptor LoRA. Konfigurasi layanan menerima satu gambar dan satu video per permintaan, dengan panjang konteks 520 hingga 15.600 token.

Dalam pengujian AWS dengan 250 token masukan, 1.500 token keluaran, dan lima permintaan streaming secara bersamaan, varian BF16 pada instans ml.p5en.48xlarge mencapai rata-rata 140,85 token keluaran per detik untuk setiap permintaan. Waktu menuju token pertama sekitar setengah detik pada ketiga konfigurasi. AWS menyatakan bahwa angka tersebut bukan perbandingan langsung antara BF16 dan NVFP4 karena sistem GPU serta konfigurasinya berbeda. Menurut kartu model NVIDIA yang dikutip AWS, NVFP4 setara dengan BF16 pada MMLongBench-Doc dan berada dalam sekitar satu poin pada benchmark multimodal lainnya.

Secara umum, inference merujuk pada tahap model menghasilkan jawaban, sedangkan model multimodal memadukan beberapa jenis masukan seperti teks, gambar, dan video. Konteks token yang besar membantu model bekerja dengan dokumen panjang dan materi video dalam satu alur, tetapi batas yang berlaku pada konfigurasi JumpStart tetap perlu diperhatikan pengguna.
