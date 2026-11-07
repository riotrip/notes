---
title: "Arsip: Mengapa Sistem Deteksi AI Perlu Dikembangkan?"
category: Arsip deteksi AI
draft: true
---

# Mengapa Sistem Ini Perlu Dikembangkan?

> **Status:** Arsip penelitian deteksi teks AI; bukan arah skripsi aktif. Lihat [inti penelitian kemiripan abstrak berbasis aspek dan risiko kebaruan](../kemiripan-abstrak-dan-risiko-kebaruan/01-inti-penelitian-5w1h.md). Isi berikut dipertahankan sebagai rekaman arah sebelumnya.

## Masalah yang mendasari

Unggahan X [@birdabo, 24 November 2025](https://x.com/birdabo/status/1992885816717402313) mengklaim Deklarasi Kemerdekaan AS tahun 1776 ditandai 99,99% sebagai tulisan AI. Unggahan Instagram [@voxnetizens, 23 Oktober 2026](https://www.instagram.com/p/De1Mkk6lOoZ/) menyebut tulisan majalah tahun 2017 terdeteksi 100% buatan AI. Keduanya menggambarkan percakapan dan kekhawatiran publik, bukan pengujian ilmiah; klaimnya belum diverifikasi secara independen.

Bukti jurnal menunjukkan masalah yang lebih terukur. Syahputra dkk. (2026) meneliti abstrak Indonesia dan parafrasa IndoT5. Pada satu kondisi, mDeBERTa zero-shot NLI salah menandai 790 dari 1.137 abstrak manusia-proksi. Penelitian yang sama melaporkan hasil Random Forest lebih baik, dengan masukan dan pembagian data berbeda. Ini bukan bukti semua detektor Indonesia gagal, maupun perkiraan kesalahan IndoBERT pada bagian artikel.

Cheng dkk. (2025) menguji pendahuluan dari 30 artikel simulasi kesehatan dalam lima kondisi penulisan atau penyuntingan manusia dan AI. Alat dapat membedakan kondisi, tetapi skornya bervariasi. Hasilnya terbatas pada eksperimen tersebut, bukan pengujian artikel Indonesia. Rincian sumber ada di [penelitian terdahulu](03-matriks-komparasi-jurnal-landasan-deteksi-ai.md).

## Mengapa dikembangkan sebagai sistem

Kebutuhan bersama yang dituju adalah pemeriksaan naskah. Rancangan ini menghubungkan unggah PDF, deteksi bagian teks, dan tampilan artikel agar pengguna dapat memeriksa bagian tertentu dalam konteksnya, bukan menerima vonis untuk seluruh dokumen. Ini alasan perancangan, bukan manfaat penandaan yang sudah terbukti melalui eksperimen atau kebutuhan pengguna yang sudah tervalidasi.

Detektor dan aplikasi Indonesia sudah ada: Pitriani dkk. (2025) mengintegrasikan IndoBERT dengan penilaian esai, sedangkan Alif dkk. (2026) menerapkan detektor BiLSTM dalam aplikasi web. Unggah PDF, dukungan Indonesia, IndoBERT, dan sorotan teks tidak dengan sendirinya membuktikan kebaruan.

## Dampak yang dituju dalam skripsi

**Manfaat praktis yang dituju:** mendukung pemeriksaan dan diskusi naskah. Penanda bukan bukti pelanggaran; bantuan penyuntingan yang diperbolehkan tidak otomatis merupakan kecurangan. Penghematan waktu, berkurangnya tuduhan salah, atau keputusan yang lebih baik belum dibuktikan.

**Keluaran skripsi:** aplikasi, model dan penyesuaian skornya, serta hasil pengukuran kemampuan dan keterbatasan. Pengujian perlu membedakan keberhasilan fungsi aplikasi, ketepatan deteksi, dan keandalan skor, sebagaimana dijelaskan dalam [rancangan pengujian](05-rancangan-metode-data-dan-evaluasi.md).

Gabungan tersebut merupakan arah pengembangan yang perlu diuji, bukan celah penelitian atau kebutuhan pengguna yang sudah dipastikan.
