---
title: "GitHub Rilis Panduan Agent Skills: Bikin Sekali, Dipakai di Berbagai Agen AI"
summary: "GitHub (12/11) mempublikasikan panduan praktis tentang agent skills, cara tim menulis pekerjaan rekayasa yang berulang dalam berkas yang bisa di-review dan dipakai ulang di berbagai agen AI."
company: "GitHub"
source: "https://github.blog/ai-and-ml/github-copilot/build-once-run-on-any-agent-a-practical-guide-to-agent-skills/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-12T22:54:52.000Z
draft: false
sourceTitle: "Build once, run on any agent: A practical guide to agent skills"
categories: ["Fitur & Skills"]
---

GitHub (12/11) merilis panduan berjudul "Build once, run on any agent: A practical guide to agent skills" di blog resminya. Panduan ini membahas cara tim rekayasa menulis "agent skills"—potongan pekerjaan yang bisa diulang—dalam bentuk berkas yang dapat di-review dan dipakai ulang, sementara alat, konteks proyek, dan izin tetap disesuaikan dengan agen yang menjalankannya.

Secara sederhana, agent skills adalah instruksi terstruktur yang mengajarkan agen AI cara menyelesaikan tugas tertentu. Alih-alih menulis perintah baru setiap kali, tim cukup menyimpan prosedur di sebuah berkas, lalu agen mana pun yang mendukung format tersebut bisa langsung memahaminya. Konsep ini mirip dengan fungsi atau pustaka di pemrograman: sekali dibuat, bisa dipanggil berulang kali di proyek berbeda.

GitHub menekankan tiga hal yang perlu dipisahkan. Pertama, skill itu sendiri: logika dan langkah kerja yang ditulis dalam berkas. Kedua, tools: alat bantu yang dipakai skill, misalnya API untuk mengambil data atau skrip untuk mengubah format. Ketiga, konteks proyek dan izin: informasi spesifik seperti struktur kode, kredensial, dan batasan akses yang hanya relevan di lingkungan tempat agen dijalankan. Pemisahan ini membuat skill tetap portabel, sementara detail sensitif tidak ikut tersebar.

Bagi tim yang sehari-hari bergulat dengan tumpukan kode dan pipeline yang rumit, pendekatan ini menawarkan dua keuntungan praktis. Skill yang sudah teruji bisa langsung dipakai oleh agen baru tanpa harus menulis ulang, dan proses review tetap terjadi di level berkas seperti pada kode biasa. Artinya, kualitas dan konsistensi pekerjaan berulang tidak lagi bergantung pada siapa yang menjalankan perintah, melainkan pada skill itu sendiri.

Secara umum, ide di balik agent skills bukan hal baru di dunia perangkat lunak: modularitas dan reuse sudah lama menjadi prinsip dasar. Yang berubah adalah medianya—dari kode untuk mesin menjadi instruksi untuk agen AI. Dengan panduan ini, GitHub memberi contoh konkret bagaimana tim bisa mulai menulis skill pertama, menyimpannya di repositori, dan menjalankannya di agen pilihan tanpa harus mengunci diri pada satu platform.
