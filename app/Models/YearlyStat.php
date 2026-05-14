<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class YearlyStat extends Model
{
    protected $table = 'yearly_stats';

    protected $fillable = [
        'tahun',
        'jumlah_koleksi',
        'penambahan_koleksi',
        'jumlah_anggota',
        'jumlah_pengunjung',
        'jumlah_peminjaman',
        'buku_dibaca',
        'koleksi_fiksi',
        'koleksi_nonfiksi',
        'koleksi_digital',
        'analisis_minat_baca'
    ];

    // Mengurutkan secara otomatis berdasarkan tahun terbaru
    protected static function booted()
    {
        static::addGlobalScope('order_by_year', function ($builder) {
            $builder->orderBy('tahun', 'desc');
        });
    }
}
