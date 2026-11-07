---
category: Landasan
date: 2026-11-06
---

# Mengapa Sistem Kemiripan Abstrak Perlu Dikembangkan?

> **Status:** Catatan fondasi penelitian; bukan metodologi final atau laporan hasil eksperimen. Arah ini menggantikan penelitian deteksi teks AI.

Navigasi: [inti penelitian](01-inti-penelitian-5w1h.md) · [penelitian terdahulu](03-matriks-literatur-landasan.md) · [jejak penelusuran](07-jejak-penelusuran.md).

**Masalah yang dituju bukan sekadar mencari abstrak dengan kata-kata serupa, tetapi membantu dosen memahami apakah usulan mengulang substansi penelitian sebelumnya.** Perbandingan tujuan, metode, dan objek beserta bukti teks diusulkan untuk memperjelas letak kesamaan. Manfaatnya masih perlu diuji; tidak diasumsikan bahwa skor per aspek selalu lebih baik.

## Masalah ilmiah

Menilai posisi kontribusi usulan penelitian membutuhkan perbandingan dengan karya sebelumnya. Literatur scientific novelty detection membahas kebutuhan membedakan kedekatan teks dengan kebaruan gagasan, serta kesulitan menyelaraskan penilaian otomatis dengan penilaian sumber ([Liu dkk., S2, §§3–4 dan §7](https://arxiv.org/html/2505.24615); [Schopf & Färber, S6, §§4–5](https://arxiv.org/html/2603.10303)). Literatur ini memberi dasar masalah ilmiah, bukan bukti bahwa dosen JTI telah mengalami tingkat kesulitan tertentu.

Pada tahap awal pengusulan, abstrak dapat menjadi bahan perbandingan yang ringkas. Namun, informasi dalam abstrak terbatas: metode atau kontribusi bisa tidak dijelaskan secara memadai. Penelitian aspect-based similarity juga mencatat keterbatasan informasi tersebut ([Ostendorff dkk., S4, §5, pp. 6201–6202](https://aclanthology.org/2020.coling-main.545.pdf)). Karena itu, kemiripan abstrak perlu dipahami sebagai bukti parsial, bukan representasi lengkap seluruh penelitian.

## Mengapa skor kemiripan saja belum cukup?

Satu skor kemiripan dokumen tidak secara langsung menjelaskan bagian substansi yang sama. S4 membedakan relasi antar-paper melalui aspek berbasis bagian sitasi, sedangkan S5 melatih representasi khusus **task, method, dataset** untuk retrieval ([S4, §§3.1–3.4](https://aclanthology.org/2020.coling-main.545.pdf); [S5, §§3–5](https://arxiv.org/pdf/2203.14541)). Kedua studi mendukung alasan mempertimbangkan aspek, tetapi tidak membuktikan bahwa semua model holistic gagal atau seluruh pemisahan aspek selalu menguntungkan.

**Contoh hipotetis, bukan hasil pengamatan JTI:** dua penelitian sama-sama memakai Transformer, tetapi menyelesaikan masalah berbeda. Kesamaan metode tidak otomatis berarti kontribusinya sama. Sebaliknya, dua abstrak dengan redaksi berbeda dapat tetap mengusulkan tujuan, pendekatan, dan objek yang sama. Perbandingan yang hanya menampilkan satu angka tidak menjelaskan perbedaan kedua situasi itu.

Liu dkk. (ID sumber S2) berupaya bergerak dari textual similarity menuju overlap ide melalui ekstraksi ide, retrieval, dan perbandingan LLM. Namun, sebagian benchmark-nya dibangun dari variasi sintetis dengan asumsi novelty tertentu ([S2, §3 dan §§4.1–4.3](https://arxiv.org/html/2505.24615)). Itu landasan untuk membedakan konsep, bukan pengganti penilaian ahli pada abstrak Indonesia.

[INFERENCE] Pertanyaan yang relevan bukan “bagaimana menghasilkan skor tertinggi”, melainkan apakah informasi per aspek dapat membantu menemukan dan menjelaskan tumpang tindih substansi dengan lebih tepat daripada perbandingan keseluruhan. Jawabannya masih perlu diuji, termasuk kemungkinan bahwa ekstraksi aspek menghilangkan informasi penting.

## Mengapa penjelasan juga harus diperiksa?

Penjelasan dapat terdengar meyakinkan tanpa menghasilkan penilaian kebaruan yang sesuai. RINoBench memisahkan evaluasi skor dan penjelasan; hasilnya menunjukkan bahwa keselarasan penjelasan tidak menjamin keselarasan skor novelty dengan penilaian sumber ([S6, §4.2 dan §5 / Table 3](https://arxiv.org/html/2603.10303)). Benchmark tersebut berasal dari review ICLR dan melibatkan pemrosesan LLM, bukan anotasi dosen Indonesia yang tidak tersentuh model.

[INFERENCE] Penjelasan sistem perlu dapat diperiksa melalui teks sumber: kutipan harus benar-benar ada, merujuk penelitian yang tepat, dan mendukung persamaan atau perbedaan yang dinyatakan. Keberadaan kutipan saja belum membuktikan penjelasannya setia pada sumber. Ketepatan ini berbeda dari persepsi bahwa laporan mudah dipahami atau membantu.

Dengan demikian, penjelasan bukan sekadar pelengkap antarmuka. Kualitas isinya merupakan bagian dari objek penelitian; kegunaan untuk dosen merupakan pertanyaan lain yang juga memerlukan bukti.

## Urgensi untuk konteks yang dituju

Sitorus & Madyatmadja memberi konteks penggunaan TF-IDF, LSA, dan IndoBERT untuk proposal berbahasa Indonesia. Namun, data mereka adalah **judul**, bukan abstrak, dan tidak memiliki ground truth novelty manual ([S1, PDF pp. 4–6 dan 10–11](https://thescipub.com/jcs/jcssp.2026.2444.2455.pdf)). Angka 99,98% pada Table 2 menyatakan proporsi Top-1 IndoBERT dengan cosine ≥ 0,60, bukan akurasi deteksi kebaruan. Ambang studi itu tidak dapat langsung dipakai untuk abstrak JTI.

[INFERENCE] Urgensi utama penelitian yang diusulkan adalah **menyediakan dan menguji bukti perbandingan yang lebih terperinci dan dapat ditelusuri, agar hasil sistem dapat diperiksa dosen, bukan hanya dipercaya sebagai angka**. Ini motivasi penelitian yang diturunkan dari literatur dan tujuan pengguna, bukan manfaat lokal yang sudah terbukti.

Dosen JTI Polinema adalah pengguna yang dituju. Belum ada bukti lokal mengenai jumlah proposal yang harus diperiksa, lama pemeriksaan, prevalensi duplikasi, atau frekuensi keputusan yang keliru. Klaim kebutuhan operasional tersebut tidak digunakan sebagai fakta latar belakang sebelum tersedia sumber yang sah.

JIP hanya calon sumber dataset artikel pada tahap berikutnya. Abstraknya tidak otomatis mewakili seluruh skripsi JTI atau seluruh penelitian terdahulu. Literatur landasan tetap berasal dari berbagai penerbit melalui penelusuran S2; S2 bukan otomatis sumber retrieval runtime.

## Manfaat yang dituju dan belum terbukti

Manfaat yang dituju meliputi pemeriksaan overlap yang lebih mudah ditelusuri, pertimbangan risiko kebaruan yang lebih terinformasi, penghematan waktu, dan keterpakaian bagi dosen. **Belum ada hasil yang membuktikan penghematan waktu, ketepatan keputusan, atau penerimaan pengguna.** Akses ahli untuk anotasi dan penilaian juga belum dipastikan.

Cakupan korpus yang terbatas, abstrak yang tidak lengkap, dan kesalahan ekstraksi dapat membatasi hasil. Aspek yang tidak ditemukan tidak boleh diperlakukan sebagai bukti bahwa usulan berbeda atau novel. Risiko kebaruan tetap indikasi relatif terhadap korpus, bukan vonis kelayakan akademik.

[Posisi penelitian](04-landasan-konseptual-dan-posisi-penelitian.md) menguraikan calon kontribusi dan pertanyaan sementara untuk menguji manfaat tersebut tanpa menganggapnya sudah tercapai.
