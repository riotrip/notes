---
category: Literatur
date: 2026-11-06
---

# Penelitian Terdahulu, Metode, dan Posisi Pengembangan

> **Status:** Catatan fondasi penelitian; bukan metodologi final atau laporan hasil eksperimen. Arah ini menggantikan penelitian deteksi teks AI.

Navigasi: [inti penelitian](01-inti-penelitian-5w1h.md) · [cara kerja sistem](04-landasan-konseptual-dan-posisi-penelitian.md) · [jejak penelusuran dan metadata lengkap](07-jejak-penelusuran.md).

Literatur berikut mendasari tiga pekerjaan: **mencari penelitian terkait, membandingkan aspek penelitian, dan menjelaskan bukti kesamaan**. Metode tiap sumber tidak disalin menjadi satu paket wajib. S5 paling dekat dengan perbandingan berbasis aspek; S1 memberi konteks Indonesia; S2 dan S6 membantu membedakan kemiripan dari penilaian kebaruan.

## Landasan utama

Literatur berikut mencakup artikel jurnal, prosiding, dan preprint; tidak seluruhnya merupakan jurnal. Urutan menunjukkan kedekatan terhadap pertanyaan penelitian berbasis aspek, bukan peringkat kualitas atau jumlah sitasi. ID S1–S9 mengikuti ledger.

| Studi / jenis publikasi | Data dan unit analisis | Metode sebenarnya | Manfaat untuk arah skripsi | Batas transfer / cakupan baca |
|---|---|---|---|---|
| **S5 — Ostendorff dkk. (2022), Specialized Document Embeddings for Aspect-based Similarity of Research Papers.** Prosiding JCDL; [metadata](https://dfki-nlp.github.io/publication/jcdl2022-ostendorff/), [teks](https://arxiv.org/pdf/2203.14541). | Paper dengan input judul+abstrak utuh; label **task, method, dataset** dari Papers with Code. | Ruang embedding khusus tiap aspek; cosine retrieval. Varian terbaik Siamese-SciBERT memakai Multiple Negative Ranking Loss, bukan SBERT biasa tanpa pelatihan aspek. | Pembanding ilmiah terdekat: menguji manfaat representasi khusus aspek terhadap representasi generic. Memperkuat alasan RQ2. | Full preprint v1, §§3–4 / pp. 3–5, footnote 5; Table 3 / §5 menunjukkan hasil bergantung metode. Bukan ekstraksi fragmen, bukan uji rata-rata/bobot M3–M4; §7 tidak membuktikan faithful excerpts atau manfaat dosen. ACM 403. |
| **S4 — Ostendorff dkk. (2020), Aspect-based Document Similarity for Research Papers.** Prosiding COLING; [teks](https://aclanthology.org/2020.coling-main.545.pdf). | Pasangan paper; bagian tempat sitasi muncul memberi label aspek; input pasangan judul+abstrak utuh. | Transformer multilabel classification berdasarkan citation-section labels. | Landasan bahwa kemiripan dokumen dapat dibedakan menurut aspek, bukan satu kategori global. | Full publisher PDF, §§3.1–3.4 / pp. 6196–6198; bukan span extractor tujuan–metode–data atau embedding fragmen+cosine. §5 / pp. 6201–6202: ambiguity, imbalance, informasi abstrak terbatas. |
| **S3 — Reimers & Gurevych (2019), Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks.** Prosiding EMNLP-IJCNLP; [teks](https://aclanthology.org/D19-1410.pdf). | Pasangan/triplet teks pada tugas sentence representation dan similarity; bukan abstrak JTI. | Siamese/triplet training, pooling, lalu perbandingan embedding termasuk cosine. | Dasar semantic baseline dan alasan tidak memakai pooled BERT sembarang sebagai representasi kemiripan. | Full text, §§3–4. Hasil bahasa Inggris bukan validasi checkpoint untuk Indonesia. SBERT adalah pendekatan, IndoBERT backbone; bukan pilihan yang selalu eksklusif. |
| **S2 — Liu dkk. (2025), Harnessing Large Language Models for Scientific Novelty Detection.** Versi diperiksa: preprint arXiv; [teks](https://arxiv.org/html/2505.24615), [kode](https://github.com/SenticNet/novelty-detection). | Ide dari judul+abstrak, korpus diperluas melalui referensi; variasi rephrased/partial/incremental sintetis. | Distillation melalui retriever kontrastif, retrieval untuk LLM comparison, lalu decision-tree classifier. | Memisahkan kemiripan redaksi dari overlap ide; memberi precedent retrieval dan analisis konseptual. | Full HTML, §§3–5, Appendix A, §7. Asumsi paper novel/variasi non-novel bukan human gold independen; English BGE bukan bukti transfer Indonesia. Rubrik LLM bukan probabilitas terkalibrasi. |
| **S6 — Schopf & Färber (2026), Is This Idea Novel? An Automated Benchmark for Judgment of Research Ideas.** Prosiding LREC; [metadata](https://aclanthology.org/2026.lrec-1.370/), [teks](https://arxiv.org/html/2603.10303). | RINoBench: 1.381 contoh dari review ICLR 2022/2023 dengan penyaringan kesepakatan; ide dan rangkuman justifikasi diproses LLM. | Benchmark penilaian novelty; evaluasi skor dan penjelasan dipisahkan. | Menopang kebutuhan memeriksa kesesuaian penilaian dan kualitas penjelasan secara terpisah. | Full arXiv v1, §§4.1–4.2, §5 / Table 3, §7. Bukan untouched-human justification atau anotasi dosen Indonesia; beberapa metrik penjelasan berbasis LLM. Penjelasan selaras tidak menjamin skor selaras. |
| **S7 — Majadly & Last (2025; online 2024), Leveraging peer-review aspects for extractive and abstractive summarization of scientific articles.** Artikel *International Journal of Data Science and Analytics*; [teks](https://link.springer.com/article/10.1007/s41060-024-00665-z). | Contribution, motivation, experimental claims dari Abstract+Introduction; support dari Results. | Ekstraksi kalimat berbasis aspek dan summarization; auxiliary objective QA pada §4 bukan kategori extraction teruji tersendiri. | Precedent pengambilan informasi aspek untuk menyusun representasi yang lebih terarah. | Full publisher HTML, §§3.1–3.2, §5.1.2, §6.2.2. Skema berbeda dari tujuan–metode–objek; dua annotator dengan keputusan label penulis pertama; ratings ringkasan oleh ChatGPT, bukan user study dosen. |
| **S1 — Sitorus & Madyatmadja (2026), Detecting Novelty in Indonesian Research Grant Proposals Using Machine Learning and Natural Language Processing.** Artikel *Journal of Computer Science*; [teks](https://thescipub.com/jcs/jcssp.2026.2444.2455.pdf). | 52.084 **judul** proposal Indonesia 2020–2024; 44.429 setelah deduplikasi, bukan abstrak. | TF-IDF, LSA, IndoBERT, cosine, Top-K 10; ambang 0,60 untuk contextual warning. | Konteks Indonesia dan framing hasil sebagai dukungan penilaian manusia. | Full PDF, pp. 4–6 / 2447–2449, Table 2, pp. 10–11. Tidak ada ground truth novelty manual. 99,98% Top-1 IndoBERT ≥ 0,60 bukan akurasi. Tidak menetapkan ambang atau kualitas model untuk JTI. |

## Pendukung

Dua sumber ini memperluas landasan, bukan komponen sistem atau kontribusi yang sudah diputuskan.

| Studi / jenis publikasi | Data dan unit analisis | Metode sebenarnya | Manfaat untuk arah skripsi | Batas transfer / cakupan baca |
|---|---|---|---|---|
| **S8 — Cohan dkk. (2020), SPECTER: Document-level Representation Learning using Citation-informed Transformers.** Prosiding ACL; [teks](https://aclanthology.org/2020.acl-main.207.pdf). | Dokumen ilmiah dan hubungan sitasi; input inference judul+abstrak. | Citation-informed representation learning. | Contoh penggunaan graph sebagai sinyal pelatihan scholarly embeddings. | Full PDF, §§2.2–2.5. Relatedness bukan novelty; inference tidak membutuhkan graph dokumen input. Tidak mewajibkan API S2 pada aplikasi. |
| **S9 — Guo dkk. (2017), On Calibration of Modern Neural Networks.** Prosiding ICML/PMLR; [teks](https://proceedings.mlr.press/v70/guo17a/guo17a.pdf). | Prediksi classifier dan logits; bukan cosine abstrak atau penilaian kebaruan. | Held-out calibration, termasuk temperature scaling. | Peringatan bahwa angka keluaran model tidak otomatis memiliki interpretasi probabilitas yang benar. | Full PDF, §§2, 4–5. Tidak dapat langsung dipakai untuk mengubah cosine/rubrik LLM menjadi probabilitas novelty. Kalibrasi bukan kewajiban kontribusi utama. |

## Apa yang belum dibuktikan

Tidak satu pun sumber yang ditelaah secara langsung membuktikan keseluruhan rangkaian **ekstraksi tujuan–metode–objek pada abstrak Indonesia → SBERT biasa perpotongan → rata-rata/bobot → penjelasan berbukti → manfaat untuk dosen JTI**. Ini celah bukti pada himpunan sumber tersebut, **bukan bukti global bahwa kombinasi itu belum pernah diteliti**.

S5 adalah pembanding terdekat yang perlu dihadapi, bukan sekadar kutipan untuk mengklaim keunggulan. S5 melatih ruang aspek dari input utuh; rancangan manual pengguna mengekstrak bagian aspek terlebih dahulu. Perbedaan mekanisme tersebut perlu dipertahankan saat membangun argumentasi dan kelak saat menentukan pembandingan.

[INFERENCE] Calon kontribusi yang layak diuji adalah kualitas perbandingan dan keterlacakan penjelasan pada konteks abstrak Indonesia. Penggabungan model, antarmuka, dan dataset lokal saja tidak membuktikan kebaruan ilmiah. Tidak diasumsikan M4 lebih baik daripada M3 atau semua pendekatan aspect-aware lebih baik daripada holistic.

## Referensi dan cakupan baca

[Jejak penelusuran](07-jejak-penelusuran.md) menyimpan seluruh penulis, DOI/ID, tanggal pengambilan, versi teks, status discovery versus lookup S2, serta koreksi metadata. S1–S9 dibaca melalui teks lengkap versi yang disebut, tetapi tidak direplikasi. Full text S5 dan S6 berasal dari preprint; metadata prosiding diperiksa terpisah. PDF lokal tidak disimpan.

Literatur dipakai untuk menyusun [konsep dan posisi penelitian](04-landasan-konseptual-dan-posisi-penelitian.md) serta [urgensi](02-latar-belakang-dan-urgensi.md), bukan untuk mengklaim eksperimen lokal telah selesai.
