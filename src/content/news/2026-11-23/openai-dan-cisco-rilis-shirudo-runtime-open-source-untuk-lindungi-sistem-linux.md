---
title: "OpenAI dan Cisco Rilis Shirudo, Runtime Open Source untuk Lindungi Sistem Linux yang Berjalan"
summary: "OpenAI dan Cisco memperkenalkan Shirudo, runtime open source berbasis eBPF yang membantu tim keamanan melindungi sistem Linux yang sedang berjalan tanpa menunggu patch atau restart. Dalam uji terbatas, shield yang dihasilkan Codex berhasil memblokir eksploitasi Java4Shell pada layanan Elasticsearch yang aktif."
company: "OpenAI"
source: "https://openai.com/index/introducing-shirudo"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-23T21:20:00.000Z
draft: false
sourceTitle: "OpenAI and Cisco introduce Shirudo"
categories: ["Standar Umum"]
---

Berdasarkan rilis resmi OpenAI (23/11), OpenAI dan Cisco memperkenalkan Shirudo, sebuah runtime open source untuk Linux yang dirancang membantu tim keamanan melindungi sistem yang sedang berjalan sambil menunggu patch tersedia. Dalam uji terbatas, sebuah shield yang dihasilkan oleh Codex berhasil memblokir upaya eksploitasi Java4Shell terhadap layanan Elasticsearch yang aktif tanpa perlu melakukan restart.

Bagi tim keamanan, jeda antara ditemukannya celah dan penerapan patch sering kali menjadi momen paling rentan. Memblokir operasi Linux tertentu bisa menghentikan serangan, tetapi operasi yang sama juga dipakai oleh permintaan yang sah, sehingga memblokirnya berisiko membuat layanan ikut mati. Shirudo, yang namanya berarti "perisai" dalam bahasa Jepang, dirancang untuk membantu tim menavigasi dilema tersebut: sebuah shield sementara dapat diuji untuk melihat apakah ia memblokir perilaku yang mengekspos kerentanan sambil tetap mengizinkan permintaan sah melewati sistem. Setelah disetujui operator, shield dapat dipasang sementara layanan tetap berjalan.

Shirudo dibangun di atas eBPF, teknologi Linux yang memungkinkan program kecil berjalan di titik-titik tertentu dalam sistem operasi untuk mengamati aktivitas dan menerapkan perlindungan secara terarah. OpenAI dan Cisco merancang empat kemampuan inti: perlindungan langsung tanpa restart, kendali programmable bagi agen untuk menyelidiki kerentanan dan mengembangkan shield, penerapan tepercaya dengan tanda tangan kriptografis dan verifikasi oleh eBPF verifier milik Linux, serta verifikasi berbasis perangkat keras melalui Trusted Platform Module (TPM) untuk mencatat pemuatan dan pelepasan perlindungan.

Dalam demonstrasi yang ditampilkan di Linux Plumbers Conference, tim menggunakan Codex untuk membuat shield yang menambahkan pemeriksaan input pada decoder Base64 Java dan menempelkannya langsung ke proses Elasticsearch yang sedang berjalan. Saat eksploitasi dicoba, shield menolak input berbahaya dan serangan berhasil diblokir, sementara Elasticsearch tetap beroperasi. Proyek ini dirilis secara open source di bawah lisensi BSD 2-Clause, dengan program BPF-nya menggunakan lisensi ganda BSD dan GPL, dan OpenAI serta Cisco mengundang developer, peneliti keamanan, serta operator infrastruktur untuk ikut berkontribusi.

Secara umum, eBPF adalah fitur kernel Linux yang memungkinkan kode kecil dijalankan secara aman di dalam kernel tanpa mengubah kode sumber kernel itu sendiri, sehingga sering dipakai untuk observasi dan keamanan jaringan. Sementara itu, TPM adalah chip keamanan pada perangkat keras yang menyimpan kunci kriptografis dan membantu memverifikasi kondisi sistem saat booting maupun saat perangkat lunak dimuat. Kombinasi keduanya memungkinkan perlindungan dipasang dan dicatat dengan cara yang bisa diaudit, memberi operator bukti bahwa sistem benar-benar menjalankan perlindungan yang dimaksud.
