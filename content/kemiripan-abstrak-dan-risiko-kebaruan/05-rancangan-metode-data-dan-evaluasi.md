---
category: Metode
date: 2026-11-06
---

# Data, Pengembangan, dan Pengujian Kemiripan Abstrak

> **Status:** Rancangan data dan pengujian; belum ada hasil evaluasi model.

**Yang diuji bukan hanya apakah sistem menghasilkan urutan, tetapi apakah urutan, kategori, dan highlight sesuai penilaian ahli.** Tiga kondisi A, B, dan C pada [cara kerja sistem](04-landasan-konseptual-dan-posisi-penelitian.md#kandidat-pembanding) menjadi pembanding utama.

## Data yang diperlukan

- **Korpus pembanding:** abstrak skripsi/TA JTI Polinema berbahasa Indonesia, beserta identitas dokumen, judul, dan sumbernya. Jurnal dipakai sebagai literatur landasan, bukan bagian korpus dalam lingkup ini.
- **Kueri:** abstrak yang dipakai untuk mencari penelitian terkait. Asal kueri, izin penggunaan, dan jumlah akhirnya perlu ditetapkan melalui pilot.
- **Anotasi aspek:** label masalah, objek, dan metode pada setiap kalimat. Satu kalimat boleh memiliki beberapa label; semua label nol berarti lain.
- **Penilaian pasangan:** relevansi kandidat, kategori kemiripan, serta ketepatan pasangan kata atau frasa. Ini bukan label bahwa penelitian pasti baru atau tidak baru.

Folder data dan alat review lokal sudah tersedia. Data tersebut masih perlu ditinjau sebelum menjadi korpus eksperimen. Keberadaan berkas tidak membuktikan bahwa semua abstrak lengkap, sesuai lingkup, atau sudah disetujui penilai.

## Persiapan data dan prapemrosesan

1. Periksa sumber, izin penggunaan, kelengkapan abstrak, dan kesesuaian lingkup.
2. Simpan teks asli. Rapikan salinan untuk pengolahan, dengan posisi teks yang tetap dapat ditelusuri ke sumber.
3. Periksa duplikat dan versi karya yang sama sebelum membagi data.
4. Pisahkan data berdasarkan dokumen atau kelompok karya, bukan acak per kalimat.
5. Siapkan kalimat untuk anotasi dan periksa hasil pemisahannya.

Pembersihan ringan menjadi acuan. Setup awal menyediakan varian **P0 pembersihan minimal, P1 lowercase, P2 penyaringan tanda baca, dan P3 penghapusan stopword**. P2 dan P3 masing-masing berangkat dari P1; P3 bukan kelanjutan P2.

Varian prapemrosesan dibandingkan pada data pengembangan dengan encoder dan kandidat tetap. Penghapusan stopword bukan aturan wajib untuk Transformer karena dapat menghilangkan informasi penting, termasuk negasi. Stemming belum dimasukkan. Aturan terpilih harus sama untuk kueri dan korpus.

Judul disimpan sebagai metadata; masukan pencarian adalah abstrak. Teks yang melewati batas token model tidak boleh dipotong diam-diam. Simpan versi data, model, aturan pengolahan, dan cara penggabungan representasi agar eksperimen dapat diulang.

## Pedoman anotasi

Classifier menggunakan tiga keluaran biner: **masalah, objek, dan metode**. Label hanya diberikan berdasarkan informasi yang tertulis. Semua keluaran nol berarti lain, bukan data yang belum dinilai.

Pedoman perlu memuat definisi setiap aspek, contoh kalimat satu label dan multi-label, serta cara menangani kalimat yang tidak jelas. Label kosong berarti belum dianotasi; jangan menyamakannya dengan nol.

Anotasi manusia diperlukan untuk pelatihan dan evaluasi. Keluaran LLM tidak otomatis menjadi label ahli. LLM few-shot pernah dibahas sebagai alternatif, tetapi bukan bagian alur tetap saat ini.

## Pilot dan pembagian data

Pilot dipakai untuk memeriksa pedoman, waktu penilaian, keseimbangan label, kesepakatan penilai, dan beban kerja. Target **60 kueri uji** pada catatan awal tetap merupakan usulan kerja, bukan jumlah data yang sudah siap atau jaminan kecukupan.

| Bagian data | Penggunaan |
|---|---|
| Latih | Melatih classifier |
| Pengembangan/validasi | Memilih model, prapemrosesan, bobot penggabungan, dan ambang kategori |
| Uji | Mengukur hasil akhir setelah pengaturan dikunci |

Dokumen dan versi karya yang sama tidak boleh melintasi pembagian data. Data pengembangan untuk kalibrasi harus terpisah dari data uji ahli. Kueri, duplikat, dan versi karya yang sama juga dikeluarkan dari kandidat pembanding.

Data pilot yang sudah dipakai memperbaiki pedoman atau pengaturan tidak digunakan kembali sebagai data uji akhir. Jika memakai abstrak penelitian selesai sebagai kueri, laporkan bahwa kondisinya berbeda dari usulan nyata. Batas waktu korpus juga perlu dicatat agar karya yang terbit sesudah kueri tidak dianggap penelitian terdahulu.

Anotasi kalimat dan penilaian pasangan dihitung terpisah. Contoh beban: 60 kueri dengan 20 kandidat unik menghasilkan 1.200 pasangan, belum termasuk penilai kedua. Rencana awal penilaian kedua pada sebagian pasangan perlu ditetapkan melalui pilot; pilih secara terencana, bukan hanya kasus mudah. Laporkan kesepakatan dan cara menyelesaikan perbedaan penilaian.

## Retrieval dan tiga kondisi pengurutan

Retrieval awal mengambil **top-N kandidat dari embedding abstrak utuh**. Kandidat dan encoder yang sama dipakai untuk:

- **A:** urutan abstrak utuh.
- **B:** pengurutan berdasarkan satu embedding gabungan kalimat masalah–objek.
- **C:** pengurutan berdasarkan skor masalah dan objek yang dihitung terpisah, lalu digabung.

A dibanding B untuk melihat pengaruh pemilihan teks aspek. B dibanding C untuk melihat pengaruh pemisahan representasi. Bobot C ditentukan dari data pengembangan. TF-IDF dapat menjadi pembanding tambahan.

Bedakan **N kandidat retrieval** dari **K hasil yang ditampilkan atau dinilai pada peringkat teratas**. Nilai akhirnya belum dipilih; rentang 10–20 pada rancangan awal bukan ketentuan tetap.

### Pool penilaian

Pool penilaian adalah kumpulan pasangan yang dinilai manusia. Pool ini dapat diperluas melalui pencarian lebih dalam dan retriever berbeda seperti TF-IDF, lalu dideduplikasi. Pool yang lebih luas tidak mengubah kandidat tetap untuk perbandingan A, B, dan C.

Recall terhadap dokumen relevan yang diketahui dalam pool bukan recall seluruh korpus. Dokumen yang belum dinilai juga bukan otomatis tidak relevan. Laporkan cakupan penilaian, aturan dokumen belum dinilai, dan penanganan kueri tanpa kandidat relevan.

## Kategori dan highlight

Ambang **tinggi, sedang, dan rendah** ditentukan dari penilaian data pengembangan. Peringkat pertama tidak otomatis berkategori tinggi. Kategori diberikan untuk kandidat dan aspek yang dapat dibandingkan; skor angka tidak ditampilkan kepada pengguna.

Aspek yang tidak ditemukan ditandai **tidak teridentifikasi**, bukan rendah. Jika satu aspek tersedia, gunakan aspek itu dengan keterangan keterbatasan. Jika kedua aspek pada input tidak teridentifikasi, gunakan urutan abstrak utuh dan tampilkan pemberitahuan.

Highlight menandai **pasangan kata atau frasa yang sepadan maknanya pada kedua abstrak**. Posisi awal dan akhir harus merujuk teks asli. Label kalimat tidak otomatis menjadi pasangan highlight. Jika tidak ada pasangan, teks tetap ditampilkan tanpa highlight.

## Pengujian yang dibedakan

| Bagian | Yang diperiksa | Ukuran yang direncanakan |
|---|---|---|
| Pelabelan aspek | Ketepatan masalah, objek, dan metode | Precision, recall, F1 per label, serta micro-F1 dan macro-F1 |
| Retrieval awal | Kandidat relevan ditemukan sebelum reranking | Recall terhadap pool yang dinilai, dengan batas cakupannya |
| Pengurutan — utama | Perbandingan urutan A, B, dan C | nDCG@K, Precision@K, dan MRR; rubrik serta K ditetapkan sebelum uji akhir |
| Kategori | Kesesuaian tinggi, sedang, rendah dengan ahli | Accuracy, macro-F1, dan kesepakatan berbobot |
| Highlight | Pasangan yang ditandai benar-benar sepadan | Precision pasangan menurut ahli; recall jika pasangan acuan dianotasi |
| Operasional | Waktu pengolahan pada perangkat lokal | Waktu pencarian dan pembangunan indeks |

Ketepatan highlight tidak sama dengan kualitas ranking atau manfaat bagi pengguna. Pemisahan penilaian dan penjelasan juga dibahas dalam [RINoBench, S6, §§4–5](https://arxiv.org/html/2603.10303), tetapi tugas dan labelnya tidak langsung dipindahkan ke konteks JTI.

Uji fungsi juga mencakup input kosong, aspek hilang, duplikat, teks panjang, tidak adanya kategori tinggi, dan highlight yang tidak ditemukan. Jika semua hasil rendah, kandidat terdekat tetap ditampilkan. Klaim penghematan waktu atau perbaikan keputusan dosen memerlukan uji pengguna tersendiri.

## Status dan keputusan yang masih terbuka

**Tersedia:** alat persiapan data, deduplikasi dan pembagian kelompok dokumen, template/validasi anotasi, prapemrosesan P0–P3, CLI, notebook, serta alat review lokal.

**Belum tersedia:** classifier, embedding/index, pengurutan A/B/C, kalibrasi kategori, alignment pasangan, dan evaluasi ahli.

Yang masih perlu ditetapkan: korpus hasil kurasi dan izin penggunaannya, asal serta jumlah kueri, pedoman dan penilai, model, pembagian data final, N dan K, bobot C, ambang kategori, serta cara alignment. Urutan pengerjaan adalah **data dan anotasi → model/pipeline → evaluasi → halaman web sistem kemiripan**. Situs notes bukan aplikasi pengujian kemiripan.

Lanjut: [sistem pembanding dan pembeda yang dituju](06-sistem-pembanding-dan-pembeda.md).
