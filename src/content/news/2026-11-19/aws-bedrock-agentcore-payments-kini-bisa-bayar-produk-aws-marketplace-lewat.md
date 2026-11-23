---
title: "AWS Bedrock AgentCore Payments Kini Bisa Bayar Produk AWS Marketplace Lewat Tagihan AWS"
summary: "Amazon Bedrock AgentCore Payments menambahkan dukungan AWS Marketplace, memungkinkan agen AI membeli produk, API, data, dan konten berprotokol x402 dalam dolar AS yang ditagihkan lewat AWS Billing, tanpa dompet stablecoin atau API key."
company: "AWS"
source: "https://aws.amazon.com/blogs/machine-learning/enable-ai-agents-to-pay-for-aws-marketplace-x402-products-with-amazon-bedrock-agentcore-payments/"
author: "Redaktur Sinyal AI News (RSAIN)"
publishedAt: 2026-11-19T23:02:16.000Z
draft: false
sourceTitle: "Enable AI agents to pay for AWS Marketplace x402 products with Amazon Bedrock AgentCore payments"
categories: ["Fitur & Skills","Riset & Kebijakan"]
---

Berdasarkan tulisan di blog AWS (19/11), Amazon Bedrock AgentCore Payments kini mendukung pembelian di AWS Marketplace. Artinya, agen AI—program yang bisa bertindak sendiri untuk menyelesaikan tugas—sekarang bisa menemukan dan membeli produk, API, data, serta konten berprotokol x402, lalu membayarnya dalam dolar AS yang ditagihkan langsung ke AWS bill milik developer. Tidak perlu lagi menyiapkan dompet stablecoin maupun API key khusus untuk tiap penjual.

Selama ini, AgentCore Payments sudah memungkinkan agen membayar API berbayar, server MCP, dan konten web lewat protokol terbuka seperti x402 dan MPP, lengkap dengan batas pembayaran dan fitur pemantauan. Lewat pembaruan ini, kemampuan itu diperluas ke katalog AWS Marketplace. Developer cukup membuat Payment Manager dengan konektor AWS Billing, lalu membuat payment session berbatas anggaran untuk tiap tugas. Agen yang melebihi batas sesi tidak akan bisa membelanjakan uang lebih, dan setiap transaksi tercatat di AWS CloudTrail serta AWS Cost Explorer.

AWS juga memperkenalkan AWS Marketplace connector di AgentCore Gateway sebagai pelengkap opsional. Lewat konektor ini, agen bisa mencari penjual dan produk baru, membaca daftar produk, serta melihat endpoint yang tersedia. Penjual yang merespons dengan kode HTTP 402 Payment Required akan menyertakan kutipan harga tertandatangani di header PAYMENT-REQUIRED. Agen meneruskan kutipan itu ke AgentCore Payments; bila anggaran sesi masih cukup, sistem mengeluarkan payment token yang berlaku sekitar lima menit. Agen lalu mengirim ulang permintaan dengan token tersebut dan menerima konten yang diminta. Pada pembelian pertama dari seorang penjual, AWS Marketplace otomatis membuat perjanjian antara akun AWS developer dan penjual tersebut, dan pembelian berikutnya tercatat sebagai line item di AWS bill.

Salah satu penjual x402 yang sudah bergabung adalah Tavily, penyedia layanan pencarian real-time untuk agentic commerce. Dalam tulisannya, Tavily menyebut kerja sama ini sebagai bagian dari desain Agentic Commerce yang menekankan transaksi aman dan penjual terverifikasi KYC (Know Your Customer, proses verifikasi identitas penjual).

Secara umum, protokol x402 adalah standar terbuka yang memakai kode status HTTP 402 Payment Required sebagai sinyal bahwa sebuah endpoint meminta pembayaran sebelum mengirim data. Mekanismenya mirip micropayment per permintaan: agen tidak perlu berlangganan, cukup membayar tiap kali memakai layanan. Karena pembayaran dilewatkan lewat akun AWS kedua belah pihak, jejak audit dan kontrol keamanan yang biasa diharapkan perusahaan—seperti batas belanja, daftar penjual yang disetujui lewat AgentCore policy, dan integrasi dengan Private Marketplace—tetap berlaku.

AWS menyediakan contoh kode di GitHub berupa agen riset yang mencari alat di Marketplace, membayar satu permintaan lewat AWS Billing, lalu menjawab pertanyaan analis keuangan beserta sumbernya. Skenario ini menggambarkan alur agentic commerce secara end-to-end: temukan penjual, minta kutipan harga, bayar lewat token, dan selesaikan tugas dalam satu putaran.
