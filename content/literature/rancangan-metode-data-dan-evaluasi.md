# Rancangan Metode, Data, dan Evaluasi

**Tanggal konsolidasi:** 2026-10-30  
**Status:** Rancangan awal, bukan protokol final; belum mengubah `PRD.md`. Audit jumlah data, akses, lisensi, dan kecukupan sampel masih diperlukan.

## 1. Fokus kerja sementara

Fokus umum yang diusulkan adalah evaluasi kinerja satu detektor IndoBERT pada abstrak ilmiah berbahasa Indonesia dari jurnal terpilih lintas bidang. Bidang jurnal dan metode artikel (kualitatif, kuantitatif, *mixed methods*, serta kategori lain yang muncul) diperlakukan sebagai karakteristik/subkelompok jika ukuran sampel memadai; bukan asumsi bahwa satu metode lebih mudah dideteksi.

Pertanyaan awal dari rancangan korpus:

> Seberapa baik IndoBERT membedakan abstrak ilmiah berbahasa Indonesia *human-proxy* dan abstrak sintetis pada jurnal lintas bidang terpilih, dan bagaimana kinerjanya bervariasi menurut bidang serta karakteristik artikel yang jumlah sampelnya memadai?

Catatan teori juga mengusulkan RQ lanjutan tentang perbandingan IndoBERT dengan baseline TF-IDF + SVM, evaluasi confidence sebelum/sesudah Temperature Scaling, serta variasi menurut panjang teks, bidang, atau generator. RQ final dan apakah prototipe diuji sebagai tujuan terpisah belum diputuskan. Jangan memperlakukan RQ tersebut sebagai keputusan final.

## 2. Cakupan sumber dan unit analisis

- Pilih jurnal ilmiah Indonesia dari lebih dari satu bidang setelah audit bahasa, jumlah artikel, akses teks lengkap, lisensi, tahun, dan variasi karakteristik artikel. Jangan menyatakan bahwa sampel terbatas mewakili semua jurnal Indonesia.
- JIP dapat dipertimbangkan sebagai satu sumber informatika/komputasi; belum dipastikan terpilih dan tidak menjadi satu-satunya sumber.
- Pilih artikel dengan abstrak serta teks lengkap yang dapat diakses untuk keperluan penelitian dan ketentuan lisensinya dapat dipatuhi.
- Data manusia sebelum 30 November 2022 dapat digunakan sebagai *human-proxy* berdasarkan tanggal publikasi; ini bukan bukti bahwa penulis tidak pernah memakai AI atau alat bantu otomatis.
- Klasifikasikan metode dari teks penuh, terutama bagian metode/desain, bukan dari gaya abstrak. Simpan kategori kualitatif, kuantitatif, *mixed methods*, `unclear`, dan kategori lain jika relevan. Jenis artikel (empiris, tinjauan, konseptual/editorial) dicatat terpisah; artikel non-empiris tidak otomatis digabung dalam evaluasi artikel penelitian.
- Jika suatu kelompok langka, laporkan kecukupan sampel dan jangan memaksakan perbandingan subkelompok.

## 3. Unit pasangan dan skema data

Satu artikel sumber berpotensi menghasilkan pasangan: abstrak asli dan abstrak sintetis dari isi artikel yang sama. Label `AI-generated` berarti keluaran prosedur generasi penelitian, bukan klaim bahwa penulis artikel sumber memakai AI.

| Kolom inti | Isi |
|---|---|
| `article_id` | ID artikel stabil; pasangan teks dari artikel yang sama berbagi ID |
| `journal_id`, bidang jurnal, tahun | Identitas sumber dan metadata kelompok |
| `metode_artikel`, tipe artikel | Kategori yang ditentukan dari artikel penuh beserta dasar klasifikasinya |
| `tipe_teks`, `label` | Abstrak asli/*human-proxy* atau abstrak sintetis/`AI-generated` |
| teks | Teks abstrak sesuai hak akses dan kebijakan penyimpanan |

Catat pula DOI/URL, penulis, status akses/lisensi, dasar label dan klasifikasi metode, panjang/token, versi generator, prompt/konfigurasi, tanggal generasi, versi preprocessing, dan split (`train`, `validation`, `test`). Simpan respons mentah dan kegagalan generasi. Jangan menyebarkan teks sumber jika lisensi tidak mengizinkan.

## 4. Pengumpulan data yang diusulkan

1. Tetapkan kriteria sumber dan audit jurnal kandidat di lebih dari satu bidang.
2. Hitung artikel per jurnal, bidang, tahun, tipe artikel, dan metode penelitian sebelum mengunci sumber serta kelompok analisis.
3. Ambil metadata/teks dari laman jurnal resmi, OAI-PMH, atau repositori yang tersedia. Catat provenance, metode akses, tanggal retrieval, status lisensi, dan alasan inklusi/eksklusi.
4. Klasifikasikan bidang, tipe artikel, dan metode dengan membaca teks penuh. Tandai metode tak jelas sebagai `unclear`; bila memungkinkan, periksa ulang sebagian sampel untuk menguji konsistensi.
5. Buat abstrak sintetis dari isi artikel tanpa memberikan abstrak asli kepada generator. Gunakan model/versi, prompt, parameter, dan instruksi panjang yang konsisten; catat setiap keluaran dan kegagalan.
6. Simpan bahan mentah dan turunan secara terpisah. Untuk artefak publik, utamakan metadata, ID, tautan, skrip, dan hasil agregat yang sesuai lisensi.

**Sumber metadata JIP:** [endpoint OAI-PMH Jurnal Informatika Polinema](https://jurnal.polinema.ac.id/index.php/jip/oai?verb=Identify) menyediakan metadata artikel. Pada 30 Oktober 2026, atribut `completeListSize` dalam respons [`ListIdentifiers`](https://jurnal.polinema.ac.id/index.php/jip/oai?verb=ListIdentifiers&metadataPrefix=oai_dc) mencantumkan **640 item**; jumlah ini bukan jumlah artikel yang sudah memenuhi kriteria penelitian. Menurut [OAI-PMH §2.5 dan §2.7.1](https://www.openarchives.org/OAI/openarchivesprotocol.html#SelectiveHarvestingandDatestamps), datestamp menunjukkan waktu pembuatan, perubahan, atau penghapusan rekaman metadata, bukan tanggal publikasi artikel. Seleksi tahun harus memakai tanggal terbit dalam metadata artikel. Estimasi 320–480 artikel dalam PRD masih memerlukan penghitungan berdasarkan kriteria bahasa, tahun, akses, dan lisensi; akses OAI tidak otomatis memberikan hak penggunaan teks.

## 5. Pemrosesan dan integritas eksperimen

- Ekstrak abstrak asli dengan pencatatan sumber; bersihkan artefak HTML/OCR tanpa mengubah isi substantif dan pertahankan salinan sumber.
- Deduplikasi sebelum pembagian data. Semua pasangan dan varian dari artikel yang sama, termasuk salinan/versi duplikatnya, harus berada pada split yang sama.
- Nyatakan unit pemisahan: split berbasis `article_id` mencegah kebocoran pasangan, tetapi tidak otomatis menguji generalisasi ke jurnal yang belum terlihat. Klaim lintas-jurnal membutuhkan jurnal uji yang ditahan terpisah. Jangan memilih model atau threshold berdasarkan test; catat seed, versi dataset, preprocessing, tokenisasi, dan konfigurasi.
- Terapkan aturan pembersihan yang sama lintas label. Tokenisasi mengikuti model: tokenizer IndoBERT dan tokenisasi TF-IDF tidak harus identik. Fit vocabulary/IDF dan transformasi yang mempelajari statistik hanya pada train, kemudian terapkan ke validation/test.
- Laporkan jumlah pasangan, sumber/jurnal, bidang, tahun, panjang teks, serta metode per kelompok. Ketimpangan komposisi dapat mencampuradukkan efek metode dengan bidang, jurnal, atau panjang. Utamakan analisis terstratifikasi/perbandingan dalam sumber yang sama bila layak.

## 6. Model dan evaluasi yang diusulkan

- Model utama yang diusulkan: satu checkpoint IndoBERT yang ditetapkan sebelum evaluasi final. Baseline tambahan hanya jika desain dan ukuran data mendukung; catatan teori mengusulkan TF-IDF + SVM.
- Metrik diskriminasi/klasifikasi: macro-F1 dan AUROC, disertai precision, recall, confusion matrix, jumlah sampel, serta FPR pada kelas *human-proxy*.
- Sajikan hasil keseluruhan dan subkelompok bidang/metode hanya jika ukuran sampel memadai. Jangan menyimpulkan satu metode lebih mudah dideteksi hanya dari akurasi gabungan atau asosiasi subkelompok.
- Evaluasi confidence terpisah dari klasifikasi: bedakan `p_AI` vs confidence kelas terpilih. Diagram kelas AI membandingkan `p_AI` dengan proporsi AI, sedangkan diagram confidence membandingkan `max(p_AI,1-p_AI)` dengan akurasi. Nyatakan varian ECE, binning, jumlah sampel, serta konvensi Brier biner `mean((p_AI-y)^2)` atau jumlah atas dua kelas. Brier bukan kalibrasi murni. Kalibrasi pada korpus 50:50 tidak otomatis berlaku pada prevalensi AI dunia nyata yang berbeda; lihat Silva Filho dkk. (2023), §2–4, dalam matriks.
- Temperature Scaling (TS) adalah kandidat kalibrasi pascapelatihan, bukan keputusan final. Fit temperatur positif pada data kalibrasi yang tidak dipakai melatih classifier dan tidak memakai test; bedakan perannya dari validation untuk pemilihan model. TS standar mempertahankan argmax dan, dalam klasifikasi biner, AUROC. Label/FPR pada ambang 0,5 tetap, tetapi pada ambang probabilitas lain dapat berubah. Bandingkan sebelum/sesudah pada test yang sama dengan aturan keputusan dinyatakan. TS tidak memperbaiki label, representativitas, atau otomatis menghilangkan bias; lihat Balanya dkk. (2024), §2.2.
- Laporkan threshold dan trade-off kesalahan pada threshold tersebut. Jangan menyatakan satu threshold universal. Beri batas generalisasi menurut jurnal, bidang, tahun, bahasa, generator, model, prompt, dan protokol yang benar-benar diuji.
- Kalibrasi ECE/Brier dapat menjadi analisis tambahan apabila jumlah sampel dan waktu memadai; tetapkan sebelum evaluasi test.

## 7. Keputusan terbuka dan rencana audit

1. Audit jurnal kandidat: jumlah artikel, tahun, bahasa, akses full text, lisensi, panjang abstrak, dan distribusi tipe/metode.
2. Pastikan kelompok untuk perbandingan memiliki jumlah memadai; persempit analisis subkelompok secara transparan bila tidak.
3. Uji aturan klasifikasi metode pada sampel kecil dari teks penuh, termasuk studi campuran dan desain yang tidak jelas.
4. Uji generasi abstrak pada artikel yang boleh diproses; pastikan abstrak asli tidak dimasukkan sebagai input.
5. Setelah audit, tetapkan apakah IndoBERT tetap satu-satunya model, apakah TF-IDF + SVM menjadi baseline, serta apakah TS/ECE/Brier layak menjadi tujuan sekunder.
6. Perbarui `PRD.md` hanya setelah fokus, kelayakan sampel, dan desain klasifikasi dikonfirmasi.

## Referensi konseptual yang disebut

- Barroga dkk. (2023): pembedaan pendekatan kualitatif, kuantitatif, dan *mixed methods*.
- Cheng dkk. (2025): contoh variasi kondisi teks manusia, AI-assisted, dan AI-generated.
- Pratama (2025): variasi kinerja/kesalahan menurut alat dan konteks abstrak.
- Syahputra dkk. (2026): dataset abstrak ilmiah Indonesia dengan keluaran parafrasa IndoT5; bukan generasi abstrak dari isi artikel.
- Zhang & Zhou (2026): abstrak sintetis dari judul, evaluasi lintas bidang, serta stratifikasi berdasarkan document ID dan deduplikasi. Pemisahan semua pasangan sumber–turunan ke split yang sama tetap perlu dinyatakan eksplisit dalam protokol penelitian ini.

Rincian bibliografi dan komparasi sumber tersedia di [matriks jurnal](matriks-komparasi-jurnal-landasan-deteksi-ai.md). Rancangan ini belum merupakan protokol final dan tidak menyatakan bahwa data atau eksperimen sudah dijalankan.
