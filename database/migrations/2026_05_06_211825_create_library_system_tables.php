<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // database/migrations/xxxx_xx_xx_create_library_system_tables.php

    public function up(): void
    {
        // Tabel Profil Perpus
        // Schema::create('profil_perpus', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('nama_perpus');
        //     $table->text('alamat');
        //     $table->string('kontak');
        //     $table->text('deskripsi')->nullable();
        //     $table->timestamps();
        // });

        Schema::create('profil_perpus', function (Blueprint $table) {
            $table->id();
            $table->string('nama_perpus'); // [cite: 13]
            $table->text('alamat'); // [cite: 19]
            $table->string('npp')->unique(); // [cite: 14]
            $table->string('desa_kelurahan'); // [cite: 15]
            $table->string('kecamatan'); // [cite: 16]
            $table->string('kabupaten_kota'); // [cite: 17]
            $table->string('provinsi'); // [cite: 18]
            $table->string('media_sosial')->nullable(); // Web/Blog/FB/IG [cite: 21]
            $table->string('telp')->nullable(); // [cite: 22]
            $table->string('fax')->nullable(); // [cite: 24]
            $table->string('email')->nullable(); // [cite: 25]
            $table->year('tahun_berdiri'); // [cite: 26]
            $table->string('nomor_sk_pendirian'); // [cite: 27]
            $table->string('bulan_tahun_efektif'); // [cite: 29]
            $table->string('nama_petugas'); // [cite: 30]
            $table->string('nama_penanggung_jawab'); // [cite: 32]
            $table->enum('sifat_bangunan', ['gabung', 'mandiri']); // [cite: 34, 35, 36]
            $table->integer('jumlah_anggota'); // [cite: 37]
            $table->decimal('luas_wilayah_km2', 10, 2); // [cite: 39]
            $table->integer('jumlah_penduduk'); // [cite: 40]
            $table->decimal('jarak_ke_perpus_kab', 8, 2); // [cite: 41]
            $table->json('mata_pencaharian_utama'); // Max 5 [cite: 42, 43]
            $table->timestamps();
        });

        // Tabel Kegiatan
        Schema::create('kegiatan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('profil_perpus_id')->constrained('profil_perpus')->onDelete('cascade');
            $table->string('nama_kegiatan');
            $table->date('tanggal_kegiatan');
            $table->string('lokasi');
            $table->text('deskripsi_kegiatan');
            $table->timestamps();
        });

        // Tabel Laporan
        Schema::create('laporan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kegiatan_id')->unique()->constrained('kegiatan')->onDelete('cascade');
            $table->timestamp('tanggal_buat');
            $table->text('isi_laporan');
            $table->enum('status', ['Draft', 'Selesai'])->default('Draft');
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profil_perpus');
        Schema::dropIfExists('kegiatan');
        Schema::dropIfExists('laporan');
    }
};
