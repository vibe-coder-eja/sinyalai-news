---
title: "NVIDIA Rilis Alat Animasi AI dan Pencahayaan RTX untuk Pengembang Game"
summary: "NVIDIA (24/11) memperkenalkan pembaruan untuk pengembang game, termasuk model animasi AI Kimodo di Unreal Engine 5.9, SDK In-Game Inferencing 1.8, serta peningkatan RTX Dynamic Illumination dan RTX Path Tracing."
company: "NVIDIA"
source: "https://developer.nvidia.com/blog/whats-new-for-game-developers-ai-animation-and-rtx-tools/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-24T17:00:00.000Z
draft: false
sourceTitle: "What’s New for Game Developers: AI Animation and RTX Tools"
categories: ["Fitur & Skills"]
---

NVIDIA (24/11) mengumumkan serangkaian pembaruan perangkat lunak yang ditujukan untuk studio dan tim independen yang membangun game di PC. Rilis bulan ini menyentuh empat area sekaligus: grafis, animasi berbasis AI, kemampuan AI lokal di dalam game, dan alat bantu debugging. Tujuannya, menurut NVIDIA, agar tim bisa menambahkan fitur baru tanpa mengorbankan kualitas gambar, performa, atau arah artistik yang sudah mereka tetapkan.

Sorotan utama datang dari Kimodo, model AI pertama yang terintegrasi ke dalam kerangka guided animation di Unreal Engine 5.9 Preview. Bagi animator, ini berarti mereka bisa menulis perintah teks, menggambar jalur spline, atau menetapkan pose target di timeline Sequencer, lalu membiarkan model menghasilkan gerakan karakter yang mengikuti batasan tersebut. Dengan kata lain, animator tetap memegang kendali kreatif di titik-titik penting, sementara bagian repetitif bisa dibantu AI. NVIDIA Kimodo berjalan dengan akselerasi GPU langsung di editor yang sudah akrab bagi banyak studio.

Di sisi grafis, Gaijin Entertainment membagikan pelajaran dari integrasi NVIDIA DLSS 5 dengan 3D-Guided Neural Rendering ke dalam Dagor Engine untuk game War Thunder. Tim Gaijin menjelaskan bahwa mereka menyesuaikan jalur color management agar hasil DLSS 5 bisa dievaluasi di ruang warna sRGB sebelum proses pasca-produksi, lalu dipetakan kembali ke linear HDR. Hasilnya, menurut Gaijin, adalah peningkatan highlight dan bayangan serta detail mikro yang sebelumnya sulit dicapai, sembari tetap mempertahankan tanda-tanda khas pada kendaraan, keausan permukaan, dan sifat material yang menjadi ciri visual game tersebut.

NVIDIA juga memperbarui In-Game Inferencing SDK ke versi 1.8, yaitu perangkat yang membantu pengembang menjalankan model AI NVIDIA ACE secara lokal di PC. Pembaruan mencakup dukungan yang lebih kuat untuk platform RTX Spark, versi terbaru llama.cpp dan whisper.cpp, penambahan model pengenalan suara Parakeet melalui whisper.cpp, serta integrasi API prioritas Vulkan. Dengan fondasi ini, studio bisa merakit karakter dalam game yang lebih interaktif tanpa harus mengirim data ke server.

Untuk pencahayaan, RTX Dynamic Illumination 3.2 memperkenalkan teknik sampling baru untuk ReSTIR DI, fitur fallback, visualisasi reservoir yang lebih baik, dan dukungan RTX Spark. RTX Path Tracing 1.9 hadir dengan contoh bertahap sembilan langkah yang memadukan ReSTIR DI, SHaRC radiance caching, dan DLSS Ray Reconstruction, sehingga studio bisa mempelajari integrasi secara progresif. Terakhir, NVIDIA merilis Real-Time BVH Viewer 1.0, jendela terpisah untuk melihat struktur akselerasi ray-tracing secara langsung pada aplikasi D3D12 dan Vulkan, lengkap dengan mode visualisasi seperti ID primitif, peta panas waktu trace, dan filter geometri.

Secara umum, guided animation framework adalah pendekatan di mana animator memberi batasan berupa teks, jalur, atau pose, lalu model AI menghasilkan gerakan yang konsisten dengan batasan tersebut. Spline path adalah kurva di ruang 3D yang dipakai untuk menentukan rute pergerakan karakter, sedangkan reservoir dalam konteks ReSTIR DI merujuk pada kumpulan sampel cahaya yang disimpan sementara untuk dipilih ulang secara efisien. NVIDIA juga menyertakan catatan bahwa konten di halaman sumber dihasilkan dengan bantuan AI dan dapat merangkum informasi secara tidak lengkap, sehingga detail teknis penting tetap perlu diverifikasi langsung ke dokumentasi resmi.
