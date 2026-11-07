---
category: Metode
date: 2026-11-06
---

# Data, Pengembangan, dan Pengujian Kemiripan Abstrak

> **Status:** Usulan rancangan berdasarkan fondasi penelitian yang tersedia; bukan protokol final atau laporan hasil eksperimen.

**Yang diuji bukan hanya apakah aplikasi menghasilkan skor, tetapi apakah hasil perbandingannya tepat dan penjelasannya didukung teks.** [Tujuan sistem](01-inti-penelitian-5w1h.md) menjadi acuan; [RQ1–RQ3 dan kandidat M1–M4](04-landasan-konseptual-dan-posisi-penelitian.md) menjelaskan pertanyaan dan metode yang masih sementara.

## Data yang diperlukan

- **Korpus pembanding:** abstrak penelitian terdahulu beserta judul, identitas artikel, dan sumbernya. Jurnal Informatika Polinema (JIP) adalah calon sumber, bukan dataset yang sudah dikumpulkan dan bukan kumpulan seluruh skripsi JTI.
- **Abstrak kueri:** abstrak usulan yang akan dicari padanannya. Asal, izin penggunaan, jumlah, serta keterwakilannya belum ditetapkan.
- **Anotasi aspek:** penandaan bagian tujuan, metode, dan data/objek oleh penilai yang memahami pedoman. Kontribusi dapat dicatat bila tersedia; aspek yang tidak tertulis ditandai tidak tersedia.
- **Penilaian relevansi:** penilaian apakah pasangan abstrak memang memiliki tumpang tindih substansi, termasuk pada aspek mana. Ini berbeda dari label bahwa usulan pasti tidak baru.

Keluaran LLM tidak otomatis menjadi label ahli. Akses dosen atau anotator, pedoman penilaian, dan penanganan perbedaan pendapat belum dipastikan. Penelitian berbahasa Inggris dan benchmark sintetis pada [literatur landasan](03-matriks-literatur-landasan.md) tidak menggantikan validasi lokal.

## Pengambilan data dan prapemrosesan

Usulannya: ambil abstrak dan metadata dari sumber yang diizinkan, simpan tautan asal, rapikan artefak teks, lalu periksa duplikasi. Pertahankan teks asli agar kutipan hasil analisis dapat diperiksa. Jangan menghapus bagian yang membawa makna tujuan atau metode hanya untuk membuat teks lebih seragam.

Untuk masukan PDF, sistem perlu memastikan abstrak berhasil diambil sebelum melakukan perbandingan. PDF hasil pindai, OCR, pemisahan abstrak dari isi artikel, dan penanganan ekstraksi yang tidak layak belum ditetapkan. Teks yang gagal dibaca tidak boleh menghasilkan laporan seolah-olah analisis berhasil.

Duplikat atau versi karya yang sama perlu ditangani sebelum membentuk pembagian evaluasi. Penelitian juga perlu menetapkan batas waktu korpus agar karya yang terbit setelah usulan tidak diperlakukan sebagai penelitian terdahulu. Ini usulan pengendalian kebocoran, bukan pembagian data yang sudah dijalankan.

## Pengembangan yang diusulkan

Bangun alur masukan abstrak, pengelolaan korpus, ekstraksi aspek, pencarian dan perbandingan, lalu tampilan bukti. Kandidat pembanding bergerak dari **TF-IDF**, ke **Sentence-BERT abstrak utuh**, lalu **Sentence-BERT per aspek dengan rata-rata atau bobot**. Rinciannya ada pada [M1–M4](04-landasan-konseptual-dan-posisi-penelitian.md#kandidat-pembanding).

Perbandingan abstrak utuh dan per aspek perlu memakai encoder, korpus, serta kondisi evaluasi yang sepadan. Jika sekaligus mengganti model atau kandidat dokumen, pengaruh pemisahan aspek menjadi sulit dipisahkan. Bobot tidak dipilih berdasarkan hasil data uji; metode berbobot tidak diasumsikan unggul. Checkpoint, kebutuhan fine-tuning, ekstraktor, dan aturan untuk aspek yang hilang belum diputuskan.

## Pengujian yang dibedakan

Berikut rancangan pengujian yang diusulkan, bukan metrik atau protokol final.

| Bagian | Yang diperiksa | Bukti yang diperlukan |
|---|---|---|
| Fungsi aplikasi | Masukan terbaca, kegagalan ekstraksi terlihat, dokumen pembanding benar, kutipan kembali ke sumber yang tepat | Skenario penggunaan normal dan gagal; pemeriksaan hasil terhadap teks asli |
| Ekstraksi aspek — RQ1 | Bagian tujuan, metode, dan objek diambil dengan benar; informasi yang tidak tersedia tidak dikarang | Anotasi acuan; precision, recall, dan F1 dapat dipertimbangkan setelah unit serta aturan kecocokan ditetapkan |
| Pencarian dan perbandingan — RQ2 | Penelitian yang substansinya relevan ditemukan dan diberi urutan yang tepat | Penilaian relevansi pada kueri dan korpus yang sama; metrik seperti Precision@K, Recall@K, atau nDCG@K dipilih sesuai kelengkapan dan bentuk label |
| Ketepatan penjelasan — RQ3 | Kutipan benar-benar ada dan mendukung persamaan atau perbedaan yang dinyatakan | Pemeriksaan sumber dan rubrik penilai; tidak cukup hanya menilai penjelasan terdengar masuk akal |
| Manfaat bagi dosen — RQ3 | Laporan membantu memahami perbandingan dalam tugas pemeriksaan usulan | Tugas pengguna dan umpan balik dosen; kepuasan tidak disamakan dengan ketepatan keputusan akademik |

Pemisahan evaluasi skor dan penjelasan mempunyai landasan pada [RINoBench, S6, §§4–5](https://arxiv.org/html/2603.10303). Bentuk tugas dan labelnya tidak langsung dipindahkan ke konteks JTI.

Laporkan cakupan korpus dan kegagalan, termasuk abstrak yang tidak menyebut metode atau objek. **Skor kemiripan bukan probabilitas kebaruan.** Jika kelak keluaran memakai kategori risiko, definisi, penilai acuan, dan validasinya harus ditetapkan terlebih dahulu; jangan membuat label risiko hanya dari ambang cosine yang dipinjam dari studi lain.

## Prasyarat yang belum ditetapkan

Jumlah dan asal abstrak kueri; izin data; skema aspek; akses penilai; pedoman anotasi; model dan checkpoint; pembagian data; nilai K; bobot; penanganan aspek hilang; serta aturan interpretasi risiko. Belum ada scraping, aplikasi, ataupun hasil eksperimen untuk dilaporkan.

Lanjut: [sistem pembanding dan pembeda yang dituju](06-sistem-pembanding-dan-pembeda.md) · [jejak penelusuran](07-jejak-penelusuran.md).
