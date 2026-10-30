---
title: "Google Umumkan Gemini 4 Carbon, Akses Awal Dibatasi untuk Pembela Siber"
summary: "Google (28/10) mengumumkan Gemini 4 Carbon, model frontier yang diklaim unggul di keamanan siber dan tugas rekayasa jangka panjang. Akses awal hanya untuk sebagian pembela siber lewat Fairwind Program, sementara peluncuran ke developer, bisnis, dan konsumen menyusul."
company: "Google"
source: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-28T17:00:00.000Z
draft: false
sourceTitle: "Gemini 4 Carbon: our next frontier model"
categories: ["Rilis Model","Fitur & Skills"]
---

Google mengumumkan Gemini 4 Carbon, model frontier terbarunya yang menekankan kemampuan keamanan siber dan pengerjaan tugas rekayasa jangka panjang. Berdasarkan rilis resmi Google (28/10), Carbon belum dibuka untuk umum. Mulai pekan ini model tersebut diberikan kepada sebagian pembela siber (cyber defender), lalu aksesnya diperluas bertahap ke mitra tepercaya lewat Fairwind Program.

Menurut Google, Carbon menempati peringkat pertama pada Artificial Analysis Intelligence Index versi 5.0 dengan skor 59. Pada tiga tolok ukur keamanan eksternal yang dievaluasi tanpa pengaman (guardrail), Google menyebut Carbon meraih 88,2 persen di SEC-bench Pro untuk menemukan celah keamanan, 54,8 persen di ExploitGym untuk eksploitasi, dan 71,0 persen di CWE-bench milik Collinear untuk menambal celah. Pada uji internal, tingkat keberhasilan Carbon menghasilkan kode yang aman disebut lebih dari dua kali lipat Gemini 4 Argon, pendahulunya yang diluncurkan dua pekan sebelum pengumuman ini.

Tim Chrome melaporkan Carbon menghasilkan tambalan berkualitas tinggi lebih dari 10 kali lebih baik dibanding model frontier dari laboratorium lain. Wiz, yang disebut Google sebagai platform keamanan cloud andalannya, mengamati Carbon unggul pada tolok ukur uji penetrasi web, kemampuan inti bagi inisiatif Scan for Good milik Wiz.

Untuk pekerjaan rekayasa, Google menyebut Carbon dirancang bagi masalah jangka panjang dan alur kerja agen yang berkelanjutan. Di internal, tim Google melihat model ini bekerja berhari-hari untuk menelusuri akar masalah dan menambal bug yang halus di basis kode besar dan sistem tingkat rendah, dengan terus mencoba saat menemui jalan buntu. Pada WebDev Arena, Carbon naik 89 poin Elo ke peringkat keempat dengan skor 1768.

Google mengatakan Carbon memakai lapisan keamanan yang sama dengan Argon, yaitu pelatihan model, pertahanan terhadap penyalahgunaan secara real time, ketahanan terhadap prompt injection, dan pemantauan chain-of-thought, lalu ditambah pelatihan agar model merespons tugas rumit atau bertekanan tinggi dengan benar. Pada Terminal-Bench 4.0, kecurangan yang berhasil turun menjadi 0,0 persen dan upaya curang menjadi 0,4 persen. Di lingkungan coding langsung bersama tim internal, peringatan ketidakselarasan (misalignment) tingkat tinggi turun hampir 80 persen, dan klaim tanpa dasar berkurang sekitar dua kali lipat dibanding Argon. Pada Gray Swan Indirect Prompt Injection Benchmark, tingkat keberhasilan serangan terhadap Carbon 0,0 persen, dibanding 0,7 persen pada Argon.

Google menyebut pengerahannya dilakukan secara hati-hati dan melibatkan proses sukarela pemerintah Amerika Serikat untuk pengujian model sebelum rilis. Peluncuran ke developer, bisnis, dan konsumen lewat produk Google akan menyusul secepat mungkin, setelah masukan terkumpul dan pengaman disempurnakan. Saat tersedia, harga perkenalan Carbon sama dengan Argon, yaitu $2 per juta token input dan $10 per juta token output, dengan token input yang tersimpan di cache didiskon 95 persen. Setelah masa perkenalan berakhir, harganya menjadi $4 dan $20 per juta token.

Secara umum, "model frontier" merujuk pada model paling mutakhir dari sebuah laboratorium AI. Celah keamanan (vulnerability) adalah kelemahan pada perangkat lunak yang bisa dimanfaatkan penyerang, sedangkan menambal (patching) berarti memperbaiki kode agar kelemahan itu tertutup.
