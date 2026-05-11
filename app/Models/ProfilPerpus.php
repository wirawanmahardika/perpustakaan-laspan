<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class ProfilPerpus extends Model
{
    protected $table = 'profil_perpus';

    // Menggunakan guarded empty agar semua kolom bisa diisi (mass assignment)
    protected $guarded = ['id']; 

    // Jika ingin tetap menggunakan fillable, pastikan semua kolom masuk:
    // protected $fillable = ['nama_perpus', 'npp', 'desa_kelurahan', 'kecamatan', ...];

    /**
     * Cast kolom JSON agar otomatis menjadi array saat diakses di PHP
     */
    protected $casts = [
        'mata_pencaharian_utama' => 'array',
    ];

    // --- RELASI ---

    // public function statistik(): HasMany
    // {
    //     return $this->hasMany(StatistikPerpus::class, 'profil_perpus_id');
    // }

    // public function tataKelola(): HasMany
    // {
    //     return $this->hasMany(TataKelolaPerpus::class, 'profil_perpus_id');
    // }

    // public function kegiatan(): HasMany
    // {
    //     return $this->hasMany(KegiatanPerpus::class, 'profil_perpus_id');
    // }

    // public function tenaga(): HasMany
    // {
    //     return $this->hasMany(TenagaPerpus::class, 'profil_perpus_id');
    // }

    // /**
    //  * Relasi ke tabel bukti_dokumen menggunakan Polymorphic
    //  */
    // public function buktiDokumen(): MorphMany
    // {
    //     return $this->morphMany(BuktiDokumen::class, 'documentable');
    // }
}
