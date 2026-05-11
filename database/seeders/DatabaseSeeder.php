<?php

namespace Database\Seeders;

use App\Models\Kegiatan;
use App\Models\Laporan;
use App\Models\ProfilPerpus;
use App\Models\User;
use Carbon\Carbon;
use Database\Seeders\LibraryProfileSeeder;
use Database\Seeders\KegiatanSeeder;
use Database\Seeders\LaporanSeeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            "name" => "wirawan",
            "email" => "wirawanmahardika10@gmail.com",
            "password" => bcrypt("wirawan123"),
        ]);

        $profil = ProfilPerpus::create([
            'nama_perpus' => 'Perpustakaan Desa Cerdas',
            'alamat' => 'Jl. Pendidikan No. 123',
            'npp' => '3271012345678',
            'desa_kelurahan' => 'Sukamaju',
            'kecamatan' => 'Cibeunying',
            'kabupaten_kota' => 'Bandung',
            'provinsi' => 'Jawa Barat',
            'tahun_berdiri' => 2020,
            'nomor_sk_pendirian' => 'SK/2020/001',
            'bulan_tahun_efektif' => 'Januari 2020',
            'nama_petugas' => 'Budi Santoso',
            'nama_penanggung_jawab' => 'Siti Aminah',
            'sifat_bangunan' => 'mandiri',
            'jumlah_anggota' => 150,
            'luas_wilayah_km2' => 5.5,
            'jumlah_penduduk' => 2500,
            'jarak_ke_perpus_kab' => 12.5,
            'mata_pencaharian_utama' => ['Petani', 'Buruh', 'Pedagang'],
        ]);

        // 2. Seed Kegiatan
        $kegiatan = Kegiatan::create([
            'profil_perpus_id' => $profil->id,
            'nama' => 'Pelatihan Komputer Dasar',
            'jenis_kegiatan' => 'layanan',
            'sub_jenis_layanan' => 'literasi',
            'tanggal_pelaksanaan' => Carbon::now()->subDays(5),
            'deskripsi' => 'Pelatihan untuk remaja desa agar melek teknologi.',
            'pihak_kolaborasi' => 'Karang Taruna',
        ]);

        // 3. Seed Laporan
        Laporan::create([
            'kegiatan_id' => $kegiatan->id,
            'tanggal_buat' => Carbon::now(),
            'isi_laporan' => 'Kegiatan berjalan lancar, dihadiri oleh 20 peserta.',
            'status' => 'Selesai',
        ]);
    }
}
