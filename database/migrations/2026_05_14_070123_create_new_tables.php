<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profil_perpus', function (Blueprint $table) {
            $table->id();
            $table->string('nama_perpustakaan');
            $table->string('npp')->nullable();
            $table->string('alamat');
            $table->string('desa_kelurahan');
            $table->string('kecamatan');
            $table->string('kabupaten_kota');
            $table->string('provinsi');
            $table->string('kontak');
            $table->year('tahun_berdiri');
            $table->string('nomor_sk');
            $table->date('tanggal_operasi_efektif')->nullable();
            $table->string('nama_petugas')->nullable();
            $table->string('nama_penanggung_jawab')->nullable();
            $table->enum('sifat_bangunan', ['gabung', 'sendiri']);


            $table->decimal('luas_wilayah', 12, 2)->nullable();
            $table->integer('jumlah_penduduk')->nullable();
            $table->decimal('jarak_ke_kabkota', 8, 2)->nullable();
            $table->json('mata_pencaharian_utama')->nullable();
            $table->timestamps();
        });


        Schema::create('yearly_stats', function (Blueprint $table) {
            $table->id();
            $table->year('tahun');
            $table->integer('jumlah_koleksi')->default(0);
            $table->integer('penambahan_koleksi')->default(0);
            $table->integer('jumlah_anggota')->default(0);
            $table->integer('jumlah_pengunjung')->default(0);
            $table->integer('jumlah_peminjaman')->default(0);
            $table->integer('buku_dibaca')->default(0);
            $table->timestamps();
        });


        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('file_path');
            $table->string('keterangan');
            $table->enum('kategori', [
                'koleksi',
                'sarpras',
                'layanan',
                'tenaga',
                'penyelenggaraan',
                'pengelolaan',
                'inovasi',
                'dampak'
            ]);
            $table->timestamps();
        });


        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->string('nama_kegiatan');
            $table->date('tanggal');
            $table->enum('tipe', [
                'promosi',
                'kerjasama',
                'pemberdayaan',
                'layanan_khusus'
            ]);
            $table->text('deskripsi');
            $table->string('pihak_terlibat')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
        Schema::dropIfExists('documents');
        Schema::dropIfExists('yearly_stats');
        Schema::dropIfExists('profil_perpus');
    }
};
