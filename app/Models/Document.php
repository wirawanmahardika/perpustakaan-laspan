<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Document extends Model
{
    protected $fillable = ['file_path', 'keterangan', 'kategori'];

    protected $appends = ['file_url'];

    public function getFileUrlAttribute()
    {
        $data = Storage::url($this->file_path);
        return $data;
    }
}
