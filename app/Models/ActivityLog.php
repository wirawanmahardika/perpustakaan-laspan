<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    protected $table = 'activity_logs';

    protected $fillable = [
        'nama_kegiatan',
        'tanggal',
        'tipe',
        'deskripsi',
        'pihak_terlibat',
        "testimoni",
        'artikel'
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];
}
