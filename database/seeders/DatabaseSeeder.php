<?php

namespace Database\Seeders;

use App\Models\ActivityLog;
use App\Models\Kegiatan;
use App\Models\Laporan;
use App\Models\ProfilPerpus;
use App\Models\User;
use App\Models\YearlyStat;
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
            'nama_perpustakaan' => 'Perpustakaan Desa Bina Ilmu',
            'npp' => '327301210001',
            'alamat' => 'Jl. Pendidikan No. 45',
            'desa_kelurahan' => 'Sukamaju',
            'kecamatan' => 'Cibeunying',
            'kabupaten_kota' => 'Bandung',
            'provinsi' => 'Jawa Barat',
            'kontak' => 'Email: perpus@sukamaju.desa.id',
            'tahun_berdiri' => 2020,
            'nomor_sk' => '411.1/SK-02/2020',
            'sifat_bangunan' => 'sendiri',
            'mata_pencaharian_utama' => ['Pertanian', 'Dagang']
        ]);

        // Data 3 Tahun Terakhir [cite: 55, 158]
        foreach ([2023, 2024, 2025] as $index => $year) {
            YearlyStat::create([
                'tahun' => $year,
                'jumlah_koleksi' => 1000 + ($index * 200),
                'penambahan_koleksi' => 200,
                'jumlah_anggota' => 100 + ($index * 50),
                'jumlah_pengunjung' => 1000 + ($index * 300),
                'jumlah_peminjaman' => 500 + ($index * 100),
            ]);
        }

        // Contoh Log Kegiatan [cite: 96, 163]
        ActivityLog::create([
            'nama_kegiatan' => 'Bimtek Literasi Masyarakat',
            'tanggal' => now(),
            'tipe' => 'pemberdayaan',
            'deskripsi' => 'Pelatihan keterampilan masyarakat berbasis literasi.'
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
