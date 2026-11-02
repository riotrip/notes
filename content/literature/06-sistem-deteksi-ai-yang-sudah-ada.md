# Sistem Deteksi Teks AI yang Sudah Ada

**Tanggal penelusuran:** 2026-11-01  
**Cakupan:** Dokumentasi publik sepuluh produk; bukan pengujian produk, audit keamanan, atau tinjauan sistematis.

## Ringkasan

Berbagai produk sudah menawarkan deteksi teks AI. Fitur, arti skor, bahasa yang didukung, dan aksesnya berbeda-beda. Sebagian menyediakan keluaran per bagian atau kategori *AI-assisted*; sebagian lain menampilkan skor dokumen. Tidak ada dasar dari penelusuran ini untuk menyebut satu produk paling akurat pada semua bahasa dan situasi.

**Dukungan bahasa Indonesia yang tercantum eksplisit pada dokumentasi yang ditinjau ditemukan pada GPTZero, `Originality.ai`, dan Winston AI.** Dukungan itu berarti produk menyatakan bahasa tersebut tersedia; bukan bukti bahwa produknya akurat pada abstrak jurnal Indonesia. Penelusuran ini tidak menjalankan uji komparatif pada teks atau dataset sendiri.

## Perbandingan produk

| Produk | Keluaran atau fokus yang terdokumentasi | Bahasa Indonesia dan batas penting |
|---|---|---|
| [Pangram](https://www.pangram.com/research/model-card/pangram-4-1) | Membedakan Human, AI-Assisted, dan AI-Generated pada segmen; dokumentasi model dan metode tersedia. | Tidak tercantum pada daftar 24 bahasa resmi Pangram 4.1 yang ditinjau; minimum teks 50 kata. |
| [QuillBot](https://quillbot.com/ai-content-detector) | Detektor dalam ekosistem penulisan dan parafrasa; menyediakan beberapa kategori manusia/AI dan refinement. | Klaim produk mencakup 20+ bahasa, tetapi bahasa Indonesia belum terverifikasi khusus untuk detektornya. Dokumentasi Help Center menyatakan tidak ada API B2B/B2C. |
| [ZeroGPT](https://www.zerogpt.com/deep-analyse) | DeepAnalyse, analisis bertingkat, sorotan kalimat, dan persentase keseluruhan. | Mengklaim semua bahasa; evaluasi khusus bahasa Indonesia tidak ditemukan. Arti persentase perlu dibaca dari dokumentasi produk, bukan dianggap proporsi kata yang ditulis AI. |
| [GPTZero](https://gptzero.me/faq) | Kategori Human/Mixed/AI dengan probabilitas kelas; juga menyediakan fitur Writing Reports. | Bahasa Indonesia tercantum pada daftar bahasa yang didukung. Probabilitas kelas bukan persentase kata AI. |
| [Turnitin](https://guides.turnitin.com/hc/en-us/articles/22774058814093-Using-the-AI-Writing-Report) | AI Writing Report untuk alur kerja institusi; skor AI terpisah dari similarity score. | Bahasa Indonesia tidak tercantum pada dokumentasi yang ditinjau; memerlukan minimal 300 kata prosa. Skor 1–19% ditampilkan sebagai `*%`. |
| [Originality.ai](https://help.originality.ai/en/article/multiple-languages-how-to-use-multi-language-ai-detection-13e5plo/) | Deteksi teks campuran, sorotan, dan Deep Scan opsional; mendukung alur konten dan batch. | Bahasa Indonesia tercantum. Arti skor model 5.0 berbeda dari model lama; periksa dokumentasi versi yang digunakan. |
| [Copyleaks](https://docs.copyleaks.com/reference/actions/miscellaneous/ai-detection-supported-languages) | Hasil per bagian, probabilitas, pengaturan sensitivitas, dan AI Logic untuk sebagian bahasa. | Bahasa Indonesia tidak tercantum pada daftar 30 bahasa deteksi AI yang ditinjau. Fitur pemeriksaan plagiarisme adalah hal terpisah. |
| [Winston AI](https://gowinston.ai/interpreting-our-ai-detection-scores/) | Human Score dan AI Prediction Map; menerima unggahan dokumen dan OCR. | Bahasa Indonesia tercantum. Human Score adalah skor keyakinan, bukan komposisi dokumen. |
| [Sapling](https://sapling.ai/ai-content-detector) | Model berbasis transformer; API membedakan skor dokumen dan `ai_fraction`. | Bahasa Indonesia tidak tercantum pada daftar dukungan yang ditinjau; penilaian memakai model bahasa lain dapat kurang andal. |
| [Scribbr](https://www.scribbr.com/ai-detector/) | Detektor untuk penulis dan mahasiswa, dengan beberapa kategori keterlibatan AI. | Bahasa Indonesia tidak tercantum pada dokumentasi yang ditinjau. Bukti yang dibaca tidak cukup untuk memastikan apakah engine-nya identik dengan QuillBot atau sepenuhnya independen. |

Tabel ini merangkum dokumentasi produk yang diperiksa pada tanggal penelusuran. Fitur dan dukungan dapat berubah; periksa dokumentasi terbaru sebelum menggunakan layanan. Status bahasa di tabel bukan hasil benchmark independen.

## Apa arti perbedaan tersebut?

1. **Detektor bukan pemeriksa plagiarisme.** Detektor memperkirakan pola teks yang menyerupai keluaran AI; pemeriksa kemiripan mencari kecocokan terhadap sumber. Keduanya menjawab pertanyaan berbeda.
2. **Skor tidak memiliki arti universal.** Persentase, probabilitas kelas, *Human Score*, dan peta bagian teks tidak otomatis setara atau menunjukkan persentase kalimat yang ditulis AI.
3. **Detektor tidak membuktikan kepengarangan.** Skor bukan bukti pasti tentang siapa yang menulis, alat yang digunakan, atau apakah kebijakan dilanggar. Teks manusia dapat salah ditandai; teks AI dapat lolos.
4. **Kinerja bergantung pada konteks.** Bahasa, panjang teks, bidang, generator, dan bentuk bantuan AI dapat memengaruhi hasil. Dokumentasi yang menyebut dukungan bahasa tidak menggantikan evaluasi pada korpus sasaran.
5. **Periksa privasi sebelum mengunggah naskah.** Kebijakan retensi dan pemrosesan berbeda antarproduk; “tidak dipakai untuk pelatihan” tidak otomatis berarti data tidak disimpan.

## Hubungannya dengan penelitian ini

Penelitian skripsi berfokus pada pengembangan dan evaluasi detektor abstrak jurnal berbahasa Indonesia berbasis IndoBERT. Pembeda yang dituju adalah **konteks korpus dan bukti eksperimen**: mengukur performa, kesalahan pada abstrak *human-proxy*, dan—jika masuk cakupan akhir—keandalan skor sebelum dan sesudah kalibrasi.

Ini bukan klaim bahwa IndoBERT merupakan detektor pertama, lebih akurat daripada layanan komersial, atau dapat membuktikan kepengarangan. Produk komersial dalam tabel juga bukan hasil benchmark langsung terhadap model penelitian. Rancangan model pembanding dan kalibrasi masih perlu dikunci sebelum protokol eksperimen final.

## Referensi dokumentasi produk

- [Pangram: Model Card 4.1](https://www.pangram.com/research/model-card/pangram-4-1)
- [QuillBot: AI Content Detector](https://quillbot.com/ai-content-detector); [API Help Center](https://help.quillbot.com/hc/en-us/articles/4541472549527-Does-Quillbot-Offer-an-API)
- [ZeroGPT: DeepAnalyse](https://www.zerogpt.com/deep-analyse); [FAQ](https://www.zerogpt.com/faq)
- [GPTZero: FAQ](https://gptzero.me/faq); [daftar bahasa](https://support.gptzero.me/articles/1682612063-what-languages-does-gptzero-support)
- [Turnitin: AI Writing Report](https://guides.turnitin.com/hc/en-us/articles/22774058814093-Using-the-AI-Writing-Report)
- [Originality.ai: dukungan bahasa](https://help.originality.ai/en/article/multiple-languages-how-to-use-multi-language-ai-detection-13e5plo/)
- [Copyleaks: bahasa yang didukung](https://docs.copyleaks.com/reference/actions/miscellaneous/ai-detection-supported-languages)
- [Winston AI: arti skor](https://gowinston.ai/interpreting-our-ai-detection-scores/)
- [Sapling: AI Detector](https://sapling.ai/ai-content-detector)
- [Scribbr: AI Detector](https://www.scribbr.com/ai-detector/)

Rangkuman disusun dari penelusuran dokumentasi produk pada 2026-11-01; bukan tinjauan sistematis atau pengujian produk.
