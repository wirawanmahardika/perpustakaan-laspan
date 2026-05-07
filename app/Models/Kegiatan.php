<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Kegiatan extends Model
{
    protected $table = 'kegiatan';
    protected $fillable = ['profil_perpus_id', 'nama_kegiatan', 'tanggal_kegiatan', 'lokasi', 'deskripsi_kegiatan'];

    public function profil(): BelongsTo
    {
        return $this->belongsTo(ProfilPerpus::class, 'profil_perpus_id');
    }

    public function laporan(): HasOne
    {
        return $this->hasOne(Laporan::class);
    }
}
