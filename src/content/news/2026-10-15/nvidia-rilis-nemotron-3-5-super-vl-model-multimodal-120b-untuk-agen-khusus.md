---
title: "NVIDIA Rilis Nemotron 3.5 Super VL, Model Multimodal 120B untuk Agen Khusus Perusahaan"
summary: "NVIDIA (15/10) memperkenalkan Nemotron 3.5 Super VL, model multimodal terbuka dengan arsitektur mixture-of-experts 120B parameter yang dirancang untuk menggerakkan agen AI khusus di lingkungan perusahaan."
company: "NVIDIA"
source: "https://developer.nvidia.com/blog/nvidia-nemotron-3-5-super-vl-powers-specialized-agents-with-multimodal-reasoning/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-15T18:01:00.000Z
draft: false
sourceTitle: "NVIDIA Nemotron 3.5 Super VL Powers Specialized Agents with Multimodal Reasoning"
categories: ["Rilis Model","Fitur & Skills","Penerapan Industri"]
---

NVIDIA (15/10) memperkenalkan Nemotron 3.5 Super VL, model multimodal terbuka yang dirancang untuk menggerakkan agen AI khusus di lingkungan perusahaan. Model ini menggabungkan kemampuan penalaran, pemahaman teks, gambar, dokumen, dan video dalam satu arsitektur, sehingga tim tidak perlu lagi menjalankan model terpisah untuk tugas visual dan teks.

Nemotron 3.5 Super VL menggunakan arsitektur mixture-of-experts dengan 120 miliar parameter, tetapi hanya mengaktifkan sekitar 12 miliar parameter untuk setiap token yang diproses. Pola ini menjaga kapasitas model tetap besar tanpa membebani biaya komputasi. Menurut NVIDIA, pada satu GPU model ini mampu mencapai throughput hingga 5 kali lebih tinggi untuk tugas-tugas agentik dibanding model terbuka lain di kelas ukuran yang sama.

Bayangkan agen layanan pelanggan yang harus membaca kebijakan pengembalian barang, memeriksa data pesanan, lalu menjawab pengguna. Atau agen riset yang menyilangkan bukti dari beberapa sumber, termasuk grafik dan tabel. NVIDIA merancang Nemotron 3.5 Super VL untuk pekerjaan semacam itu: penalaran multi-langkah yang melibatkan teks dan visual sekaligus, ditambah kemampuan mengikuti instruksi, memakai alat, dan menelusuri kebijakan perusahaan.

Beberapa organisasi sudah menyesuaikan model ini untuk kebutuhan spesifik. Scale AI melatih ulang Nemotron 3.5 Super VL untuk memproses kredit vendor otomatis di Skydance, dengan klaim penurunan biaya inferensi 40 kali dan latensi 5 kali lebih rendah. Ramp memakai model yang sama untuk mengubah foto struk menjadi data JSON terstruktur, dengan target peningkatan throughput hingga 50 persen dan penurunan latensi 10 kali. AI21 bersama Alice menggunakannya untuk analisis ancaman keamanan, dengan peningkatan akurasi 41 persen. Angka-angka tersebut merupakan klaim perusahaan yang dipublikasikan NVIDIA.

Pengembang dapat melakukan post-training menggunakan pustaka terbuka NVIDIA NeMo, baik melalui supervised fine-tuning, low-rank adaptation, maupun reinforcement learning. NVIDIA juga merilis kumpulan data terbuka di Hugging Face, mulai dari data penggunaan alat oleh agen, penalaran keuangan, instruksi dan percakapan, hingga 40 set data vision-language. Untuk deployment, model ini dapat dijalankan melalui NVIDIA NIM dengan optimasi seperti NVFP4 quantization, multi-token prediction, dan context reuse.

Secara umum, arsitektur mixture-of-experts bekerja seperti tim spesialis: model memiliki banyak ahli internal, tetapi untuk setiap potongan teks hanya sebagian kecil yang diaktifkan. Hasilnya, model besar tetap efisien saat dijalankan. Istilah post-training merujuk pada proses menyesuaikan model yang sudah jadi dengan data dan aturan milik organisasi tertentu, sehingga perilakunya lebih relevan dengan domain spesifik. NVIDIA menempatkan Nemotron 3.5 Super VL sebagai model khusus di tengah sistem yang lebih besar, berdampingan dengan model ringan seperti Nemotron 3.5 Lightning untuk tugas teks bervolume tinggi dan model frontier seperti Nemotron 3 Ultra untuk perencanaan kompleks.
