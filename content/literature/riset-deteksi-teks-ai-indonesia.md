---
date: 2026-10-27
---

# Rancangan Awal Penelitian: Deteksi Teks AI pada Abstrak Jurnal Ilmiah Indonesia

**Tanggal pembaruan:** 2026-10-27

**Status:** Rancangan awal untuk didiskusikan; belum menjadi keputusan final dan belum mengubah `PRD.md`.
**Tujuan catatan:** Menata masalah, urgensi, cakupan sumber jurnal dan jenis artikel, pengguna, contoh data, pengumpulan, serta pemrosesan data. Setiap bagian utama diberi rujukan artikel jurnal terbit 2022–2026. Catatan ini bukan tinjauan sistematis.

## Arah fokus yang disarankan

Fokus umum yang disarankan ialah mengevaluasi kinerja satu detektor IndoBERT pada abstrak ilmiah berbahasa Indonesia dari jurnal terpilih lintas bidang. **Jenis metode artikel menjadi salah satu karakteristik/subkelompok yang ditinjau**, bersama bidang jurnal dan tahun: kualitatif, kuantitatif, *mixed methods*, serta kategori lain yang memang muncul dalam korpus. Perbandingan kualitatif dan kuantitatif bukan batas utama keseluruhan topik; hasil per subkelompok bergantung pada kecukupan sampel dan tidak mengasumsikan salah satu lebih mudah dideteksi.

**Pertanyaan riset sementara:**

> Seberapa baik IndoBERT membedakan abstrak ilmiah berbahasa Indonesia *human-proxy* dan abstrak yang dihasilkan AI pada jurnal lintas bidang terpilih, dan bagaimana kinerja itu bervariasi menurut bidang jurnal serta karakteristik artikel, termasuk metode penelitian kualitatif, kuantitatif, atau campuran?

**Keputusan ruang lingkup sementara:** Fokus utama adalah evaluasi deteksi pada korpus jurnal Indonesia terpilih yang mencakup lebih dari satu bidang. Bidang dan metode penelitian dianalisis sebagai subkelompok; kualitatif/kuantitatif salah satunya, bukan keseluruhan cakupan. Kalibrasi ECE/Brier tetap analisis tambahan jika ukuran sampel memadai. Jangan menyimpulkan kinerja untuk semua jurnal Indonesia dari korpus terbatas.

**Rujukan:** Syahputra dkk. (2026) menggunakan sumber dari 18 jurnal Indonesia; Pratama (2025) menunjukkan variasi deteksi lintas disiplin; Zhang dan Zhou (2026) mengevaluasi abstrak ilmiah dari lima bidang. Sumber-sumber itu mendukung pemilihan cakupan lintas bidang, tetapi tidak menetapkan semua jurnal Indonesia terwakili atau membuktikan selisih deteksi berdasarkan metode kualitatif/kuantitatif. [R1, R2, R3]

## 1. Latar belakang dan permasalahan

Model bahasa generatif dapat membuat abstrak ilmiah yang tampak meyakinkan, tetapi hasilnya bergantung pada sumber masukan, model, dan cara menghasilkan teks. Gao dkk. (2023) membuat 50 abstrak medis ChatGPT dari judul dan nama jurnal; detektor yang diuji mencapai AUROC 0,94, sementara penilai manusia mengenali 68% abstrak AI dan keliru menandai 14% abstrak asli sebagai AI. Ini menunjukkan abstrak AI bisa dihasilkan dan dinilai dengan tidak sempurna, tetapi hasilnya berasal dari sampel kecil, domain medis berbahasa Inggris, dan detektor GPT-2 lama. [R9]

Hasil penelitian deteksi tidak seragam. Zhang dan Zhou (2026) melaporkan akurasi 99,4% pada evaluasi in-domain dan Macro-F1 0,948 pada evaluasi lintas bidang untuk model serta korpus abstrak mereka. Sebaliknya, penelitian lain melaporkan kesalahan positif pada abstrak ilmiah manusia atau perbedaan kinerja menurut disiplin dan kondisi tulisan. Fraser dkk. (2025) merangkum bahwa bahasa, domain, panjang teks, model pembangkit, tingkat keterlibatan manusia, dan pergeseran distribusi dapat memengaruhi keterdeteksian. Angka dari satu studi tidak otomatis berlaku untuk model, bahasa, jurnal, atau jenis generasi lain. [R1](#ref-r1), [R2](#ref-r2), [R6](#ref-r6), [R8](#ref-r8)

Konteks Indonesia juga sudah diteliti. Syahputra dkk. (2026) memakai 1.137 abstrak manusia dari 18 jurnal SINTA 3 dan 1.137 pasangan parafrasa IndoT5. Pada salah satu konfigurasi *zero-shot*, 790 abstrak manusia salah diberi label AI; Random Forest pada fitur yang sama mencapai akurasi 91,21%. Studi itu membuktikan adanya riset deteksi abstrak ilmiah Indonesia, tetapi tugasnya adalah deteksi parafrasa IndoT5, bukan abstrak baru yang dihasilkan dari isi artikel. Jadi, hasilnya tidak langsung menjawab performa IndoBERT pada korpus lintas bidang dengan prosedur generasi yang berbeda. [R3]

### Permasalahan penelitian

Belum ada dasar yang cukup dari pencarian eksploratif ini untuk menyatakan bahwa satu detektor bekerja baik pada seluruh jurnal ilmiah Indonesia atau sama baiknya pada semua bidang dan karakteristik artikel. Bukti yang tersedia mencakup hasil tinggi pada konfigurasi tertentu, kesalahan positif pada tulisan manusia, dan hasil lokal yang bergantung pada jenis generator. Masalah penelitian yang lebih terukur ialah menilai performa detektor pada korpus abstrak Indonesia lintas bidang terpilih dan melaporkan hasil menurut bidang serta karakteristik artikel yang jumlahnya memadai. Ini bukan klaim bahwa belum pernah ada riset deteksi abstrak Indonesia. [R1](#ref-r1), [R2](#ref-r2), [R3](#ref-r3), [R6](#ref-r6), [R8](#ref-r8), [R9](#ref-r9)

### Kontribusi yang mungkin

- Mengukur performa satu detektor pada pasangan abstrak *human-proxy* dan abstrak sintetis dari isi artikel, pada kumpulan jurnal berbahasa Indonesia lintas bidang yang dipilih dan dibatasi secara transparan. [R2](#ref-r2), [R3](#ref-r3), [R9](#ref-r9)
- Melaporkan metrik, jumlah sampel, dan kesalahan per bidang atau karakteristik artikel; metode kualitatif, kuantitatif, dan *mixed methods* menjadi salah satu pengelompokan jika data memadai, bukan keseluruhan cakupan. [R1](#ref-r1), [R2](#ref-r2), [R5](#ref-r5), [R8](#ref-r8)
- Membatasi simpulan pada korpus, bahasa, jurnal, model, generator, dan prosedur yang benar-benar diuji. Hasilnya bukan bukti kepengarangan maupun dasar tunggal untuk menuduh penulis. [R4](#ref-r4), [R6](#ref-r6), [R7](#ref-r7)

**Batas klaim kebaruan:** Penelusuran awal menemukan studi deteksi abstrak Indonesia, deteksi abstrak ilmiah lintas bidang, dan studi kesalahan pada abstrak manusia. Yang belum dipastikan adalah apakah desain korpus dan pertanyaan persis penelitian ini sudah pernah dilakukan; pencarian belum menyeluruh, sehingga tidak ditemukannya studi yang sama bukan bukti ketiadaannya. [R1](#ref-r1), [R2](#ref-r2), [R3](#ref-r3), [R6](#ref-r6), [R8](#ref-r8), [R9](#ref-r9)

**Rujukan:** Gao dkk. (2023) untuk abstrak ilmiah yang dihasilkan ChatGPT; Rashidi dkk. (2023), Syahputra dkk. (2026), Liang dkk. (2023), dan Pratama (2025) untuk risiko salah klasifikasi atau variasi hasil; Zhang dan Zhou (2026) serta Fraser dkk. (2025) untuk evaluasi lintas bidang dan faktor keterdeteksian. [R1](#ref-r1), [R2](#ref-r2), [R3](#ref-r3), [R6](#ref-r6), [R7](#ref-r7), [R8](#ref-r8), [R9](#ref-r9)

## 2. Urgensi penelitian

- **Mengurangi tafsir berlebihan terhadap skor.** Rashidi dkk. (2023) melaporkan satu detektor GPT-2-era memberi skor kemungkinan AI di atas 50% pada hingga 8,69% abstrak ilmiah manusia, dan di atas 90% pada 5,13%. Studi itu mencakup 14.400 abstrak dari lima jurnal dan satu detektor lama; angkanya bukan perkiraan untuk IndoBERT atau jurnal Indonesia. [R6]
- **Kesalahan dapat berbeda antarkelompok.** Liang dkk. (2023) melaporkan rata-rata *false-positive rate* 61,3% pada esai TOEFL berbahasa Inggris dari penulis non-native di tujuh detektor; studi tersebut bukan pada abstrak jurnal Indonesia. Pratama (2025) juga melaporkan variasi hasil antaralat dan kelompok disiplin pada 72 abstrak. Bukti ini memberi alasan untuk menguji konteks dan kelompok secara langsung, bukan menyalin angka mereka ke skripsi ini. [R1](#ref-r1), [R7](#ref-r7)
- **Ada kebutuhan bukti lokal yang sesuai dengan tugas.** Hasil Syahputra dkk. (2026) memperlihatkan bahwa performa dapat bergantung pada model dan cara kelas AI dibentuk, tetapi studinya menggunakan parafrasa IndoT5. Penelitian ini perlu mengukur hasil untuk data dan prosedur generasi yang benar-benar dipilih. [R3]
- **Manfaat praktis terbatas dan bertanggung jawab.** Bukti performa per bidang atau karakteristik artikel dapat membantu peneliti dan pengelola jurnal memahami kapan skor detektor perlu ditafsirkan hati-hati. Cheng dkk. (2025) menyarankan agar alat deteksi tidak dipakai sendirian; keluaran penelitian ini ditujukan untuk evaluasi atau triase awal dengan tinjauan manusia, bukan keputusan sanksi atau kepengarangan. [R4](#ref-r4), [R6](#ref-r6)

**Kesimpulan urgensi:** urgensinya bukan karena penelitian ini akan membuktikan siapa memakai AI, melainkan karena skor detektor dapat keliru dan performanya bergantung pada konteks. Menguji model serta korpus Indonesia yang ditentukan secara eksplisit memberi bukti yang lebih relevan untuk menafsirkan hasil dalam konteks tersebut. [R1](#ref-r1), [R2](#ref-r2), [R3](#ref-r3), [R4](#ref-r4), [R6](#ref-r6), [R7](#ref-r7), [R8](#ref-r8), [R9](#ref-r9)

### Tabel penelitian jurnal yang mendasari latar belakang dan urgensi

| Rujukan | Penelitian ini membahas apa? | Temuan yang relevan | Batasan terhadap skripsi ini |
|---|---|---|---|
| Syahputra dkk. (2026), *Indonesian Journal of Data and Science* [R3] | Deteksi abstrak ilmiah Indonesia memakai 1.137 abstrak manusia dari 18 jurnal SINTA 3 dan parafrasa IndoT5. | Pada konfigurasi *zero-shot* tertentu, 790 abstrak manusia salah diklasifikasikan AI; Random Forest pada fitur linguistik mencapai akurasi 91,21%. | Kelas AI adalah parafrasa abstrak, bukan abstrak baru dari isi artikel; hasil tidak otomatis berlaku untuk IndoBERT atau generator lain. |
| Gao dkk. (2023), *npj Digital Medicine* [R9] | Membandingkan 50 abstrak medis manusia dan 50 abstrak ChatGPT yang dibuat dari judul/nama jurnal, menggunakan detektor dan penilai manusia. | Detektor mencapai AUROC 0,94; manusia mengenali 68% abstrak AI dan salah mengira 14% abstrak asli sebagai AI. | Sampel kecil, satu domain bahasa Inggris, ChatGPT dan detektor GPT-2-era; hasil hanya menunjukkan satu kondisi awal. |
| Rashidi dkk. (2023), *Journal of Pathology Informatics* [R6] | Menguji apakah detektor GPT-2-era salah menandai abstrak ilmiah manusia; 14.400 abstrak dari lima jurnal dan rentang tahun 1980–2023. | Hingga 8,69% abstrak manusia mendapat skor AI >50%; hingga 5,13% mendapat skor >90%. | Satu detektor lama dan korpus jurnal berbahasa Inggris; bukan estimasi untuk model atau korpus skripsi. |
| Liang dkk. (2023), *Patterns* [R7] | Menguji tujuh detektor pada esai TOEFL non-native dan esai murid kelas 8 AS, serta contoh perubahan gaya teks. | Rata-rata *false-positive rate* pada esai TOEFL 61,3%; penulis juga menunjukkan variasi deteksi akibat perubahan teks. | Bukan korpus abstrak ilmiah atau bahasa Indonesia; mendukung perhatian pada risiko bias, bukan angka prediksi skripsi. |
| Pratama (2025), *PeerJ Computer Science* [R1] | Menguji tiga alat pada 72 abstrak dari teknologi/rekayasa, ilmu sosial, dan interdisipliner, termasuk teks asli, AI-generated, dan AI-assisted. | Akurasi dan kesalahan berbeda antaralat serta kelompok disiplin; artikel membahas risiko salah klasifikasi. | Ukuran sampel kecil; tidak membandingkan metode kualitatif dan kuantitatif. |
| Cheng dkk. (2025), *Advances in Simulation* [R4] | Membandingkan tiga detektor dan penilai manusia pada lima kondisi teks pendahuluan dari 30 artikel dua jurnal simulasi kesehatan. | Skor alat berubah menurut kondisi penggunaan AI; ketepatan manusia rendah pada tugas tersebut; penulis tidak menyarankan alat sebagai satu-satunya dasar. | Menguji bagian pendahuluan, bukan abstrak; bidang kesehatan dan sampel terbatas. |
| Fraser dkk. (2025), *Journal of Artificial Intelligence Research* [R8] | Tinjauan tentang metode, dataset, dan faktor yang memengaruhi keterdeteksian teks AI. | Menyoroti bahasa, domain, panjang teks, model pembangkit, tingkat campur tangan manusia, dan pergeseran distribusi sebagai faktor yang relevan. | Tinjauan, bukan eksperimen baru pada abstrak Indonesia; menjadi dasar desain evaluasi, bukan estimasi kinerja lokal. |
| Zhang dan Zhou (2026), *Scientific Reports* [R2] | Menguji DistilBERT pada 5.000 abstrak arXiv berbahasa Inggris dari lima bidang, dengan pasangan AI yang dihasilkan Gemini 2.0 Flash. | Melaporkan akurasi 99,4% pada uji in-domain dan Macro-F1 0,948 pada evaluasi lintas bidang. | Dataset arXiv berbahasa Inggris dan satu setup generator; tidak menguji jurnal Indonesia atau membagi artikel menurut metode kualitatif/kuantitatif. |
| Barroga dkk. (2023), *Journal of Korean Medical Science* [R5] | Tinjauan konseptual yang membedakan metode kualitatif, kuantitatif, dan *mixed methods*. | Memberi dasar untuk memperlakukan metode sebagai karakteristik artikel yang dapat diklasifikasikan dari desain/metode. | Bukan studi deteksi AI; digunakan hanya untuk definisi subkelompok penelitian. |

## 3. Cakupan jurnal dan jenis artikel yang dikumpulkan

### Apa yang dimaksud “kualitatif” dan “kuantitatif” di sini?

Yang dibandingkan adalah **jenis metode penelitian pada artikel**, bukan jenis atau kategori jurnal. Jurnal yang sama dapat menerbitkan artikel kualitatif, kuantitatif, dan *mixed methods*. Klasifikasi ditetapkan dari bagian metode atau deskripsi desain di artikel lengkap, bukan ditebak hanya dari abstrak. Barroga dkk. (2023) menjelaskan karakter umum pendekatan kualitatif, kuantitatif, dan campuran; definisi operasional penelitian ini harus tetap disesuaikan dengan jenis artikel yang benar-benar ditemukan. [R5]

### Cakupan sumber yang disarankan

- Cakupan sumber awal adalah jurnal ilmiah berbahasa Indonesia dari **lebih dari satu bidang ilmu**, dipilih setelah audit ketersediaan abstrak, full text, lisensi, tahun, dan variasi karakteristik artikel. Daftar bidang/jurnal belum dikunci; hindari klaim mencakup semua jurnal Indonesia.
- Pilih jurnal yang menyediakan metadata dan teks lengkap yang dapat diakses untuk keperluan penelitian, serta memiliki ketentuan lisensi/penggunaan yang dapat dipatuhi.
- **JIP sebagai salah satu kandidat:** JIP tercantum dalam PRD dan dapat dipertimbangkan sebagai satu sumber bidang Informatika/komputasi, tetapi bukan satu-satunya sumber dan belum dipastikan terpilih. Studi Indonesia yang ditinjau mencatat 131 abstrak JIP dalam korpusnya; angka itu tidak menunjukkan kecukupan sampel untuk penelitian ini. [R3]
- Pilih sumber yang memungkinkan perbandingan di dalam bidang/jurnal bila mungkin; catat bidang jurnal sebagai metadata agar variasi disiplin tidak tertukar dengan perbedaan metode artikel. Jika satu kelompok metode jarang pada suatu bidang, laporkan keterbatasan itu dan jangan menyatakan efek metode secara terpisah dari bidang tanpa dukungan sampel.
- Rentang tanggal artikel manusia: sebelum 30 November 2022 sebagai *human-proxy*. Ini proksi berdasarkan waktu publikasi, bukan bukti bahwa teks tidak pernah dibantu alat AI atau pemeriksa tata bahasa.
- Kategori artikel yang dicatat: metode kualitatif, kuantitatif, dan *mixed methods*; jenis artikel (misalnya penelitian empiris, tinjauan, konseptual/editorial) juga dicatat terpisah. Artikel non-empiris tidak digabung ke perbandingan deteksi artikel penelitian; keikutsertaannya ditetapkan setelah audit dan pertanyaan penelitian dipersempit.
- Jadi, “kualitatif” dan “kuantitatif” adalah dua nilai untuk variabel metode penelitian, bukan dua cakupan jurnal dan bukan keseluruhan ruang lingkup.

**Rujukan:** Barroga dkk. (2023) memberi dasar konseptual untuk membedakan pendekatan dan *mixed methods*. Pratama (2025) menemukan variasi deteksi menurut kelompok disiplin, sehingga pemilihan dan pencatatan sumber/bidang perlu diperhatikan; penelitian itu tidak menguji kategori metode artikel. Syahputra dkk. (2026) menunjukkan pengumpulan abstrak dari banyak jurnal Indonesia dapat dilakukan, tetapi tidak memvalidasi cakupan jurnal untuk perbandingan metode yang diusulkan. [R1](#ref-r1), [R3](#ref-r3), [R5](#ref-r5)

### Apakah salah satu jenis kemungkinan lebih mudah dideteksi?
Belum dapat disimpulkan dari bukti yang ditinjau. Dugaan bahwa abstrak kuantitatif lebih mudah karena memuat angka dan pola pelaporan terstruktur, atau bahwa abstrak kualitatif lebih mudah karena pola naratifnya lebih khas, hanyalah **hipotesis awal**. Barroga dkk. (2023) menjelaskan perbedaan umum metode tetapi tidak menguji deteksi AI; Pratama (2025) membandingkan disiplin, bukan desain metode artikel. Karena cakupan penelitian lebih umum, perbandingan metode menjadi analisis subkelompok jika jumlah artikel memungkinkan, bukan asumsi hasil atau satu-satunya tujuan penelitian. [R1](#ref-r1), [R5](#ref-r5)

## 4. Pengguna dan manfaat yang dituju

- **Pengguna utama hasil penelitian:** peneliti yang mengevaluasi model deteksi teks AI pada abstrak ilmiah berbahasa Indonesia.
- **Pengguna potensial:** editor atau pengelola jurnal sebagai pembaca bukti keterbatasan detektor, bukan sebagai pengguna sistem untuk mengambil keputusan otomatis.
- **Manfaat:** menunjukkan kinerja model pada korpus terpilih dan, jika jumlah sampel memadai, variasinya menurut bidang, jenis artikel, serta metode penelitian—termasuk kualitatif dan kuantitatif.
- **Bukan manfaat/tujuan:** membuktikan penulis menggunakan AI, menyaring atau menghukum penulis, atau memberi jaminan bahwa model berlaku untuk semua jurnal dan generator.

**Rujukan:** Cheng dkk. (2025) membahas penggunaan detektor dalam konteks penulis dan editor jurnal serta memperingatkan agar hasil alat tidak dijadikan satu-satunya dasar keputusan. Pratama (2025) membahas risiko kesalahan klasifikasi dan dampaknya pada penulis/kelompok bidang. [R1](#ref-r1), [R4](#ref-r4)

## 5. Contoh bentuk data

Contoh berikut hanya **skema ilustratif**, bukan kutipan abstrak atau data yang sudah dikumpulkan. Satu artikel sumber menghasilkan sepasang teks: abstrak asli dan abstrak sintetis dari artikel yang sama. Label AI pada contoh berarti teks hasil prosedur generasi penelitian, bukan pernyataan bahwa artikel tersebut pernah memakai AI.

| article_id | journal_id | bidang_jurnal | tahun | metode_artikel | tipe_teks | label | teks |
|---|---|---|---:|---|---|---|---|
| ART-0001 | J-A | Informatika | 2021 | kuantitatif | abstrak asli | human-proxy | `[teks abstrak asli yang berizin diakses]` |
| ART-0001 | J-A | Informatika | 2021 | kuantitatif | abstrak sintetis | AI-generated | `[abstrak hasil generator dari isi artikel, abstrak asli dikecualikan]` |
| ART-0002 | J-B | Ilmu sosial | 2020 | kualitatif | abstrak asli | human-proxy | `[teks abstrak asli yang berizin diakses]` |
| ART-0002 | J-B | Ilmu sosial | 2020 | kualitatif | abstrak sintetis | AI-generated | `[abstrak hasil generator dari isi artikel, abstrak asli dikecualikan]` |

**Catatan skema:** tambahkan kolom versi generator, prompt/config, URL/DOI artikel, dasar klasifikasi metode, panjang token, status akses/lisensi, dan split data (`train`, `validation`, `test`). Baris pasangan dari `article_id` yang sama wajib berada pada split yang sama agar teks yang berhubungan tidak bocor ke evaluasi. Studi Syahputra dkk. (2026) menjadi contoh sumber Indonesia yang membangun pasangan kelas dari abstrak manusia, tetapi menggunakan parafrasa IndoT5; skema di sini mengusulkan tugas berbeda, yakni abstrak sintetis dari isi artikel tanpa memberikan abstrak asli ke generator. [R3]

**Rujukan:** Syahputra dkk. (2026) untuk contoh dataset abstrak Indonesia berpasangan dan pentingnya menyebut cara pembentukan kelas AI dengan tepat; Zhang dan Zhou (2026) untuk dataset abstrak ilmiah berpasangan manusia/AI dan pemisahan dokumen untuk evaluasi. [R2](#ref-r2), [R3](#ref-r3)

## 6. Cara mengumpulkan data

1. **Tetapkan kriteria sumber:** artikel berbahasa Indonesia dari jurnal ilmiah lintas lebih dari satu bidang yang dipilih setelah audit; artikel penelitian dengan abstrak dan teks lengkap yang dapat diakses; artikel manusia-proksi terbit sebelum 30 November 2022; serta lisensi/ketentuan penggunaan yang dapat dipatuhi. Cakupan bukan seluruh jurnal Indonesia.
2. **Audit jumlah sebelum mengunci jurnal:** hitung artikel per bidang, tahun, jenis artikel, dan metode penelitian (kualitatif, kuantitatif, *mixed*, atau kategori lain yang ditemukan). Pastikan tiap subkelompok yang hendak dibandingkan memiliki sampel memadai; catat kelompok yang langka dan jangan membuat teks/data pengganti untuk menutupi kekurangan.
3. **Ambil metadata dan teks melalui laman resmi/OAI-PMH/repositori jurnal jika tersedia.** Catat judul, penulis, tahun, DOI/URL, jurnal, bidang, metode akses, tanggal retrieval, status lisensi, serta alasan inklusi/eksklusi. Akses endpoint tidak otomatis memberikan izin untuk menyimpan atau menyebarkan ulang teks.
4. **Klasifikasikan bidang, jenis artikel, dan metode penelitian dengan membaca artikel penuh.** Simpan dasar klasifikasi; jika metode tidak jelas, tandai `unclear` dan keluarkan dari perbandingan subkelompok utama. Jika memungkinkan, minta pemeriksaan kedua pada sebagian artikel untuk menguji konsistensi klasifikasi.
5. **Bangun abstrak sintetis:** gunakan satu generator/model dan versi yang dicatat, satu prompt dan pengaturan yang sama untuk semua artikel, berikan isi artikel tanpa abstrak asli, lalu simpan respons mentah, tanggal, parameter, dan kegagalan generasi. Jangan menyamakan parafrasa abstrak asli dengan abstrak independen yang dibuat dari isi artikel.
6. **Simpan sumber mentah dan data turunan secara terpisah.** Pertahankan teks artikel sumber tanpa perubahan pada lokasi yang dibatasi; dalam artefak publik utamakan metadata, ID, tautan, skrip, dan hasil agregat sesuai lisensi.

**Kelayakan lokal yang sudah diamati:** endpoint OAI-PMH JIP `https://jurnal.polinema.ac.id/index.php/jip/oai` pernah merespons `Identify` dan menampilkan total 640 rekaman metadata. Filter OAI berdasarkan tanggal 2014–2022 yang pernah dicoba mengembalikan `noRecordsMatch`; tanggal OAI tidak sama dengan tanggal publikasi artikel. Karena itu, metadata harus diambil lalu disaring berdasarkan tanggal terbit sebenarnya. Estimasi PRD 320–480 artikel JIP belum terverifikasi dan belum diketahui pembagiannya menurut metode. Pengamatan ini harus dicek ulang sebelum pengumpulan final; bukan data final atau bukti lisensi.

**Rujukan:** Syahputra dkk. (2026) mendemonstrasikan pengumpulan abstrak dari 18 sumber jurnal Indonesia; Cheng dkk. (2025) menggunakan artikel jurnal pra-ChatGPT untuk membentuk kondisi pembanding manusia dan teks AI; Barroga dkk. (2023) mendukung pembedaan metode melalui desain dan proses penelitian, bukan tebakan dari gaya abstrak. [R3, R4, R5]

## 7. Pemrosesan data dan evaluasi

### Pemrosesan dan kontrol kualitas

- Ekstrak abstrak asli dengan pencatatan sumber; bersihkan artefak HTML/OCR dan metadata, tetapi jangan mengubah isi substantif atau menyimpan hanya teks yang telah dibersihkan.
- Buat teks AI dari artikel lengkap setelah menghapus abstrak asli dari input. Samakan model, versi, instruksi panjang, dan parameter generasi lintas bidang dan metode artikel.
- Klasifikasi bidang jurnal, jenis artikel, dan metode penelitian pada metadata terpisah. Metode ditetapkan dari artikel penuh; simpan kategori kualitatif, kuantitatif, *mixed*, atau `unclear`. Jangan menyimpulkan metode dari abstrak saja.
- Cegah kebocoran: pasangan abstrak yang berasal dari artikel yang sama tetap bersama pada satu split; deduplikasi dokumen sebelum split; jangan memilih model atau ambang keputusan dari data test.
- Laporkan jumlah pasangan, jurnal, bidang, tahun, panjang teks, dan metode artikel pada tiap kelompok. Jika distribusinya berbeda jauh, perbedaan skor dapat tercampur dengan efek bidang, jurnal, atau panjang teks. Utamakan perbandingan dalam sumber/bidang yang sama atau analisis terstratifikasi; simpulan lintas bidang dibatasi oleh ukuran dan komposisi korpus.
- Gunakan tokenisasi/preprocessing yang sama untuk semua kelompok dan simpan versi data serta konfigurasi eksperimen.

### Model dan metrik

- **Model utama:** satu checkpoint IndoBERT, dipilih dan didokumentasikan sebelum evaluasi final. Baseline tambahan hanya bila waktu dan ukuran data mendukung; bukan tujuan utama.
- **Metrik klasifikasi utama:** macro-F1 dan AUROC secara keseluruhan; sertakan precision, recall, confusion matrix, jumlah sampel, dan *false-positive rate* pada abstrak *human-proxy*. Sajikan hasil per bidang dan per metode artikel bila jumlah sampel memadai.
- **Analisis subkelompok:** kualitatif vs kuantitatif dapat dibandingkan; *mixed methods* dan kategori artikel lain tetap dicatat terpisah, tidak dipaksa masuk ke salah satu kelompok. Gunakan split test yang sama dan laporkan interval ketidakpastian bila memungkinkan; jangan menyimpulkan “lebih mudah dideteksi” hanya dari akurasi gabungan.
- **Kalibrasi opsional:** jika sesuai dengan waktu dan ukuran sampel, laporkan ECE dan Brier score keseluruhan dan/atau per subkelompok sebelum/sesudah *temperature scaling*. Pasang kalibrator menggunakan validation saja. Kalibrasi tidak otomatis memperbaiki kesalahan kelas atau menghilangkan *false positive*.
- **Batas generalisasi:** simpulan dibatasi pada jurnal, rentang tahun, generator, model, prompt, dan kelompok artikel yang benar-benar diteliti.

**Rujukan:** Zhang dan Zhou (2026) menggunakan split pada tingkat dokumen, mengevaluasi lintas domain, dan melaporkan metrik diskriminasi serta kalibrasi pada abstrak ilmiah; Pratama (2025) menunjukkan variasi kesalahan deteksi lintas bidang; Cheng dkk. (2025) menunjukkan skor detektor berubah menurut kondisi tulisan manusia/AI. Ketiganya mendukung evaluasi kontekstual, tetapi bukan bukti bahwa jenis metode artikel menyebabkan perbedaan kinerja. [R1, R2, R4]

## Ringkasan keputusan sementara

| Komponen | Usulan kerja | Status | Rujukan |
|---|---|---|---|
| Masalah | Belum diketahui seberapa baik detektor bekerja pada korpus abstrak Indonesia lintas bidang terpilih dan apakah hasilnya bervariasi menurut karakteristik artikel. | Pertanyaan untuk diuji, belum hasil | [R1, R2, R3] |
| Kontribusi | Evaluasi empiris pada korpus abstrak Indonesia lintas bidang dengan prosedur AI dan model yang dikendalikan; metode artikel menjadi salah satu subkelompok. | Calon kontribusi, kebaruan belum terverifikasi | [R1, R2, R3] |
| Unit analisis | Artikel dan abstraknya; bidang, jenis artikel, serta metode ditandai terpisah. | Disarankan | [R2, R5] |
| Cakupan awal | Jurnal ilmiah Indonesia terpilih dari lebih dari satu bidang; tidak mengklaim seluruh jurnal Indonesia. | Menunggu audit jumlah dan lisensi | [R1, R2, R3] |
| Data manusia | Abstrak artikel pra-30 November 2022 sebagai `human-proxy`. | Proksi, bukan kepastian tanpa bantuan AI | [R3, R4] |
| Data AI | Abstrak hasil generator dari teks artikel tanpa abstrak asli, dengan satu model/prompt. | Perlu uji kelayakan prompt | [R2, R3, R4] |
| Subkelompok | Metode kualitatif, kuantitatif, dan *mixed*; karakteristik bidang dan jenis artikel dicatat terpisah. | Analisis eksploratif sesuai kecukupan sampel | [R1, R2, R5] |
| Pengguna | Peneliti; editor/pengelola jurnal hanya sebagai pembaca bukti dengan tinjauan manusia. | Bukan keputusan otomatis | [R1, R4] |
| Analisis | Macro-F1/AUROC keseluruhan; FPR dan metrik per bidang/metode; ECE/Brier tambahan jika layak. | Usulan | [R1, R2, R4] |

**Rujukan:** Barroga dkk. (2023) untuk batas kategori metode; Pratama (2025), Syahputra dkk. (2026), Zhang dan Zhou (2026), Cheng dkk. (2025) untuk latar evaluasi detektor, variasi kondisi, dan risiko penggunaan. [R1–R5]

## Rencana kerja berikutnya

1. Audit jurnal kandidat dari beberapa bidang: jumlah artikel, tahun, bahasa, akses full text, lisensi, panjang abstrak, dan distribusi jenis artikel/metode. Jangan memilih sampel berdasarkan perkiraan jumlah saja.
2. Pastikan setiap kelompok yang hendak dibandingkan terwakili; jika tidak, persempit subkelompok yang dianalisis tanpa mengubah cakupan topik utama secara diam-diam.
3. Uji prosedur klasifikasi metode pada sampel kecil dengan membaca teks penuh; dokumentasikan aturan untuk studi campuran dan desain yang tidak jelas.
4. Uji pembuatan abstrak AI pada beberapa artikel yang memang boleh diproses; pastikan output dapat dibuat tanpa menyertakan abstrak asli dan prosedurnya konsisten pada seluruh kelompok yang masuk cakupan.
5. Setelah audit data, putuskan apakah IndoBERT tetap menjadi satu-satunya model dan apakah kalibrasi ECE/Brier layak sebagai tujuan sekunder.
6. Perbarui `PRD.md` hanya setelah fokus, sampel layak, dan desain klasifikasi dikonfirmasi. Catatan ini belum mengubah PRD.

**Rujukan:** Rencana audit mengikuti pertimbangan cakupan jurnal dan metode yang dijelaskan Barroga dkk. (2023), serta kebutuhan menguji generalisasi dan prosedur evaluasi yang ditunjukkan Zhang dan Zhou (2026) dan Pratama (2025). [R1, R2, R5]

## Metode pencarian dan keterbatasan bukti

- **Tujuan:** pencarian eksploratif untuk memperjelas pertanyaan dan kelayakan, bukan tinjauan sistematis.
- **Konsep kueri:** deteksi AI pada abstrak ilmiah; deteksi teks AI Indonesia/IndoBERT; false positive pada tulisan ilmiah manusia; bias detektor; variasi lintas bidang/domain; karakteristik detektabilitas AI text.
- **Pencarian bibliografi dan sumber:** kueri Semantic Scholar tentang deteksi AI pada abstrak ilmiah lintas-domain mendapat HTTP 429; kueri tentang abstrak ilmiah Indonesia/IndoBERT mendapat HTTP 200 dengan delapan hasil. Sumber yang relevan kemudian diperiksa melalui laman jurnal/penerbit dan teks lengkap yang tersedia. Pencarian web umum dipakai untuk menemukan laman primer dan menelusuri sumber yang diketahui. Tidak menggunakan API OpenAlex, Crossref, atau arXiv.
- **Status bukti:** artikel jurnal yang teks lengkapnya dibaca atau laman jurnal resminya diperiksa dicantumkan di Referensi. Rujukan yang hanya ditemukan sebagai metadata tidak digunakan untuk mendukung klaim hasil.
- **Keterbatasan:** kueri tidak menyeluruh, tidak ada protokol inklusi/eksklusi yang dipraregistrasi, dan pencarian khusus lintas bidang serta metode artikel belum cukup untuk menyatakan ketiadaan studi. Bukti hasil studi lain tidak dapat langsung digeneralisasi ke korpus Indonesia yang diusulkan.
- **Keterbatasan tanggal:** rujukan utama di bawah terbit 2023–2026, dalam rentang lima tahun sebelum tanggal pembaruan catatan.

**Rujukan metodologis untuk kehati-hatian:** Barroga dkk. (2023) untuk membedakan jenis riset; Pratama (2025) dan Cheng dkk. (2025) untuk mengevaluasi detektor dalam kondisi dan kelompok yang dinyatakan secara eksplisit. [R1, R4, R5]

## Referensi jurnal (2022–2026)

### Ref R1

Pratama, A. R. (2025). The accuracy-bias trade-offs in AI text detection tools and their impact on fairness in scholarly publication. *PeerJ Computer Science, 11*, e2953. https://doi.org/10.7717/peerj-cs.2953. Teks lengkap: https://pmc.ncbi.nlm.nih.gov/articles/PMC12453642/. Studi membandingkan alat deteksi pada abstrak ilmiah, status penulis, disiplin, dan kondisi penggunaan AI; tidak mengelompokkan artikel berdasarkan metode kualitatif/kuantitatif.

### Ref R2

Zhang, C., & Zhou, W. (2026). Efficient detection of AI-generated scientific abstracts with a lightweight transformer. *Scientific Reports, 16*, 4975. https://doi.org/10.1038/s41598-026-35203-3. Teks lengkap: https://www.nature.com/articles/s41598-026-35203-3. Studi abstrak ilmiah lintas bidang dan generator; bukan studi bahasa Indonesia atau perbandingan tipe metode artikel.

### Ref R3

Syahputra, A., Murdiyanto, A. W., & Aesyi, U. S. (2026). Zero-shot detection of IndoT5-synthesized Indonesian scientific abstracts using mDeBERTa v3. *Indonesian Journal of Data and Science, 7*(2), 333–349 (metadata laman penerbit; volume pada PDF berbeda). https://doi.org/10.56705/ijodas.v7i2.457. Studi memakai abstrak manusia Indonesia dan parafrasa IndoT5; bukan abstrak baru yang dibuat independen dari isi artikel.

### Ref R4

Cheng, A., Lin, Y., Reedy, G., Joseph, C., Wirkowski, S., Mallette, V., Nagesh, V., Krieser, D., & Calhoun, A. (2025). Ability of AI detection tools and humans to accurately identify different forms of AI-generated written content. *Advances in Simulation, 10*, 66. https://doi.org/10.1186/s41077-025-00396-6. Menguji deteksi pada beberapa kondisi teks manusia, AI-edit, dan AI-generated dalam artikel jurnal; korpusnya bukan abstrak dan tidak membandingkan metode kualitatif/kuantitatif.

### Ref R5

Barroga, E., Matanguihan, G. J., Furuta, A., Arima, M., Tsuchiya, S., Kawahara, C., Takamiya, Y., & Izumi, M. (2023). Conducting and writing quantitative and qualitative research. *Journal of Korean Medical Science, 38*(37), e291. https://doi.org/10.3346/jkms.2023.38.e291. Artikel tinjauan konsep metode; bukan studi deteksi teks AI.

### Ref R6

Rashidi, H. H., Fennell, B. D., Albahra, S., Hu, B., & Gorbett, T. (2023). The ChatGPT conundrum: Human-generated scientific manuscripts misidentified as AI creations by AI text detection tool. *Journal of Pathology Informatics, 14*, 100342. https://doi.org/10.1016/j.jpi.2023.100342. Menguji satu detektor GPT-2-era pada 14.400 abstrak ilmiah manusia.

### Ref R7

Liang, W., Yuksekgonul, M., Mao, Y., Wu, E., & Zou, J. (2023). GPT detectors are biased against non-native English writers. *Patterns, 4*(7), 100779. https://doi.org/10.1016/j.patter.2023.100779. Studi mencakup esai berbahasa Inggris; temuannya bukan estimasi untuk abstrak jurnal Indonesia.

### Ref R8

Fraser, K. C., Dawkins, H., & Kiritchenko, S. (2025). Detecting AI-generated text: Factors influencing detectability with current methods. *Journal of Artificial Intelligence Research, 82*, 2233–2278. https://doi.org/10.1613/jair.1.16665. Tinjauan faktor dan metode; bukan eksperimen baru pada korpus abstrak Indonesia.

### Ref R9

Gao, C. A., Howard, F. M., Markov, N. S., Dyer, E. C., Ramesh, S., Luo, Y., & Pearson, A. T. (2023). Comparing scientific abstracts generated by ChatGPT to real abstracts with detectors and blinded human reviewers. *npj Digital Medicine, 6*, 75. https://doi.org/10.1038/s41746-023-00819-6. Studi abstrak medis berbahasa Inggris dengan sampel kecil dan detektor GPT-2-era.

[R1]: #ref-r1
[R2]: #ref-r2
[R3]: #ref-r3
[R4]: #ref-r4
[R5]: #ref-r5
[R6]: #ref-r6
[R7]: #ref-r7
[R8]: #ref-r8
[R9]: #ref-r9
