# Latar Belakang dan Urgensi: Evaluasi Deteksi Teks AI pada Abstrak Ilmiah Berbahasa Indonesia

**Tanggal konsolidasi:** 2026-10-30  
**Status:** Catatan riset eksploratif; bukan tinjauan sistematis atau klaim kebaruan final.

## 1. Latar belakang

Model bahasa generatif dapat menghasilkan abstrak ilmiah yang koheren. Namun, kemampuan detektor membedakan teks manusia dan teks AI tidak otomatis berlaku lintas bahasa, korpus, generator, dan prosedur generasi. Hasil tinggi pada satu dataset menunjukkan kelayakan pada kondisi eksperimen itu, bukan jaminan untuk kondisi lain.

Zhang dan Zhou (2026) menjelaskan korpus lintas bidang berisi **5.000 dokumen total: 2.500 abstrak arXiv manusia dan 2.500 abstrak sintetis Gemini 2.0 Flash dari judul artikel**, masing-masing 500 per kelas pada lima bidang. Mereka melaporkan akurasi DistilBERT 99,4% pada uji utama dan Macro-F1 lintas bidang 0,948. Interpretasi angka tersebut terbatas oleh ketidaksesuaian ukuran uji cs.CV dengan uraian split serta ringkasan Tabel 5 dengan nilai per domain. Estevanell-Valladares dkk. (2025) membandingkan LLM *zero-shot*, transformer *fine-tuned*, dan klasifikasi tradisional pada abstrak Inggris; hasil berbeda menurut pendekatan (§4, Tabel 2). Sumber terakhir adalah paper prosiding workshop, bukan jurnal. Kedua studi tidak membuktikan generalisasi ke abstrak Indonesia.

Di Indonesia, Syahputra dkk. (2026) mengevaluasi mDeBERTa v3 *zero-shot NLI* pada **2.274 teks: 1.137 abstrak manusia-proksi dan 1.137 parafrasa IndoT5**. Kondisi satu-aspek memiliki TP 870, FN 267, TN 347, FP 790 (Tabel 10, PDF hlm. 11): recall 76,52%, akurasi 53,52%, dan FPR **790/1.137 = 69,48%**. Random Forest memperoleh akurasi 91,21% pada test dari split 80/20 dengan tujuh fitur linguistik numerik (Tabel 13), sedangkan NLI menilai teks melalui hipotesis dan dilaporkan pada seluruh korpus. Jadi keduanya **bukan input fitur maupun test set yang identik**. Tugasnya parafrasa abstrak, bukan generasi dari isi artikel atau evaluasi IndoBERT.

Dengan demikian, masalah penelitian dapat dirumuskan secara terbatas: kinerja detektor pada abstrak ilmiah berbahasa Indonesia perlu diukur dengan korpus, model, generator, dan prosedur pembentukan label yang dinyatakan transparan. Skor detektor bukan bukti kepengarangan atau identitas penulis.

### Rumusan latar belakang yang dapat dipakai

Abstrak ilmiah berbahasa Indonesia merupakan konteks yang relevan untuk mengevaluasi deteksi teks AI karena kinerja detektor tidak otomatis berpindah dari bahasa, domain, atau generator lain. Studi abstrak ilmiah berbahasa Inggris melaporkan hasil tinggi pada dataset dan prosedur tertentu, sedangkan bukti Indonesia yang ditemukan menguji kelas AI berupa parafrasa IndoT5 dengan mDeBERTa v3 dan fitur tradisional. Karena itu, performa IndoBERT pada abstrak ilmiah Indonesia tetap perlu dievaluasi langsung dengan definisi data dan prosedur generasi yang transparan. Simpulan dibatasi pada dataset serta kondisi yang diuji.

## 2. Urgensi penelitian

Urgensi penelitian ini bukan untuk membuktikan bahwa penulis memakai AI. Skor deteksi dapat keliru ketika teks manusia diberi label AI, sementara performa dari bahasa, model, dan generator lain tidak otomatis berlaku pada abstrak ilmiah Indonesia.

### 2.1 Kesalahan positif pada abstrak ilmiah manusia

Rashidi dkk. (2023) menguji detektor keluaran GPT-2 berbasis RoBERTa (`roberta-base-openai-detector`) pada 14.400 abstrak dari lima jurnal, rentang 1980–Februari 2023. Dalam sembilan kelompok waktu berisi 1.600 abstrak, proporsi maksimum skor AI >50% adalah **8,69% pada 1995–1999**, sedangkan maksimum >90% adalah **5,13% pada 2000–2004** (Fig. 2). Keduanya **bukan FPR agregat 14.400 abstrak atau maksimum semua pengelompokan**; analisis per jurnal di Tabel 1 berbeda. Korpus merupakan human-proxy, terutama periode terakhir yang tidak dapat dipastikan bebas bantuan AI. Temuan ini mendasari pengukuran kesalahan lokal, bukan memprediksi FPR IndoBERT.

Syahputra dkk. (2026) memberikan bukti lokal: kondisi NLI satu-aspek salah menandai 790 dari 1.137 abstrak manusia-proksi (Tabel 10, hlm. 11). Interpretasi dibatasi pada mDeBERTa, hipotesis NLI, parafrasa IndoT5, dan pemotongan maksimum 100 kata dalam prosedur mereka; bukan estimasi kesalahan semua detektor Indonesia.

### 2.2 Hasil bervariasi menurut detektor dan kondisi teks

Pratama (2025) memakai **72 abstrak manusia sebagai sumber**. Skenario utama terdiri atas **72 manusia + 144 AI-generated = 216 teks per alat**; skenario lain memakai 144 AI-assisted. FPR GPTZero, ZeroGPT, dan DetectGPT pada 72 teks manusia masing-masing adalah **0/72, 12/72 (16,67%), dan 23/72 (31,94%)**. Sebanyak **32/72 (44,44%)** ditandai keliru oleh setidaknya satu dari tiga alat—bukan FPR satu alat tertentu. Bahasa Inggris, proksi negara afiliasi untuk kategori penulis, ukuran sampel, dan versi alat membatasi generalisasi.

Hasil tinggi yang dilaporkan Zhang dan Zhou tidak meniadakan risiko pada konteks lain. Selain perbedaan bahasa dan generator, inkonsistensi denominator dan ringkasan lintas bidang pada sumber tersebut mengharuskan pembacaan kritis; angka 99,4% dan 0,948 tidak dipakai sebagai target kinerja yang sudah tervalidasi bagi penelitian ini.

### 2.3 Implikasi praktis dan batas penggunaan

Salah klasifikasi dapat ditafsirkan berlebihan sebagai bukti kepengarangan. Bukti yang ditelaah tidak membenarkan skor detektor sebagai bukti tunggal bahwa seseorang menggunakan AI. Manfaat yang dapat dipertanggungjawabkan adalah mengukur kapan model bekerja dan keliru pada data uji yang ditentukan, termasuk FPR pada abstrak *human-proxy*. Hasil dapat membantu pembaca menafsirkan skor secara terbatas, bukan menjadi dasar otomatis untuk tuduhan, sanksi, atau keputusan editorial.

### Rumusan urgensi yang dapat dipakai

Evaluasi deteksi teks AI pada abstrak ilmiah berbahasa Indonesia penting karena penelitian terdahulu menemukan kesalahan positif pada abstrak manusia, baik dalam korpus ilmiah internasional maupun dalam eksperimen lokal. Besar kesalahan bergantung pada detektor, bahasa, korpus, dan cara teks sintetis dibuat; angka studi lain tidak dapat dipindahkan langsung menjadi perkiraan kinerja IndoBERT. Penelitian perlu mengukur metrik klasifikasi dan FPR pada abstrak *human-proxy*, lalu membatasi kesimpulan pada model, data, generator, dan protokol yang diuji. Hasilnya bukan bukti kepengarangan.

## 3. Implikasi dan batas interpretasi

- Laporkan FPR pada kelas *human-proxy* secara eksplisit, selain macro-F1 dan AUROC.
- Dokumentasikan sumber, periode publikasi, bahasa, checkpoint, generator, prompt, dan cara pembentukan pasangan kelas.
- Artikel pra-30 November 2022 adalah *human-proxy* berbasis tanggal, bukan bukti bahwa teks tidak pernah dibantu AI.
- Analisis per bidang atau metode penelitian bersifat subkelompok; laporkan jumlah sampel dan ketidakpastian, serta hindari klaim sebab-akibat.
- Skor model tidak membuktikan penggunaan AI, identitas penulis, atau kepengarangan.
- Studi berbahasa Inggris dan studi pada detektor lain adalah pembanding metodologis, bukan estimasi kinerja untuk abstrak Indonesia.
- Pencarian eksploratif ini tidak cukup untuk menyatakan desain penelitian persis ini belum pernah dilakukan.

## Referensi utama

1. Zhang, C., & Zhou, W. (2026). Efficient detection of AI-generated scientific abstracts with a lightweight transformer. *Scientific Reports, 16*, 4975. https://doi.org/10.1038/s41598-026-35203-3.
2. Estevanell-Valladares, E. L., Picazo-Izquierdo, A., & Mitkov, R. (2025). Detection of AI-generated content in scientific abstracts. In *Proceedings of the First Workshop on Comparative Performance Evaluation: From Rules to Language Models* (pp. 21–29). https://doi.org/10.26615/978-954-452-102-8-003. Paper prosiding, bukan jurnal.
3. Syahputra, A., Murdiyanto, A. W., & Aesyi, U. S. (2026). Zero-shot detection of IndoT5-synthesized Indonesian scientific abstracts using mDeBERTa v3. *Indonesian Journal of Data and Science, 7*(2), 333–349. https://doi.org/10.56705/ijodas.v7i2.457. [PDF penerbit](https://jurnal.yoctobrain.org/index.php/ijodas/article/download/457/341).
4. Rashidi, H. H., Fennell, B. D., Albahra, S., Hu, B., & Gorbett, T. (2023). The ChatGPT conundrum: Human-generated scientific manuscripts misidentified as AI creations by AI text detection tool. *Journal of Pathology Informatics, 14*, 100342. https://doi.org/10.1016/j.jpi.2023.100342. Teks penuh: https://pmc.ncbi.nlm.nih.gov/articles/PMC10727991/.
5. Pratama, A. R. (2025). The accuracy-bias trade-offs in AI text detection tools and their impact on fairness in scholarly publication. *PeerJ Computer Science, 11*, e2953. https://doi.org/10.7717/peerj-cs.2953. Teks penuh: https://pmc.ncbi.nlm.nih.gov/articles/PMC12453642/.

Lihat [matriks komparasi jurnal](matriks-komparasi-jurnal-landasan-deteksi-ai.md) untuk inventaris artikel yang digunakan di seluruh catatan topik dan ringkasan komparatifnya.
