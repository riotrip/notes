---
category: Landasan
date: 2026-11-06
---

# Inti Penelitian Kemiripan Abstrak Berbasis Aspek dan Risiko Kebaruan

> **Status:** Ringkasan arah penelitian; bukan laporan hasil eksperimen.

**Penyelarasan: 18 November 2026.** Fokus penelitian adalah reranking masalah–objek. Judul proposal belum diganti sebelum persetujuan pembimbing jelas.

**Tujuan skripsi ini adalah mengembangkan dan menguji sistem yang membantu dosen JTI Polinema membandingkan abstrak usulan dengan penelitian terdahulu berdasarkan masalah dan objeknya.** Metode ditampilkan sebagai informasi pendamping. Sistem diarahkan untuk menunjukkan kategori kemiripan dan pasangan kata atau frasa yang dapat diperiksa dosen. Alat persiapan data sudah tersedia, tetapi pipeline kemiripan belum lengkap.

Urutan baca: **1. Inti penelitian** · [2. Mengapa perlu dikembangkan](02-latar-belakang-dan-urgensi.md) · [3. Penelitian terdahulu dan metodenya](03-matriks-literatur-landasan.md) · [4. Cara kerja sistem](04-landasan-konseptual-dan-posisi-penelitian.md) · [5. Data dan pengujian](05-rancangan-metode-data-dan-evaluasi.md) · [6. Sistem pembanding](06-sistem-pembanding-dan-pembeda.md). [Jejak penelusuran](07-jejak-penelusuran.md) memuat rincian sumber.

## Apa yang dikembangkan?

Kemiripan semantik berbasis aspek penelitian dan bantuan untuk menafsirkan overlap substansi. Skema aktif adalah masalah, objek, dan metode; metode hanya informasi. Kontribusi bukan label inti. Definisi operasional aspek belum menjadi protokol final.

Aplikasi mengambil kandidat dengan embedding abstrak utuh, lalu **mengurutkan ulang kandidat berdasarkan masalah dan objek**. Pertanyaan utama: apakah representasi kedua aspek secara terpisah memperbaiki urutan relevansi dibandingkan abstrak utuh dan gabungan teks masalah+objek, dengan kandidat dan encoder yang sama? Fokusnya reranking, bukan retrieval langsung per aspek atau pembuatan model bahasa dari nol.

Penelitian ini **bukan klasifikasi tulisan AI versus manusia**, bukan pembuktian plagiarisme, dan bukan pemberian vonis kebaruan otomatis. Menemukan penelitian serupa dapat membantu pemeriksaan, tetapi tidak membuktikan usulan tidak memiliki kontribusi. Tidak menemukan padanan juga tidak membuktikan kebaruan di seluruh literatur.

## Siapa yang dibantu?

Pengguna yang dituju adalah dosen JTI Polinema yang memeriksa usulan penelitian mahasiswa. Dosen tetap menafsirkan bukti dan mengambil keputusan akademik. Kebutuhan operasional, manfaat, dan penerimaan pengguna lokal belum dibuktikan melalui wawancara atau eksperimen; akses penilai ahli belum dipastikan.

## Mengapa perlu diteliti?

Satu skor kemiripan keseluruhan belum memperlihatkan apakah kesamaan terletak pada tujuan, metode, atau objek penelitian. Literatur aspect-based similarity memberi dasar untuk membedakan aspek, tetapi tidak menjamin skema yang diusulkan akan unggul pada abstrak Indonesia ([S4, §§3–5](https://aclanthology.org/2020.coling-main.545.pdf); [S5, §§3–5 dan §7](https://arxiv.org/pdf/2203.14541)).

Kemiripan konseptual juga berbeda dari kebaruan, dan penjelasan yang tampak masuk akal belum tentu mendukung penilaian yang tepat ([S2, §§3–4 dan §7](https://arxiv.org/html/2505.24615); [S6, §§4–5](https://arxiv.org/html/2603.10303)). Karena itu, sasaran ilmiahnya adalah **menguji kualitas perbandingan serta keterlacakan penjelasan**, bukan hanya menghasilkan skor. Argumentasi lengkap ada pada [urgensi](02-latar-belakang-dan-urgensi.md), dengan batas setiap studi pada [matriks](03-matriks-literatur-landasan.md).

## Masukan, keluaran, dan penggunaan

**Masukan utama:** satu abstrak usulan berbahasa Indonesia yang ditempel sebagai teks. Judul menjadi metadata dokumen pembanding; PDF bukan masukan pencarian.

**Keluaran yang dituju:** daftar penelitian terkait beserta judul, sumber, kategori kemiripan kandidat dan aspek, metode sebagai informasi pendamping, serta kedua abstrak dengan highlight pasangan kata atau frasa. Merah/oranye/hijau menyatakan tinggi/sedang/rendah. Ambang ditentukan dari penilaian manusia, bukan urutan hasil. Skor angka tidak ditampilkan kepada pengguna.

Aspek yang tidak ditemukan diberi keterangan **tidak teridentifikasi**, bukan rendah. Jika satu aspek tersedia, sistem memakai aspek itu dengan keterangan keterbatasan. Jika masalah dan objek pada input sama-sama tidak teridentifikasi, sistem memakai urutan abstrak utuh dan memberi pemberitahuan.

Jika tidak ada hasil berkategori tinggi, kandidat terdekat tetap ditampilkan. Nilai kemiripan bukan persentase kebaruan. [Alur sistem](04-landasan-konseptual-dan-posisi-penelitian.md#alur-sistem-yang-diselaraskan) menjelaskan tahap pencarian dan perbandingannya.

## Batas sumber pembanding

**Korpus dibatasi pada abstrak skripsi/TA JTI Polinema berbahasa Indonesia.** Jurnal tetap menjadi literatur landasan, bukan bagian korpus dalam lingkup ini. Data lokal tersedia untuk ditinjau; kelengkapan, izin penggunaan, dan cakupan korpus final masih perlu dipastikan.

Kesimpulan sistem bersifat **corpus-relative**: hanya terhadap penelitian yang tersedia dan berhasil dibandingkan. Cakupan korpus serta informasi yang tidak tercantum dalam abstrak membatasi interpretasi risiko.

Semantic Scholar dipakai untuk pencarian dan pemeriksaan metadata literatur. Penggunaan S2 tidak otomatis berarti seluruh paper S2 menjadi dataset pembanding atau API/graph S2 harus terhubung saat aplikasi berjalan.

## Posisi saat ini

Alat persiapan data, prapemrosesan, template anotasi, dan review lokal sudah tersedia. Data masih perlu dikurasi sebelum menjadi korpus eksperimen. Classifier, embedding/index, reranking, kalibrasi, alignment, dan evaluasi ahli belum tersedia.

Tiga kondisi utama adalah **A: abstrak utuh, B: gabungan masalah–objek, dan C: aspek terpisah**. Ketiganya memakai kandidat dan encoder yang sama. Tujuannya menguji pengaruh pemilihan teks aspek dan pemisahan representasi, bukan membuktikan C pasti lebih baik.

Model dan pipeline dikerjakan lebih dahulu, kemudian evaluasi dan halaman web sistem kemiripan. [Rencana data dan pengujian](05-rancangan-metode-data-dan-evaluasi.md) memuat kebutuhan anotasi serta pilot; [keputusan dan status penelitian](07-jejak-penelusuran.md) memisahkan alur tetap dari hal yang masih terbuka.
