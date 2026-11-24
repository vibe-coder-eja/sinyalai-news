---
title: "Google Research perkenalkan DeepCrossAttention, percepat pelatihan transformer hingga tiga kali lipat"
summary: "Google Research (23/11) memperkenalkan DeepCrossAttention (DCA), arsitektur baru yang menggantikan residual connection pada transformer dengan mekanisme perhatian lintas-lapisan. Menurut perusahaan, pendekatan ini memungkinkan model mencapai kualitas setara hingga tiga kali lebih cepat dengan penambahan parameter yang nyaris tak terasa."
company: "Google"
source: "https://research.google/blog/supercharging-transformer-residual-connections/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-23T17:21:12.000Z
draft: false
sourceTitle: "Supercharging transformer residual connections"
categories: ["Standar Umum"]
---

Google Research (23/11) memperkenalkan DeepCrossAttention (DCA), arsitektur baru yang dirancang untuk memperbaiki cara transformer menggabungkan informasi dari lapisan-lapisan sebelumnya. Dalam makalah yang dipresentasikan di ICML 2025, tim Google Research menyebut DCA memungkinkan model mencapai kualitas yang sama hingga tiga kali lebih cepat, dengan penambahan parameter yang nyaris tak terasa.

Transformer modern biasanya mengandalkan residual connection, atau skip connection, yaitu jalur pintas yang menambahkan salinan data asli langsung ke keluaran sebuah lapisan. Tujuannya agar sinyal pembelajaran tidak hilang di tengah jaringan yang sangat dalam. Namun, Google Research menilai pendekatan ini punya kelemahan mendasar: semua lapisan diperlakukan sama rata, sehingga detail penting dari lapisan awal bisa tergerus atau hilang ketika informasi mengalir melewati puluhan hingga ratusan lapisan. Akibatnya, jaringan harus menghitung ulang informasi yang sebenarnya sudah tersedia.

DCA menjawab masalah itu dengan mengubah residual connection dari sekadar penjumlahan statis menjadi sistem pemilihan dinamis. Alih-alih menambahkan seluruh keluaran lapisan sebelumnya dengan bobot yang sama, DCA memperkenalkan modul ringan di setiap lapisan yang memutuskan, untuk setiap token atau potongan teks, lapisan mana yang paling relevan dan bagaimana menggabungkannya. Dengan begitu, model bisa menarik kembali detail beresolusi tinggi dari lapisan yang lebih awal saat dibutuhkan.

Secara teknis, DCA bekerja lewat dua mekanisme utama. Pertama, dynamic layer routing, yaitu pembobotan adaptif yang memungkinkan struktur pemrosesan berubah dari sepenuhnya berurutan menjadi paralel, tergantung konteks token. Kedua, depth-wise cross-attention, yaitu mekanisme perhatian yang diterapkan bukan antar-token dalam satu urutan, melainkan antar-lapisan secara vertikal. Setiap token dapat "bertanya" ke campuran tertimbang dari seluruh lapisan sebelumnya, sehingga model memiliki akses ke konteks historis penuh tanpa penalti komputasi besar seperti pada perhatian tradisional.

Dalam pengujian pada benchmark pemodelan bahasa berskala besar, yaitu C4 dan LM1B, DCA mencapai performa transformer standar dengan langkah pelatihan hingga lima kali lebih sedikit. Pada anggaran pelatihan yang sama, DCA secara konsisten menghasilkan perplexity lebih rendah, ukuran yang menunjukkan seberapa baik model memprediksi sampel teks. Untuk mencapai perplexity di bawah 14 pada LM1B, transformer standar dengan lebar tetap membutuhkan 42 lapisan, sedangkan model DCA mencapainya dengan 30 lapisan, atau sekitar 29% lebih sedikit. Google Research juga melaporkan pengurangan jumlah parameter hingga 30-40% untuk kualitas pembelajaran yang setara atau lebih baik.

Secara umum, residual connection adalah salah satu komponen paling fundamental dalam arsitektur transformer modern, yang menjadi tulang punggung banyak model bahasa besar saat ini. Ide bahwa setiap lapisan tidak harus memproses informasi dari nol, melainkan bisa merujuk kembali ke lapisan sebelumnya, sudah lama dikenal. DCA membawa konsep itu lebih jauh dengan menjadikan pemilihan lapisan mana yang dirujuk sebagai bagian yang bisa dipelajari sendiri oleh model, bukan aturan tetap yang sama untuk semua data.
