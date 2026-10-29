---
title: "AWS Rilis Kontainer Ray Train untuk Latih Model Besar di EKS dengan EFA"
summary: "AWS (28/10) memublikasikan panduan dan contoh kode untuk menjalankan pelatihan model terdistribusi di Amazon EKS memakai Ray Train Deep Learning Container, yang sudah memaketkan CUDA, NCCL, dan EFA sehingga tim tidak perlu membangun image sendiri."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/distributed-training-with-ray-train-dlcs-and-efa-on-eks/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-28T18:19:54.000Z
draft: false
sourceTitle: "Distributed training with Ray Train DLCs and EFA on EKS"
categories: ["Standar Umum"]
---

AWS (28/10) memublikasikan panduan dan contoh kode untuk menjalankan pelatihan model besar secara terdistribusi di Amazon EKS, menggunakan Ray Train Deep Learning Container (DLC) yang sudah memaketkan seluruh tumpukan CUDA, NCCL, dan Elastic Fabric Adapter (EFA). Lewat panduan ini, tim machine learning bisa langsung melatih model tanpa harus merakit image Docker sendiri, yang biasanya menjadi pekerjaan paling merepotkan sebelum kode model ditulis.

Dalam contoh yang dibagikan, AWS mendemonstrasikan cara melakukan fine-tuning model Qwen2.5-1.5B dengan PyTorch Fully Sharded Data Parallel (FSDP) di delapan GPU NVIDIA L4 yang tersebar pada dua instans g6.12xlarge. Klaster dibangun dari satu manifes RayCluster di atas Amazon EKS, dengan operator KubeRay yang membuat pod untuk Ray head dan Ray worker secara otomatis. Begitu pod meminta EFA, komunikasi antar-node langsung melewati jaringan EFA tanpa konfigurasi tambahan.

Yang membuat DLC ini berbeda adalah pendekatannya yang menggabungkan semua komponen yang biasanya harus dipasang terpisah: CUDA, cuDNN, NCCL, libfabric, aws-ofi-nccl, hingga DeepSpeed dan flash-attn. AWS menguji setiap rilis pada skenario multi-node EFA dan KubeRay, sehingga tim tidak perlu lagi menghadapi masalah klasik di mana NCCL diam-diam jatuh ke TCP biasa dan pelatihan berjalan jauh lebih lambat dari seharusnya. Image yang sama dipakai untuk Ray head maupun worker, peran ditentukan saat container dijalankan, sehingga satu tag cukup untuk semua pod.

Beberapa hal teknis yang diatur lewat variabel lingkungan, bukan lewat image: NCCL_NET_PLUGIN untuk memilih transport, FI_PROVIDER=efa sebagai default, NCCL_SOCKET_IFNAME yang diarahkan ke antarmuka eth0 pod di EKS, serta NCCL_DEBUG untuk kebutuhan penelusuran. Paket Python tambahan yang dibutuhkan eksperimen tertentu dipasang saat job dikirim lewat runtime_env, tanpa membangun image baru. Konfigurasi seperti tipe instans, jumlah node, GPU per node, model, langkah pelatihan, dan ukuran batch semuanya ditentukan dari luar image lewat manifes dan variabel.

Secara umum, Ray adalah framework open source untuk menjalankan komputasi terdistribusi, di mana satu node berperan sebagai koordinator (head) dan node lain sebagai pekerja (worker). EFA adalah antarmuka jaringan AWS yang dirancang untuk komunikasi GPU-ke-GPU antar-instans dengan latensi rendah, penting saat model harus membagi data dan gradien secara paralel. FSDP adalah strategi PyTorch yang membagi parameter model ke seluruh GPU agar muat di memori dan pelatihan bisa berjalan lebih cepat. Dengan paket yang sudah disesuaikan di dalam DLC, tim bisa fokus pada kode model dan data, bukan pada plumbing infrastruktur yang biasanya memakan waktu berminggu-minggu.
