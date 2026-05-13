<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Facades\Storage;

class BuktiDokumen extends Model
{
    protected $table = 'bukti_dokumen';
    protected $appends = ['file_url'];

    /**
     * Kolom yang dapat diisi secara massal.
     */
    protected $fillable = [
        'documentable_id',
        'documentable_type',
        'label_bukti',
        'file_path',
        'tipe_file',
    ];

    /**
     * Relasi Polymorphic.
     * Mengambil model pemilik (Kegiatan, ProfilPerpus, dll).
     */
    public function documentable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Aksesor untuk mendapatkan URL lengkap file.
     * Memudahkan saat memanggil di frontend: $dokumen->file_url
     */
    public function getFileUrlAttribute(): string
    {
        $data = Storage::url($this->file_path);
        return $data;
    }
}
