---
category: Landasan
date: 2026-11-06
---

# Cara Kerja Sistem Kemiripan Abstrak dan Peran Model

> **Status:** Catatan fondasi penelitian; bukan metodologi final atau laporan hasil eksperimen. Arah ini menggantikan penelitian deteksi teks AI.

Navigasi: [inti penelitian](01-inti-penelitian-5w1h.md) · [data dan pengujian](05-rancangan-metode-data-dan-evaluasi.md) · [matriks literatur](03-matriks-literatur-landasan.md) · [jejak penelusuran](07-jejak-penelusuran.md).

## Alur sistem yang diselaraskan

Penyelarasan 9 November 2026: masukan utama **copas judul + abstrak**, korpus **skripsi + jurnal**, dan aspek **masalah, objek, metode**. Metode hanya informasi; tidak memengaruhi skor akhir, warna, atau urutan akhir. Warna menyatakan kemiripan substansi, bukan vonis kebaruan.

![Diagram persiapan korpus, pencarian kandidat, perbandingan aspek, dan keputusan dosen](../assets/alur-kemiripan.svg)

### Persiapan korpus

1. Kumpulkan abstrak skripsi dan jurnal beserta judul, identitas, tautan asal, dan label sumber.
2. Bersihkan teks dan buang duplikat; pertahankan teks asli untuk kutipan.
3. Buat embedding abstrak dan simpan dalam indeks pencarian. Ulangi persiapan ketika korpus diperbarui.

### Saat dosen memakai

1. Dosen menempelkan judul dan abstrak.
2. Sistem membentuk representasi kueri yang kompatibel dengan indeks korpus. Penggunaan judul dalam embedding harus konsisten antara kueri dan korpus; detailnya belum dipilih.
3. Cari sekitar **10–20 kandidat** terdekat dari gabungan korpus. Ini rentang awal untuk diuji, bukan K final.
4. Labeli kalimat input dan kandidat dengan **classifier multi-label masalah / objek / metode**. Satu kalimat dapat memiliki beberapa label. Pilihan ini bersyarat ketersediaan anotasi pelatihan dan evaluasi; cadangannya LLM few-shot dengan gold set manusia kecil, bukan evaluasi tanpa penilai.
5. Bandingkan masalah dengan masalah dan objek dengan objek. Metode ditampilkan sebagai konteks saja. Retrieval abstrak utuh masih dapat terpengaruh kesamaan metode; pengecualian metode berlaku pada penilaian akhir.
6. Tentukan **merah / oranye / hijau** untuk kemiripan substansi tinggi / sedang / rendah, menggunakan ambang yang dikalibrasi dengan penilaian manusia. Jika masalah atau objek tidak cukup jelas untuk dinilai, tampilkan **bukti tidak cukup**, bukan memaksakan warna.
7. Susun penjelasan dan kesimpulan menggunakan **template dan kutipan kalimat berlabel**, bukan generasi bebas LLM. Aspek yang tidak disebut tidak boleh dikarang.
8. Urutkan hasil berpenilaian dari kemiripan masalah dan objek tertinggi; tampilkan warna, label sumber, highlight, penjelasan, dan kesimpulan. Hasil dengan bukti tidak cukup harus dibedakan dari hasil berkemiripan rendah; posisi tampilannya belum ditetapkan.
9. Dosen membaca bukti dan mengambil keputusan.

Ini rancangan yang dituju, bukan fungsi yang sudah berjalan. Model, agregasi skor masalah–objek, nilai K, ambang, dan layout belum final. PDF bukan input utama dalam lingkup ini.

### Titik rawan dan penilaian manusia

- **Retrieval:** kandidat relevan yang terlewat tidak dapat dipulihkan oleh tahap perbandingan. Ukur Recall@K dengan memperhatikan cakupan penilaian relevansi.
- **Pelabelan:** kesalahan label memengaruhi highlight dan perbandingan; bandingkan dengan anotasi manusia.
- **Tingkat kemiripan:** kalibrasi ambang menggunakan gold set kalibrasi, bukan data evaluasi akhir.
- **Penjelasan:** nilai apakah kutipan benar dan mendukung setiap klaim; penjelasan yang lancar belum tentu setia pada teks.

## Peran pekerjaan model

**Pelabelan aspek** menentukan kalimat yang membahas masalah, objek, atau metode. **Embedding** mengubah teks menjadi representasi numerik agar kedekatannya dapat dihitung. **Cosine similarity** membandingkan representasi tersebut; nilainya bukan persentase kebaruan. **Penjelasan** menghubungkan hasil perbandingan dengan kutipan yang dapat diperiksa.

Sentence-BERT menjadi kandidat representasi semantik, bukan checkpoint final. Pelabelan dipilih menggunakan classifier multi-label; LLM few-shot hanya cadangan jika anotasi pelatihan tidak mencukupi tetapi penilaian manusia untuk evaluasi tetap tersedia. Konfigurasi pelatihan dan agregasi skor belum final. [Rencana pilot, anotasi, dan cadangan](05-rancangan-metode-data-dan-evaluasi.md) merinci prasyaratnya.

## Konsep yang dibedakan

**Lexical similarity dan semantic similarity.** Kemiripan leksikal berfokus pada kesamaan kata/fitur permukaan, sedangkan representasi semantik berusaha menangkap kedekatan makna. Sentence-BERT memberi dasar pembelajaran embedding yang dapat dibandingkan menggunakan cosine; tidak berarti semua embedding BERT siap dipakai untuk tugas itu ([S3, §§3–4](https://aclanthology.org/D19-1410.pdf)).

**IndoBERT dan Sentence-BERT.** IndoBERT merupakan backbone bahasa, sedangkan SBERT merupakan pendekatan representasi/pelatihan. Keduanya tidak selalu merupakan pilihan yang saling meniadakan. Pemakaian backbone Indonesia tidak dengan sendirinya membuktikan kualitas sentence similarity; keberhasilan pendekatan SBERT berbahasa Inggris juga tidak membuktikan transfer ke abstrak Indonesia ([S1, PDF pp. 4–6 dan 10–11](https://thescipub.com/jcs/jcssp.2026.2444.2455.pdf); [S3, §§3–4](https://aclanthology.org/D19-1410.pdf)). Checkpoint belum dipilih.

**Holistic dan aspect-aware representation.** Holistic membandingkan dokumen secara keseluruhan; aspect-aware membedakan dasar kesamaan menurut aspek. Mekanismenya tidak tunggal: S4 memakai citation-section labels untuk klasifikasi pasangan, S5 melatih ruang embedding khusus aspek dari judul+abstrak utuh, sedangkan gagasan pengguna mengekstrak bagian aspek sebelum membandingkannya ([S4, §§3.1–3.4](https://aclanthology.org/2020.coling-main.545.pdf); [S5, §§3–4](https://arxiv.org/pdf/2203.14541)). Ketiganya tidak boleh disebut algoritme yang identik.

**Extraction dan generation.** Ekstraksi mengambil bagian yang memang terdapat pada teks; generasi dapat menyusun ulang atau menambahkan rumusan. Riset aspek untuk summarization menyediakan precedent ekstraksi kalimat, tetapi skema dan sumber bagiannya berbeda dari abstrak saja ([S7, §§3.1–3.2](https://link.springer.com/article/10.1007/s41060-024-00665-z)). [INFERENCE] Bila kelak digunakan LLM untuk merumuskan aspek, hasil generasi perlu dibedakan dari kutipan sumber dan tidak boleh diperlakukan sebagai informasi yang pasti tertulis.

**Conceptual overlap dan novelty.** Kesamaan tujuan, pendekatan, atau objek merupakan bukti overlap; kebaruan memerlukan interpretasi kontribusi relatif terhadap penelitian sebelumnya. S2 menyediakan pendekatan idea-level, tetapi label sintetis dan asumsi novelty-nya membatasi klaim ([S2, §§3–4 dan §7](https://arxiv.org/html/2505.24615)). Cosine maupun skor rubrik LLM bukan otomatis probabilitas kebaruan. Temperature scaling pada logits classifier dalam [S9, §§2, 4–5](https://proceedings.mlr.press/v70/guo17a/guo17a.pdf) tidak langsung mengubah kedua jenis skor itu menjadi probabilitas.

**Penjelasan berbukti dan penjelasan yang terdengar meyakinkan.** Kutipan sumber memungkinkan pemeriksaan, tetapi ketepatan kutipan dan dukungannya terhadap klaim tetap harus dinilai. Penilaian skor dan penjelasan tidak dapat dipertukarkan ([S6, §§4.2–5](https://arxiv.org/html/2603.10303)). Persepsi kegunaan juga berbeda dari akurasi penilaian.

## Gagasan dari riset manual

Rancangan terbaru memakai **retrieval dahulu**, lalu pelabelan input dan kandidat, perbandingan masalah–objek, serta penjelasan berbukti. Ini memperjelas gagasan manual sebelumnya yang belum menetapkan urutan retrieval dan ekstraksi.

Skema aktif adalah **masalah, objek, dan metode**. Tujuan tidak otomatis disamakan dengan masalah; dataset dapat menjadi bagian objek. Kontribusi bukan label inti dalam rancangan ini. Batas operasional setiap label harus ditulis dalam pedoman anotasi.

**Informasi yang tidak ada ditandai tidak tersedia**, bukan diberi skor nol atau dibuat oleh LLM. Tidak tertulis di abstrak juga tidak berarti tidak ada dalam penelitian. Bukti masalah atau objek yang tidak memadai menghasilkan status **bukti tidak cukup**.

Korpus direncanakan mencakup abstrak skripsi dan jurnal dengan label sumber terpisah. JIP tetap calon sumber jurnal; sumber skripsi dan izin akses belum dipastikan. S2 digunakan sebagai landasan literatur, bukan otomatis korpus runtime. SPECTER menunjukkan graph sitasi dapat memberi sinyal pelatihan dengan inference title+abstract saja ([S8, §§2.2–2.5](https://aclanthology.org/2020.acl-main.207.pdf)); itu alternatif konseptual, bukan kewajiban integrasi graph aplikasi.

Retrieval dan LLM comparison dari paper Liu dkk. (ID sumber S2, bukan layanan Semantic Scholar) dapat menjadi rujukan pengembangan analisis ide. Namun, distillation, RAG, dan LLM novelty scoring belum diputuskan sebagai komponen wajib. Tidak perlu memasukkan semua teknik dari seluruh paper agar landasan penelitian kuat.

## Pertanyaan penelitian sementara

**RQ2 dikunci sebagai fokus utama: reranking masalah–objek pada kandidat hasil retrieval abstrak utuh.** RQ1 tetap diukur sebagai evaluasi komponen pelabelan, bukan kontribusi utama. Ketepatan penjelasan template diperiksa; uji manfaat pengguna pada RQ3 tetap bersyarat akses dosen, bukan klaim manfaat yang sudah dibuktikan.

| RQ | Pertanyaan penelitian | Kebutuhan bukti, belum tersedia sebagai hasil |
|---|---|---|
| **RQ1** | Seberapa akurat classifier multi-label melabeli masalah, objek, dan metode pada kalimat abstrak? | Anotasi manusia terpisah dari pelatihan; precision, recall, dan F1 per label serta agregat dengan protokol yang ditetapkan lewat pilot |
| **RQ2 — utama** | Apakah reranking berdasarkan representasi masalah dan objek secara terpisah menghasilkan urutan yang lebih relevan daripada abstrak utuh dan gabungan teks masalah+objek? | Kandidat dan encoder sama; gold set relevansi bertingkat untuk nDCG@K; target 60 kueri uji setelah pilot |
| **RQ3 — bersyarat** | Apakah penjelasan template berbukti membantu dosen memahami kemiripan penelitian? | Pisahkan ketepatan kutipan dari manfaat pengguna; akses dosen belum dipastikan |

## Kandidat pembanding

Rancangan pembanding berikut disepakati pada **9 November 2026**. Ini protokol yang direncanakan, bukan hasil eksperimen S4/S5.

| Kandidat | Metode | Tujuan |
|---|---|---|
| **M1** | TF-IDF + cosine similarity | Baseline leksikal murah; juga retriever tambahan untuk memperluas pool penilaian |
| **M2** | Embedding abstrak utuh + cosine similarity | Acuan semantik tanpa pemilihan aspek |
| **M3** | Gabungkan teks berlabel masalah atau objek menjadi satu representasi embedding | Dibanding M2: menguji pemilihan teks aspek |
| **M4** | Embedding masalah dan objek secara terpisah, lalu agregasi skor | Dibanding M3: menguji pemisahan representasi aspek |

**M2–M4 memakai kandidat dan encoder yang sama.** M3/M4 memakai label dan teks sumber yang sama, tanpa peringkasan atau penulisan ulang. Pada M3, kalimat multi-label dimasukkan sekali sesuai urutan asli. Pada M4, kalimat yang berlabel masalah sekaligus objek dapat masuk kedua representasi. Definisi aspek dan aturan pemilihan teks harus dicatat agar perbedaan tidak berasal dari ekstraktor berbeda.

Metode hanya informasi dalam penilaian akhir. Ini keputusan lingkup pengguna, bukan klaim bahwa metode tidak penting secara ilmiah. Retrieval abstrak utuh dan kalimat multi-label tetap dapat membawa informasi metode; jangan mengklaim M3/M4 bebas seluruh informasi metode.

Untuk membandingkan urutan, M1 juga dinilai pada kandidat tetap; peran TF-IDF sebagai retriever pembentuk pool dilaporkan terpisah. **Pool penilaian yang lebih luas tidak sama dengan kandidat reranking.**

Rentang kandidat awal adalah 10–20; target evaluasi akhir **60 kueri setelah pilot**. Encoder, konfigurasi classifier, agregasi skor M4, K final, dan ambang belum ditetapkan. Parameter tidak dipilih berdasarkan data uji; M4 tidak diasumsikan unggul.

S5 melatih ruang aspek dari input utuh, bukan embedding biasa atas kalimat hasil pelabelan. S5 tetap pembanding literatur, bukan eksperimen wajib tambahan atau bukti bahwa M3/M4 telah tervalidasi ([S5, §§3–5, footnote 5, §7](https://arxiv.org/pdf/2203.14541)).

## Calon kontribusi dan batas klaim

Calon kontribusi utama adalah **bukti empiris tentang pengaruh pemilihan teks masalah–objek dan pemisahan representasinya terhadap kualitas reranking abstrak berbahasa Indonesia**. Ketepatan classifier multi-label dan penjelasan template dievaluasi sebagai komponen pendukung, bukan klaim penciptaan model atau pembuktian kebaruan penelitian.

Kontribusi itu bukan penciptaan IndoBERT, SBERT, atau aspect-aware similarity. Tidak diklaim sebagai sistem pertama; kombinasi fitur dan dataset lokal saja tidak cukup membuktikan kebaruan. [Matriks literatur](03-matriks-literatur-landasan.md) membatasi celah bukti pada sumber yang ditelaah, bukan seluruh literatur dunia.

**Risiko kebaruan tetap merupakan tujuan interpretatif**, bukan dihapus dari arah penelitian. Warna menunjukkan tingkat kemiripan substansi relatif terhadap korpus, bukan label risiko kebaruan atau probabilitas yang tervalidasi. Bukti overlap tinggi tidak otomatis meniadakan kontribusi; tidak ditemukannya padanan tidak membuktikan novelty global.

Ketepatan ekstraksi, ketepatan perbandingan, keterlacakan penjelasan, dan manfaat pengguna perlu dibedakan. Kemudahan membaca laporan tidak otomatis membuktikan keputusan akademik lebih tepat. Sumber bahasa Inggris dan benchmark sintetis juga tidak menggantikan validasi lokal.

## Penjelasan singkat untuk dosen

> Saya ingin meneliti apakah membandingkan abstrak berdasarkan aspek penelitian dapat membantu menunjukkan kesamaan substansi secara lebih jelas daripada satu skor kemiripan keseluruhan. Sistem diarahkan untuk menunjukkan aspek yang serupa, aspek yang berbeda, dan bukti teksnya agar dosen dapat memeriksa hasilnya. Penelitian ini tidak menganggap skor kemiripan sebagai kepastian kebaruan; kontribusi yang ingin diuji adalah kualitas perbandingan dan penjelasannya pada konteks abstrak berbahasa Indonesia.
