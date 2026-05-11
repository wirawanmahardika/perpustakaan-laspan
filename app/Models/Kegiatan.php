<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kegiatan extends Model
{
    protected $table = 'kegiatan';
    protected $guarded = [];

    protected $casts = [
        'tanggal_pelaksanaan' => 'date',
    ];

    public function profil()
    {
        return $this->belongsTo(ProfilPerpus::class, 'profil_perpus_id');
    }

    public function laporan()
    {
        return $this->hasOne(Laporan::class);
    }

    // public function buktiDokumen()
    // {
    //     return $this->morphMany(BuktiDokumen::class, 'documentable');
    // }
}
