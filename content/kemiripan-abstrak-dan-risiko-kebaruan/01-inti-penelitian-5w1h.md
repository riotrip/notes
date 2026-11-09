---
category: Landasan
date: 2026-11-06
---

# Inti Penelitian Kemiripan Abstrak Berbasis Aspek dan Risiko Kebaruan

> **Status:** Catatan fondasi penelitian; bukan metodologi final atau laporan hasil eksperimen. Arah ini menggantikan penelitian deteksi teks AI.

**Tujuan skripsi ini adalah mengembangkan dan menguji sistem yang membantu dosen JTI Polinema membandingkan abstrak usulan dengan penelitian terdahulu berdasarkan masalah dan objeknya.** Metode dilabeli sebagai informasi, bukan penentu skor akhir. Sistem menunjukkan bagian yang serupa, bagian yang berbeda, dan kutipan pendukung agar dosen dapat mempertimbangkan risiko kebaruan. Sistem belum dibangun; kemiripan bukan vonis bahwa penelitian tidak baru.

Urutan baca: **1. Inti penelitian** · [2. Mengapa perlu dikembangkan](02-latar-belakang-dan-urgensi.md) · [3. Penelitian terdahulu dan metodenya](03-matriks-literatur-landasan.md) · [4. Cara kerja sistem](04-landasan-konseptual-dan-posisi-penelitian.md) · [5. Data dan pengujian](05-rancangan-metode-data-dan-evaluasi.md) · [6. Sistem pembanding](06-sistem-pembanding-dan-pembeda.md). [Jejak penelusuran](07-jejak-penelusuran.md) memuat rincian sumber.

## Apa yang dikembangkan?

Kemiripan semantik berbasis aspek penelitian dan bantuan untuk menafsirkan overlap substansi. Skema aktif adalah masalah, objek, dan metode; metode hanya informasi. Kontribusi bukan label inti. Definisi operasional aspek belum menjadi protokol final.

Aplikasi menghubungkan pengambilan abstrak, pencarian penelitian terkait, perbandingan per aspek, dan tampilan bukti. Pekerjaan model mendukung alur itu; bukan membuat model bahasa dari nol. Pertanyaan utamanya: **apakah membandingkan per aspek lebih tepat dalam menemukan tumpang tindih substansi daripada membandingkan abstrak secara utuh?**

Penelitian ini **bukan klasifikasi tulisan AI versus manusia**, bukan pembuktian plagiarisme, dan bukan pemberian vonis kebaruan otomatis. Menemukan penelitian serupa dapat membantu pemeriksaan, tetapi tidak membuktikan usulan tidak memiliki kontribusi. Tidak menemukan padanan juga tidak membuktikan kebaruan di seluruh literatur.

## Siapa yang dibantu?

Pengguna yang dituju adalah dosen JTI Polinema yang memeriksa usulan penelitian mahasiswa. Dosen tetap menafsirkan bukti dan mengambil keputusan akademik. Kebutuhan operasional, manfaat, dan penerimaan pengguna lokal belum dibuktikan melalui wawancara atau eksperimen; akses penilai ahli belum dipastikan.

## Mengapa perlu diteliti?

Satu skor kemiripan keseluruhan belum memperlihatkan apakah kesamaan terletak pada tujuan, metode, atau objek penelitian. Literatur aspect-based similarity memberi dasar untuk membedakan aspek, tetapi tidak menjamin skema yang diusulkan akan unggul pada abstrak Indonesia ([S4, §§3–5](https://aclanthology.org/2020.coling-main.545.pdf); [S5, §§3–5 dan §7](https://arxiv.org/pdf/2203.14541)).

Kemiripan konseptual juga berbeda dari kebaruan, dan penjelasan yang tampak masuk akal belum tentu mendukung penilaian yang tepat ([S2, §§3–4 dan §7](https://arxiv.org/html/2505.24615); [S6, §§4–5](https://arxiv.org/html/2603.10303)). Karena itu, sasaran ilmiahnya adalah **menguji kualitas perbandingan serta keterlacakan penjelasan**, bukan hanya menghasilkan skor. Argumentasi lengkap ada pada [urgensi](02-latar-belakang-dan-urgensi.md), dengan batas setiap studi pada [matriks](03-matriks-literatur-landasan.md).

## Masukan, keluaran, dan penggunaan

**Masukan utama:** judul dan abstrak usulan penelitian yang ditempel sebagai teks. PDF bukan lingkup input utama.

**Keluaran yang dituju:** daftar penelitian diurutkan berdasarkan kemiripan masalah dan objek, dengan label sumber skripsi/jurnal, highlight, penjelasan, dan kesimpulan berbukti. Merah/oranye/hijau menyatakan kemiripan substansi tinggi/sedang/rendah; ambang harus dikalibrasi dari penilaian manusia. Metode tidak memengaruhi skor akhir, warna, atau urutan akhir.

Jika masalah atau objek tidak cukup jelas untuk dinilai, tampilkan **bukti tidak cukup**, bukan hijau atau skor nol. Dosen memeriksa bukti dan mengambil keputusan; metode yang sama saja tidak menjadikan dua penelitian duplikat.

Nilai kemiripan bukan persentase kebaruan. Layout, stack, API, model, agregasi skor, dan ambang belum dipilih. [Alur dan diagram sistem](04-landasan-konseptual-dan-posisi-penelitian.md#alur-sistem-yang-diselaraskan) menjelaskan persiapan korpus dan tahapan penggunaan.

## Batas sumber pembanding

**Korpus pembanding direncanakan mencakup abstrak skripsi dan jurnal, dengan label sumber terpisah.** Jurnal Informatika Polinema (JIP) tetap calon sumber jurnal, bukan pembatas literatur landasan. Sumber skripsi, izin akses, dan jumlah data belum dipastikan; korpus tidak otomatis mewakili seluruh skripsi historis JTI.

Kesimpulan sistem bersifat **corpus-relative**: hanya terhadap penelitian yang tersedia dan berhasil dibandingkan. Cakupan korpus serta informasi yang tidak tercantum dalam abstrak membatasi interpretasi risiko.

Semantic Scholar dipakai untuk pencarian dan pemeriksaan metadata literatur. Penggunaan S2 tidak otomatis berarti seluruh paper S2 menjadi dataset pembanding atau API/graph S2 harus terhubung saat aplikasi berjalan.

## Posisi saat ini

Tahap saat ini adalah penetapan fondasi, latar belakang, urgensi, dan calon kontribusi. Belum ada scraping dataset, implementasi aplikasi, eksperimen model, atau metodologi final.

[RQ1–RQ3 dan kandidat M1–M4](04-landasan-konseptual-dan-posisi-penelitian.md) dipertahankan dari riset manual sebagai usulan sementara. RQ2 direkomendasikan sebagai fokus utama; RQ1 mendukung keandalan ekstraksi dan RQ3 memisahkan ketepatan penjelasan dari manfaat pengguna. Rekomendasi tersebut belum menetapkan angka, arsitektur final, atau protokol eksperimen.
