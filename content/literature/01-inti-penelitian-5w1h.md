---
title: "Arsip: Inti Pengembangan Sistem Deteksi Teks AI"
category: Arsip deteksi AI
draft: true
---

# Inti Pengembangan Sistem Deteksi Teks AI

> **Status:** Arsip penelitian deteksi teks AI; bukan arah skripsi aktif. Lihat [inti penelitian kemiripan abstrak berbasis aspek dan risiko kebaruan](../kemiripan-abstrak-dan-risiko-kebaruan/01-inti-penelitian-5w1h.md). Isi berikut dipertahankan sebagai rekaman arah sebelumnya.

**Tujuan skripsi ini adalah mengembangkan dan menguji sistem untuk memeriksa bagian artikel ilmiah berbahasa Indonesia yang diprediksi sebagai tulisan AI.** Sistem masih berupa rancangan, belum dibangun.

## Masukan, keluaran, dan penggunaan

Pengguna mengunggah PDF artikel. Aplikasi mengambil teks yang dapat dibaca, lalu menampilkan artikel beserta penanda pada bagian yang diprediksi sebagai tulisan AI dan skor keyakinannya. Unggah PDF dan penandaan merupakan fungsi utama, bukan demonstrasi tambahan. Sistem tidak memberikan satu vonis untuk seluruh artikel.

Pengguna dapat membaca bagian bertanda dalam konteks artikel untuk mendukung pemeriksaan dan diskusi naskah. Prediksi bukan bukti pelanggaran.

## Apa yang dikembangkan?

Membangun aplikasi berarti menyambungkan pengolahan PDF, pemeriksaan teks, dan tampilan hasil. Untuk pemeriksaan teks, IndoBERT yang sudah tersedia dilatih lebih lanjut dengan contoh berlabel; bukan membuat model bahasa dari nol.

Pelatihan membantu model mempelajari tugas deteksi. Kalibrasi menyesuaikan skor keyakinan, sedangkan pengujian mengukur kemampuan dan kesalahannya. Ketiganya mendukung aplikasi yang dikembangkan.

Hasil yang dituju: aplikasi pemeriksaan, model beserta penyesuaian skornya, dan hasil pengukuran kemampuan serta keterbatasan sistem.

Lanjutkan ke [alasan pengembangan](02-latar-belakang-dan-urgensi-deteksi-abstrak-ai-indonesia.md), [cara kerja](04-fungsi-sistem-landasan-teoretis-deteksi-ai.md), dan [data serta pengujian](05-rancangan-metode-data-dan-evaluasi.md).
