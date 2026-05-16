<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class SertifikatUser extends Model
{
    use HasFactory;

    /**
     * Nama tabel yang terkait dengan model.
     *
     * @var string
     */
    protected $table = 'sertifikat_users';
    protected $appends = ['file_url'];

    /**
     * Atribut yang dapat diisi secara massal (mass assignable).
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'nama_sertifikat',
        'penerbit',
        'tahun_terbit',
        'file_path',
    ];

    /**
     * Mendapatkan data user/petugas pemilik sertifikat ini.
     * (Relasi Many-to-One / Inverse HasMany)
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }


    /**
     * Accessor untuk menghasilkan URL S3 secara dinamis saat data dipanggil
     */
    public function getFileUrlAttribute()
    {
        // Menghasilkan URL langsung dari path relatif yang ada di database
        return Storage::url($this->file_path);
    }
}
