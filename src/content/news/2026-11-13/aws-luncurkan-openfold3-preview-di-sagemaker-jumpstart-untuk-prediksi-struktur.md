---
title: "AWS Luncurkan OpenFold3-preview di SageMaker JumpStart untuk Prediksi Struktur Biomolekul"
summary: "OpenFold3-preview kini tersedia di Amazon SageMaker JumpStart untuk memprediksi struktur 3D protein, DNA, RNA, dan kompleksnya. AWS menyediakan inferensi asinkron, paralelisme multi-GPU, serta opsi penskalaan endpoint hingga nol saat tidak digunakan."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/openfold3-on-amazon-sagemaker-jumpstart-predict-biomolecular-structures/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-13T21:53:40.000Z
draft: false
sourceTitle: "OpenFold3 on Amazon SageMaker JumpStart: Predict biomolecular structures"
categories: ["Standar Umum"]
---

Amazon Web Services (AWS) (_13/11)_qtt dapat that'll\ launching OpenFold3-preview di Amazon SageMaker JumpStart, layanan yang menyediakan model AI siap pakai. Berdasarkan rilis resmi AWS (13/11), peneliti dan tim farmasi dapat menjalankan prediksi struktur 3D protein, DNA, RNA, ligan molekul kecil, serta kompleks yang dibentuknya di akun AWS mereka sendiri.

OpenFold3 dikembangkan oleh OpenFold Consortium dan AlQuraishi Lab di Columbia University. Model ini memprediksi struktur gabungan beberapa molekul dari urutan asam amino atau nukleotida yang dimasukkan. Berbeda dengan model yang hanya menangani satu rantai protein, OpenFold3 dapat memproses kompleks multi-rantai, gabungan protein dengan asam nukleat, serta protein bersama ligan dalam satu prediksi.

Pengguna dapat memasukkan deretan protein, DNA, dan RNA, serta ligan kecil dalam format SMILES. Hasilnya berupa struktur dalam format mmCIF yang dilengkapi metrik keyakinan, termasuk pLDDT, PAE, dan PDE. Metrik ini membantu pengguna menilai seberapa yakin model terhadap bagian-bagian prediksi strukturnya.

Tim yang bekerja dengan penemuan obat dapat memakai OpenFold3 untuk mengidentifikasi target, merancang antibodi dan protein, menyaring kandidat molekul secara virtual, serta menguji banyak varian dalam satu antrean. Untuk protein dan ligan yang diproses bersamaan, model ini dapat menghasilkan hipotesis posisi ikatan yang kemudian menjadi dasar eksperimen berikutnya.

OpenFold3 sendiri menggunakan inferensi asinkron, yaitu model yang tidak harus langsung mengembalikan jawaban. Permintaan pengguna diunggah ke Amazon S3, lalu diproses pada endpoint terkelola Amazon SageMaker AI. Hasil atau pesan kesalahan ditulis kembali ke lokasi S3 yang ditentukan, sementara pengguna dapat memantau antrean atau menerima pemberitahuan melalui Amazon Simple Notification Service. Satu permintaan dapat diproses hingga satu jam.

Mekanisme ini dipilih karena prediksi struktur pada protein dan kompleks nyata sering memerlukan waktu beberapa menit. Endpoint asinkron dapat menampung lonjakan permintaan tanpa perlu membangun sistem antrean sendiri, menjalankan beberapa prediksi secara paralel pada instans multi-GPU, dan dikonfigurasi untuk skala hingga nol saat antrean kosong. Fitur terakhir membantu mengurangi biaya di antara percobaan.

Pengguna juga dapat menyediakan multiple sequence alignments atau MSA, yaitu susunan urutan yang menunjukkan kemiripan antarsekuens, untuk meningkatkan akurasi prediksi. Menurut AWS, penyediaan urutan tersebut dapat membantu menjaga data biologis tetap berada di dalam akun AWS karena endpoint berjalan dengan isolasi jaringan.

SageMaker JumpStart sendiri menyediakan akses terpadu ke model AI terkelola. Dalam rilis ini, OpenFold3 berjalan di dalam kontainer yang dikelola AWS, sementara checkpoint atau salinan bobot model serta lapisan layanan untuk menangani permintaan ditangani oleh platform tersebut. Bagi tim yang harusQUEUE banyak permintaan simultaneously, Pendinginan endpoint yang scaling ke nol berarti biaya hanya berjalan ketika ada pekerjaan yang perlu diproses.

Prasyarat penggunaan mencakup akun AWS dengan execution role untuk endpoint, akses SageMaker Studio atau notebook instance, SDK Python SageMaker versi 3, serta py3Dmol untuk melihat hasil. Instans default yang digunakan adalah ml.g6.4xlarge, dengan opsi ml.g6.2xlarge dan ml.g6.12xlarge.

Kode dan bobot model dirilis di bawah lisensi Apache 2.0, sementara data pelatihan serta metode penelitian dipublikasikan oleh pengembangnya. Institusi penelitian dan perusahaan farmasi dapat memeriksa, menyesuaikan, atau membangun model ini dengan tetap mengikuti ketentuan lisensi tersebut. OpenFold3-preview sendiri masih berstatus research preview.

Pengguna perlu memperhatikan biaya endpoint, yang ditagih per jam instans selama aktif, termasuk ketika tidak ada permintaan yang diproses. AWS karena itu menyediakan panduan agar pengguna dapat mengatur endpoint agar berhenti otomatis dan mengurangi tagihan yang tidak terduga.
