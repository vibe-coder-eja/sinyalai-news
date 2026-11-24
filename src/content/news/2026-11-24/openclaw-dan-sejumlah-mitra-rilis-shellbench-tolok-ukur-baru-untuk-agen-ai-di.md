---
title: "OpenClaw dan Sejumlah Mitra Rilis ShellBench, Tolok Ukur Baru untuk Agen AI di Tugas Sehari-hari"
summary: "OpenClaw (24/11) memperkenalkan ShellBench, benchmark berbasis lebih dari 10 juta interaksi agen AI anonim untuk mengukur kemampuan agen pada pekerjaan nyata. Hasil awal menunjukkan model terbaik hanya menyelesaikan sekitar enam dari sepuluh tugas, dengan celah pada konsistensi dan keamanan."
company: "OpenClaw"
source: "https://openclaw.ai/blog/shellbench/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-24T00:00:00.000Z
draft: false
sourceTitle: "Introducing ShellBench, the benchmark for real-world tasks"
categories: ["Rilis Model","Produk Baru","Riset & Kebijakan"]
---

Berdasarkan rilis resmi OpenClaw (24/11), ShellBench adalah benchmark baru yang dikembangkan bersama The OpenClaw Foundation, Parsewave, Hugging Face, Red Hat, dan UC Berkeley. Tolok ukur ini disusun dari lebih dari 10 juta interaksi agen AI anonim di dunia nyata, dengan tujuan menguji seberapa baik agen menangani pekerjaan sehari-hari yang biasanya didelegasikan orang kepadanya.

ShellBench menguji 12 model frontier, termasuk GPT-6 Astra, Claude Fable 5.2, GPT-6.1 Sol, Gemini 4 Carbon, dan Claude Opus 5.5, di lima agent harness (kerangka kerja yang menjalankan agen), yaitu Claude Code, Codex, Hermes, OpenClaw, dan Pi. Total ada 100 tugas yang dijalankan dalam 53.100 percobaan penilaian. Setiap skenario dimulai dari permintaan singkat (rata-rata 43 kata) dan sebuah ruang kerja realistis berisi 188 berkas, mulai dari email, spreadsheet, hingga PDF, dengan sengaja disisipkan komplikasi seperti catatan kedaluwarsa, informasi yang saling bertentangan, hingga instruksi yang berpotensi berbahaya.

Hasil rata-rata menunjukkan model dengan performa tertinggi, GPT-6 Astra, hanya berhasil menyelesaikan sekitar 62,5% tugas, disusul Claude Fable 5.2 di 61,9% dan GPT-6.1 Sol di 61,4%. Dengan kata lain, model-model unggulan masih gagal memenuhi seluruh persyaratan pada sekitar empat dari sepuluh percobaan. Temuan lain yang disoroti OpenClaw adalah soal konsistensi: GPT-6 Astra mampu menyelesaikan 75,1% tugas setidaknya satu kali dalam tiga percobaan, tetapi hanya 48,8% yang tuntas pada ketiga percobaan. Artinya, kemampuan sesekali berhasil tidak menjamin keandalan berulang.

ShellBench juga menyoroti celah pada aspek keamanan. Dari total 53.100 percobaan, 15,7% gagal setidaknya satu dari 381 kriteria keamanan yang diujikan, seperti mengenali upaya phishing, instruksi pembayaran mencurigakan, atau tindakan yang tidak bisa dibatalkan. Menariknya, di antara 26.151 percobaan yang lolos seluruh uji kebenaran, masih ada 9,9% yang gagal memenuhi syarat keamanan. OpenClaw menekankan bahwa tingkat keberhasilan menyelesaikan tugas saja belum cukup untuk menjamin keamanan alur kerja secara keseluruhan.

Secara umum, benchmark adalah seperangkat tes standar yang dipakai untuk mengukur dan membandingkan kemampuan suatu sistem AI. ShellBench mencoba membedakan dirinya dari benchmark konvensional yang biasanya berupa soal matematika atau pemrograman dengan jawaban jelas, dengan menyajikan tugas-tugas multitahap yang menuntut agen menemukan informasi, mempertahankan konteks, memverifikasi kelengkapan, dan menolak instruksi berbahaya. Bagi pengguna yang mengandalkan agen AI untuk pekerjaan administratif seperti rekonsiliasi laporan atau penyusunan draf, hasil ini menjadi pengingat bahwa hasil yang terlihat benar belum tentu lengkap, konsisten, atau aman.
