<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kegiatan;
use App\Models\Laporan;

class LaporanSeeder extends Seeder
{
    public function run(): void
    {
        // Mengambil kegiatan yang sudah lewat untuk dibuatkan laporan
        $kegiatanLampau = Kegiatan::take(2)->get();

        foreach ($kegiatanLampau as $kegiatan) {
            Laporan::create([
                'kegiatan_id' => $kegiatan->id,
                'tanggal_buat' => now(),
                'isi_laporan' => "Laporan pelaksanaan kegiatan {$kegiatan->nama_kegiatan}. Kegiatan dihadiri oleh sekitar 50 peserta dengan tingkat kepuasan tinggi.",
                'status' => 'Selesai',
            ]);
        }
    }
}
