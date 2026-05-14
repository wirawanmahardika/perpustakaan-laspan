<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfilPerpus extends Model
{
    protected $table = 'profil_perpus';

    protected $fillable = [
        'nama_perpustakaan',
        'npp',
        'alamat',
        'desa_kelurahan',
        'kecamatan',
        'kabupaten_kota',
        'provinsi',
        'kontak',
        'tahun_berdiri',
        'nomor_sk',
        'tanggal_operasi_efektif',
        'nama_petugas',
        'nama_penanggung_jawab',
        'sifat_bangunan',
        'luas_wilayah',
        'jumlah_penduduk',
        'jarak_ke_kabkota',
        'mata_pencaharian_utama'
    ];

    protected $casts = [
        'mata_pencaharian_utama' => 'array', // Otomatis konversi JSON ke Array
        'tanggal_operasi_efektif' => 'date',
    ];

    /**
     * Mendapatkan data profil tunggal.
     */
    public static function getSingleton()
    {
        return self::firstOrCreate(['id' => 1], [
            'nama_perpustakaan' => 'Perpustakaan Desa Default'
        ]);
    }
}
