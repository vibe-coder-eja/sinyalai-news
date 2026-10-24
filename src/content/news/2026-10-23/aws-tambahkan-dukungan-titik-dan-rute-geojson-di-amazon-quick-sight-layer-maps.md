---
title: "AWS Tambahkan Dukungan Titik dan Rute GeoJSON di Amazon Quick Sight Layer Maps"
summary: "AWS (23/10) menambahkan dukungan geometri Point dan LineString pada layer maps di Amazon Quick Sight, sehingga pengguna bisa memetakan lokasi sekaligus rute di antara titik-titik tersebut dalam satu alur kerja GeoJSON."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/visualize-points-and-routes-with-geojson-in-amazon-quick-sight-layer-maps/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-23T16:24:55.000Z
draft: false
sourceTitle: "Visualize points and routes with GeoJSON in Amazon Quick Sight layer maps"
categories: ["Fitur & Skills"]
---

Layanan analitik bisnis Amazon Quick Sight milik AWS kini mendukung dua jenis geometri baru pada fitur layer maps, yaitu Point untuk menandai lokasi tertentu dan LineString untuk menggambar rute yang menghubungkan beberapa titik. Berdasarkan tulisan di blog AWS (23/10), pembaruan ini memungkinkan pengguna memetakan sekaligus lokasi dan jalur, misalnya posisi toko di sebuah kota atau rute penerbangan dari sebuah bandara, dalam satu alur kerja GeoJSON yang sama.

Sebelumnya, layer maps di Quick Sight hanya mendukung bentuk wilayah atau area, seperti batas wilayah penjualan atau distrik. Dengan tambahan Point dan LineString, pengguna bisa menampilkan titik-titik individual di dalam area tersebut sekaligus garis yang menghubungkan titik-titik itu. AWS menjelaskan bahwa satu layer hanya menampilkan satu jenis geometri pada satu waktu, sehingga pengguna perlu memilih apakah ingin menampilkan titik, garis, atau poligon sesuai kebutuhan visualisasinya.

Cara kerjanya cukup sederhana: pengguna menyiapkan sebuah berkas GeoJSON berisi data geometri, lalu menyiapkan dataset di Quick Sight berisi metrik dan dimensi yang ingin ditampilkan. Keduanya dihubungkan lewat sebuah kolom kunci bersama, misalnya ID toko atau ID rute. Setelah terhubung, Quick Sight akan menggambar titik atau garis sesuai data di GeoJSON, sementara warna, ketebalan, dan transparansi garis bisa diatur dari kolom dataset yang ikut bergabung. AWS juga menyebut bahwa berkas GeoJSON kini bisa diperbarui secara terprogram, sehingga peta bisa mengikuti perubahan data tanpa harus membuat ulang visualisasinya dari awal.

Secara umum, GeoJSON adalah format berkas berbasis JSON yang dipakai untuk mendeskripsikan fitur geografis seperti titik, garis, dan poligon. Dalam format ini, setiap fitur memiliki bagian geometry yang berisi koordinat dan bagian properties yang menyimpan atribut tambahan, termasuk kunci yang dipakai untuk mencocokkan data dengan dataset di Quick Sight. Karena layer maps menggabungkan data spasial dari GeoJSON dengan data tabular dari dataset, pendekatan ini cocok dipakai untuk analisis yang menggabungkan informasi lokasi dengan metrik bisnis, seperti penjualan per toko, volume pengiriman per rute, atau jumlah penumpang per penerbangan.
