---
category: Metode
date: 2026-11-06
---

# Data, Pengembangan, dan Pengujian Kemiripan Abstrak

> **Status:** Usulan rancangan berdasarkan fondasi penelitian yang tersedia; bukan protokol final atau laporan hasil eksperimen.

**Yang diuji bukan hanya apakah aplikasi menghasilkan skor, tetapi apakah pengurutan ulang kandidatnya tepat dan penjelasannya didukung teks.** Revisi keputusan: **9 November 2026**. [RQ1–RQ3 dan pembanding M1–M4](04-landasan-konseptual-dan-posisi-penelitian.md) menjadi acuan; akses data, anotator, persetujuan pembimbing, dan jadwal tetap terbuka.

## Data yang diperlukan

- **Korpus pembanding:** abstrak skripsi dan jurnal beserta judul, identitas karya, tautan asal, dan label sumber. JIP adalah calon sumber jurnal; sumber skripsi dan izin akses belum dipastikan. Data belum dinyatakan sudah terkumpul.
- **Kueri:** target **60 kueri evaluasi akhir setelah pilot**, berupa judul dan abstrak; bukan 60 kueri yang sudah tersedia. Asal dan izin penggunaan belum diputuskan. Kueri, duplikat, dan versi karya yang sama harus dikeluarkan dari korpus pembanding.
- **Anotasi aspek:** penandaan kalimat masalah, objek, dan metode untuk classifier **multi-label**. Satu kalimat boleh memiliki beberapa label sekaligus; metode hanya informasi, bukan komponen skor akhir. Pedoman untuk kalimat tanpa label inti masih perlu ditetapkan.
- **Penilaian relevansi:** penilaian apakah pasangan abstrak memang memiliki tumpang tindih substansi, termasuk pada aspek mana. Ini berbeda dari label bahwa usulan pasti tidak baru.

Keluaran LLM tidak otomatis menjadi label ahli. Akses dosen atau anotator, pedoman penilaian, dan penanganan perbedaan pendapat belum dipastikan. Penelitian berbahasa Inggris dan benchmark sintetis pada [literatur landasan](03-matriks-literatur-landasan.md) tidak menggantikan validasi lokal.

## Pelabelan: keputusan dan cadangan

Pilihan utama adalah **classifier berbasis encoder dengan keluaran multi-label**. Kategori terbatas dan eksperimen terkontrol menjadi alasan pemilihan; ini keputusan rancangan, bukan klaim bahwa classifier pasti paling akurat. **RQ1 tetap diukur**, tetapi pengembangan classifier bukan kontribusi utama. Kesalahan label dapat memengaruhi kedua pembanding berbasis aspek.

| Pilihan | Kelebihan | Kekurangan dan posisi |
|---|---|---|
| Rule-based | Transparan, murah, tidak membutuhkan data latih | Rentan variasi bahasa dan kalimat multi-aspek; bukan metode utama |
| Classifier multi-label | Sesuai kategori tetap; dapat dilatih dan dievaluasi secara terkontrol | Membutuhkan anotasi manusia untuk pelatihan dan evaluasi; pilihan utama bersyarat akses anotator |
| LLM few-shot | Tidak memerlukan pelatihan classifier; dapat diarahkan dengan contoh | Sensitif terhadap prompt/model, biaya dan privasi perlu diperiksa; tetap membutuhkan gold set manusia |

**Rencana cadangan:** jika anotasi pelatihan classifier tidak tersedia atau tidak mencukupi, gunakan **LLM few-shot untuk pelabelan**, dievaluasi pada gold set manusia yang lebih kecil. Ini bukan pengganti penjelasan template. Contoh few-shot harus terpisah dari data evaluasi; model, prompt, dan contoh dicatat agar eksperimen dapat ditelusuri. Ukuran gold set kecil ditentukan lewat pilot dan membatasi kekuatan kesimpulan.

**Jika tidak ada penilai manusia sama sekali, cadangan ini belum dapat dievaluasi.** Jangan mengganti gold set dengan keluaran LLM atau menyatakan rencana tetap layak tanpa penilai.

## Pilot, target kueri, dan beban anotasi

Pilot dilakukan sebelum evaluasi akhir untuk menguji pedoman, waktu per penilaian, keseimbangan label aspek, kesepakatan penilai, dan ukuran pool yang realistis. Data pilot tidak digunakan kembali sebagai data uji akhir setelah dipakai mengubah pedoman, prompt, model, atau ambang.

Target kerja adalah **60 kueri uji setelah pilot**. Tabel berikut adalah skenario perencanaan dengan asumsi **20 dokumen unik dinilai per kueri**, bukan jaminan kecukupan statistik atau batas pool.

| Skenario | Kueri | Pasangan unik | Kelebihan | Kekurangan |
|---|---:|---:|---|---|
| Kecil | 30 | 600 | Beban lebih ringan untuk eksperimen awal | Lebih sensitif terhadap pemilihan kueri; bukan target akhir yang dipilih |
| Menengah — target | 60 | 1.200 | Kompromi keragaman kueri dan beban | Tetap membutuhkan pilot dan pengelolaan anotasi |
| Besar | 100 | 2.000 | Berpotensi memberi estimasi lebih stabil jika kueri representatif | Beban lebih tinggi; mutu anotasi tetap menentukan |

Rencana beban: semua pasangan dinilai satu orang; **subset sekitar 20–30% dinilai secara independen oleh penilai kedua** untuk mengukur kesepakatan. Proporsi dan cara memilih subset ditetapkan melalui pilot, bukan hanya memilih kasus mudah. Pada skenario 1.200 pasangan, ini berarti 240–360 penilaian tambahan, sehingga total 1.440–1.560 penilaian sebelum adjudikasi. Jika seluruh pasangan dinilai dua orang, totalnya 2.400. Ketentuan ini rancangan kerja, bukan klaim bahwa satu proporsi selalu cukup.

**Anotasi kalimat classifier dihitung terpisah.** Ilustrasi: bila satu abstrak berisi 6–8 kalimat, 100 abstrak menghasilkan sekitar 600–800 kalimat untuk dianotasi, bukan bukti jumlah itu sudah cukup melatih classifier. Satu kalimat dapat memperoleh beberapa label. Pisahkan data latih, validasi, dan uji berdasarkan karya, bukan acak per kalimat, agar kalimat dari abstrak yang sama tidak melintasi split.

### Asal kueri yang masih terbuka

- **Abstrak asli skripsi/jurnal yang ditahan dari korpus:** tidak membutuhkan penulisan ulang dan sumbernya dapat ditelusuri, tetapi abstrak penelitian selesai tidak identik dengan usulan nyata.
- **Usulan nyata:** lebih dekat dengan penggunaan dosen, tetapi membutuhkan akses, izin, dan perlindungan data. Jika ditulis ulang, simpan versi asli dan alasan perubahan; hasilnya tidak boleh dianggap mewakili usulan alami tanpa batasan.

**Rekomendasi, belum keputusan pengguna:** mulai dengan abstrak asli yang ditahan dari korpus, tanpa penulisan ulang. Pilihan asal 60 kueri belum dikunci dan harus menjadi keputusan pilot. Apa pun pilihannya, kueri, duplikat, dan versi karya yang sama tidak boleh menjadi kandidat pembanding. Kueri uji juga tidak digunakan untuk melatih atau menyetel pelabelan.

### Pool penilaian dan batas Recall@K

Pool penilaian tidak boleh hanya berisi kandidat top-10–20 dari retriever yang sama. Gabungkan kandidat dari pencarian lebih dalam, **misalnya top-50**, dan retriever berbeda seperti **TF-IDF**, lalu deduplikasi per kueri. Kedalaman dan komposisi final ditetapkan melalui pilot; pool yang lebih besar menaikkan jumlah pasangan di atas ilustrasi 1.200.

Bedakan **pool penilaian** dengan **kandidat reranking**. M2–M4 mengurutkan kandidat yang sama; pool yang lebih luas membantu memeriksa relevansi yang terlewat oleh retrieval awal tanpa mengubah kandidat tiap pembanding.

Pooling tetap tidak menjamin semua dokumen relevan dalam korpus telah ditemukan. Recall@K dengan penyebut dokumen relevan yang diketahui dalam pool harus disebut **recall terhadap pool yang dinilai**, bukan recall lengkap seluruh korpus. Dokumen yang belum dinilai bukan otomatis tidak relevan. Jika penilaian hanya mencakup kandidat reranking, klaim terbatas pada kualitas urutan di dalam kandidat.

Untuk nDCG@K, tetapkan rubrik relevansi bertingkat sejak pilot, nilai kandidat pembanding secara sepadan, dan laporkan cakupan penilaian serta aturan dokumen belum dinilai. Nilai K, perlakuan kueri tanpa dokumen relevan, dan prosedur pengukuran kesepakatan belum final.

## Pengambilan data dan prapemrosesan

Usulannya: ambil abstrak dan metadata dari sumber yang diizinkan, simpan tautan asal, rapikan artefak teks, lalu periksa duplikasi. Pertahankan teks asli agar kutipan hasil analisis dapat diperiksa. Jangan menghapus bagian yang membawa makna tujuan atau metode hanya untuk membuat teks lebih seragam.

Input utama adalah copas judul dan abstrak, bukan PDF. Prapemrosesan korpus harus mempertahankan keterlacakan kalimat ke teks asli; tidak menyatakan teks yang gagal diperoleh sebagai abstrak yang telah dianalisis.

Duplikat atau versi karya yang sama perlu ditangani sebelum membentuk pembagian evaluasi. Penelitian juga perlu menetapkan batas waktu korpus agar karya yang terbit setelah usulan tidak diperlakukan sebagai penelitian terdahulu. Ini usulan pengendalian kebocoran, bukan pembagian data yang sudah dijalankan.

## Pengembangan yang diusulkan

Bangun alur indeks embedding abstrak utuh, input judul + abstrak, retrieval awal sekitar 10–20 kandidat, pelabelan multi-label, **reranking masalah–objek**, penetapan tingkat, serta penjelasan dan kesimpulan berbasis **template dengan kutipan sumber**. [Diagram alur](04-landasan-konseptual-dan-posisi-penelitian.md#alur-sistem-yang-diselaraskan) menjadi acuan. Tidak diperlukan LLM generatif untuk penjelasan.

Pembanding: **M1 TF-IDF** sebagai baseline murah; tiga pembanding terkontrol adalah **M2 embedding abstrak utuh**, **M3 embedding gabungan teks masalah+objek**, dan **M4 embedding masalah dan objek terpisah lalu agregasi skor**. M2–M4 memakai kandidat dan encoder yang sama; M3/M4 memakai hasil pelabelan yang sama. M2 vs M3 menguji pemilihan aspek; M3 vs M4 menguji pemisahan representasi. Metode bukan komponen tersendiri dalam skor akhir M3/M4, tetapi kalimat multi-label masih dapat mengandung informasi metode.

Evaluasi retrieval awal dipisahkan dari reranking. Checkpoint, konfigurasi pelatihan classifier, dan agregasi skor M4 belum dipilih. Bobot dan ambang tidak ditentukan dari data uji. Jika bukti masalah atau objek tidak memadai, tampilkan **bukti tidak cukup**; template tidak boleh mengarang informasi atau menyimpulkan kebaruan.

## Pengujian yang dibedakan

Berikut rancangan pengujian yang diusulkan, bukan metrik atau protokol final.

| Bagian | Yang diperiksa | Bukti yang diperlukan |
|---|---|---|
| Fungsi aplikasi | Input teks terbaca, dokumen pembanding dan label sumber benar, highlight kembali ke teks asli, bukti tidak cukup dibedakan dari kemiripan rendah | Skenario penggunaan dan pemeriksaan hasil terhadap teks asli |
| Pelabelan aspek — RQ1 | Kalimat masalah, objek, dan metode dilabeli dengan benar; informasi yang tidak tersedia tidak dikarang | Anotasi acuan; precision, recall, dan F1 setelah unit serta aturan kecocokan ditetapkan |
| Retrieval awal — diagnostik pipeline | Kandidat relevan masuk sebelum reranking | Recall@K relatif terhadap pool yang diperluas; bukan klaim recall seluruh korpus bila penilaian tidak menyeluruh |
| Pengurutan akhir — RQ2 utama | Urutan kandidat sesuai relevansi masalah dan objek | nDCG@K dengan rubrik bertingkat dan kandidat sepadan; K final setelah pilot |
| Tingkat kemiripan | Merah/oranye/hijau sesuai kemiripan substansi tinggi/sedang/rendah | Rubrik manusia, kalibrasi ambang, dan evaluasi pada data terpisah; bukan label kebaruan otomatis |
| Ketepatan penjelasan — RQ3 | Kutipan benar-benar ada dan mendukung persamaan atau perbedaan yang dinyatakan | Pemeriksaan sumber dan rubrik penilai; tidak cukup hanya menilai penjelasan terdengar masuk akal |
| Manfaat bagi dosen — RQ3 | Laporan membantu memahami perbandingan dalam tugas pemeriksaan usulan | Tugas pengguna dan umpan balik dosen; kepuasan tidak disamakan dengan ketepatan keputusan akademik |

Pemisahan evaluasi skor dan penjelasan mempunyai landasan pada [RINoBench, S6, §§4–5](https://arxiv.org/html/2603.10303). Bentuk tugas dan labelnya tidak langsung dipindahkan ke konteks JTI.

Penilaian manusia dipakai untuk **retrieval, pelabelan, kalibrasi tingkat kemiripan, dan ketepatan penjelasan**. Pisahkan data pengembangan/kalibrasi dari evaluasi akhir; jangan memilih ambang atau bobot berdasarkan data uji. Cegah karya duplikat atau versinya melintasi pembagian data.

Laporkan cakupan korpus dan kegagalan, termasuk status bukti tidak cukup. **Skor kemiripan bukan probabilitas kebaruan.** Warna menunjukkan kemiripan substansi, bukan vonis risiko atau kelayakan usulan. Jangan meminjam ambang cosine studi lain tanpa validasi.

## Prasyarat yang belum ditetapkan

Sumber skripsi dan izin akses; asal 60 kueri; definisi operasional masalah–objek–metode dan aturan kalimat tanpa label; akses penilai; pedoman gold set; ukuran anotasi classifier; model dan checkpoint; pembagian data; kedalaman pool; K final; agregasi M4; ambang warna; posisi hasil bukti tidak cukup; jadwal; dan persetujuan pembimbing. Judul kerja baru belum menggantikan judul proposal yang mungkin sudah terdaftar. Target kueri dan classifier adalah keputusan rancangan bersyarat kelayakan, bukan klaim data atau eksperimen sudah tersedia.

Lanjut: [sistem pembanding dan pembeda yang dituju](06-sistem-pembanding-dan-pembeda.md) · [jejak penelusuran](07-jejak-penelusuran.md).
