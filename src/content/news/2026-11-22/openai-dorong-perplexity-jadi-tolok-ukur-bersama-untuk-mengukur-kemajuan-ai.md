---
title: "OpenAI Dorong Perplexity Jadi Tolok Ukur Bersama untuk Mengukur Kemajuan AI"
summary: "Chief Scientist OpenAI, Jakub Pachocki, mengusulkan perplexity sebagai metrik bersama lintas industri untuk menilai kemampuan model. Ia juga mengungkap data internal pretraining OpenAI dari GPT-3.5 hingga model terbaru."
company: "OpenAI"
source: "https://openai.com/index/perplexity-and-intelligence"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-22T00:00:00.000Z
draft: false
sourceTitle: "Perplexity and Intelligence"
categories: ["Fitur & Skills"]
---

Chief Scientist OpenAI Jakub Pachocki (22/11) menulis esai yang mengusulkan perplexity—sebuah metrik sederhana yang mengukur seberapa baik model memprediksi token berikutnya—sebagai tolok ukur bersama bagi industri AI. Dalam tulisannya di blog OpenAI, Pachocki menilai metrik ini bisa menjadi dasar ilmiah bersama untuk memantau kemajuan dan merancang standar keamanan lintas perusahaan.

Pachocki memaparkan bahwa cara OpenAI mengukur "substrat kecerdasan" utama model sudah lama tidak berubah: mereka memantau perplexity pada held-out dataset, yaitu potongan data yang sengaja disimpan terpisah dari data latihan agar pengujian lebih objektif. Angka perplexity yang lebih rendah berarti model lebih baik menebak kelanjutan teks. Grafik yang dibuka tulisan itu menunjukkan tren perplexity OpenAI dari GPT-3.5 hingga model terkini, dengan log-perplexity GPT-3.5 sekitar 0,99 dan GPT-4 sekitar 0,91. Model-model terbaru OpenAI kini sudah menembus angka di bawah 0,8.

Menurut Pachocki, penurunan perplexity berkorelasi dengan kemunculan kemampuan yang sebelumnya tidak terduga. GPT-2 dengan perplexity rendah di dataset lama mampu menulis paragraf yang koheren; GPT-3 memperkenalkan pembelajaran dalam konteks, yaitu kemampuan model memahami tugas hanya dari beberapa contoh tanpa dilatih ulang; GPT-3.5 menjadi dasar ChatGPT; dan GPT-4 membuka kemampuan chain-of-thought reasoning, yaitu teknik meminta model berpikir langkah demi langkah. Saat log-perplexity turun ke kisaran 0,76, Pachocki menyebut model mulai menghasilkan terobosan di bidang matematika—pengalaman yang ia gambarkan sebagai sesuatu yang "sangat surreal" bagi para peneliti matematika di OpenAI.

Pachocki juga menyoroti potensi perubahan besar dari kontribusi AI terhadap riset algoritmik pretraining, yaitu tahap awal pelatihan model pada data mentah dalam jumlah besar. Ia memperkirakan, jika tren terkini berlanjut, kemampuan transformatif baru bisa muncul saat log-perplexity memasuki kisaran 0,68–0,7. Ia bahkan menyebut kemungkinan "longsoran" kemajuan fundamental dalam riset pretraining bisa terjadi pada 2027, seiring AI semakin terlibat dalam pengembangan dirinya sendiri.

Pachocki mengakui penerbitan data perplexity internal memberi gambaran posisi OpenAI kepada pesaing, tetapi menilai langkah ini perlu diambil demi membangun ukuran bersama. Ia berharap metrik ini bisa dipakai untuk mengukur kecerdasan umum secara konsisten, terlepas dari seberapa otomatis proses pengembangan AI di tiap perusahaan.

Secara umum, perplexity adalah ukuran seberapa "terkejut" sebuah model saat menebak kata berikutnya dalam sebuah teks; semakin rendah nilainya, semakin baik model memahami pola bahasa. Istilah pretraining merujuk pada pelatihan awal model pada data mentah dalam jumlah besar sebelum disesuaikan untuk tugas tertentu lewat fine-tuning, yaitu pelatihan tambahan pada data yang lebih spesifik, atau reinforcement learning, yaitu metode belajar lewat umpan balik atas keputusan yang diambil model. Gagasan Pachocki pada dasarnya mengajak industri AI berhenti hanya mengandalkan benchmark aplikasi yang cepat usang, dan mulai berbagi satu angka sederhana yang merepresentasikan kemampuan dasar model.
