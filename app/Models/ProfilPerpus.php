<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProfilPerpus extends Model
{
    protected $table = 'profil_perpus';
    protected $fillable = ['nama_perpus', 'alamat', 'kontak', 'deskripsi'];

    public function kegiatans(): HasMany
    {
        return $this->hasMany(Kegiatan::class);
    }
}
