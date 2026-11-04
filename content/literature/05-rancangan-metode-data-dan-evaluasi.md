# Data, Pengembangan, dan Pengujian

Ini garis besar pengembangan, bukan protokol final atau laporan eksperimen yang sudah dijalankan. [Tujuan aplikasi](01-inti-penelitian-5w1h.md) menjadi acuan; spesifikasi implementasi masih perlu ditetapkan.

## Data yang diperlukan

Diperlukan contoh manusia-proksi dan AI pada tingkat potongan teks yang mewakili isi artikel ilmiah Indonesia. Dataset pasangan abstrak lama tidak otomatis cocok. **Manusia-proksi** berarti tanggal publikasi dipakai sebagai dasar perkiraan label manusia, bukan bukti kepengarangan.

Catat lisensi, asal data, ID artikel sumber, dasar label, generator/versi/prompt, dan proses pengolahan. Penggunaan serta penyebaran teks harus mengikuti lisensi. Hapus duplikat sebelum pembagian data; semua potongan, pasangan, dan varian dari artikel yang sama, termasuk versi duplikatnya, harus berada dalam kelompok data yang sama.

Pisahkan data untuk pelatihan, pemilihan pengaturan, kalibrasi, dan pengujian akhir berdasarkan artikel sumber. **Data uji akhir tidak boleh dipakai untuk melatih model, memasang kalibrasi, memilih pengaturan, atau memilih ambang keputusan.** Pemisahan artikel belum otomatis membuktikan kemampuan pada jurnal yang belum pernah dilihat.

## Pengambilan data dan prapemrosesan

Dalam [metode jurnal](03-matriks-komparasi-jurnal-landasan-deteksi-ai.md#metode-yang-digunakan-dalam-jurnal), OAI-PMH mengambil rekaman metadata berisi abstrak, sedangkan BeautifulSoup mengekstrak isi HTML; keduanya bukan pembaca PDF. Alat ekstraksi PDF skripsi belum dipilih. Usulannya: bersihkan artefak ekstraksi, pertahankan hubungan teks dengan posisi asal, lalu gunakan tokenizer IndoBERT pilihan. Tokenisasi berbeda dari pembagian potongan untuk tampilan.

Aturan huruf kecil, tanda baca, *stemming* (mengubah kata ke bentuk dasar), penghapusan *stopword* (kata umum), serta pemotongan/padding masukan belum ditetapkan. Tidak semuanya wajib untuk setiap model. Uji dampaknya terhadap informasi teks dan ketepatan penanda. Terapkan aturan konsisten lintas label; kosakata/IDF pembanding hanya dipelajari dari data latih.

## Pengembangan yang diusulkan

Bangun alur ekstraksi PDF, pemetaan potongan ke artikel, dan tampilan penanda serta skor. Latih lanjutan IndoBERT untuk mendeteksi potongan teks, dengan **TF-IDF + SVM** sebagai usulan pembanding yang sudah ada, bukan tujuan skripsi baru.

Kalibrasi tetap termasuk cakupan. **Temperature Scaling** diusulkan untuk menyesuaikan skor setelah pelatihan menggunakan data kalibrasi yang tidak dipakai melatih classifier dan bukan data uji akhir. Pembagian peran data serta pengaturannya perlu dirinci sebelum eksperimen. Bandingkan hasil sebelum/sesudah kalibrasi pada data uji yang sama; jangan menganggap kalibrasi pasti memperbaiki klasifikasi.

## Tiga pengujian yang berbeda

- **Fungsi aplikasi:** periksa ekstraksi PDF, penanganan teks yang tidak layak, ketepatan pemetaan potongan ke tampilan artikel, serta kesesuaian penanda dan skor dengan keluaran model.
- **Deteksi:** ukur precision (ketepatan bagian yang ditandai), recall (cakupan bagian AI yang ditemukan), dan F1 (ringkasan keduanya), disertai matriks kesalahan dan proporsi teks manusia-proksi yang salah ditandai sebagai AI (FPR). Laporkan jumlah sampel dan ambang keputusan.
- **Keyakinan:** bandingkan sebelum/sesudah kalibrasi memakai ECE, Brier, dan diagram keandalan. ECE merangkum selisih keyakinan dengan kebenaran per kelompok skor; Brier mengukur kesalahan kuadrat probabilitas terhadap label, bukan kalibrasi murni; diagram memperlihatkan kesesuaian skor dengan hasil yang diamati. Nyatakan jenis skor, pembagian kelompok, dan jumlah contoh agar ukuran dapat ditafsirkan.

Untuk artikel berisi tulisan manusia dan sisipan AI, simpan asal setiap potongan. Uji apakah prediksi dan penandanya menunjuk bagian yang sesuai dalam artikel; label seluruh artikel saja tidak cukup. Bagian manusia bisa salah ditandai dan bagian AI bisa terlewat. Hasilnya tetap prediksi per potongan, bukan vonis dokumen. Sistem tidak dianggap mengenali semua bantuan penyuntingan tanpa data dan label yang sesuai.

Analisis menurut bidang, generator, panjang, metode artikel, atau subkelompok lain dilakukan bila label dan sampelnya memadai, dengan jumlah serta ketidakpastian dilaporkan; pemadatan catatan tidak membatalkan arah analisis tersebut.

Landasan pengukuran tersedia pada [penelitian terdahulu](03-matriks-komparasi-jurnal-landasan-deteksi-ai.md).

## Prasyarat yang belum ditetapkan

- Data artikel lengkap beserta label asal potongan.
- Unit potongan dan cara menampilkannya.
- Dukungan ekstraksi PDF dan penanganan kegagalannya.
- Pilihan korpus, generator, model, jumlah data, pembagian data, serta pengaturan pelatihan.
- Ambang keputusan untuk penandaan.
