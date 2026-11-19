---
category: Landasan
date: 2026-11-06
---

# Cara Kerja Sistem Kemiripan Abstrak dan Peran Model

> **Status:** Rancangan alur sistem; bukan laporan hasil eksperimen.

Navigasi: [inti penelitian](01-inti-penelitian-5w1h.md) · [data dan pengujian](05-rancangan-metode-data-dan-evaluasi.md) · [matriks literatur](03-matriks-literatur-landasan.md).

## Alur sistem yang diselaraskan

Masukan utama adalah **satu abstrak usulan berbahasa Indonesia**. Korpus pembanding dibatasi pada **abstrak skripsi/TA JTI Polinema**. Masalah dan objek menjadi dasar perbandingan aspek; metode ditampilkan sebagai informasi pendamping.

![Diagram persiapan korpus, pencarian kandidat, perbandingan aspek, dan keputusan dosen](../assets/alur-kemiripan.svg)

### Persiapan korpus

1. Kumpulkan abstrak beserta identitas dokumen, judul, dan sumbernya.
2. Rapikan teks pada salinan dan periksa duplikasi. Teks asli tetap disimpan.
3. Pisahkan abstrak menjadi kalimat, lalu labeli **masalah, objek, dan metode**. Satu kalimat boleh memiliki lebih dari satu label; semua label bernilai nol berarti **lain**.
4. Buat embedding abstrak utuh serta representasi masalah, objek, dan gabungan masalah–objek.
5. Simpan representasi, label, identitas dokumen, versi model, dan aturan pengolahan dalam indeks.

### Saat dosen memakai

1. Dosen menempelkan satu abstrak. Sistem memeriksa input dan mengolahnya dengan aturan yang sama seperti korpus.
2. Sistem membentuk embedding abstrak utuh dan melabeli kalimat input.
3. **Retrieval:** cari top-N kandidat menggunakan cosine similarity abstrak utuh. Jika input berasal dari korpus, dokumen itu sendiri dikeluarkan dari kandidat.
4. **Reranking:** urutkan ulang kandidat berdasarkan kemiripan masalah dan objek. Metode tidak memiliki skor tersendiri dalam pengurutan ini.
5. Tentukan kategori **tinggi, sedang, atau rendah** untuk kandidat dan setiap aspek yang dapat dibandingkan. Ambangnya ditentukan dari data pengembangan yang dinilai manusia, bukan posisi ranking.
6. Cari pasangan kata atau frasa yang sepadan maknanya pada kedua abstrak untuk diberi **highlight**.
7. Tampilkan top-K hasil beserta judul, sumber, kategori, metode sebagai informasi pendamping, dan kedua abstrak untuk diperiksa berdampingan. Skor angka dipakai di dalam sistem, bukan ditampilkan kepada dosen.
8. Dosen membaca bukti dan mengambil keputusan. Sistem tidak memutuskan kebaruan, plagiarisme, redundansi, atau kelayakan usulan.

N adalah jumlah kandidat yang diambil; K adalah jumlah hasil yang ditampilkan. Nilainya belum ditetapkan. Alur ini adalah rancangan yang dituju, bukan fungsi yang sudah berjalan seluruhnya.

### Jika informasi tidak lengkap

- Aspek yang tidak ditemukan diberi keterangan **tidak teridentifikasi**, bukan skor nol atau kategori rendah.
- Jika hanya satu aspek dapat dibandingkan, gunakan aspek yang tersedia dan tampilkan keterbatasannya.
- Jika masalah dan objek sama-sama tidak teridentifikasi pada input, gunakan urutan abstrak utuh dengan pemberitahuan bahwa perbandingan aspek tidak tersedia.
- Jika tidak ada kandidat berkategori tinggi, tetap tampilkan kandidat terdekat dengan keterangan **tidak ditemukan kemiripan tinggi dalam korpus**.
- Jika tidak ditemukan pasangan kata atau frasa, tampilkan kedua teks tanpa highlight dan beri keterangan.
- Abstrak yang melebihi batas token model dibagi menjadi bagian-bagian, lalu representasinya digabung. Teks tidak dipotong diam-diam.

### Peran model

**Classifier multi-label** menentukan kalimat masalah, objek, dan metode berdasarkan informasi yang tertulis. **Embedding** mengubah teks menjadi vektor. **Cosine similarity** menghitung kedekatan vektor. **Alignment** mencari pasangan kata atau frasa untuk highlight.

Label kalimat dan highlight bukan hal yang sama. Kalimat berlabel masalah belum tentu seluruh katanya sepadan dengan kalimat masalah pada abstrak lain. Ketepatan label dan pasangan highlight perlu diuji terpisah.

Checkpoint classifier, model embedding, bobot masalah–objek, dan cara alignment belum dipilih. Sentence-BERT menjadi landasan representasi semantik, bukan nama model final yang sudah terbukti cocok.

## Konsep yang dibedakan

**Lexical similarity dan semantic similarity.** Kemiripan leksikal berfokus pada kesamaan kata/fitur permukaan, sedangkan representasi semantik berusaha menangkap kedekatan makna. Sentence-BERT memberi dasar pembelajaran embedding yang dapat dibandingkan menggunakan cosine; tidak berarti semua embedding BERT siap dipakai untuk tugas itu ([S3, §§3–4](https://aclanthology.org/D19-1410.pdf)).

**IndoBERT dan Sentence-BERT.** IndoBERT merupakan backbone bahasa, sedangkan SBERT merupakan pendekatan representasi/pelatihan. Keduanya tidak selalu merupakan pilihan yang saling meniadakan. Pemakaian backbone Indonesia tidak dengan sendirinya membuktikan kualitas sentence similarity; keberhasilan pendekatan SBERT berbahasa Inggris juga tidak membuktikan transfer ke abstrak Indonesia ([S1, PDF pp. 4–6 dan 10–11](https://thescipub.com/jcs/jcssp.2026.2444.2455.pdf); [S3, §§3–4](https://aclanthology.org/D19-1410.pdf)). Checkpoint belum dipilih.

**Holistic dan aspect-aware representation.** Holistic membandingkan dokumen secara keseluruhan; aspect-aware membedakan dasar kesamaan menurut aspek. Mekanismenya tidak tunggal: S4 memakai citation-section labels untuk klasifikasi pasangan, S5 melatih ruang embedding khusus aspek dari judul+abstrak utuh, sedangkan gagasan pengguna mengekstrak bagian aspek sebelum membandingkannya ([S4, §§3.1–3.4](https://aclanthology.org/2020.coling-main.545.pdf); [S5, §§3–4](https://arxiv.org/pdf/2203.14541)). Ketiganya tidak boleh disebut algoritme yang identik.

**Extraction dan generation.** Ekstraksi mengambil bagian yang memang terdapat pada teks; generasi dapat menyusun ulang atau menambahkan rumusan. Riset aspek untuk summarization menyediakan precedent ekstraksi kalimat, tetapi skema dan sumber bagiannya berbeda dari abstrak saja ([S7, §§3.1–3.2](https://link.springer.com/article/10.1007/s41060-024-00665-z)). [INFERENCE] Bila kelak digunakan LLM untuk merumuskan aspek, hasil generasi perlu dibedakan dari kutipan sumber dan tidak boleh diperlakukan sebagai informasi yang pasti tertulis.

**Conceptual overlap dan novelty.** Kesamaan tujuan, pendekatan, atau objek merupakan bukti overlap; kebaruan memerlukan interpretasi kontribusi relatif terhadap penelitian sebelumnya. S2 menyediakan pendekatan idea-level, tetapi label sintetis dan asumsi novelty-nya membatasi klaim ([S2, §§3–4 dan §7](https://arxiv.org/html/2505.24615)). Cosine maupun skor rubrik LLM bukan otomatis probabilitas kebaruan. Temperature scaling pada logits classifier dalam [S9, §§2, 4–5](https://proceedings.mlr.press/v70/guo17a/guo17a.pdf) tidak langsung mengubah kedua jenis skor itu menjadi probabilitas.

**Penjelasan berbukti dan penjelasan yang terdengar meyakinkan.** Kutipan sumber memungkinkan pemeriksaan, tetapi ketepatan kutipan dan dukungannya terhadap klaim tetap harus dinilai. Penilaian skor dan penjelasan tidak dapat dipertukarkan ([S6, §§4.2–5](https://arxiv.org/html/2603.10303)). Persepsi kegunaan juga berbeda dari akurasi penilaian.

## Aspek yang dibandingkan

Skema aktif adalah **masalah, objek, dan metode**. Tujuan tidak otomatis disamakan dengan masalah; dataset dapat menjadi bagian objek. Batas setiap label perlu dijelaskan dalam pedoman anotasi.

Metode hanya informasi pendamping dalam perbandingan aspek. Namun, retrieval abstrak utuh dan kalimat multi-label masih bisa membawa informasi metode. Jadi, tidak tepat menyebut hasilnya bebas dari seluruh pengaruh metode.

Informasi yang tidak tertulis tidak boleh dibuat oleh model. Tidak tertulis di abstrak juga tidak berarti tidak ada dalam penelitian aslinya.

## Pertanyaan penelitian

Fokus utama adalah **apakah pemilihan dan pemisahan aspek masalah–objek memperbaiki urutan kandidat**. Ketepatan pelabelan, kategori, dan highlight diperiksa sebagai bagian pendukung.

| Bagian | Pertanyaan yang diuji |
|---|---|
| Pelabelan | Seberapa tepat classifier mengenali masalah, objek, dan metode? |
| Pengurutan — utama | Bagaimana kualitas urutan dari abstrak utuh, gabungan masalah–objek, dan aspek terpisah? |
| Kategori | Apakah kategori tinggi, sedang, dan rendah sesuai penilaian ahli? |
| Highlight | Apakah pasangan kata atau frasa yang ditandai benar-benar sepadan maknanya? |

Manfaat bagi dosen, seperti penghematan waktu, memerlukan uji pengguna tersendiri. Hasil evaluasi model tidak otomatis membuktikan manfaat tersebut.

## Kandidat pembanding

| Kondisi | Representasi untuk pengurutan | Yang diperiksa |
|---|---|---|
| **A — abstrak utuh** | Satu embedding seluruh abstrak; mengikuti urutan retrieval awal | Acuan tanpa pemilihan aspek |
| **B — gabungan masalah–objek** | Satu embedding dari gabungan kalimat masalah atau objek | Pengaruh pemilihan teks aspek |
| **C — aspek terpisah** | Embedding masalah dan objek terpisah, lalu skor keduanya digabung | Pengaruh pemisahan representasi |

**A, B, dan C memakai kandidat serta encoder yang sama.** Retrieval awal selalu memakai abstrak utuh. B dan C memakai hasil pelabelan yang sama, tanpa peringkasan atau penulisan ulang. Pada B, kalimat multi-label dimasukkan sekali sesuai urutan asli; pada C, satu kalimat dapat masuk ke kedua representasi.

Bobot penggabungan skor C dipilih pada data pengembangan, bukan data uji. C tidak diasumsikan unggul. TF-IDF + cosine dapat ditambahkan sebagai pembanding leksikal; bukan pengganti tiga kondisi utama.

S5 melatih ruang aspek dari input utuh, bukan embedding biasa atas kalimat hasil pelabelan. S5 tetap pembanding literatur, bukan bukti bahwa B atau C sudah tervalidasi ([S5, §§3–5 dan §7](https://arxiv.org/pdf/2203.14541)).

## Calon kontribusi dan batas klaim

Kontribusi yang ingin diuji adalah **pengaruh pemilihan teks masalah–objek dan pemisahan representasinya terhadap kualitas reranking abstrak berbahasa Indonesia**. Ini bukan penciptaan IndoBERT, SBERT, atau konsep kemiripan berbasis aspek.

Kategori merah, oranye, dan hijau menunjukkan kemiripan tinggi, sedang, dan rendah **dalam korpus yang diperiksa**. Kemiripan tinggi tidak otomatis berarti penelitian tidak baru; kemiripan rendah tidak membuktikan kebaruan. Penilaian kontribusi tetap dilakukan dosen.

## Penjelasan singkat untuk dosen

> Saya ingin menguji apakah perbandingan masalah dan objek dapat menghasilkan urutan penelitian terkait yang lebih tepat daripada perbandingan abstrak utuh. Sistem menampilkan kategori kemiripan dan pasangan kata atau frasa agar hasilnya dapat diperiksa. Sistem ini membantu pemeriksaan, bukan menentukan kebaruan penelitian.
