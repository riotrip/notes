---
category: Literatur
date: 2026-11-06
---

# Jejak Penelusuran dan Bukti Literatur

> **Status:** Catatan fondasi penelitian; bukan metodologi final atau laporan hasil eksperimen. Arah ini menggantikan penelitian deteksi teks AI.

Navigasi: [inti penelitian](01-inti-penelitian-5w1h.md) · [sistem pembanding](06-sistem-pembanding-dan-pembeda.md) · [matriks literatur](03-matriks-literatur-landasan.md).

## Cakupan dan tanggal

Penelusuran terarah untuk memperkuat landasan kemiripan abstrak berbasis aspek, interpretasi tumpang tindih substansi, dan risiko kebaruan. Ini bukan tinjauan sistematis atau bukti bahwa kombinasi tertentu belum pernah diteliti. Literatur tidak dibatasi pada Polinema; Jurnal Informatika Polinema (JIP) hanya calon sumber dataset pada tahap berikutnya.

Pengambilan melalui Semantic Scholar (S2) berlangsung pada **2026-11-05**; integrasi notes dilanjutkan **2026-11-06**. Tanggal tersebut membedakan pengambilan sumber dari penyusunan catatan, bukan tanggal publikasi paper. S2 adalah satu-satunya penyedia API bibliografi yang dipilih. Metadata dicocokkan dengan sumber primer; kecocokan metadata tidak membuktikan klaim ilmiah.

Dua referensi dasar dan empat gambar riset manual pengguna menjadi titik awal. Tambahan yang memperkuat fokus adalah S5 (representasi khusus aspek), S3 (sentence embeddings), serta S8 sebagai pendukung opsional citation-informed representation. S9 mendukung kehati-hatian interpretasi skor. Tidak digunakan peringkat sitasi sebagai bukti bahwa metode pasti sesuai.

## Query dan akses S2

Credential tersedia dan akses terautentikasi berhasil; nilainya tidak dicatat. Sejumlah permintaan tetap memperoleh HTTP 429. Halaman [API resmi S2](https://www.semanticscholar.org/product/api) menyatakan introductory authenticated limit 1 request per second; angka 10 RPS pada protokol lokal lama tidak dipakai sebagai entitlement akun.

| Endpoint | Query | Parameter | Hasil pengambilan |
|---|---|---|---|
| `/graph/v1/paper/search` | `Indonesian semantic textual similarity sentence embeddings` | `year=2019-2026`, `limit=8` | Berhasil |
| `/graph/v1/paper/search` | `scientific document embeddings citation graph SPECTER` | `year=2017-2026`, `limit=5` | 429 |
| `/graph/v1/paper/search` | `sentence embeddings siamese BERT semantic similarity` | `year=2017-2026`, `limit=5` | Berhasil |
| `/graph/v1/paper/search` | `calibration neural networks confidence temperature scaling` | `year=2017-2026`, `limit=5` | Berhasil |
| `/graph/v1/paper/search` | `IndoNLU benchmark Indonesian language understanding` | `year=2017-2026`, `limit=5` | Berhasil; tidak dimasukkan sebagai sumber utama dalam sintesis ini |
| `/graph/v1/paper/search` | Percobaan judul SPECTER melalui relevance search | String dan parameter lengkap percobaan ini tidak dipertahankan dalam catatan ringkas | 429; tidak direkonstruksi sebagai log mentah |
| `/graph/v1/paper/search/bulk` | `SPECTER` | `year=2020-2020` | Berhasil; total 505 menurut API, bukan 505 sumber yang ditelaah |
| `/graph/v1/paper/search` | `Aspect based Document Similarity for Research Papers` | Tanpa filter tahun, `limit=5` | Berhasil |
| `/graph/v1/paper/search` | `Is This Idea Novel An Automated Benchmark for Judgment of Research Ideas` | Tanpa filter tahun, `limit=5` | Berhasil |
| `/graph/v1/paper/search` | `Leveraging Peer Review Aspects for Extractive and Abstractive Summarization of Scientific Articles` | Tanpa filter tahun, `limit=5` | 429 setelah retry |
| `/graph/v1/paper/search/bulk` | `"Leveraging Peer-Review Aspects"` | `year=2024-2026` | Berhasil; satu rekaman |

Fields awal: `paperId,title,authors,year,venue,externalIds,url,abstract,citationCount,openAccessPdf`. Query judul dari gambar memakai `publicationDate` dan tidak meminta `citationCount`; bulk terakhir memakai fields awal. Ini log ringkas query yang dijalankan, bukan ekspor seluruh respons dan bukan hitungan screening PRISMA.

Pemeriksaan known-citation menggunakan `scripts/semantic_scholar_client.py`, `SemanticScholarClient.lookup(entry)`, dengan pacing eksplisit 1,2 detik dan tanpa cache/penulisan disk. Status discovery dan lookup tambahan dipisahkan pada rekaman di bawah; 429 bukan hasil mismatch. Tidak dilakukan pengulangan API untuk sekadar menulis notes.

## Rekaman sumber

Semua rekaman di bawah berasal dari kajian pada 2026-11-05. **Artefak PDF lokal untuk S1–S9: tidak disimpan.** Cakupan baca dijelaskan per sumber; full text berarti teks lengkap versi yang disebut dibaca, bukan replikasi eksperimen atau audit semua versi. Tautan [matriks lokal](03-matriks-literatur-landasan.md) memetakan penggunaan seluruh sumber ini.

### S1 — Studi Indonesia tentang risiko kebaruan

- **Judul:** *Detecting Novelty in Indonesian Research Grant Proposals Using Machine Learning and Natural Language Processing*.
- **Penulis:** Walanstar Alimcan Sitorus; Evaristus Didik Madyatmadja.
- **Tahun/jenis/venue:** 2026; artikel jurnal; *Journal of Computer Science*, 22(8), 2444–2455.
- **Identitas:** DOI `10.3844/jcssp.2026.2444.2455`. S2 paperId tidak diperoleh; tidak ditebak.
- **Asal/status:** diberikan pengguna; metadata primer dari publisher. Lookup tambahan S2 mendapat 429; bukan mismatch atau bukti tidak terindeks.
- **URL primer/cakupan:** [halaman publisher](https://thescipub.com/jcs/jcssp.2026.2444.2455), [full PDF](https://thescipub.com/jcs/jcssp.2026.2444.2455.pdf) dibaca.
- **Locator dan bukti:** PDF pp. 4–6 / halaman 2447–2449: 52.084 **judul** proposal 2020–2024, menjadi 44.429 setelah deduplikasi; TF-IDF, LSA, IndoBERT, cosine, Top-K 10. Ambang 0,60 adalah contextual warning, bukan ambang universal. Table 2: 99,98% Top-1 IndoBERT ≥ 0,60, **bukan akurasi**.
- **Batas:** PDF pp. 10–11 mengakui tidak ada ground truth novelty manual dan keterbatasan judul. Checkpoint/pooling serta batas numerik High/Medium tidak lengkap pada metode yang dibaca. Tidak memvalidasi abstrak Indonesia, ambang JTI, atau keputusan kebaruan otomatis.

### S2 — Idea-level novelty dan distillation/RAG

- **Judul:** *Harnessing Large Language Models for Scientific Novelty Detection*.
- **Penulis:** Yan Liu; Zonglin Yang; Soujanya Poria; Thanh-Son Nguyen; Erik Cambria.
- **Tahun/jenis/venue:** 2025; versi diperiksa berupa preprint arXiv 2505.24615. Venue final belum diverifikasi.
- **Identitas:** DOI `10.48550/arXiv.2505.24615`; S2 `c863800ec76e62fed66bbf5ec84ceae8642fd910`.
- **Provider/status:** S2; known-citation DOI/title matched.
- **URL primer/cakupan:** [full HTML arXiv](https://arxiv.org/html/2505.24615) dibaca; [repositori penulis](https://github.com/SenticNet/novelty-detection) diperiksa sebagai pendukung, bukan bukti reproduksi.
- **Locator dan bukti:** §§4.1–4.3 dan Appendix A: ide dari title+abstract, korpus diperluas melalui referensi, variasi rephrased/partial/incremental, retriever kontrastif, LLM comparison, lalu decision-tree classifier. Ini menjembatani perbandingan teks dengan overlap konseptual, bukan sekadar satu cosine.
- **Batas:** §3 mengasumsikan ide paper novel dan variasi sintetis non-novel. §5 membatasi tanggal kandidat, tetapi tidak membuktikan split train/test kronologis. §7 membahas kesalahan generasi dan penyederhanaan label biner. Implementasi English BGE tidak membuktikan transfer Indonesia. Skor rubrik LLM bukan probabilitas novelty terkalibrasi.

### S3 — Sentence embeddings

- **Judul:** *Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks*.
- **Penulis:** Nils Reimers; Iryna Gurevych.
- **Tahun/jenis/venue:** 2019; prosiding EMNLP-IJCNLP, 3982–3992.
- **Identitas:** DOI `10.18653/v1/D19-1410`; S2 `93d63ec754f29fa22572615320afe0521f7ec66d`.
- **Provider/status:** S2; discovery berhasil, lookup DOI tambahan mendapat 429.
- **URL primer/cakupan:** [full PDF ACL](https://aclanthology.org/D19-1410.pdf) dibaca.
- **Locator dan bukti:** §§3–4: siamese/triplet learning, pooling dan representasi yang mendukung pencarian cosine. Pooled BERT tanpa penyesuaian tidak otomatis menghasilkan kualitas semantic similarity yang baik pada eksperimen mereka.
- **Batas:** dasar pendekatan representasi, bukan validasi checkpoint Inggris untuk abstrak Indonesia. IndoBERT adalah backbone bahasa, sedangkan SBERT adalah pendekatan representasi/pelatihan; keduanya tidak selalu saling meniadakan.

### S4 — Aspect-based similarity generasi awal

- **Judul:** *Aspect-based Document Similarity for Research Papers*.
- **Penulis:** Malte Ostendorff; Terry Ruas; Till Blume; Bela Gipp; Georg Rehm.
- **Tahun/jenis/venue:** 2020; prosiding COLING, 6194–6206.
- **Identitas:** proceedings DOI `10.18653/v1/2020.coling-main.545`; S2 `5a0c9bbf0432dac8bd357a4aabf82b83a6c95524`. DOI preprint pada discovery S2: `10.48550/arXiv.2010.06395`, bukan DOI prosiding.
- **Provider/status:** S2; discovery dan lookup DOI/title berhasil.
- **URL primer/cakupan:** [full PDF ACL](https://aclanthology.org/2020.coling-main.545.pdf) dibaca.
- **Locator dan bukti:** §§3.1–3.4, pp. 6196–6198: heading bagian tempat sitasi menjadi label aspek pasangan paper; pasangan judul+abstrak utuh menjadi input Transformer multilabel classification.
- **Batas:** bukan ekstraksi tujuan/metode/data atau embedding potongan+cosine. §5, pp. 6201–6202: ambiguity, imbalance, informasi abstrak tidak lengkap; validasi pengguna lebih luas masih future work.

### S5 — Pembanding ilmiah paling dekat

- **Judul:** *Specialized Document Embeddings for Aspect-based Similarity of Research Papers*.
- **Penulis:** Malte Ostendorff; Till Blume; Terry Ruas; Bela Gipp; Georg Rehm.
- **Tahun/jenis/venue:** 2022; prosiding ACM/IEEE Joint Conference on Digital Libraries (JCDL).
- **Identitas:** DOI `10.1145/3529372.3530912`; S2 `bcc4e46f856e54948425dcfc41ece0cbd9bf932b`.
- **Provider/status:** S2; discovery berhasil, lookup tambahan mendapat 429.
- **URL primer/cakupan:** [metadata institusi DFKI](https://dfki-nlp.github.io/publication/jcdl2022-ostendorff/), [full preprint v1](https://arxiv.org/pdf/2203.14541) dibaca. Publisher ACM mendapat 403; bukan audit final publisher PDF.
- **Locator dan bukti:** §§3–4, PDF pp. 3–5: judul+abstrak **utuh**, labels Papers with Code **task, method, dataset**, dan ruang embedding khusus per aspek. Varian terbaik Siamese-SciBERT memakai Multiple Negative Ranking Loss (footnote 5), bukan SBERT biasa tanpa pelatihan aspek. Per-aspect cosine retrieval membandingkan representasi specialized dengan generic.
- **Batas:** Table 3 / §5: manfaat bergantung metode; tidak semua specialization memperbaiki retrieval. §7 tidak mengevaluasi agregasi mean/bobot, faithful supporting excerpts, atau manfaat bagi dosen. Tidak menyegmentasi abstrak seperti gagasan pengguna; perbedaan itu perlu diuji, bukan bukti keunggulan rancangan baru.

### S6 — Benchmark penilaian novelty

- **Judul:** *Is This Idea Novel? An Automated Benchmark for Judgment of Research Ideas*.
- **Penulis:** Tim Schopf; Michael Färber.
- **Tahun/jenis/venue:** 2026; prosiding LREC, 4716–4727.
- **Identitas:** proceedings DOI `10.63317/4c3gy3f7epnj`; S2 `081f042862d9de3fcea02605c144104cf79f45a8`. DOI preprint `10.48550/arXiv.2603.10303` dicatat terpisah.
- **Provider/status:** S2; discovery dan lookup proceedings DOI/title matched.
- **URL primer/cakupan:** [metadata prosiding ACL](https://aclanthology.org/2026.lrec-1.370/); full text dibaca pada [arXiv HTML v1](https://arxiv.org/html/2603.10303), bukan klaim perbandingan seluruh isi dengan versi prosiding.
- **Locator dan bukti:** §4.1: RINoBench memuat 1.381 contoh dari peer-review ICLR 2022/2023; nilai reviewer disaring menurut kesepakatan, tetapi ide terstruktur dan rangkuman justifikasi diproses LLM. §4.2 memisahkan score metrics dan explanation metrics; beberapa penilaian penjelasan memakai LLM. §5 / Table 3: explanation alignment tidak menjamin score agreement.
- **Batas:** bukan anotasi langsung dosen Indonesia; justifikasi bukan gold sepenuhnya untouched-human. Macro-F1 bukan accuracy. §7: English/ICLR, kultur penilaian reviewer, dan preprocessing LLM membatasi generalisasi. Tanggal Maret pada S2 terkait preprint; prosiding terbit Mei 2026.

### S7 — Ekstraksi aspek untuk summarization

- **Judul:** *Leveraging peer-review aspects for extractive and abstractive summarization of scientific articles*.
- **Penulis:** Muhammad Majadly; Mark Last.
- **Tahun/jenis/venue:** volume 2025; artikel jurnal; *International Journal of Data Science and Analytics*, 19, 537–550. Terbit online 18 Oktober 2024.
- **Identitas:** DOI `10.1007/s41060-024-00665-z`; S2 `f3836addd503736cd6805dc96f49b0647a511fde`.
- **Provider/status:** S2; discovery bulk dan known-citation matched. Nama venue S2 “Analysis” dikoreksi menjadi “Analytics” berdasarkan publisher.
- **URL primer/cakupan:** [full publisher HTML Springer](https://link.springer.com/article/10.1007/s41060-024-00665-z) dibaca.
- **Locator dan bukti:** §§3.1–3.2: contribution, motivation, experimental claims dari Abstract+Introduction; claims support dari Results. Auxiliary objective QA ada di §4, tetapi bukan kategori objective extraction yang diuji tersendiri. §5.1.2 menggunakan dua annotator; perbedaan diselesaikan mengikuti label penulis pertama.
- **Batas:** §6.2.2: ratings kualitas ringkasan berasal dari ChatGPT, bukan user study dosen. Ukuran dataset berbeda antarabstract/introduction/methods; tidak dipilih satu jumlah seolah sudah direkonsiliasi. Precedent ekstraksi kalimat aspek dan summarization, bukan bukti langsung skema tujuan–metode–objek pada abstrak Indonesia.

### S8 — Pendukung graph-informed representation

- **Judul:** *SPECTER: Document-level Representation Learning using Citation-informed Transformers*.
- **Penulis:** Arman Cohan; Sergey Feldman; Iz Beltagy; Doug Downey; Daniel S. Weld.
- **Tahun/jenis/venue:** 2020; prosiding ACL, 2270–2282.
- **Identitas:** proceedings DOI `10.18653/v1/2020.acl-main.207`; S2 `a3e4ceb42cbcd2c807d53aff90a8cb1f5ee3f031`; DOI preprint discovery `10.48550/arXiv.2004.07180` dicatat terpisah.
- **Provider/status:** S2; discovery bulk dan known-citation matched.
- **URL primer/cakupan:** [full PDF ACL](https://aclanthology.org/2020.acl-main.207.pdf) dibaca.
- **Locator dan bukti:** §§2.2–2.5: citation-informed training; inference hanya memerlukan title+abstract.
- **Batas:** scholarly relatedness bukan novelty. Ini pendukung representasi, bukan alasan mewajibkan graph/API S2 di aplikasi atau komponen inti yang sudah disepakati.

### S9 — Pendukung interpretasi skor

- **Judul:** *On Calibration of Modern Neural Networks*.
- **Penulis:** Chuan Guo; Geoff Pleiss; Yu Sun; Kilian Q. Weinberger.
- **Tahun/jenis/venue:** 2017; prosiding ICML, PMLR 70, 1321–1330.
- **Identitas:** S2 `d65ce2b8300541414bfe51d03906fca72e93523c`; DOI preprint `10.48550/arXiv.1706.04599`. DOI prosiding tidak dinyatakan karena belum diverifikasi.
- **Provider/status:** S2; discovery dan known-citation matched.
- **URL primer/cakupan:** [halaman PMLR](https://proceedings.mlr.press/v70/guo17a.html), [full PDF](https://proceedings.mlr.press/v70/guo17a/guo17a.pdf) dibaca.
- **Locator dan bukti:** §§2, 4–5: held-out calibration dan temperature scaling pada logits classifier.
- **Batas:** bukan cara langsung mengubah cosine atau rubrik LLM menjadi probabilitas kebaruan. Kalibrasi tidak diwajibkan menjadi kontribusi utama.

## Koreksi metadata

- **S4 dan S8:** DOI preprint dalam discovery berbeda dari DOI prosiding; keduanya tidak dipertukarkan.
- **S5:** identitas JCDL diverifikasi melalui metadata institusi, metode melalui preprint; akses final publisher terhalang 403.
- **S6:** pisahkan preprint Maret 2026 dan prosiding Mei 2026 beserta DOI masing-masing. Metode dibaca dari arXiv v1.
- **S7:** tahun online 2024 dan volume 2025 sama-sama dicatat. Nama jurnal yang mengikuti publisher adalah *Analytics*, bukan *Analysis* pada S2.
- **S1/S3/S5:** 429 pada lookup tambahan tidak menghapus bukti publisher/discovery yang sudah tersedia dan tidak berarti citation mismatch.

## Batas bukti

1. Penelusuran memakai satu penyedia bibliografi dan query terarah. Tidak ada klaim exhaustive coverage, ranking dampak berdasarkan sitasi, atau kebaruan global karena tidak menemukan padanan.
2. Cross-index verification dan retraction checks tidak dilakukan dalam kebijakan S2-only; statusnya **tidak dilakukan**, bukan passed. Tidak ada panggilan API Crossref/OpenAlex. DOI publisher dibaca sebagai sumber primer, bukan melalui API bibliografi lain.
3. Pembacaan awal reader atas `/abs/2505.24615` secara tidak terduga memakai arXiv API. Insiden dilaporkan dan tidak diulangi; pembacaan berikutnya melalui HTML/PDF asli. Karena itu tidak diklaim bahwa semua transport sepanjang sesi hanya S2.
4. Raw respons sesi tersedia saat perencanaan sebagai `artifact://1`, `artifact://6`, `artifact://16`, `artifact://22`, `artifact://27`; detail kajian pada `agent://BaseEvidence`, `agent://AspectPapers`, `agent://AspectExtraction`. Ini artefak sesi, bukan arsip data mentah/PDF workspace; ketersediaannya dapat berakhir. Rekaman di atas sengaja mandiri dan tidak merekonstruksi respons seolah raw asli.
5. Tidak dilakukan scraping JIP, eksperimen model, pengumpulan anotasi dosen, atau validasi kebutuhan lokal. Hasil studi bahasa Inggris, judul proposal, dan benchmark sintetis tidak langsung berlaku untuk abstrak Indonesia.
6. Sintesis lintas paper adalah argumentasi penelitian, bukan hasil eksperimen baru. Dugaan kontribusi ditandai `[INFERENCE]` pada notes konseptual; ketidaktersediaan aspek dalam abstrak tidak membuktikan ketiadaan aspek dalam penelitian aslinya.
