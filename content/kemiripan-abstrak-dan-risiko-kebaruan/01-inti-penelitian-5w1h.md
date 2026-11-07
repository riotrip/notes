---
category: Landasan
date: 2026-11-06
---

# Inti Penelitian Kemiripan Abstrak Berbasis Aspek dan Risiko Kebaruan

> **Status:** Catatan fondasi penelitian; bukan metodologi final atau laporan hasil eksperimen. Arah ini menggantikan penelitian deteksi teks AI.

**Tujuan skripsi ini adalah mengembangkan dan menguji sistem yang membantu dosen JTI Polinema membandingkan abstrak usulan dengan penelitian terdahulu berdasarkan tujuan, metode, dan data/objeknya.** Sistem menunjukkan bagian yang serupa, bagian yang berbeda, dan kutipan pendukung agar dosen dapat mempertimbangkan risiko kebaruan. Sistem belum dibangun; kemiripan bukan vonis bahwa penelitian tidak baru.

Urutan baca: **1. Inti penelitian** · [2. Mengapa perlu dikembangkan](02-latar-belakang-dan-urgensi.md) · [3. Penelitian terdahulu dan metodenya](03-matriks-literatur-landasan.md) · [4. Cara kerja sistem](04-landasan-konseptual-dan-posisi-penelitian.md) · [5. Data dan pengujian](05-rancangan-metode-data-dan-evaluasi.md) · [6. Sistem pembanding](06-sistem-pembanding-dan-pembeda.md). [Jejak penelusuran](07-jejak-penelusuran.md) memuat rincian sumber.

## Apa yang dikembangkan?

Kemiripan semantik berbasis aspek penelitian dan bantuan untuk menafsirkan overlap substansi. Aspek usulan meliputi masalah/tujuan, metode, data/objek, serta kontribusi bila tersedia. Definisi aspek dan cara pengolahannya belum menjadi protokol final.

Aplikasi menghubungkan pengambilan abstrak, pencarian penelitian terkait, perbandingan per aspek, dan tampilan bukti. Pekerjaan model mendukung alur itu; bukan membuat model bahasa dari nol. Pertanyaan utamanya: **apakah membandingkan per aspek lebih tepat dalam menemukan tumpang tindih substansi daripada membandingkan abstrak secara utuh?**

Penelitian ini **bukan klasifikasi tulisan AI versus manusia**, bukan pembuktian plagiarisme, dan bukan pemberian vonis kebaruan otomatis. Menemukan penelitian serupa dapat membantu pemeriksaan, tetapi tidak membuktikan usulan tidak memiliki kontribusi. Tidak menemukan padanan juga tidak membuktikan kebaruan di seluruh literatur.

## Siapa yang dibantu?

Pengguna yang dituju adalah dosen JTI Polinema yang memeriksa usulan penelitian mahasiswa. Dosen tetap menafsirkan bukti dan mengambil keputusan akademik. Kebutuhan operasional, manfaat, dan penerimaan pengguna lokal belum dibuktikan melalui wawancara atau eksperimen; akses penilai ahli belum dipastikan.

## Mengapa perlu diteliti?

Satu skor kemiripan keseluruhan belum memperlihatkan apakah kesamaan terletak pada tujuan, metode, atau objek penelitian. Literatur aspect-based similarity memberi dasar untuk membedakan aspek, tetapi tidak menjamin skema yang diusulkan akan unggul pada abstrak Indonesia ([S4, §§3–5](https://aclanthology.org/2020.coling-main.545.pdf); [S5, §§3–5 dan §7](https://arxiv.org/pdf/2203.14541)).

Kemiripan konseptual juga berbeda dari kebaruan, dan penjelasan yang tampak masuk akal belum tentu mendukung penilaian yang tepat ([S2, §§3–4 dan §7](https://arxiv.org/html/2505.24615); [S6, §§4–5](https://arxiv.org/html/2603.10303)). Karena itu, sasaran ilmiahnya adalah **menguji kualitas perbandingan serta keterlacakan penjelasan**, bukan hanya menghasilkan skor. Argumentasi lengkap ada pada [urgensi](02-latar-belakang-dan-urgensi.md), dengan batas setiap studi pada [matriks](03-matriks-literatur-landasan.md).

## Masukan, keluaran, dan penggunaan

**Masukan yang dituju:** PDF atau teks tempel abstrak usulan penelitian.

**Keluaran konseptual:** penelitian terkait dari korpus pembanding, kemiripan per aspek, persamaan dan perbedaan, kutipan teks pendukung, serta indikasi risiko kebaruan beserta batas bukti. Aspek yang tidak tertulis dinyatakan tidak tersedia; bukan dianggap berbeda, diberi skor nol, atau dikarang.

Dosen memasukkan abstrak, memeriksa penelitian terkait yang ditemukan, lalu membaca persamaan dan perbedaan tiap aspek beserta teks asalnya. **Contoh hipotetis:** dua penelitian memakai metode yang sama, tetapi tujuan dan objeknya berbeda. Sistem perlu memperlihatkan letak kesamaannya, bukan langsung menyebut keduanya duplikat.

Nilai kemiripan bukan persentase kebaruan. Bentuk laporan, layout, stack, API, model, dan aturan penetapan risiko belum dipilih.

## Batas sumber pembanding

**Jurnal Informatika Polinema (JIP) adalah calon sumber dataset, bukan pembatas literatur landasan.** Dataset tersebut direncanakan berupa abstrak artikel jurnal; tidak otomatis mewakili seluruh skripsi historis JTI. Label “korpus abstrak skripsi” pada gambar riset manual diperlakukan sebagai gagasan awal dan disesuaikan dengan klarifikasi sumber data ini.

Kesimpulan sistem bersifat **corpus-relative**: hanya terhadap penelitian yang tersedia dan berhasil dibandingkan. Cakupan korpus serta informasi yang tidak tercantum dalam abstrak membatasi interpretasi risiko.

Semantic Scholar dipakai untuk pencarian dan pemeriksaan metadata literatur. Penggunaan S2 tidak otomatis berarti seluruh paper S2 menjadi dataset pembanding atau API/graph S2 harus terhubung saat aplikasi berjalan.

## Posisi saat ini

Tahap saat ini adalah penetapan fondasi, latar belakang, urgensi, dan calon kontribusi. Belum ada scraping dataset, implementasi aplikasi, eksperimen model, atau metodologi final.

[RQ1–RQ3 dan kandidat M1–M4](04-landasan-konseptual-dan-posisi-penelitian.md) dipertahankan dari riset manual sebagai usulan sementara. RQ2 direkomendasikan sebagai fokus utama; RQ1 mendukung keandalan ekstraksi dan RQ3 memisahkan ketepatan penjelasan dari manfaat pengguna. Rekomendasi tersebut belum menetapkan angka, arsitektur final, atau protokol eksperimen.
