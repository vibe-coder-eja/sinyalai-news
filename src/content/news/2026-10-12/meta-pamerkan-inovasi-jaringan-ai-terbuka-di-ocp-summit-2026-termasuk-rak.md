---
title: "Meta Pamerkan Inovasi Jaringan AI Terbuka di OCP Summit 2026, Termasuk Rak Pendingin Cair Pertama"
summary: "Pada OCP Global Summit 2026, Meta memperkenalkan generasi baru infrastruktur jaringan terbuka untuk AI, di antaranya rak jaringan berpendingin cair pertamanya (IcePack) dan switch 102.4T (IceCube), serta inisiatif Open Switch Platform Architecture bersama Microsoft dan Alibaba."
company: "Meta"
source: "https://engineering.fb.com/2026/10/12/open-source/ocp-summit-2026-powering-ai-with-open-innovations-in-scale-up-scale-out-and-scale-across-networks/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-10-12T21:19:18.000Z
draft: false
sourceTitle: "OCP Summit 2026: Powering AI with Open Innovations in Scale-Up, Scale-Out, and Scale-Across Networks"
categories: ["Standar Umum"]
---

Pada OCP Global Summit 2026, Meta (12/10) memperkenalkan serangkaian inovasi jaringan terbuka terbaru yang dirancang untuk menopang infrastruktur AI berskala besar. Pengumuman ini mencakup rak jaringan berpendingin cair pertama Meta bernama IcePack, switch blade IceCube berkapasitas 102.4T, serta protokol transport AI sumber terbuka MetaRoCE. Meta juga meluncurkan inisiatif Open Switch Platform Architecture (OSPA) di bawah naungan OCP, sebuah upaya standardisasi yang dipimpin bersama Microsoft dan Alibaba.

Salah satu sorotan utama adalah IceCube, switch fabric 102.4-Tbps dengan kapasitas non-blocking 128×800G. Switch ini tersedia dalam dua varian, masing-masing menggunakan chip ASIC Broadcom Tomahawk6C dan NVIDIA Spectrum-6, serta menjalankan sistem operasi jaringan sumber terbuka Meta, FBOSS, yang memanfaatkan antarmuka Switch Abstraction Interface (SAI) dari OCP. Rak IcePack yang menampung switch ini menandai lompatan dua kali lipat bandwidth dibanding platform 51.2T generasi sebelumnya, sekaligus menjawab kebutuhan densitas daya dan pendinginan di pusat data AI skala gigawatt.

Meta juga memperkenalkan Flattened Planar Fabric (FPF), arsitektur fabric multiplane yang dirancang ulang untuk menghubungkan GPU dalam klaster besar. Berbeda dari arsitektur uplink satu bidang tradisional, FPF menghubungkan setiap GPU melalui delapan tautan 100G independen ke delapan switch berbeda. Pendekatan ini menghasilkan klaster GPU non-blocking yang lebih besar, mengurangi latensi dengan memangkas satu tingkat topologi, serta memungkinkan penyeimbangan beban langsung dari kartu jaringan (NIC). Meta mengembangkan FPF bersama NVIDIA dan mulai membagikan pembelajaran ini kepada mitra cloud untuk mendorong standardisasi fabric multiplane.

Di sisi jaringan scale-across yang menjangkau antar-pusat data, Meta memamerkan agregasi backend BAG super-spine berskala petabit, termasuk cara menangani kegagalan pada pekerjaan pelatihan model berskala besar dan pembangunan backbone regional berbasis SRv6. Untuk scale-up, sistem MTIA 300 Meta menggunakan switch Ethernet Tahan 51.2T yang menyediakan 6.4 Tbps per akselerator, dengan pratinjau desain rak generasi berikutnya berisi 72 akselerator pada silikon 102.4T.

Secara umum, "scale-up" merujuk pada cara banyak akselerator saling terhubung dalam satu rak atau satu sistem, "scale-out" berarti menambah rak atau unit komputasi untuk memperbesar klaster, dan "scale-across" merujuk pada penggabungan pusat data di lokasi berbeda menjadi satu klaster besar. Kebutuhan akan ketiganya meningkat tajam karena model AI modern, termasuk seri Muse yang disebut Meta, menuntut komputasi terdistribusi dalam skala yang terus membesar.
