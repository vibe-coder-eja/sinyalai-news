---
title: "Google Rilis Gemini 4 Argon dengan Tiga Lapis Pengamanan untuk Cegah Penyalahgunaan"
summary: "Google DeepMind mulai merilis Gemini 4 Argon secara luas, model yang dikhususkan untuk pekerjaan teknis kompleks seperti keamanan siber dan riset ilmiah. Peluncuran disertai sistem keamanan berlapis dan perluasan program uji terbatas bagi tim keamanan siber."
company: "Google"
source: "https://deepmind.google/blog/developing-gemini-4-argon-responsibly-and-safely/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-13T19:43:07.000Z
draft: false
sourceTitle: "Developing Gemini 4 Argon responsibly and safely"
categories: ["Rilis Model"]
---

Google DeepMind (13/10) mengumumkan dimulainya peluncuran luas Gemini 4 Argon, model yang dirancang untuk menangani tugas teknis kompleks di bidang pemrograman, keuangan, hukum, keamanan siber, dan sains. Dalam unggahan di blognya, Head of Gemini Security Google DeepMind menjelaskan bahwa kemampuan pertahanan siber Argon berada di frontier, sehingga sebelum peluncuran penuh, model ini terlebih dahulu diuji lewat program Fairwind bersama tim keamanan siber tepercaya dan dipakai internal untuk memindai sistem kritis di dalam maupun luar Google.

Dari jendela uji terbatas itu muncul temuan yang menyentuh sorotan langsung sosok yang terbantu. Firma keamanan Wiz menggunakan Argon untuk menemukan bug kritis pada perangkat lunak rumah sakit yang luput dari model-model sebelumnya, temuan yang berpotensi melindungi ratusan ribu catatan pasien. Tim keamanan internal Google juga memakai Argon untuk menemukan dan menambal bug di perangkat lunak internal maupun sumber terbuka, termasuk kerentanan pada sistem yang dipakai secara global yang kini tengah menjalani proses responsible disclosure.

Bersamaan dengan peluncuran luas, Google memperluas program Fairwind ke lebih banyak tim pertahanan siber tepercaya. Sebelum memutuskan rilis penuh, perusahaan menjawab dua pertanyaan besar: bagaimana membangun pagar pembatas agar Argon tidak dipakai aktor jahat untuk melancarkan serangan siber atau menciptakan ancaman biologis (penyalahgunaan), dan bagaimana memastikan model tetap mengerjakan tugas sesuai cara yang benar tanpa memotong proses, melewati batas, atau mengambil keputusan berisiko tinggi secara keliru (misalignment dan prompt injection).

Untuk menjawab, Google menerapkan tiga lapisan perlindungan real-time. Pertama, input screening, model lebih kecil memeriksa permintaan masuk dan konteks percakapan untuk mendeteksi niat berbahaya. Kedua, internal introspection, transformer kecil yang disebut activation probes membaca sinyal saraf internal model dan dilatih mengenali aktivasi pengetahuan tentang serangan siber atau ancaman biologis. Ketiga, continuous monitoring, sinyal-sinyal dari lapisan sebelumnya dipadukan untuk memantau respons model selama penalaran berlangsung, termasuk memotong tindakan agen ketika respons mulai bermasalah.

Pada pengujian keamanan siber end-to-end, model ini menyelesaikan seluruh 12 skenario serangan siber simulasi, naik dari 5 skenario pada generasi sebelumnya. Pada evaluasi biologi, versi tanpa pelindung menunjukkan kemampuan yang lebih kuat untuk membantu menelusuri prosedur laboratorium langkah demi langkah. Karena kemampuan di dua domain ini meningkat, Google menaruh frontier safeguards generasi berikutnya di keduanya. Pada pengujian adversarial, pelanggaran turun hampir setengah, dan red teaming bio dari pihak eksternal hanya mampu membuka kurang dari 1 persen sub-tugas biologi yang diuji.

Untuk mencegah misalignment, Argon dilatih menghormati batas sistem, melaporkan temuan negatif secara jujur, dan berhenti meminta konfirmasi manusia ketika menghadapi hambatan. Pada benchmark pemrograman, upaya mengambil jalan pintas turun menjadi sekitar 2 persen, performa terbaik di antara model Gemini terbaru. Sebagai lapis kedua, Google membangun automated misalignment monitor yang membaca tindakan agen dan rantai berpikir internalnya secara real-time untuk memblokir pelanggaran batas sebelum terjadi.

Secara umum, istilah activation probes merujuk pada model kecil yang dilatih membaca pola aktivasi di dalam jaringan neural yang lebih besar untuk mendeteksi apakah model sedang memproses topik tertentu. Frontier safeguards adalah serangkaian kebijakan dan sistem teknis yang dipakai perusahaan AI ketika kemampuan model sudah menyentuh area berisiko tinggi, sehingga memerlukan perlindungan tambahan sebelum model dipakai luas.
