---
category: Literatur
date: 2026-11-06
---

# Sistem dan Pendekatan yang Sudah Ada serta Pembeda yang Dituju

> **Status:** Ringkasan sumber dalam kajian 2026-11-05, bukan pengujian langsung produk atau bukti keunggulan sistem skripsi.

**Membandingkan penelitian dan menganalisis kebaruan bukan gagasan yang belum pernah dikerjakan.** Pembeda yang perlu diuji adalah kegunaan perbandingan per aspek beserta bukti teks pada abstrak Indonesia, bukan sekadar keberadaan fitur unggah atau angka kemiripan.

## Apa yang sudah dikerjakan?

Pembanding di bawah adalah sistem atau pendekatan penelitian yang terdokumentasi dalam literatur yang tersedia. Daftar ini bukan survei lengkap produk komersial; benchmark juga tidak disebut sebagai aplikasi siap pakai.

| Pembanding | Yang terdokumentasi | Hubungan dan batas perbandingan |
|---|---|---|
| **Sitorus & Madyatmadja — deteksi risiko kebaruan proposal Indonesia (S1)** | TF-IDF, LSA, dan IndoBERT membandingkan **judul** proposal dengan cosine dan menampilkan contextual warning. [Sumber, pp. 4–6 dan 10–11](https://thescipub.com/jcs/jcssp.2026.2444.2455.pdf). | Sama-sama mendukung penilaian manusia dalam konteks Indonesia. Data sumber adalah judul, bukan abstrak per aspek; tidak ada ground truth novelty manual. Angka 99,98% bukan akurasi deteksi kebaruan. |
| **Ostendorff dkk. — aspect-based document similarity (S4)** | Klasifikasi pasangan paper berdasarkan label aspek dari bagian sitasi, menggunakan judul dan abstrak utuh. [Sumber, §§3–5](https://aclanthology.org/2020.coling-main.545.pdf). | Menunjukkan kemiripan dapat dibedakan menurut aspek. Bukan ekstraksi potongan tujuan–metode–objek lalu cosine. |
| **Ostendorff dkk. — specialized document embeddings (S5)** | Melatih ruang embedding khusus **task, method, dataset** untuk pencarian paper dari judul dan abstrak utuh. [Sumber, §§3–5 dan §7](https://arxiv.org/pdf/2203.14541). | Pembanding ilmiah terdekat. Rancangan skripsi mengusulkan pengambilan bagian aspek sebelum perbandingan; perbedaan mekanisme bukan bukti bahwa rancangan baru lebih baik. |
| **Liu dkk. — scientific novelty detection (S2)** | Mengolah ide, memakai retriever hasil distillation, membandingkan melalui LLM, lalu mengklasifikasikan dengan decision tree. [Sumber, §§3–5 dan §7](https://arxiv.org/html/2505.24615); [kode](https://github.com/SenticNet/novelty-detection). | Relevan untuk analisis overlap ide, bukan hanya redaksi. Variasi sintetis dan asumsi label membatasi klaim; bukan validasi pada abstrak Indonesia. Semua komponennya tidak otomatis menjadi kebutuhan skripsi. |
| **RINoBench (S6)** | Benchmark penilaian novelty yang mengevaluasi skor dan penjelasan secara terpisah. [Sumber, §§4–5](https://arxiv.org/html/2603.10303). | Acuan untuk membedakan kualitas penilaian dari kualitas penjelasan, bukan produk pembanding unggah abstrak. Datanya berasal dari review ICLR dengan pemrosesan LLM, bukan penilaian dosen JTI. |

Metode, jenis publikasi, dan batas transfer lebih lengkap ada pada [matriks literatur](03-matriks-literatur-landasan.md); metadata dan cakupan baca ada pada [jejak penelusuran](07-jejak-penelusuran.md).

## Pembeda yang dituju

Skripsi diarahkan pada **sistem bantuan pemeriksaan abstrak Indonesia yang dikembangkan dan diuji**: dosen menempelkan judul dan abstrak, melihat kandidat dari korpus skripsi dan jurnal, lalu memeriksa kemiripan masalah dan objek beserta kutipan pendukungnya. Metode dilabeli sebagai informasi saja. Warna menunjukkan kemiripan substansi; bukti yang tidak memadai ditandai **bukti tidak cukup**, bukan dianggap berbeda atau diciptakan oleh model.

Revisi keputusan **9 November 2026**: kontribusi utama yang diuji adalah kualitas **reranking masalah–objek**. Pembanding terkontrol memisahkan efek memilih teks aspek dan memisahkan representasinya: abstrak utuh, gabungan masalah+objek, lalu masalah dan objek terpisah. TF-IDF tetap baseline murah. Classifier multi-label dievaluasi melalui RQ1, sedangkan penjelasan memakai template dan kutipan. Ini sasaran yang belum terbukti, bukan klaim fitur pertama atau algoritme baru. Sumber lokal dan konteks JTI saja tidak membuktikan kebaruan ilmiah.

## Apa yang tidak boleh diklaim?

- Belum ada sistem serupa di dunia: penelusuran yang tersedia tidak mendukung klaim global itu.
- Representasi per aspek pasti lebih unggul: [M1–M4](04-landasan-konseptual-dan-posisi-penelitian.md#kandidat-pembanding) adalah rancangan pembanding yang belum menghasilkan bukti keunggulan.
- Cosine tinggi berarti penelitian tidak baru: overlap metode atau objek tidak otomatis meniadakan kontribusi.
- Tidak menemukan padanan berarti pasti baru: hasil terbatas pada korpus dan informasi dalam abstrak.
- Sistem sudah terbukti menghemat waktu atau memperbaiki keputusan dosen: [pengujian pengguna](05-rancangan-metode-data-dan-evaluasi.md) belum dijalankan.

**Posisi singkat untuk dosen:** penelitian ini tidak menggantikan penilaian kebaruan oleh dosen. Yang dikembangkan adalah bantuan untuk memperlihatkan letak kesamaan dan perbedaan penelitian secara lebih terperinci, lalu menguji apakah bantuan tersebut memang tepat dan berguna.
