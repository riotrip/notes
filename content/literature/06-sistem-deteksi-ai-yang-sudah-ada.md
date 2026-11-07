---
title: "Arsip: Sistem Deteksi AI yang Sudah Ada dan Pembeda yang Dituju"
category: Arsip deteksi AI
draft: true
---

# Sistem yang Sudah Ada dan Pembeda yang Dituju

> **Status:** Arsip penelitian deteksi teks AI; bukan arah skripsi aktif. Lihat [inti penelitian kemiripan abstrak berbasis aspek dan risiko kebaruan](../kemiripan-abstrak-dan-risiko-kebaruan/01-inti-penelitian-5w1h.md). Isi berikut dipertahankan sebagai rekaman arah sebelumnya.

**Tanggal peninjauan dokumentasi: 2026-11-01.** Ini ringkasan historis, bukan pengujian produk terkini. Fitur dan dukungan bahasa dapat berubah.

## Kesamaan dengan produk lain

| Produk | Yang terdokumentasi saat peninjauan |
|---|---|
| [GPTZero](https://gptzero.me/faq) | Menawarkan kategori Human/Mixed/AI; bahasa Indonesia tercantum dalam [daftar bahasa yang didukung](https://support.gptzero.me/articles/1682612063-what-languages-does-gptzero-support). |
| [Originality.ai](https://help.originality.ai/en/article/multiple-languages-how-to-use-multi-language-ai-detection-13e5plo/) | Mendukung bahasa Indonesia serta menyediakan sorotan teks. |
| [Winston AI](https://gowinston.ai/interpreting-our-ai-detection-scores/) | Mendukung bahasa Indonesia, menerima masukan dokumen, dan menyediakan AI Prediction Map untuk menunjukkan prediksi per bagian. |
| [Turnitin](https://guides.turnitin.com/hc/en-us/articles/22774058814093-Using-the-AI-Writing-Report) | Menyediakan AI Writing Report untuk alur institusi. Dukungan deteksi AI bahasa Indonesia tidak tercantum pada dokumentasi yang diperiksa. |

Dokumentasi vendor menunjukkan fitur yang ditawarkan, bukan bukti ketepatan pada artikel ilmiah Indonesia. Tidak dilakukan eksperimen pembanding langsung terhadap keempat produk ini.

## Pembeda yang dituju

Skripsi diarahkan pada **sistem pemeriksaan bagian artikel ilmiah Indonesia yang dikembangkan dan diuji**: pengguna mengunggah PDF, membaca artikel, lalu memeriksa bagian yang ditandai oleh model. Pelatihan lanjutan IndoBERT dan kalibrasi skor mendukung fungsi tersebut.

Kontribusinya bukan klaim bahwa unggah PDF, sorotan, IndoBERT, atau dukungan Indonesia merupakan yang pertama. Penelitian model dan aplikasi Indonesia juga sudah ada, sebagaimana dirangkum dalam [penelitian terdahulu](03-matriks-komparasi-jurnal-landasan-deteksi-ai.md).

Pembeda perlu ditunjukkan melalui hasil pengembangan dan [pengujian](05-rancangan-metode-data-dan-evaluasi.md), termasuk fungsi penandaan, kemampuan deteksi, serta keterbatasan skor pada data yang ditetapkan. Sistem tidak diklaim lebih unggul daripada produk komersial tanpa eksperimen yang sebanding.
