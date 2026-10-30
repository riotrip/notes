# Inti Rencana Skripsi — 5W1H

**Intinya: kita ingin membuat dan menguji detektor abstrak ilmiah berbahasa Indonesia berbasis IndoBERT, lalu menilai apakah prediksi dan skor keyakinannya dapat dipercaya.** Bukan membuat AI penulis abstrak, melainkan menggunakan contoh abstrak buatan AI untuk melatih dan menguji detektor.

## 1. What — Apa yang dibuat?

**Prototipe program penelitian** yang menjalankan model deteksi dan menampilkan hasil pengujiannya.

- **Masukan model:** teks abstrak berbahasa Indonesia.
- **Keluaran model:** prediksi kelas manusia-proksi atau buatan AI, beserta skor keyakinan model.
- **Hasil penelitian:** dataset berlabel, model terlatih, dan laporan tentang keberhasilan serta kesalahan deteksi.

IndoBERT adalah model bahasa Indonesia yang sudah dilatih sebelumnya. Kita melatihnya lebih lanjut untuk tugas deteksi ini, bukan membuat model bahasa dari nol. Tampilan untuk mencoba satu abstrak bisa menjadi demonstrasi tambahan; inti skripsinya adalah pengujian model.

## 2. Why — Mengapa dibuat?

Kita belum mengetahui seberapa baik IndoBERT bekerja pada kumpulan abstrak Indonesia yang dipilih. Dua pertanyaan utamanya:

1. **Apakah prediksinya benar?** Termasuk seberapa sering abstrak manusia salah ditandai sebagai AI.
2. **Apakah skor keyakinannya masuk akal?** Skor tinggi tidak otomatis berarti prediksi benar.

Kalibrasi berarti menyesuaikan skor agar lebih sesuai dengan frekuensi kebenaran pada data. Kalibrasi tidak otomatis meningkatkan ketepatan klasifikasi.

## 3. Who — Untuk siapa?

Pengguna utama prototipe adalah **peneliti atau mahasiswa yang menjalankan eksperimen**. Dosen pembimbing dapat menilai metode dan hasilnya. Prototipe ini bukan alat pembuktian kecurangan atau pemberian sanksi kepada penulis.

## 4. Where — Di mana dan dari mana datanya?

Eksperimen dijalankan di lingkungan komputasi penelitian. Data berasal dari **jurnal Indonesia terpilih lintas bidang**, sesuai izin akses dan penggunaan teks. Jurnal Informatika Polinema merupakan salah satu kandidat, bukan satu-satunya sumber yang sudah ditetapkan.

## 5. When — Kapan dilakukan?

Urutannya: **pastikan data layak → siapkan dataset → latih model → uji → tulis hasil**. Jadwal kalender belum ditetapkan.

Abstrak terbit sebelum 30 November 2022 dapat menjadi **manusia-proksi**, yaitu pendekatan praktis untuk kelas manusia berdasarkan waktu terbit, bukan jaminan mutlak bebas bantuan AI.

## 6. How — Bagaimana caranya?

1. Kumpulkan abstrak asli dan isi artikel yang boleh digunakan.
2. Minta model generatif membuat abstrak dari isi artikel, tanpa memasukkan abstrak asli sebagai input. Ini menghasilkan pasangan contoh manusia-proksi dan AI.
3. Pisahkan data latihan, validasi, dan pengujian. Semua teks dari artikel yang sama harus masuk kelompok yang sama agar tidak bocor.
4. Latih IndoBERT membedakan kedua kelas. Gunakan data validasi untuk pengaturan model; simpan data uji untuk evaluasi akhir.
5. Ukur keberhasilan klasifikasi dan kesalahan menandai teks manusia sebagai AI.
6. Dalam rancangan pengembangan, bandingkan dengan metode sederhana **TF-IDF + SVM**, lalu uji **Temperature Scaling** untuk menyesuaikan skor keyakinan. Bandingkan kualitas skor sebelum dan sesudahnya.

**Yang masih perlu diputuskan:** jurnal, jumlah data, model pembuat abstrak AI, serta cakupan akhir pembandingan dan kalibrasi. Ringkasan ini menjelaskan arah penelitian, bukan menyatakan sistemnya sudah dibangun.

Rincian: [rancangan metode](rancangan-metode-data-dan-evaluasi.md) dan [fungsi sistem](fungsi-sistem-landasan-teoretis-deteksi-ai.md).
