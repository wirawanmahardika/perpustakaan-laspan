<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profil_perpus', function (Blueprint $table) {
            $table->id();
            $table->string('nama_perpus');
            $table->text('alamat'); // Pastikan ini 'alamat' sesuai error SQLite sebelumnya atau 'alamat_lengkap'
            $table->string('npp')->unique();
            $table->string('desa_kelurahan');
            $table->string('kecamatan');
            $table->string('kabupaten_kota');
            $table->string('provinsi');
            $table->string('media_sosial')->nullable();
            $table->string('telp')->nullable();
            $table->string('fax')->nullable();
            $table->string('email')->nullable();
            $table->year('tahun_berdiri');
            $table->string('nomor_sk_pendirian');
            $table->string('bulan_tahun_efektif');
            $table->string('nama_petugas');
            $table->string('nama_penanggung_jawab');
            $table->enum('sifat_bangunan', ['gabung', 'mandiri']);
            $table->integer('jumlah_anggota')->default(0);
            $table->decimal('luas_wilayah_km2', 10, 2);
            $table->integer('jumlah_penduduk');
            $table->decimal('jarak_ke_perpus_kab', 8, 2);
            $table->json('mata_pencaharian_utama');
            $table->timestamps();
        });

        Schema::create('kegiatan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('profil_perpus_id')->constrained('profil_perpus')->onDelete('cascade');
            $table->string('nama');
            $table->enum('jenis_kegiatan', ['layanan', 'promosi', 'inovasi', 'pemberdayaan', 'kerjasama']);
            $table->enum('sub_jenis_layanan', ['baca_ditempat', 'sirkulasi', 'referensi', 'literasi', 'membaca_cepat', 'berbasis_projek', 'ekstensi', 'ramah_anak_disabilitas', 'inklusif'])->nullable();
            $table->enum('media_promosi', ['papan_pengumuman', 'brosur', 'banner', 'poster', 'seminar', 'lomba', 'pameran', 'penyiaran', 'jumpa_penulis', 'medsos'])->nullable();
            $table->date('tanggal_pelaksanaan');
            $table->text('deskripsi');
            $table->string('pihak_kolaborasi')->nullable();
            $table->text('testimoni_masyarakat')->nullable();
            $table->timestamps();
        });

        Schema::create('laporan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kegiatan_id')->unique()->constrained('kegiatan')->onDelete('cascade');
            $table->timestamp('tanggal_buat');
            $table->text('isi_laporan');
            $table->enum('status', ['Draft', 'Selesai'])->default('Draft');
            $table->timestamps();
        });

        Schema::create('bukti_dokumen', function (Blueprint $table) {
            $table->id();
            $table->morphs('documentable');
            $table->string('label_bukti');
            $table->string('file_path');
            $table->enum('tipe_file', ['foto', 'video', 'pdf_scan', 'infografis']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        // Urutan hapus harus dari tabel anak ke induk
        Schema::dropIfExists('bukti_dokumen');
        Schema::dropIfExists('laporan');
        Schema::dropIfExists('kegiatan');
        Schema::dropIfExists('profil_perpus');
    }
};
