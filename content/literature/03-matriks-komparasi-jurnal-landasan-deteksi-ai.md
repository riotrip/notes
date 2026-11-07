---
title: "Arsip: Metode Tiap Jurnal dan Penelitian Terdahulu Deteksi AI"
category: Arsip deteksi AI
draft: true
---

# Penelitian Terdahulu dan Posisi Pengembangan

> **Status:** Arsip penelitian deteksi teks AI; bukan arah skripsi aktif. Lihat [inti penelitian kemiripan abstrak berbasis aspek dan risiko kebaruan](../kemiripan-abstrak-dan-risiko-kebaruan/01-inti-penelitian-5w1h.md). Isi berikut dipertahankan sebagai rekaman arah sebelumnya.

Literatur berikut mendasari pengembangan aplikasi pemeriksaan bagian artikel Indonesia. Hasil studi lain bukan target kinerja yang sudah pasti tercapai.

Langsung ke [metode tiap jurnal](#metode-yang-digunakan-dalam-jurnal): pengambilan data, preprocessing, dan pemodelan.

## Artikel jurnal

| Studi | Yang benar-benar diteliti | Relevansi dan batasnya |
|---|---|---|
| **Syahputra dkk. (2026)**. [Zero-Shot Detection of IndoT5-Synthesized Indonesian Scientific Abstracts Using mDeBERTa v3](https://jurnal.yoctobrain.org/index.php/ijodas/article/view/457). *Indonesian Journal of Data and Science*. DOI: 10.56705/ijodas.v7i2.457. | Abstrak Indonesia dan parafrasa IndoT5. Pada kondisi NLI satu-aspek, mDeBERTa salah menandai 790 dari 1.137 abstrak manusia-proksi. Random Forest dilaporkan lebih baik, tetapi memakai masukan dan pembagian data berbeda. | Alasan mengukur kesalahan menandai manusia, bukan menyimpulkan semua detektor Indonesia gagal. Bukan uji IndoBERT atau bagian isi artikel. Metode dan analisis kesalahan PDF dibaca; angka merujuk Tabel 10 dan 13. |
| **Cheng dkk. (2025)**. [Ability of AI detection tools and humans to accurately identify different forms of AI-generated written content](https://link.springer.com/article/10.1186/s41077-025-00396-6). *Advances in Simulation*. DOI: 10.1186/s41077-025-00396-6. | Pendahuluan dari 30 artikel simulasi kesehatan, dalam lima kondisi penulisan/penyuntingan manusia dan AI. Alat dapat membedakan kondisi, tetapi skornya bervariasi. | Mendukung pengujian menurut kondisi penulisan. Bukan penandaan bagian artikel Indonesia atau bukti prevalensi tulisan campuran. Metode, hasil, pembahasan, dan kesimpulan teks lengkap dibaca. |
| **Pitriani dkk. (2025)**. [Deteksi Generatif Teks pada Penilaian Otomatis Tes Esai Berbahasa Indonesia Menggunakan IndoBERT](https://jurnal.untan.ac.id/index.php/jepin/article/view/93221). *JEPIN (Jurnal Edukasi dan Penelitian Informatika)*. DOI: 10.26418/jp.v11i2.93221. | Fine-tuning IndoBERT untuk deteksi teks AI Indonesia, lalu integrasi dengan penilaian esai otomatis. | Menunjukkan penelitian model/aplikasi sebelumnya. Skripsi ini tidak mengadopsi pengurangan nilai otomatis. Baru abstrak penerbit dibaca; fitur yang tidak disebut tidak dapat dianggap tidak ada. |
| **Alif, Alam, dan Lestari (2026)**. [Implementation of the BiLSTM Model for Detecting AI-Generated Indonesian Text](https://journal.thamrin.ac.id/index.php/jtik/article/view/3551). *Jurnal Teknologi Informatika dan Komputer*. DOI: 10.37012/jtik.v12i1.3551. | Detektor BiLSTM Indonesia diterapkan sebagai aplikasi web Streamlit; sumber teks mencakup abstrak jurnal akademik dan media jurnalistik. | Membantah klaim belum ada aplikasi deteksi Indonesia. Abstrak serta bagian metode dan pelatihan PDF dibaca. Ketiadaan uraian fitur bukan bukti fitur tidak ada; angka akurasi tidak dibandingkan lintas dataset. |
| **Silva Filho dkk. (2023)**. [Classifier calibration: A survey on how to assess and improve predicted class probabilities](https://link.springer.com/article/10.1007/s10994-023-06336-7). *Machine Learning*. DOI: 10.1007/s10994-023-06336-7. | Tinjauan kalibrasi: kesesuaian keyakinan prediksi dengan kebenaran yang diamati pada kumpulan kasus, bukan ukuran banyaknya tulisan AI dalam dokumen. | Dasar menilai keandalan skor. Bukan eksperimen deteksi AI Indonesia; kalibrasi agregat tidak memastikan kebenaran satu prediksi. Definisi diperiksa pada arsip teks sumber, §2.3. |
| **Balanya dkk. (2024)**. [Adaptive temperature scaling for robust calibration of deep neural networks](https://link.springer.com/article/10.1007/s00521-024-09505-4). *Neural Computing and Applications*. DOI: 10.1007/s00521-024-09505-4. | Membahas kalibrasi setelah pelatihan, termasuk Temperature Scaling sebagai metode penyesuaian skor. | Rujukan metode kalibrasi yang diusulkan; arsip sumber asli §2.2 dibaca ulang. Tidak menjanjikan perbaikan label atau penurunan kesalahan menandai manusia. |
| **Pratama (2025)**. [The accuracy-bias trade-offs in AI text detection tools and their impact on fairness in scholarly publication](https://pmc.ncbi.nlm.nih.gov/articles/PMC12453642/). *PeerJ Computer Science*. DOI: 10.7717/peerj-cs.2953. | Membandingkan alat pada abstrak manusia, buatan AI, dan berbantuan AI; hasil berbeda menurut detektor dan kondisi bantuan AI. | Mendukung pengukuran sesuai kondisi teks. Berdasarkan audit teks lengkap sebelumnya; abstrak Inggris, sampel, dan versi alat membatasi penerapan pada artikel Indonesia. Angka akurasi yang bermasalah tidak dipakai. |

## Metode yang digunakan dalam jurnal

**Prapemrosesan (preprocessing)** menyiapkan teks sebelum masuk model; **tokenisasi** mengubah teks menjadi unit yang dikenali model. Berikut praktik sumber, bukan resep yang otomatis cocok untuk skripsi.

| Studi dan lokasi bukti | Metode yang dilaporkan |
|---|---|
| **Syahputra**, [PDF](https://jurnal.yoctobrain.org/index.php/ijodas/article/download/457/341), bagian 2, hlm. PDF 3–7 | Mengambil abstrak melalui OAI-PMH dari 18 portal jurnal SINTA 3, lalu membuat parafrasa IndoT5. Menghapus duplikat, tag HTML, dan artefak format; menyaring abstrak di bawah 50 kata. Sesudah parafrasa: menyeragamkan huruf kecil, membersihkan artefak generasi, mempertahankan koma/titik, membatasi teks hingga 100 kata, dan mengurangi contoh kelas manusia untuk menyeimbangkan kelas (*undersampling*). Tujuh fitur linguistik diperiksa dengan Mann–Whitney U; deteksi memakai zero-shot NLI, dengan Random Forest sebagai pembanding terlatih. |
| **Alif**, [PDF](https://journal.thamrin.ac.id/index.php/jtik/article/view/3551/2943), hlm. 828–829 | Mengambil berita detik.com dan abstrak Garuda melalui web scraping dengan BeautifulSoup 4; kelas AI dibuat melalui parafrasa ChatGPT/Gemini. Kerangka CRISP-DM menghubungkan pemahaman masalah/data, persiapan, pemodelan, evaluasi, dan penerapan. Pembersihan mencakup huruf kecil, karakter khusus, spasi ganda, dan URL. Keras Tokenizer mengubah teks menjadi angka, dengan batas 200 token. BiLSTM dilatih memakai Adam, regularisasi L2 untuk membatasi bobot, dan *early stopping* untuk menghentikan pelatihan. |
| **Pitriani**, [abstrak penerbit](https://jurnal.untan.ac.id/index.php/jepin/article/view/93221) | Fine-tuning IndoBERT untuk deteksi; embedding dan cosine similarity untuk penilaian esai. Kesamaan dengan kunci jawaban bukan metode deteksi AI. PDF terhalang HTTP 403 saat revisi; detail preprocessing belum terverifikasi. |
| **Balanya**, [artikel penerbit](https://link.springer.com/article/10.1007/s00521-024-09505-4), bagian 2.2.2 “Temperature scaling” | Temperature Scaling membagi skor mentah model (*logit*) dengan satu temperatur positif, dipilih dengan meminimalkan negative log-likelihood pada data kalibrasi. Metode ini menyesuaikan keyakinan tanpa mengganti kelas dengan skor tertinggi. |

Pemotongan bukan sekadar merapikan data: Syahputra mengaitkan pemotongan di tengah kalimat dengan sebagian kesalahan positif pada sampel yang ditelaah (bagian 3, hlm. PDF 12). Batas panjang dan pembersihan perlu diuji, bukan disalin sebagai standar universal.

## Prosiding pendukung, bukan artikel jurnal

| Studi | Yang benar-benar diteliti | Relevansi dan batasnya |
|---|---|---|
| **Jiang dkk. (2025)**. [SenDetEX: Sentence-Level AI-Generated Text Detection for Human-AI Hybrid Content via Style and Context Fusion](https://aclanthology.org/2025.emnlp-main.268/). *EMNLP 2025*. DOI: 10.18653/v1/2025.emnlp-main.268. | Deteksi tingkat kalimat pada tulisan campuran manusia/AI dengan penggabungan gaya dan konteks. | Deteksi per bagian sudah diteliti; pengujian membutuhkan label sesuai unit deteksi. Abstrak dan metadata penerbit dibaca, bukan bukti kinerja pada artikel Indonesia. |
| **Abadi dkk. (2025)**. [Human vs AI-Generated Text Detection Using IndoBERT Algorithm for Different Types of Text](https://ieeexplore.ieee.org/document/11101692). *IEEE IAICT 2025*. DOI: 10.1109/IAICT65714.2025.11101692. | Penerapan IndoBERT untuk membedakan teks manusia/AI pada ulasan film dan survei pengalaman mahasiswa. | Penelitian IndoBERT terdahulu, bukan target kinerja atau uji bagian artikel ilmiah. Cakupan baca: abstrak penerbit dan pembuka pendahuluan. |

## Posisi dan batas penelusuran

Kontribusi yang dituju ialah sistem pemeriksaan bagian artikel Indonesia yang dikembangkan dan diuji, bukan klaim fitur atau model pertama. [Alur sistem](04-fungsi-sistem-landasan-teoretis-deteksi-ai.md) dan [pengujiannya](05-rancangan-metode-data-dan-evaluasi.md) tetap memerlukan perancangan rinci.

Pencarian terarah di Semantic Scholar (S2) dan pembacaan sumber asli dilakukan pada **2026-11-04**, memakai teks lengkap maupun abstrak serta audit terdahulu. Syahputra dan Cheng cocok di S2; Alif, SenDetEX, dan studi IAICT ditemukan melalui S2. Pemeriksaan Silva Filho terhenti dengan HTTP429 meski dicoba ulang; ini bukan bukti artikelnya tidak ada. Pitriani dan Balanya tidak mendapat verifikasi S2 baru.

Beberapa permintaan S2 gagal dengan HTTP429. Tiga pembacaan DOI awal otomatis melalui Crossref terjadi sebelum aturan lokal diketahui; permintaan API bibliografi berikutnya hanya memakai S2. Penelusuran ini bukan tinjauan sistematis atau pemeriksaan kebaruan menyeluruh.
