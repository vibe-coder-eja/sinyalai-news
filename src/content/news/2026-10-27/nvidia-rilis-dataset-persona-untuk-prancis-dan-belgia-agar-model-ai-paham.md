---
title: "NVIDIA Rilis Dataset Persona untuk Prancis dan Belgia agar Model AI Paham Aturan Lokal"
summary: "NVIDIA (27/10) memperkenalkan dataset Nemotron-Personas untuk Prancis dan Belgia, berisi profil penduduk sintetis yang dirancang untuk membantu model AI memahami bahasa, budaya, dan prosedur administrasi setempat."
company: "NVIDIA"
source: "https://developer.nvidia.com/blog/fine-tuning-nvidia-nemotron-to-know-local-rules-not-just-local-languages/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-27T16:00:00.000Z
draft: false
sourceTitle: "Fine-Tuning NVIDIA Nemotron to Know Local Rules, Not Just Local Languages"
categories: ["Rilis Model"]
---

NVIDIA (27/10) merilis dua dataset terbuka terbaru dalam program data Nemotron, yakni Nemotron-Personas-France dan Nemotron-Personas-Belgium, yang dirancang untuk membantu model AI memahami konteks lokal, bukan sekadar menerjemahkan bahasa. Dataset ini berisi profil penduduk sintetis yang dibangun berdasarkan data demografi, geografi, bahasa, dan budaya masing-masing negara, sehingga developer dapat menyesuaikan model bahasa terbuka untuk pasar tertentu.

Dalam unggahan di blog developer-nya, NVIDIA menjelaskan bahwa model bahasa serbaguna sering kali kurang memahami pengetahuan lokal dan nuansa budaya yang dibutuhkan aplikasi tertentu. Melalui proses fine-tuning atau pelatihan ulang dengan data yang tepat, model dapat ditingkatkan akurasinya sekaligus mendukung interaksi yang lebih aman. Pendekatan ini memberi negara dan industri kontrol lebih besar atas bagaimana agen AI mencerminkan prioritas lokal.

Dataset untuk Prancis dikembangkan bersama startup AI asal Prancis, Pleias, sedangkan versi Belgia dikerjakan bersama Pleias dan universitas KU Leuven. Keduanya merupakan bagian dari program data terbuka Nemotron yang mencakup dataset persona berbasis lokal untuk 12 negara. NVIDIA juga menyediakan alur kerja lengkap, mulai dari pembuatan data, pelatihan menggunakan teknik LoRA pada platform NeMo, hingga evaluasi terhadap model Nemotron 3.5 Lightning.

NVIDIA menggambarkan contoh kasus berupa pertanyaan warga Prancis yang tidak bisa datang langsung ke kantor paspor karena alasan kesehatan. Model dasar tanpa pelatihan ulang cenderung memberikan jawaban umum yang keliru, misalnya menyarankan pengiriman dokumen lewat pos, padahal prosedur resmi mengharuskan kunjungan petugas ke rumah pemohon. Setelah fine-tuning dengan dataset persona dan teks prosedur resmi, model dapat menjawab dengan lebih akurat, menyebutkan kebutuhan surat keterangan medis, opsi pengajuan daring melalui situs ANTS, hingga besaran biaya materai yang berbeda untuk wilayah seperti Guyana Prancis.

Secara umum, istilah fine-tuning merujuk pada proses melatih ulang model AI yang sudah ada dengan data tambahan agar kemampuannya lebih spesifik terhadap suatu topik atau wilayah. Pendekatan dengan persona sintetis memungkinkan developer menguji model terhadap beragam profil pengguna tanpa harus mengumpulkan data nyata dalam jumlah besar, yang sering kali terkendala regulasi privasi. NVIDIA juga menyediakan kalkulator sumber daya untuk memperkirakan kebutuhan GPU, waktu pelatihan, dan biaya yang diperlukan dalam menyesuaikan model Nemotron.
