---
title: "Apple Riset Batas Teoretis Alignment Model Bahasa dengan Batas KL"
summary: "Apple (12/11) memublikasikan riset yang menghitung batas maksimum peningkatan imbalan model bahasa dalam anggaran KL. Best-of-N mendekati batas teoretis, sedangkan PPO dan GRPO belum optimal menurut pengujian Apple."
company: "Apple"
source: "https://machinelearning.apple.com/research/theoretical-limits-alignment"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-12T00:00:00.000Z
draft: false
sourceTitle: "Theoretical Limits of Language Model Alignment"
categories: ["Rilis Model","Fitur & Skills","Riset & Kebijakan"]
---

Dalam riset yang dipublikasikan Apple (12/11), *Theoretical Limits of Language Model Alignment* menghitung batas maksimum kenaikan imbalan yang dapat dicapai model bahasa ketika jarak keluarannya dari model dasar dibatasi oleh divergensi Kullback-Leibler (KL). Rumus tertutup tersebut memakai istilah divergensi Jeffreys, bukan akar KL seperti pada analisis sebelumnya, dan menghasilkan estimator praktis berdasarkan sampel model dasar saja. Halaman tersebut memuat kontribusi riset, bukan peluncuran model atau fitur Apple baru.

Dua pendekatan yang paling umum dibandingkan dalam riset ini adalah reinforcement learning atau RL, yang meningkatkan imbalan yang diharapkan dengan batasan KL, serta best-of-N, yang menghasilkan beberapa jawaban independen lalu memilih yang memiliki imbalan tertinggi. Dalam pengujian pada dua tugas, yaitu keamanan dan peringkasan, best-of-N mendekati batas teoretis, sedangkan PPO dan GRPO dinilai masih jauh dari batas tersebut, menurut Apple. Bagi pengembang AI, temuan ini menjadi referensi saat memilih metode: best-of-N dapat mendekati hasil optimum, tetapi biaya inferensi bertambah ketika jumlah kandidat yang harus dibuat ikut dinaikkan.

Apple juga menelusuri kondisi ketika penilaian otomatis atau *proxy reward* digunakan sebagai pengganti penilaian langsung oleh manusia. Kesenjangan antara imbalan ideal dan imbalan proksi, yang berkaitan dengan fenomena *reward hacking*, makin lebar ketika kesalahan imbalan membesar dan faktor penalti KL menurun. Kertas kerja itu membuktikan bahwa menggabungkan beberapa penilaian imbalan atau *reward ensembling* dapat mengurangi fenomena tersebut, memberikan alasan teoretis bagi tim yang sudah memakai teknik itu dalam praktik.

Secara umum, *alignment* di sini berarti menyesuaikan keluaran model agar mencerminkan preferensi manusia tanpa kehilangan kemampuan model dasar. KL mengukur seberapa jauh distribusi keluaran yang baru berbeda dari model acuan, sedangkan divergensi Jeffreys merupakan ukuran ketidaksamaan lain yang dipakai dalam rumus batas optimum. Implikasi terdekatnya bagi pembaca awam adalah referensi bagi tim riset, pengembang model, dan tim keamanan AI, bukan perubahan langsung pada produk Apple.
