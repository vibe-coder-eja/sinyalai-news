---
title: "Moonshot AI Rilis Kimi K3.1 Pro, Model Open-Weight dengan Jendela Konteks Satu Juta Token"
summary: "Moonshot AI memperkenalkan Kimi K3.1 Pro, model open-weight kelas 3T pertama mereka dengan jendela konteks satu juta token. Model ini diklaim membawa peningkatan pada kemampuan coding, pembuatan 3D, riset keuangan, dan tugas agentik, serta tersedia lewat Kimi.ai, Kimi Work, Kimi Code, dan API."
company: "Moonshot AI"
source: "https://www.kimi.ai/blog/kimi-k3-1-pro"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-24T00:00:00.000Z
draft: false
sourceTitle: "Kimi K3.1 Pro"
categories: ["Standar Umum"]
---

Moonshot AI resmi memperkenalkan Kimi K3.1 Pro, model pertama dari seri K3.1 sekaligus model open-weight kelas 3T paling mumpuni yang mereka rilis sejauh ini, dengan jendela konteks satu juta token. Berdasarkan rilis resmi Moonshot AI (24/10), K3.1 Pro merupakan versi pasca-pelatihan dari Kimi K3 dengan komputasi pasca-pelatihan yang jauh lebih besar, dan dirancang untuk memberikan peningkatan pada kemampuan coding, pembuatan 3D, riset keuangan, serta berbagai kemampuan agentik.

Bersamaan dengan itu, Moonshot AI juga merilis Kimi K3.1 Pro Highspeed, varian yang diklaim 2 sampai 3 kali lebih cepat dari K3.1 Pro untuk interaksi yang lebih responsif. Kedua model sudah tersedia di Kimi.ai, Kimi Work, Kimi Code, dan Kimi API, sementara bobot model secara penuh akan dibuka paling lambat 4 November.

Untuk mendukung reinforcement learning (RL) skala besar di ratusan domain, perusahaan mengoptimalkan seluruh lapisan teknologinya, mulai dari kerangka RL, inferensi konteks panjang, efisiensi pelatihan, infrastruktur sandbox, penjadwalan rollout, hingga platform bersama untuk pemeriksaan kualitas lingkungan. Hasilnya, menurut Moonshot AI, setiap tambahan komputasi RL menghasilkan peningkatan yang stabil dan dapat diprediksi di berbagai domain.

Pada benchmark coding, K3.1 Pro diklaim menyamai atau mendekati model proprietary terkuat. Di Terminal-Bench 4.0, yang menguji agen coding pada tugas terminal realistis dengan sumber daya terbatas, model ini meraih skor 65,7%, di atas GPT-6 Astra (58,2%) dan tipis di bawah Claude Opus 5.5 (66,4%). Pada benchmark internal Kimi Code Bench 3.0 Long-horizon yang menguji eksekusi multi-langkah, penggunaan alat, dan penyelesaian masalah secara menyeluruh, K3.1 Pro mencapai 61,2%, naik dari 55,95% pada K3.

Kemampuan coding jangka panjang K3.1 Pro juga diperkuat lewat RL berskala besar. Dalam salah satu uji internal, model ini membangun simulator dinamika berjalan manusia lengkap dengan pipeline pelatihan dan evaluasi di atas human-atlas, model anatomi terbuka berisi 296 komponen tulang dan 402 komponen otot. Dari 167 misi dan 420 tinjauan independen, model menganalisis hasil, mendiagnosis masalah, dan memperbaiki pengontrol berjalan secara berulang hingga manusia simulasi mampu berjalan dengan langkah bergantian selama 11,2 detik. Ketika pembentukan reward gagal memperbaiki gerakan lengan, K3.1 Pro tidak hanya menyesuaikan reward, melainkan menjalankan probe open-loop pada dinamika simulator, mengidentifikasi dan memperbaiki 36 kesalahan pada perhitungan moment-arm otot bahu, lalu melatih ulang pengontrolnya.

Di bidang pembuatan 3D dan penalaran spasial, K3.1 Pro meraih skor 92,7% dengan bantuan alat pada BenchCAD, yang menguji rekonstruksi 3D dari render multi-tampilan lewat generasi kode CAD. Skor ini mendekati Claude Opus 5.5 (96,2%) dan GPT-6 Astra (95,9%). Dari brief teks, sketsa, atau gambar referensi, model dapat menurunkan bentuk, proporsi, dan hubungan spasial untuk menghasilkan model 3D yang siap pakai, serta memahami pustaka aset dan koleksi model yang sudah ada. Fitur 3D Make kini sudah aktif di kimi.ai dan aplikasi Kimi, memungkinkan pengguna meninjau dan mengedit model 3D secara daring, mengunduhnya untuk pencetakan 3D, atau mengekspor sebagai video maupun Live Photos.

Untuk alur kerja keuangan, K3.1 Pro meraih hasil state-of-the-art pada OfficeQA Pro v2 dengan skor 64,4, yang menguji analisis data fiskal kompleks dari dokumen keuangan asli melalui retrieval, verifikasi lintas dokumen, dan penalasan numerik multi-langkah. Dibandingkan K3, model ini naik 7,2 poin pada Financial Modeling, 11,6 poin pada Financial Research, dan sekitar 4,2 kali lebih baik pada Business Operation yang menguji pengambilan keputusan manajerial jangka panjang di lingkungan bisnis simulasi. Pada Kimi Hallu Bench Hard, benchmark internal untuk menguji akurasi faktual, tingkat halusinasi tingkat klaim turun dari 23,4% pada K3 menjadi 8,3%, dengan proporsi respons yang mengandung setidaknya satu kesalahan faktual hanya 42,4% dari pendahulunya.

Secara umum, jendela konteks adalah jumlah teks yang dapat diproses model sekaligus dalam satu percakapan, sehingga ukuran satu juta token memungkinkan model menangani dokumen panjang atau basis kode besar tanpa memecahnya. Istilah open-weight berarti bobot model akan dipublikasikan sehingga pihak lain dapat menjalankan dan menyesuaikan model secara mandiri, berbeda dengan model proprietary yang bobotnya tertutup.
