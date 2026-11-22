---
title: "AWS Hadirkan Ekstensi Terkelola untuk SageMaker HyperPod Slurm, Sasar Tim Platform AI"
summary: "Amazon SageMaker HyperPod kini menawarkan ekstensi terkelola untuk observabilitas dan manajemen pengguna di klaster Slurm, memungkinkan konfigurasi perangkat lunak pada node dilakukan lewat API dan konsol secara deklaratif."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/introducing-managed-cluster-extensions-for-observability-and-user-management-in-amazon-sagemaker-hyperpod-slurm/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-20T23:07:03.000Z
draft: false
sourceTitle: "Introducing managed cluster extensions for observability and user management in Amazon SageMaker HyperPod Slurm"
categories: ["Produk Baru"]
---

Amazon Web Services (AWS) memperkenalkan fitur managed cluster extensions untuk observabilitas dan user management di Amazon SageMaker HyperPod dengan scheduler Slurm. Berdasarkan rilis resmi AWS (20/11), fitur ini memungkinkan tim platform mengelola perangkat lunak dan pengaturan pada node yang sedang berjalan melalui API atau konsol SageMaker AI, tanpa harus lagi mengandalkan skrip lifecycle yang dijalankan manual setiap kali ada perubahan.

Selama ini, konfigurasi sebuah klaster Slurm bersama untuk pengembangan model fondasi tersebar di banyak berkas: bentuk klaster di beberapa file konfigurasi, perangkat lunak di skrip kustom, topologi jaringan di file yang harus diedit saat node berubah, dan daftar pengguna yang harus dipelihara administrator. AWS menyebut kondisi ini membuat konfigurasi lambat laun melenceng dari kondisi node yang sebenarnya berjalan, tanpa ada mekanisme yang memberi tahu kapan hal itu terjadi. Dengan ekstensi baru, AWS ingin pendekatan pengelolaan klaster Slurm mengikuti cara pengelolaan infrastruktur AWS lainnya: deklaratif, tervalidasi sebelum diterapkan, dan dipantau keberhasilannya.

Ekstensi terkelola yang tersedia saat ini mencakup observabilitas dan manajemen pengguna, termasuk integrasi direktori. Ekstensi observabilitas (sagemaker-observability) mengumpulkan metrik node, GPU, Elastic Fabric Adapter, serta data Slurm melalui Prometheus, lalu mengirimkannya ke Amazon Managed Service for Prometheus atau Amazon CloudWatch. Ekstensi manajemen pengguna (sagemaker-user-management) menangani pembuatan akun, grup, dan direktori rumah dari sumber identitas eksternal seperti Active Directory, Okta, atau LDAP. AWS menyatakan kedua ekstensi divalidasi terhadap skema saat dikirimkan, diterapkan konsisten ke setiap node (termasuk node baru hasil scale-up atau penggantian), dan melaporkan status serta kesehatannya per node.

AWS menekankan bahwa pengguna tetap memiliki akses penuh ke setiap node, termasuk controller node, sehingga tim bisa menyeimbangkan antara kontrol langsung dan pengelolaan lewat API. Ekstensi direkomendasikan untuk kemampuan perangkat lunak yang sudah disediakan AWS, sementara skrip kustom dan AMI tetap digunakan untuk perangkat lunak spesifik organisasi yang belum tercakup.

Secara umum, Slurm adalah penjadwal kerja (workload manager) populer untuk klaster komputasi berperforma tinggi yang banyak dipakai dalam pelatihan model AI. SageMaker HyperPod sendiri merupakan layanan AWS yang dirancang untuk mempercepat pelatihan model fondasi dengan infrastruktur yang sudah dikonfigurasi untuk kebutuhan tersebut. Pendekatan deklaratif lewat API dan konsol pada dasarnya memindahkan pengelolaan perangkat lunak klaster dari praktik berbasis skrip manual menuju praktik yang lebih mirip dengan pengelolaan infrastruktur cloud pada umumnya.
