<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfilPerpus extends Model
{
    protected $table = 'profil_perpus';

    /**
     * Properti yang dapat diisi (Mass Assignment).
     * Kolom 'media_sosial' telah ditambahkan.
     */
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
        'media_sosial', // Ditambahkan sesuai schema terbaru
        'luas_wilayah',
        'jumlah_penduduk',
        'jarak_ke_kabkota',
        'mata_pencaharian_utama',
    ];

    /**
     * Casting atribut ke tipe data asli.
     * media_sosial dicast ke array agar bisa menampung struktur JSON 
     * seperti ['facebook' => '...', 'instagram' => '...']
     */
    protected $casts = [
        'media_sosial' => 'array',            // Otomatis konversi JSON ke Array
        'mata_pencaharian_utama' => 'array',  // Otomatis konversi JSON ke Array
        'tanggal_operasi_efektif' => 'date',
        'luas_wilayah' => 'float',
        'jarak_ke_kabkota' => 'float',
        'jumlah_penduduk' => 'integer',
    ];

    /**
     * Mendapatkan data profil tunggal.
     * Karena sistem hanya untuk satu perpustakaan (Singleton),
     * method ini menjamin hanya ada satu record di database.
     */
    public static function getSingleton()
    {
        return self::firstOrCreate(
            ['id' => 1],
            [
                'nama_perpustakaan' => 'Perpustakaan Desa',
                'media_sosial' => [
                    'facebook' => '',
                    'instagram' => '',
                    'twitter' => '',
                    'website' => ''
                ],
                'mata_pencaharian_utama' => []
            ]
        );
    }
}
