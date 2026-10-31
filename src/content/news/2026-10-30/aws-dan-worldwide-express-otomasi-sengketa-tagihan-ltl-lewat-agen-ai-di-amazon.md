---
title: "AWS dan Worldwide Express Otomasi Sengketa Tagihan LTL Lewat Agen AI di Amazon Bedrock"
summary: "Worldwide Express mengotomasi proses penyelesaian sengketa tagihan LTL dengan solusi multi-agen berbasis Amazon Bedrock dari AWS. Enam bulan setelah peluncuran, pengecualian aktif turun 75% dan arus kas bebas yang sebelumnya terkunci berkurang signifikan."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/how-worldwide-express-automated-freight-exceptions-with-amazon-bedrock/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-30T17:32:20.000Z
draft: false
sourceTitle: "How Worldwide Express automated freight exceptions with Amazon Bedrock"
categories: ["Produk Baru"]
---

Berdasarkan tulisan di blog AWS (30/10), perusahaan logistik Worldwide Express—bagian dari ShipStation Global—berhasil memangkas 75% pengecualian tagihan yang menumpuk dalam enam bulan setelah menerapkan solusi multi-agen AI (kecerdasan buatan) yang dibangun di atas Amazon Bedrock. Pencapaian ini juga mempercepat waktu penagihan hingga empat minggu dan membuka sekitar 10 juta dolar AS dalam bentuk arus kas bebas yang sebelumnya tersimpan di sengketa yang belum terselesaikan.

Masalah yang dipecat cukup klasik di industri pengiriman barang. Sekitar 14% invoice (faktur) pengiriman kurang-dari-truk (LTL) gagal lolos proses pencocokan tiga arah antara purchase order, tanda terima barang, dan invoice dari carrier (perusahaan pengangkut). Begitu ada ketidakcocokan, invoice masuk ke jalur exception handling—sebuah proses manual lima langkah yang harus dikerjakan satu per satu, carrier demi carrier, dengan aturan berbeda-beda. Bagi Worldwide Express yang menangani lebih dari 75 carrier LTL dan 130.000 pelanggan, tumpukan sengketa ini membekukan sekitar 15 juta dolar AS setiap bulan.

Solusinya memanfaatkan Amazon Bedrock sebagai layanan AI generatif terkelola dan Amazon EC2 sebagai mesin komputasi. Ketika sebuah pengecualian terdeteksi, sistem secara otomatis mengarahkannya ke salah satu dari tiga agen spesialis: Invoice Matching Agent yang mencocokkan data pengiriman, Pricing Variance Agent yang membandingkan tarif carrier dengan harga kontrak, serta Accessorial Validation Agent yang memeriksa biaya tambahan seperti liftgate atau pengiriman ke alamat residencial. Setiap agen menarik aturan dan kebijakan carrier yang relevan dari basis pengetahuan khusus sebelum mengeluarkan rekomendasi, lalu menulis catatan dalam bahasa biasa tentang apa yang ditemukan dan tindakan apa yang diambil.

Yang menarik, ketiga agen ini terhubung ke sistem manajemen transportasi SpeedShip lewat API (antarmuka pemrograman) yang sama dengan yang dipakai staf analitis. Artinya, AI melihat data yang sama dengan yang dilihat manusia—tarif kontrak, detail pengiriman, bukti pengiriman—dan menulis resolusinya ke alur kerja yang sama. Pada tahap awal, rekomendasi tetap memerlukan persetujuan manusia lewat antarmuka SpeedShip. Setelah akurasi melewati 99%, persetujuan massal menjadi default.

Secara umum, pendekatan multi-agen seperti ini membagi tugas kompleks menjadi beberapa agen yang masing-masing punya peran, batasan keputusan, dan format keluaran yang eksplisit. Berbeda dengan otomatisasi berbasis aturan (RPA) yang kaku, agen AI bisa menilai konteks—misalnya menafsirkan kebijakan aksesori sebuah carrier atau memutuskan apakah selisih tarif tertentu valid—sehingga cocok untuk pekerjaan yang variabelnya tinggi. Worldwide Express membangun dasbor internal untuk memantau tingkat otomatisasi per carrier, tingkat kesalahan per jenis pengecualian, dan frekuensi intervensi manusia, sehingga setiap keputusan otomatis tetap bisa diaudit dan dijelaskan alasannya.
