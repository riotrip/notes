---
category: Landasan
date: 2026-11-06
---

# Cara Kerja Sistem Kemiripan Abstrak dan Peran Model

> **Status:** Catatan fondasi penelitian; bukan metodologi final atau laporan hasil eksperimen. Arah ini menggantikan penelitian deteksi teks AI.

Navigasi: [inti penelitian](01-inti-penelitian-5w1h.md) · [data dan pengujian](05-rancangan-metode-data-dan-evaluasi.md) · [matriks literatur](03-matriks-literatur-landasan.md) · [jejak penelusuran](07-jejak-penelusuran.md).

## Alur penggunaan

1. Dosen memasukkan PDF atau teks abstrak usulan. Sistem mengambil abstrak yang dapat dibaca; PDF yang gagal diekstrak tidak boleh dianggap berhasil dianalisis.
2. Sistem membandingkan abstrak dengan korpus penelitian terdahulu. JIP masih menjadi calon sumber korpus, bukan seluruh literatur dunia.
3. Sistem mengambil informasi tujuan, metode, dan data/objek yang tertulis, kemudian membandingkan aspek yang tersedia. Kontribusi dapat disertakan bila tersedia.
4. Hasil menampilkan penelitian terkait, kemiripan per aspek, persamaan dan perbedaan, serta kutipan dari kedua abstrak.
5. Dosen memeriksa bukti tersebut untuk mempertimbangkan risiko kebaruan. Sistem tidak menetapkan kelayakan usulan secara otomatis.

Ini alur yang dituju, bukan fungsi yang sudah berjalan. Urutan retrieval dan ekstraksi, cara membaca PDF, model, serta bentuk laporan belum ditetapkan.

## Peran pekerjaan model

**Ekstraksi aspek** menentukan bagian teks yang membahas tujuan, metode, atau objek. **Embedding** mengubah teks menjadi representasi numerik agar kedekatannya dapat dihitung. **Cosine similarity** membandingkan representasi tersebut; nilainya bukan persentase kebaruan. **Penjelasan** menghubungkan hasil perbandingan dengan kutipan yang dapat diperiksa.

Sentence-BERT menjadi kandidat pendekatan representasi semantik, bukan model final yang sudah dipilih. Pemakaian LLM, fine-tuning, dan pembobotan aspek belum menjadi keputusan wajib. Dasar dan batas masing-masing konsep dijelaskan berikut.

## Konsep yang dibedakan

**Lexical similarity dan semantic similarity.** Kemiripan leksikal berfokus pada kesamaan kata/fitur permukaan, sedangkan representasi semantik berusaha menangkap kedekatan makna. Sentence-BERT memberi dasar pembelajaran embedding yang dapat dibandingkan menggunakan cosine; tidak berarti semua embedding BERT siap dipakai untuk tugas itu ([S3, §§3–4](https://aclanthology.org/D19-1410.pdf)).

**IndoBERT dan Sentence-BERT.** IndoBERT merupakan backbone bahasa, sedangkan SBERT merupakan pendekatan representasi/pelatihan. Keduanya tidak selalu merupakan pilihan yang saling meniadakan. Pemakaian backbone Indonesia tidak dengan sendirinya membuktikan kualitas sentence similarity; keberhasilan pendekatan SBERT berbahasa Inggris juga tidak membuktikan transfer ke abstrak Indonesia ([S1, PDF pp. 4–6 dan 10–11](https://thescipub.com/jcs/jcssp.2026.2444.2455.pdf); [S3, §§3–4](https://aclanthology.org/D19-1410.pdf)). Checkpoint belum dipilih.

**Holistic dan aspect-aware representation.** Holistic membandingkan dokumen secara keseluruhan; aspect-aware membedakan dasar kesamaan menurut aspek. Mekanismenya tidak tunggal: S4 memakai citation-section labels untuk klasifikasi pasangan, S5 melatih ruang embedding khusus aspek dari judul+abstrak utuh, sedangkan gagasan pengguna mengekstrak bagian aspek sebelum membandingkannya ([S4, §§3.1–3.4](https://aclanthology.org/2020.coling-main.545.pdf); [S5, §§3–4](https://arxiv.org/pdf/2203.14541)). Ketiganya tidak boleh disebut algoritme yang identik.

**Extraction dan generation.** Ekstraksi mengambil bagian yang memang terdapat pada teks; generasi dapat menyusun ulang atau menambahkan rumusan. Riset aspek untuk summarization menyediakan precedent ekstraksi kalimat, tetapi skema dan sumber bagiannya berbeda dari abstrak saja ([S7, §§3.1–3.2](https://link.springer.com/article/10.1007/s41060-024-00665-z)). [INFERENCE] Bila kelak digunakan LLM untuk merumuskan aspek, hasil generasi perlu dibedakan dari kutipan sumber dan tidak boleh diperlakukan sebagai informasi yang pasti tertulis.

**Conceptual overlap dan novelty.** Kesamaan tujuan, pendekatan, atau objek merupakan bukti overlap; kebaruan memerlukan interpretasi kontribusi relatif terhadap penelitian sebelumnya. S2 menyediakan pendekatan idea-level, tetapi label sintetis dan asumsi novelty-nya membatasi klaim ([S2, §§3–4 dan §7](https://arxiv.org/html/2505.24615)). Cosine maupun skor rubrik LLM bukan otomatis probabilitas kebaruan. Temperature scaling pada logits classifier dalam [S9, §§2, 4–5](https://proceedings.mlr.press/v70/guo17a/guo17a.pdf) tidak langsung mengubah kedua jenis skor itu menjadi probabilitas.

**Penjelasan berbukti dan penjelasan yang terdengar meyakinkan.** Kutipan sumber memungkinkan pemeriksaan, tetapi ketepatan kutipan dan dukungannya terhadap klaim tetap harus dinilai. Penilaian skor dan penjelasan tidak dapat dipertukarkan ([S6, §§4.2–5](https://arxiv.org/html/2603.10303)). Persepsi kegunaan juga berbeda dari akurasi penilaian.

## Gagasan dari riset manual

Alur berikut mengadopsi gagasan pengguna sebagai **konsep sementara**, bukan arsitektur implementasi yang sudah ditetapkan.

1. Abstrak usulan dan korpus pembanding menjadi masukan ekstraksi aspek penelitian.
2. Aspek yang diekstrak dibandingkan untuk memperoleh kemiripan per aspek.
3. Hasil perbandingan disertai kutipan bukti untuk menjadi bahan pertimbangan dosen.

Skema usulan adalah **masalah/tujuan, metode, data/objek, dan kontribusi bila tersedia**. Masalah tidak selalu sama dengan tujuan; dataset lebih sempit daripada objek penelitian; kontribusi tidak selalu tertulis eksplisit. Definisi aspek perlu diperjelas sebelum dijadikan kategori anotasi atau keluaran sistem.

**Informasi yang tidak ada ditandai tidak tersedia**, bukan diberi skor nol atau dibuat oleh LLM. Tidak tertulis di abstrak juga tidak berarti tidak ada dalam penelitian. Kebijakan penggabungan skor ketika aspek hilang belum diputuskan.

Gambar manual menggunakan istilah “korpus abstrak skripsi”. Klarifikasi sumber data saat ini adalah JIP, yang menyediakan artikel jurnal; keduanya tidak disamakan. S2 digunakan untuk landasan literatur, bukan otomatis korpus pembanding runtime. SPECTER menunjukkan graph sitasi dapat memberi sinyal pelatihan dengan inference title+abstract saja ([S8, §§2.2–2.5](https://aclanthology.org/2020.acl-main.207.pdf)); itu alternatif konseptual, bukan kewajiban integrasi graph aplikasi.

Retrieval dan LLM comparison dari paper Liu dkk. (ID sumber S2, bukan layanan Semantic Scholar) dapat menjadi rujukan pengembangan analisis ide. Namun, distillation, RAG, dan LLM novelty scoring belum diputuskan sebagai komponen wajib. Tidak perlu memasukkan semua teknik dari seluruh paper agar landasan penelitian kuat.

## Pertanyaan penelitian sementara

Ketiga pertanyaan berikut dipertahankan dari riset manual pengguna. **RQ2 direkomendasikan sebagai fokus utama**, bukan keputusan metodologi final. RQ1 mendukung keandalan komponen ekstraksi; RQ3 menilai penjelasan dan manfaat pengguna yang tidak terjawab hanya oleh hasil retrieval.

| RQ | Pertanyaan penelitian | Kebutuhan bukti, belum tersedia sebagai hasil |
|---|---|---|
| **RQ1** | Seberapa akurat sistem mengekstrak aspek tujuan, metode, dan objek penelitian dari abstrak? | Pembandingan dengan anotasi ahli. Ketersediaan annotator dan protokol belum dipastikan; tidak menganggap keluaran LLM sebagai gold ahli. |
| **RQ2** | Apakah aspect-aware similarity lebih baik daripada similarity abstrak keseluruhan dalam menemukan penelitian yang substansinya tumpang tindih? | Pembandingan pada data dan penilaian relevansi yang sepadan. S5 mendukung pentingnya pertanyaan, tetapi tidak menjamin jawabannya positif untuk skema dan bahasa ini. |
| **RQ3** | Apakah penjelasan kemiripan per aspek dapat membantu dosen menilai kesamaan penelitian? | Pisahkan ketepatan kutipan/isi penjelasan dari persepsi kegunaan atau kepuasan. Salah satu tidak membuktikan yang lain; akses dosen belum dipastikan. |

## Kandidat pembanding

M1–M4 berikut adalah **rancangan manual pengguna yang masih sementara**, bukan eksperimen atau hasil yang dilaporkan S4/S5.

| Kandidat | Metode usulan | Pertanyaan yang ingin diisolasi |
|---|---|---|
| **M1** | TF-IDF + cosine similarity | Baseline leksikal untuk kesamaan kata/fitur permukaan. |
| **M2** | Sentence-BERT + cosine similarity pada abstrak utuh | Baseline semantik tanpa pemisahan aspek. |
| **M3** | Sentence-BERT per aspek + rata-rata skor | Hipotesis efek pemisahan aspek dibandingkan representasi abstrak utuh. |
| **M4** | Sentence-BERT per aspek + pembobotan aspek | Hipotesis efek agregasi berbobot dibandingkan rata-rata. |

Pembandingan M2/M3 perlu encoder dan kondisi pembanding yang sepadan agar perubahan tidak sekaligus berasal dari model atau kandidat yang berbeda. Ekstraktor/peringkas yang mengubah kandungan atau panjang teks dapat menjadi confound: efeknya bukan hanya label aspek. M3/M4 hanya mengisolasi pembobotan bila komponen lain tetap.

Bobot tidak boleh dipilih berdasarkan data uji; M4 tidak diasumsikan unggul. Notes ini tidak menetapkan checkpoint, bobot, K, ambang, split, jumlah data, atau protokol anotasi. Angka dalam literatur adalah laporan studi asal, bukan keputusan untuk skripsi ini.

S5 memakai ruang aspek yang **dilatih dari input utuh**, bukan SBERT biasa atas potongan hasil ekstraksi. Karena itu, S5 merupakan pembanding ilmiah yang harus dijelaskan perbedaannya, bukan bukti bahwa M3 atau M4 telah tervalidasi ([S5, §§3–5, footnote 5, §7](https://arxiv.org/pdf/2203.14541)). Pemilihan pembanding final masih membutuhkan penyelarasan ruang lingkup.

## Calon kontribusi dan batas klaim

[INFERENCE] Calon kontribusi adalah **bukti empiris tentang manfaat dan keterbatasan representasi per aspek pada abstrak berbahasa Indonesia**, disertai penjelasan yang dapat ditelusuri dan penilaian apakah informasi tersebut membantu dosen memahami overlap substansi.

Kontribusi itu bukan penciptaan IndoBERT, SBERT, atau aspect-aware similarity. Tidak diklaim sebagai sistem pertama; kombinasi fitur dan dataset lokal saja tidak cukup membuktikan kebaruan. [Matriks literatur](03-matriks-literatur-landasan.md) membatasi celah bukti pada sumber yang ditelaah, bukan seluruh literatur dunia.

**Risiko kebaruan tetap merupakan tujuan interpretatif**, bukan dihapus dari arah penelitian. Indikasinya relatif terhadap korpus yang tersedia dan perlu interpretasi ahli. Belum ada label risiko, ambang, atau probabilitas yang tervalidasi. Bukti overlap tinggi tidak otomatis meniadakan kontribusi; tidak ditemukannya padanan tidak membuktikan novelty global.

Ketepatan ekstraksi, ketepatan perbandingan, keterlacakan penjelasan, dan manfaat pengguna perlu dibedakan. Kemudahan membaca laporan tidak otomatis membuktikan keputusan akademik lebih tepat. Sumber bahasa Inggris dan benchmark sintetis juga tidak menggantikan validasi lokal.

## Penjelasan singkat untuk dosen

> Saya ingin meneliti apakah membandingkan abstrak berdasarkan aspek penelitian dapat membantu menunjukkan kesamaan substansi secara lebih jelas daripada satu skor kemiripan keseluruhan. Sistem diarahkan untuk menunjukkan aspek yang serupa, aspek yang berbeda, dan bukti teksnya agar dosen dapat memeriksa hasilnya. Penelitian ini tidak menganggap skor kemiripan sebagai kepastian kebaruan; kontribusi yang ingin diuji adalah kualitas perbandingan dan penjelasannya pada konteks abstrak berbahasa Indonesia.
