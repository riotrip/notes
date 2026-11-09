---
category: Metode
date: 2026-11-06
---

# Data, Pengembangan, dan Pengujian Kemiripan Abstrak

> **Status:** Usulan rancangan berdasarkan fondasi penelitian yang tersedia; bukan protokol final atau laporan hasil eksperimen.

**Yang diuji bukan hanya apakah aplikasi menghasilkan skor, tetapi apakah hasil perbandingannya tepat dan penjelasannya didukung teks.** [Tujuan sistem](01-inti-penelitian-5w1h.md) menjadi acuan; [RQ1–RQ3 dan kandidat M1–M4](04-landasan-konseptual-dan-posisi-penelitian.md) menjelaskan pertanyaan dan metode yang masih sementara.

## Data yang diperlukan

- **Korpus pembanding:** abstrak skripsi dan jurnal beserta judul, identitas karya, tautan asal, dan label sumber. JIP adalah calon sumber jurnal; sumber skripsi dan izin akses belum dipastikan. Data belum dinyatakan sudah terkumpul.
- **Kueri:** judul dan abstrak usulan yang ditempel sebagai teks. Asal, izin penggunaan, jumlah, serta keterwakilannya belum ditetapkan.
- **Anotasi aspek:** penandaan kalimat masalah, objek, dan metode oleh manusia berdasarkan pedoman. Metode hanya informasi; bukan komponen skor akhir. Aturan kalimat multi-aspek dan tanpa label inti belum ditetapkan.
- **Penilaian relevansi:** penilaian apakah pasangan abstrak memang memiliki tumpang tindih substansi, termasuk pada aspek mana. Ini berbeda dari label bahwa usulan pasti tidak baru.

Keluaran LLM tidak otomatis menjadi label ahli. Akses dosen atau anotator, pedoman penilaian, dan penanganan perbedaan pendapat belum dipastikan. Penelitian berbahasa Inggris dan benchmark sintetis pada [literatur landasan](03-matriks-literatur-landasan.md) tidak menggantikan validasi lokal.

## Pengambilan data dan prapemrosesan

Usulannya: ambil abstrak dan metadata dari sumber yang diizinkan, simpan tautan asal, rapikan artefak teks, lalu periksa duplikasi. Pertahankan teks asli agar kutipan hasil analisis dapat diperiksa. Jangan menghapus bagian yang membawa makna tujuan atau metode hanya untuk membuat teks lebih seragam.

Input utama adalah copas judul dan abstrak, bukan PDF. Prapemrosesan korpus harus mempertahankan keterlacakan kalimat ke teks asli; tidak menyatakan teks yang gagal diperoleh sebagai abstrak yang telah dianalisis.

Duplikat atau versi karya yang sama perlu ditangani sebelum membentuk pembagian evaluasi. Penelitian juga perlu menetapkan batas waktu korpus agar karya yang terbit setelah usulan tidak diperlakukan sebagai penelitian terdahulu. Ini usulan pengendalian kebocoran, bukan pembagian data yang sudah dijalankan.

## Pengembangan yang diusulkan

Bangun alur persiapan korpus dan indeks embedding, input judul + abstrak, retrieval awal sekitar 10–20 kandidat, pelabelan kalimat input dan kandidat, perbandingan masalah–objek, penetapan tingkat, serta tampilan bukti. [Diagram alur](04-landasan-konseptual-dan-posisi-penelitian.md#alur-sistem-yang-diselaraskan) menjadi acuan. Kandidat pembanding adalah **TF-IDF**, **Sentence-BERT abstrak utuh**, lalu **Sentence-BERT masalah–objek dengan rata-rata atau bobot**; metode tidak masuk agregasi akhir M3/M4.

Perbandingan abstrak utuh dan per aspek perlu memakai encoder, korpus, serta kondisi evaluasi yang sepadan. Evaluasi retrieval awal dipisahkan dari pengurutan akhir agar kandidat yang terlewat tidak tersamarkan. Bobot tidak dipilih berdasarkan data uji; metode berbobot tidak diasumsikan unggul. Checkpoint, kebutuhan fine-tuning, ekstraktor, dan agregasi masalah–objek belum diputuskan. Jika bukti masalah atau objek tidak memadai, hasilnya **bukti tidak cukup**, bukan warna kemiripan.

## Pengujian yang dibedakan

Berikut rancangan pengujian yang diusulkan, bukan metrik atau protokol final.

| Bagian | Yang diperiksa | Bukti yang diperlukan |
|---|---|---|
| Fungsi aplikasi | Input teks terbaca, dokumen pembanding dan label sumber benar, highlight kembali ke teks asli, bukti tidak cukup dibedakan dari kemiripan rendah | Skenario penggunaan dan pemeriksaan hasil terhadap teks asli |
| Pelabelan aspek — RQ1 | Kalimat masalah, objek, dan metode dilabeli dengan benar; informasi yang tidak tersedia tidak dikarang | Anotasi acuan; precision, recall, dan F1 setelah unit serta aturan kecocokan ditetapkan |
| Retrieval awal — RQ2 | Kandidat relevan masuk hasil pencarian sebelum perbandingan per aspek | Recall@K untuk beberapa K, termasuk rentang awal 10–20; laporkan kelengkapan label relevansi |
| Pengurutan akhir — RQ2 | Penelitian diurutkan sesuai kemiripan masalah dan objek, bukan metode | Penilaian relevansi pada kandidat sepadan; Precision@K atau nDCG@K sesuai bentuk label |
| Tingkat kemiripan | Merah/oranye/hijau sesuai kemiripan substansi tinggi/sedang/rendah | Rubrik manusia, kalibrasi ambang, dan evaluasi pada data terpisah; bukan label kebaruan otomatis |
| Ketepatan penjelasan — RQ3 | Kutipan benar-benar ada dan mendukung persamaan atau perbedaan yang dinyatakan | Pemeriksaan sumber dan rubrik penilai; tidak cukup hanya menilai penjelasan terdengar masuk akal |
| Manfaat bagi dosen — RQ3 | Laporan membantu memahami perbandingan dalam tugas pemeriksaan usulan | Tugas pengguna dan umpan balik dosen; kepuasan tidak disamakan dengan ketepatan keputusan akademik |

Pemisahan evaluasi skor dan penjelasan mempunyai landasan pada [RINoBench, S6, §§4–5](https://arxiv.org/html/2603.10303). Bentuk tugas dan labelnya tidak langsung dipindahkan ke konteks JTI.

Penilaian manusia dipakai untuk **retrieval, pelabelan, kalibrasi tingkat kemiripan, dan ketepatan penjelasan**. Pisahkan data pengembangan/kalibrasi dari evaluasi akhir; jangan memilih ambang atau bobot berdasarkan data uji. Cegah karya duplikat atau versinya melintasi pembagian data.

Laporkan cakupan korpus dan kegagalan, termasuk status bukti tidak cukup. **Skor kemiripan bukan probabilitas kebaruan.** Warna menunjukkan kemiripan substansi, bukan vonis risiko atau kelayakan usulan. Jangan meminjam ambang cosine studi lain tanpa validasi.

## Prasyarat yang belum ditetapkan

Sumber skripsi dan izin akses; jumlah dan asal kueri; definisi operasional masalah–objek–metode; aturan multi-label; akses penilai; pedoman gold set; model dan checkpoint; pembagian data; K final; agregasi dan bobot masalah–objek; ambang warna; serta posisi tampilan hasil dengan bukti tidak cukup. Belum ada scraping, aplikasi, ataupun hasil eksperimen untuk dilaporkan.

Lanjut: [sistem pembanding dan pembeda yang dituju](06-sistem-pembanding-dan-pembeda.md) · [jejak penelusuran](07-jejak-penelusuran.md).
