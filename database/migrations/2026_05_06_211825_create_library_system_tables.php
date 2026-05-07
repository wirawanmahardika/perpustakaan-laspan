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
        Schema::create('profil_perpus', function (Blueprint $table) {
            $table->id();
            $table->string('nama_perpus');
            $table->text('alamat');
            $table->string('kontak');
            $table->text('deskripsi')->nullable();
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
