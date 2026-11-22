---
title: "OpenAI perketat pertahanan terhadap distilasi adversarial untuk lindungi model frontier"
summary: "OpenAI (20/11) memaparkan pendekatan berlapis untuk mencegah pihak tak berwenang mengekstrak kemampuan model frontier lewat distilasi adversarial, termasuk penguatan perlindungan terhadap jejak penalaran internal pada GPT-6.2 Astra dan Sol."
company: "OpenAI"
source: "https://openai.com/index/combatting-adversarial-distillation"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-20T10:00:00.000Z
draft: false
sourceTitle: "Combatting adversarial distillation"
categories: ["Standar Umum"]
---

OpenAI (20/11) menjelaskan pendekatan berlapis yang digunakan untuk menghadapi praktik distilasi adversarial, yaitu upaya pihak tak berwenang melatih model tiruan dengan memanfaatkan keluaran model frontier tanpa izin. Dalam tulisan di blognya, perusahaan menekankan bahwa distilasi semacam ini dapat memindahkan kemampuan canggih ke model lain yang tidak memiliki pengaman (safeguards) serupa, sehingga kemampuan yang seharusnya dibatasi bisa digunakan di luar aturan.

Secara umum, distilasi adalah teknik pembelajaran mesin di mana satu model belajar dari data yang dihasilkan model lain, misalnya dari jawaban, penalaran, atau penilaian kualitas jawaban tersebut. Yang menjadi perhatian OpenAI adalah ketika proses itu dilakukan secara tidak sah dan bertujuan memindahkan kemampuan berisiko, seperti kemampuan siber ofensif atau pengetahuan biologi ganda guna, ke model yang pengamannya lebih lemah.

OpenAI menyebut empat lapis pertahanan yang digunakannya: pengujian adversarial, pelatihan model, penggunaan classifier, serta perlindungan di tingkat API yang dipadukan dengan investigasi terhadap upaya ekstraksi terkoordinasi. Lapis-lapis ini disejajarkan dengan pendekatan yang sudah dipakai untuk domain biologi dan keamanan siber. Perusahaan juga menekankan pentingnya melindungi apa yang disebut protected reasoning, yaitu langkah-langkah penalaran internal yang dihasilkan model saat mengerjakan suatu pertanyaan, termasuk chain-of-thought atau penalaran berantai. Jejak penalaran ini dinilai jauh lebih bernilai sebagai data latihan dibanding jawaban akhir, karena memuat informasi yang tidak muncul di respons final.

Pada pembaruan terbaru, OpenAI mengklaim telah memperkuat pertahanan terhadap pengambilan protected reasoning di GPT-6.2 Astra dan GPT-6.2 Sol. Dalam evaluasi internal menggunakan red-teaming otomatis, tingkat keberhasilan serangan untuk memulihkan protected reasoning turun dari 54,0% pada GPT-6 Astra dengan pengaman awal menjadi 0,2% pada GPT-6.2 Astra dengan pengaman terbaru. Angka ini merupakan klaim OpenAI berdasarkan pengujian internal mereka.

Perusahaan juga memaparkan hasil studi internal tentang bagaimana kemampuan siber berpindah lewat distilasi. Dalam eksperimen tersebut, model siswa yang dilatih menggunakan jejak penalaran lengkap dari model guru umumnya mengungguli model siswa yang hanya belajar dari ringkasan penalaran, baik setelah fine-tuning terawasi maupun setelah putaran ringan reinforcement learning. Temuan ini, menurut OpenAI, menunjukkan bahwa melindungi jejak penalaran dapat membatasi transfer kemampuan siber, bahkan ketika tugas aslinya termasuk yang diizinkan oleh kebijakan penggunaan.

Pertahanan OpenAI dijalankan di dua tingkat yang saling melengkapi. Di tingkat permintaan, perilaku model, pemeriksaan classifier, dan kontrol API membatasi pengambilan jejak penalaran. Di tingkat kampanye, pola pada sinyal permintaan dan akun dianalisis untuk mendeteksi upaya ekstraksi terkoordinasi. Temuan dari investigasi dan red-teaming otomatis kemudian dipakai kembali untuk melatih dan menguji pengaman yang ada.

Secara umum, istilah chain-of-thought merujuk pada cara model bahasa besar menunjukkan langkah-langkah penalaran secara bertahap saat menjawab pertanyaan, sehingga pengguna bisa mengikuti proses berpikirnya. Bagi pengguna awam, pembaruan ini tidak mengubah cara berinteraksi dengan produk OpenAI, melainkan memperkuat lapisan keamanan di balik layar agar kemampuan model tidak dengan mudah disalin dan dipakai di luar kendali perusahaan.
