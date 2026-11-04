# Cara Kerja Sistem dan Peran Model

## Alur penggunaan

Pengguna mengunggah PDF artikel ilmiah berbahasa Indonesia. Sistem mengambil teks yang dapat dibaca, membaginya menjadi potongan, lalu menerapkan IndoBERT yang sudah dilatih untuk deteksi beserta penyesuaian skornya. Aplikasi menampilkan artikel dengan penanda pada potongan yang diprediksi sebagai tulisan AI, sehingga pengguna dapat memeriksa prediksi dalam konteks bacaan.

Menampilkan seluruh artikel tidak berarti memberikan satu klasifikasi untuk seluruh artikel. Unit potongan dan bentuk tampilannya belum ditentukan; rancangan ini tidak menetapkan kalimat atau paragraf sebagai unit final.

## Peran pekerjaan model

**Pelatihan lanjutan (fine-tuning)** membuat IndoBERT belajar tugas deteksi dari contoh teks berlabel. Model bahasa yang sudah tersedia disesuaikan untuk tugas ini, sementara aplikasi menghubungkan model dengan PDF dan tampilan hasil.

**Kalibrasi** menyesuaikan keyakinan model agar lebih sesuai dengan kebenaran yang diamati pada kumpulan prediksi. Misalnya, skor keyakinan 80% idealnya sejalan dengan sekitar 80% prediksi benar pada kelompok sejenis, bukan berarti 80% isi suatu potongan ditulis AI. Ini sifat sekumpulan kasus, bukan kepastian asal satu teks. Temperature Scaling merupakan metode penyesuaian skor yang diusulkan; tidak menjamin label menjadi lebih tepat atau kesalahan menandai manusia berkurang.

**Pengujian** mengukur apakah fungsi aplikasi bekerja, kapan deteksi keliru, dan seberapa andal skornya. Dasar teori Silva Filho dan Balanya diringkas di [penelitian terdahulu](03-matriks-komparasi-jurnal-landasan-deteksi-ai.md); ukuran pengujian ada di [catatan metode](05-rancangan-metode-data-dan-evaluasi.md).

## Batas pengolahan PDF

PDF yang tidak menghasilkan teks layak tidak boleh dinyatakan berhasil dianalisis. Jenis PDF yang didukung dan penanganan kegagalan atau ketidakrapian ekstraksi perlu ditetapkan pada perancangan berikutnya. OCR, penafsiran gambar/tabel, dan pemisahan kalimat sempurna belum dijanjikan.

Rancangan ini tidak mencakup kepastian kepengarangan, akun pengguna, penilaian akademik, atau sanksi. Fokus aplikasi tetap pemeriksaan bagian teks.
