# Fungsi Sistem dan Landasan Teoretis untuk Penelitian Deteksi Teks AI

**Tanggal:** 2026-10-30  
**Status:** Catatan pendalaman teori untuk merumuskan kontribusi sistem; belum spesifikasi pembangunan dan tidak mengubah PRD.  
**Fokus:** Deteksi abstrak jurnal berbahasa Indonesia berbasis IndoBERT dan kalibrasi confidence score.  
**Jenis kajian:** Sintesis eksploratif berbasis artikel jurnal; bukan systematic review.

## Ringkasan keputusan konseptual

Sistem paling tepat didefinisikan sebagai **prototipe penelitian untuk menguji dan melaporkan keandalan detektor teks AI**, bukan sekadar aplikasi yang memberi label “AI/manusia”. Permasalahan umumnya bukan hanya apakah model dapat mengklasifikasikan teks, tetapi apakah performa dan skor confidence-nya dapat dipercaya pada populasi abstrak ilmiah berbahasa Indonesia yang diuji.

Secara teori, sistem menghubungkan tiga hal yang berbeda:

1. **Diskriminasi:** apakah model dapat mengurutkan atau memisahkan abstrak manusia-proksi dan abstrak sintetis?
2. **Kalibrasi:** apakah confidence model selaras dengan frekuensi kebenaran empiris pada data uji?
3. **Validitas penggunaan:** apakah bukti uji cukup untuk mendukung interpretasi terbatas pada bahasa, sumber, generator, dan protokol tertentu?

Fungsi sistem bagi penelitian adalah membuat ketiga pertanyaan itu dapat diuji secara konsisten, dengan data dan eksperimen yang dapat dilacak. Sistem tidak membuktikan kepengarangan; hasil prediksi adalah bukti eksperimental untuk evaluasi, bukan putusan tentang penulis.

## 1. Permasalahan umum yang dijawab

Detektor teks AI memberi skor yang dapat tampak presisi, tetapi skor itu tidak otomatis sama dengan probabilitas yang andal atau bukti bahwa seseorang menggunakan AI. Kesalahan dapat berupa *false positive* (teks manusia diberi label AI) maupun *false negative* (teks AI tidak terdeteksi). Keduanya berpengaruh pada penilaian model; *false positive* juga menjadi risiko penggunaan jika skor ditafsirkan berlebihan.

Bukti jurnal menunjukkan bahwa hasil deteksi bergantung pada kondisi tugas. Pratama (2025) memakai 72 abstrak manusia sumber untuk 216 teks pada skenario utama dan 144 teks AI-assisted pada skenario kedua; hasil antardetektor berbeda, tetapi tabel akurasinya juga memuat inkonsistensi yang dirinci dalam matriks. Rashidi dkk. (2023) melaporkan skor AI tinggi pada sebagian abstrak human-proxy. Pada benchmark bahasa Turki, Tüker dkk. (2026) melaporkan ScriptMind v3 deployed menandai **105 dari 300 teks manusia (35%)** pada ambang 0,5; ini uji stres operasional dengan lineage pelatihan belum terselesaikan, bukan 35% dari korpus historis 50.913 dokumen atau validasi held-out yang terverifikasi. Angka studi-studi ini **bukan estimasi untuk IndoBERT atau korpus Indonesia**; manfaatnya adalah memperjelas kebutuhan evaluasi lokal dengan denominator dan kondisi uji eksplisit.

Ada pula bukti langsung berbahasa Indonesia: Syahputra dkk. (2026) melaporkan bahwa salah satu kondisi *zero-shot NLI* salah menandai 790 dari 1.137 abstrak manusia ketika kelas AI dibentuk dari parafrasa IndoT5. Temuan itu spesifik pada konfigurasi mereka; bukan tingkat kesalahan yang dapat dipindahkan ke model IndoBERT.

### Formulasi masalah penelitian yang aman

> Belum diketahui apakah IndoBERT yang dilatih untuk membedakan abstrak *human-proxy* dan abstrak AI-sintetis pada korpus penelitian ini memiliki kinerja klasifikasi dan confidence score yang andal, serta seberapa besar kesalahannya pada abstrak manusia-proksi.

Formulasi ini lebih tepat daripada klaim luas bahwa “detektor AI belum pernah dikalibrasi” atau “semua detektor tidak andal”. Zhang dan Zhou (2026) melaporkan ECE/Brier dan menyebut *temperature scaling*, tetapi Tabel 7 tidak menyajikan hasil sebelum–sesudah TS atau temperatur hasil fitting; besar perbaikannya belum dapat diverifikasi dari tabel tersebut. Inkonsistensi denominator serta ringkasan lintas-domain juga dicatat dalam matriks. Celah yang aman adalah **belum ada bukti yang ditelaah di sini bahwa kalibrasi telah diuji pada tugas IndoBERT dan korpus abstrak jurnal Indonesia yang hendak diteliti**, bukan ketiadaan kalibrasi secara umum.

## 2. Landasan teori

### 2.1 Klasifikasi bukan hal yang sama dengan keandalan skor

Metrik seperti accuracy, precision, recall, macro-F1, dan AUROC menggambarkan aspek diskriminasi/kinerja klasifikasi. Kinerja itu tidak dengan sendirinya menjelaskan apakah nilai confidence “0,90” seharusnya ditafsirkan sebagai sekitar 90% peluang benar untuk prediksi sejenis.

Silva Filho dkk. (2023) mendefinisikan classifier terkalibrasi sebagai classifier yang probabilitas prediksinya sesuai dengan frekuensi empiris kelas yang benar pada prediksi sejenis. Untuk klasifikasi biner, intuisi sederhananya: dari banyak prediksi yang memberi probabilitas 0,8 pada kelas AI, sekitar 80% semestinya benar-benar berasal dari kelas AI, dalam kondisi data yang relevan. Kalibrasi adalah sifat agregat yang dinilai atas sekumpulan kasus, bukan kepastian tentang satu dokumen individual.

Dua pertanyaan penelitian karenanya perlu dilaporkan terpisah:

- **Seberapa baik kelas dipisahkan?** Macro-F1, AUROC, confusion matrix, precision/recall.
- **Seberapa selaras skor probabilitas dengan kejadian empiris?** Reliability diagram dan ukuran kalibrasi seperti ECE dan Brier score.

### 2.2 Kalibrasi pascapelatihan

Kalibrasi pascapelatihan (*post-hoc calibration*) menyesuaikan skor/probabilitas model yang telah dilatih menggunakan data validasi berlabel, tanpa melatih ulang classifier utama. *Temperature Scaling* adalah metode sederhana dalam keluarga ini. Balanya dkk. (2024) membahas TS sebagai pendekatan standar yang relatif sederhana, tetapi juga menunjukkan bahwa metode kalibrasi lebih ekspresif dapat membutuhkan lebih banyak data dan gagal pada kondisi data sedikit. Karena ukuran data kalibrasi skripsi dapat terbatas, TS layak diuji sebagai pilihan yang sederhana—namun perlu dinilai dengan data penelitian, bukan diasumsikan pasti memperbaiki hasil.

Batas penting: TS bukan metode untuk memperbaiki mutu label, representativitas dataset, bias sumber, atau perubahan domain. **TS standar memakai satu temperatur positif yang sama untuk semua contoh** dan mempertahankan argmax. Pada tugas biner, transformasinya monoton terhadap probabilitas kelas AI, sehingga peringkat antarteks dan AUROC tetap; pada keputusan argmax/ambang 0,5, label, accuracy, F1, dan FPR juga tetap (dengan aturan tie yang sama). Ambang probabilitas lain dapat menghasilkan label/FPR berbeda setelah TS. Jangan memperluas sifat peringkat antarteks ini ke semua kasus multikelas atau temperatur adaptif per contoh. Sumber: Balanya dkk. [R2], §2.2.1–2.2.2, Persamaan (6); implikasi ambang biner mengikuti transformasi tersebut.

### 2.3 Ukuran kalibrasi dan keterbatasannya

- **Reliability diagram:** definisikan keluaran yang diplot. Untuk probabilitas kelas AI `p_AI`, bandingkan rata-rata `p_AI` dengan proporsi label AI dalam bin; untuk confidence kelas terpilih `max(p_AI, 1-p_AI)`, bandingkan confidence dengan akurasi prediksi. Keduanya tidak boleh dipertukarkan tanpa penjelasan. Bentuk diagram bergantung pada binning dan jumlah sampel.
- **ECE (Expected Calibration Error):** merangkum selisih empiris berbobot antar-bin sesuai definisi di atas. Nyatakan apakah yang dihitung ECE kelas AI atau confidence-ECE, jumlah/batas bin, dan penanganan bin kosong. Satu angka ECE saja tidak cukup untuk menyimpulkan confidence andal.
- **Brier score:** proper scoring rule yang mengukur kesalahan kuadrat probabilitas terhadap label aktual, bukan kalibrasi murni yang terisolasi dari diskriminasi/resolusi. Untuk tugas biner, nyatakan konvensinya: rata-rata `(p_AI-y)^2` berada pada rentang 0–1; penjumlahan atas kedua kelas menghasilkan dua kali nilai tersebut. Sumber: Silva Filho dkk. [R1], §3–4.

Karena tiap metrik punya fokus dan keterbatasan, laporan sebaiknya menyertakan ECE dan Brier score bersama reliability diagram, jumlah sampel, strategi binning, dan metrik klasifikasi. Jangan menetapkan klaim “terkalibrasi baik” hanya dari satu angka tanpa konteks.

Kalibrasi juga bergantung pada populasi evaluasi dan proporsi kelas. Kalibrasi yang baik pada dataset pasangan 50:50 tidak membuktikan bahwa skor sama andalnya pada populasi jurnal dengan prevalensi penggunaan AI yang berbeda atau tidak diketahui. Sumber: Silva Filho dkk. [R1], §2.1. Ini membatasi interpretasi skor prototipe sebagai probabilitas penggunaan AI di dunia nyata.

### 2.4 Validitas pengukuran dan konteks

Validitas berkenaan dengan apakah interpretasi yang ditarik dari skor didukung oleh bukti. Tüker dkk. (2026) menggunakan kerangka validitas pengukuran untuk menekankan bahwa perilaku detektor dapat berubah menurut waktu, provider, dan kondisi penulisan. Hasil pada satu korpus karenanya mendukung inferensi pada kondisi itu; ia tidak otomatis mengesahkan inferensi untuk bahasa, populasi, atau penggunaan lain.

Dalam skripsi, istilah “abstrak manusia” harus didefinisikan hati-hati. Abstrak pra-30 November 2022 dapat menjadi **human-proxy** berdasarkan tanggal terbit, bukan bukti individual bahwa penulis tidak pernah memakai alat bantu otomatis. Kelas AI juga perlu didefinisikan sebagai keluaran generator dengan versi, prompt, konfigurasi, dan sumber input yang dicatat. Perbedaan antara parafrasa abstrak asli dan abstrak baru yang dibuat dari isi artikel adalah perbedaan tugas penting, bukan detail kecil.

## 3. Fungsi sistem bagi penelitian

Sistem berfungsi sebagai **instrumen eksperimen dan pelaporan**, dengan lingkup konseptual berikut. Ini bukan komitmen implementasi teknis final.

| Fungsi penelitian | Peran dalam eksperimen | Bukti/keluaran yang dibutuhkan |
|---|---|---|
| Mengelola korpus dan label | Memisahkan teks manusia-proksi dan teks sintetis serta menjaga keterlacakan asal data | ID sumber, sumber/DOI/URL, tahun, bahasa, label dan dasar label, generator/prompt/versi, status lisensi |
| Menjaga integritas eksperimen | Mencegah pasangan dari artikel/sumber sama bocor ke train, validation, dan test | Pemisahan berbasis artikel/sumber; deduplikasi dan catatan preprocessing; seed serta versi konfigurasi |
| Membandingkan model | Menguji pertanyaan apakah IndoBERT memberi diskriminasi lebih baik daripada baseline yang direncanakan | Metrik pada split test yang sama; confusion matrix; macro-F1, precision, recall, AUROC dan FPR manusia-proksi |
| Mengevaluasi confidence | Mengukur apakah confidence yang dikeluarkan IndoBERT sejalan dengan hasil empiris | Brier score, ECE dengan aturan binning dinyatakan, reliability diagram, jumlah contoh per kelompok skor |
| Menguji kalibrasi | Mengukur apakah TS memperbaiki kalibrasi pada data yang tidak dipakai melatih classifier | Kalibrator hanya dipasang dengan validation; perbandingan sebelum/sesudah TS pada test yang sama; metrik diskriminasi dipisahkan dari kalibrasi |
| Menampilkan batas keputusan | Membantu peneliti melihat pertukaran antara kesalahan AI yang lolos dan teks manusia yang salah ditandai | Ambang, precision/recall, FPR dan confusion matrix; tidak menyatakan satu threshold sebagai keputusan universal |
| Menghasilkan laporan eksperimen | Membuat hasil dapat ditinjau dan direplikasi | Ringkasan data, model, konfigurasi, metrik, ketidakpastian, batas generalisasi dan tanggal eksperimen |
| Menyediakan uji satu teks (opsional) | Menunjukkan keluaran prototipe pada satu abstrak sebagai demonstrasi model | Label prediksi dan skor dengan penjelasan bahwa skor bukan bukti kepengarangan; bukan fungsi inti kontribusi ilmiah |

### Alur konseptual

1. Peneliti menetapkan sumber, kriteria inklusi, dasar *human-proxy*, kelas AI, dan generator.
2. Sistem menyimpan metadata dan memisahkan sumber/pasangan artikel ke train, validation, dan test tanpa kebocoran.
3. Sistem melatih IndoBERT dan baseline sesuai protokol yang ditetapkan.
4. Model dievaluasi sebelum kalibrasi; classifier dan threshold tidak diubah berdasarkan test.
5. *Temperature Scaling* dipelajari dari validation, kemudian dievaluasi pada test yang sama dengan classifier awal.
6. Sistem menyajikan metrik diskriminasi, FPR pada kelas human-proxy, metrik kalibrasi, reliability diagram, dan batas interpretasi.

## 4. Jenis masalah dan kontribusi yang diklaim

**Masalah ilmiah:** kinerja dan kalibrasi detektor IndoBERT pada abstrak ilmiah berbahasa Indonesia belum dapat disimpulkan dari hasil studi bahasa Inggris, dari detektor lain, ataupun dari satu generator/prosedur sintetis yang berbeda.

**Masalah metodologis:** laporan akurasi/F1 saja dapat menyembunyikan kesalahan pada kelas manusia dan tidak menjawab apakah confidence dapat ditafsirkan sebagai probabilitas yang reliabel. Pemisahan test yang bocor, ketidakjelasan definisi kelas, dan ambang yang tidak dilaporkan juga dapat membuat bukti sulit dipercaya.

**Fungsi sistem:** menyediakan alur eksperimen yang menautkan asal data, pelatihan/pembandingan model, kalibrasi, evaluasi kesalahan, dan pelaporan secara konsisten.

**Kontribusi yang mungkin:** artefak penelitian yang dapat diulang untuk mengukur kinerja dan kalibrasi IndoBERT pada korpus serta prosedur yang dinyatakan secara transparan. Kebaruan ini masih perlu diperiksa terhadap studi langsung lain; catatan ini tidak menyatakan belum pernah ada sistem sejenis.

### RQ yang dapat ditautkan

- **RQ1 — diskriminasi:** Bagaimana kinerja IndoBERT dibandingkan baseline TF-IDF + SVM pada pemisahan test sumber yang sama?
- **RQ2 — kalibrasi:** Seberapa baik confidence IndoBERT terkalibrasi menurut ECE, Brier score, dan reliability diagram, dan bagaimana perubahan setelah TS?
- **RQ3 — variasi konteks:** Apakah metrik kinerja atau kalibrasi berbeda menurut panjang teks, bidang jurnal, atau generator yang benar-benar terwakili dengan sampel memadai?
- **RQ4 — fungsi prototipe:** Bagaimana sistem mengeksekusi protokol eksperimen dan menyajikan keluaran yang dapat ditafsirkan secara terbatas?

RQ4 menilai alat bantu eksperimen/pemakaian prototipe; jangan menjadikannya klaim bahwa sistem layak untuk pemeriksaan pelanggaran atau keputusan editorial.

## 5. Batas klaim dan risiko teori

1. **Jangan menyamakan akurasi dengan kalibrasi.** Model dapat berkinerja baik tetapi terlalu percaya diri, atau probabilitasnya lebih terkalibrasi tanpa perubahan kemampuan diskriminasi.
2. **Bedakan probabilitas prediksi model dari probabilitas yang andal secara empiris.** Keluaran softmax dapat disebut estimasi probabilitas model sebelum kalibrasi; istilah itu tidak menjamin kalibrasi ataupun membuktikan asal satu dokumen.
3. **Jangan mengklaim TS menyelesaikan FPR atau bias.** TS mengubah skala confidence; FPR tergantung distribusi data, model, threshold, label, dan konteks.
4. **Jangan menggeneralisasi lintas bahasa/generator.** Studi Turki, Inggris, dan Indonesia menunjukkan mengapa validasi lokal diperlukan; bukan dasar untuk mengasumsikan pola error identik.
5. **Jangan menyebut satu abstrak “AI” dengan kepastian forensik.** *Human-proxy* berbasis waktu, generator sintetis, dan teks campuran adalah kelas eksperimen, bukan verifikasi riwayat kepengarangan dunia nyata.
6. **Jangan menjadikan keluaran prototipe keputusan sanksi.** Penggunaan yang dapat didukung di sini adalah evaluasi penelitian. Keputusan individual memerlukan bukti independen dan tinjauan manusia.
7. **Jangan klaim kebaruan absolut atau ketiadaan sistem sebelumnya** dari pencarian eksploratif satu penyedia bibliografi.
8. **Cek kecukupan sampel untuk subkelompok.** ECE/FPR per generator, bidang, atau panjang dapat tidak stabil ketika sampel sedikit; tampilkan denominator dan ketidakpastian.

## 6. Rekomendasi framing proposal

> Penelitian ini mengembangkan prototipe evaluasi detektor abstrak AI berbahasa Indonesia berbasis IndoBERT. Prototipe digunakan untuk membandingkan kinerja IndoBERT dengan baseline TF-IDF + SVM dan menilai keandalan confidence score IndoBERT sebelum dan sesudah *Temperature Scaling*. Evaluasi mencakup metrik klasifikasi, kalibrasi, serta *false-positive rate* pada abstrak *human-proxy*. Sistem ditujukan sebagai instrumen eksperimen yang mendokumentasikan data, konfigurasi, dan hasil; bukan alat pembuktian kepengarangan atau dasar keputusan otomatis terhadap penulis.

Framing ini konsisten dengan profil skripsi yang sudah ada, tetapi mempertahankan perbedaan antara **tujuan ilmiah (menguji model)** dan **fungsi perangkat lunak (menjalankan serta melaporkan eksperimen)**. Rincian seperti daftar jurnal, jumlah sampel, checkpoint, prosedur generator, cara pengelompokan ECE, threshold, dan kalibrasi baseline belum diputuskan oleh catatan ini; semuanya perlu ditetapkan dalam rancangan metode berdasarkan ketersediaan data.

## 7. Cakupan literatur dan keterbatasan

Sintesis ini menggunakan artikel jurnal tentang deteksi teks AI, kalibrasi classifier, dan validitas pengukuran. Bahasa, korpus, detektor, serta prosedur generasi pada studi-studi tersebut berbeda, sehingga hasilnya tidak digabung sebagai estimasi kinerja IndoBERT. Literatur yang dibahas tidak merupakan tinjauan sistematis dan tidak cukup untuk menetapkan kebaruan absolut.

## Referensi jurnal

**[R1]** Silva Filho, T., Song, H., Perello-Nieto, M., Santos-Rodriguez, R., Kull, M., & Flach, P. (2023). Classifier calibration: A survey on how to assess and improve predicted class probabilities. *Machine Learning, 112*, 3211–3260. https://doi.org/10.1007/s10994-023-06336-7. Teks penuh: https://link.springer.com/article/10.1007/s10994-023-06336-7. Sumber teori kalibrasi (§2), proper scoring rules (§3), reliability diagrams/ECE (§4), dan post-hoc methods (§5).

**[R2]** Balanya, S. A., Maroñas, J., & Ramos, D. (2024). Adaptive temperature scaling for robust calibration of deep neural networks. *Neural Computing and Applications, 36*, 8073–8095. https://doi.org/10.1007/s00521-024-09505-4. Teks penuh: https://link.springer.com/article/10.1007/s00521-024-09505-4. Studi metode kalibrasi DNN; mendukung penggunaan TS sebagai baseline sederhana dan kehati-hatian terhadap kalibrator yang lebih ekspresif saat data terbatas.

**[R3]** Zhang, C., & Zhou, W. (2026). Efficient detection of AI-generated scientific abstracts with a lightweight transformer. *Scientific Reports, 16*, 4975. https://doi.org/10.1038/s41598-026-35203-3. Teks penuh: https://www.nature.com/articles/s41598-026-35203-3. Melaporkan ECE/Brier dan menyebut TS, tanpa tabel perubahan sebelum–sesudah TS; inkonsistensi sumber dirinci dalam matriks. Bukan bukti kalibrasi IndoBERT.

**[R4]** Syahputra, A., Murdiyanto, A. W., & Aesyi, U. S. (2026). Zero-shot detection of IndoT5-synthesized Indonesian scientific abstracts using mDeBERTa v3. *Indonesian Journal of Data and Science, 7*(2), 333–349. https://doi.org/10.56705/ijodas.v7i2.457. [Laman penerbit](https://jurnal.yoctobrain.org/index.php/ijodas/article/view/457); [PDF](https://jurnal.yoctobrain.org/index.php/ijodas/article/download/457/341). Tabel 3, 10, dan 13 membahas data serta hasil NLI dan Random Forest; kelas AI berupa parafrasa IndoT5, bukan evaluasi IndoBERT.

**[R5]** Rashidi, H. H., Fennell, B. D., Albahra, S., Hu, B., & Gorbett, T. (2023). The ChatGPT conundrum: Human-generated scientific manuscripts misidentified as AI creations by AI text detection tool. *Journal of Pathology Informatics, 14*, 100342. https://doi.org/10.1016/j.jpi.2023.100342. Teks penuh: https://pmc.ncbi.nlm.nih.gov/articles/PMC10727991/. Studi satu detektor pada abstrak ilmiah manusia; tidak menjadi estimasi untuk IndoBERT.

**[R6]** Pratama, A. R. (2025). The accuracy-bias trade-offs in AI text detection tools and their impact on fairness in scholarly publication. *PeerJ Computer Science, 11*, e2953. https://doi.org/10.7717/peerj-cs.2953. Teks penuh: https://pmc.ncbi.nlm.nih.gov/articles/PMC12453642/. Studi 72 abstrak sumber yang dikembangkan menjadi 360 versi teks dalam dua skenario; denominator serta konflik accuracy pada Tables 4–6 dirinci dalam matriks.

**[R7]** Tüker, M., Sinecen, M., & Eser, M. T. (2026). Measurement validity of AI-text detection in Turkish academic writing: Temporal, provider, and intervention shifts. *Scientific Journal of Mehmet Akif Ersoy University, 9*(1), 53–67. https://doi.org/10.70030/sjmakeu.2033004. Teks penuh: https://dergipark.org.tr/en/download/article-file/6409393. Studi bahasa Turki dengan historical audit dan benchmark provider-known; bukti transfer/metrik berbeda menurut konteks, bukan estimasi untuk bahasa Indonesia.

**[R8]** Popkov, A. A., & Barrett, T. S. (2025). AI vs academia: Experimental study on AI text detectors' accuracy in behavioral health academic writing. *Accountability in Research, 32*(7), 1072–1088. https://doi.org/10.1080/08989621.2024.2331757. Laman penerbit: https://www.tandfonline.com/doi/full/10.1080/08989621.2024.2331757. Referensi bibliografis saja; temuan tidak digunakan karena teks lengkap tidak tersedia.

## 8. Hubungan dengan fokus penelitian dan rancangan metode

Rancangan awal dan catatan teori sama-sama menempatkan evaluasi IndoBERT pada abstrak ilmiah Indonesia sebagai arah penelitian, tetapi pertanyaan operasionalnya belum sepenuhnya sama. Rancangan awal menekankan variasi menurut bidang dan karakteristik artikel, termasuk metode penelitian; catatan teori menambahkan pembandingan baseline, evaluasi kalibrasi sebelum/sesudah Temperature Scaling, dan kemungkinan uji prototipe. Ini masih opsi, bukan satu set RQ yang sudah disepakati. Pertanyaan final perlu dipilih setelah audit korpus dan kelayakan sampel.

Rincian cakupan jurnal, unit analisis, skema data, pengumpulan, pemrosesan, metrik, dan rencana audit dipusatkan di [Rancangan Metode, Data, dan Evaluasi](rancangan-metode-data-dan-evaluasi.md). Sintesis latar belakang dan urgensi tersedia di [Latar Belakang dan Urgensi](latar-belakang-dan-urgensi-deteksi-abstrak-ai-indonesia.md); perbandingan artikel jurnal tersedia di [Matriks Komparasi Jurnal](matriks-komparasi-jurnal-landasan-deteksi-ai.md).
