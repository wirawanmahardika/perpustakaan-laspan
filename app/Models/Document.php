<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Document extends Model
{
    protected $fillable = ['file_path', 'keterangan', 'kategori'];

    // Accessor untuk mendapatkan URL lengkap file
    protected $appends = ['file_url'];

    public function getFileUrlAttribute()
    {
        return Storage::url($this->file_path);
    }
}
