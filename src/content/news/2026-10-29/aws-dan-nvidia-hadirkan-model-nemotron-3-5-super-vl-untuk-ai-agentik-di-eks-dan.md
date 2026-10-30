---
title: "AWS dan NVIDIA Hadirkan Model Nemotron 3.5 Super VL untuk AI Agentik di EKS dan SageMaker HyperPod"
summary: "AWS mengumumkan ketersediaan model NVIDIA Nemotron 3.5 Super VL di Amazon EKS dan SageMaker HyperPod EKS. Model 120 miliar parameter dengan arsitektur mixture-of-experts ini menggabungkan penalaran, penggunaan tool, dan pemahaman multimodal untuk mendukung aplikasi AI agentik."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/accelerate-agentic-ai-with-nvidia-nemotron-models-on-amazon-eks-and-sagemaker-hyperpod-eks/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-29T16:11:08.000Z
draft: false
sourceTitle: "Accelerate agentic AI with NVIDIA Nemotron models on Amazon EKS and SageMaker HyperPod EKS"
categories: ["Rilis Model","Fitur & Skills","Penerapan Industri"]
---

AWS (29/10) mengumumkan ketersediaan model NVIDIA Nemotron 3.5 Super VL di layanan Amazon Elastic Kubernetes Service (EKS) dan SageMaker HyperPod EKS. Model ini dirancang untuk mempercepat pengembangan AI agentik, yaitu sistem yang tidak hanya menjawab pertanyaan, tetapi juga mampu menggunakan tool, membaca dokumen, dan menjalankan alur kerja secara otonom.

Nemotron 3.5 Super VL adalah model multimodal dengan 120 miliar parameter yang menggunakan arsitektur mixture-of-experts (MoE), di mana hanya 12 miliar parameter yang aktif untuk setiap token yang diproses. Pendekatan ini memungkinkan kapasitas penalaran besar dengan biaya komputasi yang lebih efisien per permintaan. Model ini dapat menerima masukan berupa teks, gambar, dokumen, dan video, sehingga satu model dapat menangani berbagai jenis tugas visual dan tekstual sekaligus.

Model ini mendukung berbagai kasus penggunaan yang menggabungkan penalaran dengan pemahaman visual, antara lain pembuatan dan validasi kode, riset web dengan verifikasi sumber, analisis tabel serta grafik pada dokumen, identifikasi kerentanan keamanan siber, dan pencarian serta peninjauan konten video. Nemotron 3.5 Super VL juga dapat diintegrasikan dengan framework agen terbuka melalui NVIDIA Agent Toolkit dan referensi implementasi dari NVIDIA.

Dari sisi performa, NVIDIA melaporkan skor 63,44 persen pada benchmark Hermes, 87,05 persen pada evaluasi agen LangChain, dan 80,8 persen pada benchmark penalaran grafik CharXiv. AWS menyediakan panduan penerapan di repositori aws-do-eks, yang mencakup pembuatan klaster, pengunduhan bobot model, pengujian, benchmarking, dan pembersihan sumber daya. Arsitektur ini telah divalidasi pada instance p6-b200.48xlarge dengan delapan GPU NVIDIA B200 dan p5en.48xlarge dengan delapan GPU NVIDIA H200.

Secara umum, arsitektur MoE bekerja dengan cara mengaktifkan hanya sebagian kecil dari total parameter untuk setiap permintaan, sehingga model besar dapat berjalan dengan biaya komputasi yang sebanding dengan model yang jauh lebih kecil. Istilah AI agentik merujuk pada sistem yang mampu mengambil keputusan dan menjalankan tindakan secara mandiri melalui penggunaan tool atau API, bukan sekadar menghasilkan teks sebagai respons. Kombinasi keduanya memungkinkan satu model menangani alur kerja yang sebelumnya membutuhkan beberapa model terpisah.
