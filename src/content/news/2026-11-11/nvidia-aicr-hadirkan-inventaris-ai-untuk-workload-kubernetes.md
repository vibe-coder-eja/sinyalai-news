---
title: "NVIDIA AICR Hadirkan Inventaris AI untuk Workload Kubernetes"
summary: "NVIDIA (11/11) mengintegrasikan AIBOM berbasis k8s-aibom ke NVIDIA AI Cluster Runtime untuk mencatat model, runtime inferensi, image, dan perubahan dependensi pada workload AI yang berjalan di Kubernetes, dengan cakupan terbatas pada jenis workload yang didukung."
company: "NVIDIA"
source: "https://developer.nvidia.com/blog/validating-gpu-platforms-with-runtime-ai-inventory-via-the-nvidia-dsx-ai-factory/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-11T17:00:00.000Z
draft: false
sourceTitle: "Validating GPU Platforms with Runtime AI Inventory via the NVIDIA DSX AI Factory"
categories: ["Penerapan Industri"]
---

Dalam rilis resmi NVIDIA (11/11), NVIDIA AI Cluster Runtime (AICR), komponen modular sumber terbuka dari NVIDIA DSX AI Factory Platform, kini menambahkan inventaris material AI atau AIBOM berbasis k8s-aibom, proyek sumber terbuka milik Google. Integrasi ini menggabungkan dua lapisan: AICR membuat resep GPU dengan versi komponen yang terkunci dan bundel deployment yang dapat direproduksi, sedangkan k8s-aibom mencatat beban kerja AI yang benar-benar berjalan di Kubernetes.

Bayangkan sebuah tim TI yang telah menyetujui konfigurasi klaster, sementara tim aplikasi kemudian memasang model inferensi baru. Resep AICR merekam konfigurasi yang diharapkan untuk kombinasi perangkat keras, lingkungan cloud, sistem operasi, dan tujuan penggunaan, termasuk driver, operator, kernel, urutan penerapan, serta versi tiap komponen. Bundel yang dihasilkan memuat checksum, sedangkan penandatanganan bersifat opsional. Namun, tag image kontainer yang dapat berubah seperti `:latest` membuat dua node dapat menjalankan kode berbeda dengan nama yang sama. Image yang ditarik pada minggu berikutnya juga bisa berada di luar pemeriksaan keamanan sebelumnya.

Di sisi runtime, k8s-aibom mengamati API beban kerja dan pod Kubernetes. Untuk jenis workload yang didukung, proyek ini membuat catatan AIBOM CycloneDX 1.6 yang memuat tingkat keyakinan dan penunjuk bukti, kemudian menggabungkan workload anak ke dalam AIBOM workload induknya. Namespace tertentu dapat diaktifkan untuk pelaporan. Sistem juga mengklasifikasikan kategori beban kerja dan runtime penyajian, termasuk deployment inferensi vLLM, berikut detail model dan image kontainer. Cakupannya mencakup native Dynamo graph, NIMService, LeaderWorkerSet, DisaggregatedSet, dan CronJob.

Dua resep bawaan, yaitu `h100-gke-cos-inference` dan `h100-gke-cos-inference-dynamo`, sudah memilih k8s-aibom secara default. Resep GKE lain dapat mengaktifkannya menggunakan `--runtime-inventory`, sedangkan resep yang memilih komponen tersebut dapat menonaktifkannya kembali. Dalam AICR v1.2.0, versi k8s-aibom dikunci pada 1.6.2. Menurut hasil validasi yang dilaporkan NVIDIA, konfigurasi ini mencatat sekitar empat permintaan per menit ke API server, memakai CPU rata-rata 2,2 millicore, serta menggunakan working set memori controller sebesar 28-34 MiB dalam kondisi steady-state. Angka tersebut berlaku untuk klaster GKE dengan Kubernetes 1.32 atau lebih baru dan node H100 yang digunakan dalam pengujian.

Qualifikasi yang dilaporkan NVIDIA mencakup pengikatan sumber hulu, chart Kubernetes, CRD, dan image controller berbasis digest sebagai satu set yang diuji. Perusahaan juga memeriksa provenance terhadap identitas build yang diharapkan Google, meninjau RBAC dan setelan keamanan, lalu menguji pemasangan, peningkatan versi, kesehatan, serta penghapusan.

Secara umum, AICR bekerja pada lapisan konfigurasi dan deployment, sedangkan k8s-aibom bekerja setelah beban kerja berjalan. Bagi administrator platform, AIBOM membantu menemukan workload AI yang belum terdaftar, melacak model, runtime, agen, komponen RAG, API AI eksternal, dan basis data vektor, serta melihat perubahan dependensi. Informasi tersebut dapat digunakan sebagai bahan tinjauan keamanan, respons insiden, dan audit kepatuhan. Cakupannya tetap terbatas pada jenis workload yang didukung dan memiliki sinyal AI yang dikenali, sehingga pilihan namespace serta cakupan workload perlu diperhatikan saat hasilnya digunakan.
