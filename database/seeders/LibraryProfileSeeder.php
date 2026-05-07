<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LibraryProfileSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('profil_perpus')->insert([
            'nama_perpus' => 'Perpustakaan Digital Mandiri',
            'alamat' => 'Jl. Sains Tekno No. 102, Jakarta Selatan',
            'kontak' => '(021) 555-0192',
            'deskripsi' => 'Pusat literasi modern yang menyediakan akses informasi digital dan fisik untuk masyarakat umum, berfokus pada pengembangan keterampilan teknologi dan sains.',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
