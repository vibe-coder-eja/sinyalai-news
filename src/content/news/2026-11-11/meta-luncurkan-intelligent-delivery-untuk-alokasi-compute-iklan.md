---
title: "Meta Luncurkan Intelligent Delivery untuk Alokasi Compute Iklan"
summary: "Intelligent Delivery adalah sistem berbasis machine learning Meta yang mengalokasikan daya komputasi ke permintaan iklan dengan dampak terbesar. Menurut Meta, sistem ini memberikan peningkatan sekitar 10% pada performa peringkat iklan sejak 2017."
company: "Meta"
source: "https://engineering.fb.com/2026/11/11/ml-applications/intelligent-delivery-serve-better-ads/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-11T17:00:38.000Z
draft: false
sourceTitle: "Intelligent Delivery: Making Every Unit of Compute Serve Better Ads"
categories: ["Produk Baru","Penerapan Industri"]
---

Meta (11/11)-mapping Intelligent Delivery, sistem berbasis machine learning yang mengalokasikan daya komputasi atau compute ke permintaan iklan dengan dampak terbesar. Tujuannya adalah memperoleh hasil terbaik dari seluruh sistem, bukan sekadar optimize setiap bagiannya secara terpisah.

Menurut Meta, sejak 2017 hingga semester pertama 2026, Intelligent Delivery menyumbang peningkatan sekitar 10% pada performa peringkat iklan di berbagai permukaan produk, di atas kemajuan model dan sistem yang telah berjalan. Bagi pengguna, perubahan ini bekerja di belakang layar: sistem menggunakan lebih banyak sumber daya pada permintaan yang paling memperoleh manfaat dari hitungan tambahan.

Sistem ini menjawab dua pertanyaan melalui machine learning: permintaan iklan mana yang paling mungkin memperoleh manfaat tambahan dari compute, dan bagaimana berbagai pengaturan sumber daya akan memengaruhi hasil serta kecepatan layanan. Untuk menjawab pertanyaan pertama, Meta membangun Resource Core Model, terdiri atas model deep learning dengan 6 miliar parameter sparse dan 20 juta parameter dense. Model ini berjalan sekali sebelum kandidat iklan diambil dan dipakai bersama di seluruh alur pengiriman iklan.

Resource Core Model kemudian disetel secara khusus menjadi sekumpulan model yang memperkirakan dampak tambahan compute terhadap hasil, konsumsi sumber daya, dan latensi atau waktu tunda respons. Pada tolok ukur offline untuk permukaan produk utama, pendekatan ini mencapai sekitar 20% perbaikan dalam mengidentifikasi permintaan iklan dengan dampak paling tinggi dibandingkan model produksi sebelumnya, klaim Meta.

Arsitektur ini dirancang karena dampak compute sangat bergantung pada konteks. Permintaan yang sama dapat memperoleh manfaat berbeda tergantung pada permukaan aplikasi, niat pengguna, kualitas kandidat iklan, dan kondisi sistem. Selain itu, keputusan terbaik terus berubah ketika model, perangkat keras, atau arsitektur diperbarui. Karena itu, Meta juga mengembangkan mekanisme yang memindahkan sumber daya lintas lapisan sistem serta mulai menggunakan agentic AI untuk mendeteksi dan merespons perubahan secara berkelanjutan.

Secara umum, agentic AI merujuk pada sistem AI yang dapat mengubah tujuan menjadi langkah-langkah, menggunakan alat, dan melakukan tindakan secara mandiri. Dalam konteks Intelligent Delivery, perannya membantu sistem otomatis mencari kembali keputusan alokasi sumber daya yang paling sesuai ketika kondisi produksi berubah.
