<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kegiatan;
use App\Models\ProfilPerpus;
use Faker\Factory as Faker;

class KegiatanSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        $profilId = ProfilPerpus::first("*")->id;

        $kegiatanData = [
            'Workshop Literasi Digital',
            'Bedah Buku Penulis Lokal',
            'Kelas Pemrograman Dasar',
            'Lomba Mewarnai Anak',
            'Seminar Keamanan Siber'
        ];

        foreach ($kegiatanData as $nama) {
            Kegiatan::create([
                'profil_perpus_id' => $profilId,
                'nama_kegiatan' => $nama,
                'tanggal_kegiatan' => $faker->dateTimeBetween('now', '+2 months'),
                'lokasi' => 'Ruang Utama Perpustakaan',
                'deskripsi_kegiatan' => $faker->paragraph(3),
            ]);
        }
    }
}
