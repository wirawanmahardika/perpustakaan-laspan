<?php

namespace Database\Seeders;

use App\Models\ActivityLog;
use App\Models\ProfilPerpus;
use App\Models\User;
use App\Models\YearlyStat;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            "name" => "Wirawan",
            "email" => "wirawanmahardika10@gmail.com",
            "password" => Hash::make("wirawan123"), // Menggunakan Hash::make lebih disarankan di Laravel terbaru

            // Kolom tambahan sesuai kebutuhan instrumen penilaian
            "jabatan" => "Kepala Perpustakaan",
            "pendidikan_terakhir" => "S1 Perpustakaan", // Contoh kualifikasi (Dimensi 4)
            "role" => "admin", // Memberikan akses penuh untuk monitoring user lain
            "kreativitas_karya" => "Penulis artikel literasi desa di media massa.",

            // sertifikat_kompetensi_path dibiarkan null atau diisi default
            "sertifikat_kompetensi_path" => null,
        ]);

        // Contoh menambahkan satu akun petugas untuk simulasi monitoring
        User::create([
            "name" => "Petugas Perpus",
            "email" => "petugas@desa.id",
            "password" => Hash::make("petugas123"),
            "jabatan" => "Staf Layanan",
            "pendidikan_terakhir" => "SMA",
            "role" => "petugas",
            "sertifikat_kompetensi_path" => null,
        ]);

        // $profil = ProfilPerpus::create([
        ProfilPerpus::create([
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
        // $kegiatan = Kegiatan::create([
        //     'profil_perpus_id' => $profil->id,
        //     'nama' => 'Pelatihan Komputer Dasar',
        //     'jenis_kegiatan' => 'layanan',
        //     'sub_jenis_layanan' => 'literasi',
        //     'tanggal_pelaksanaan' => Carbon::now()->subDays(5),
        //     'deskripsi' => 'Pelatihan untuk remaja desa agar melek teknologi.',
        //     'pihak_kolaborasi' => 'Karang Taruna',
        // ]);

        // // 3. Seed Laporan
        // Laporan::create([
        //     'kegiatan_id' => $kegiatan->id,
        //     'tanggal_buat' => Carbon::now(),
        //     'isi_laporan' => 'Kegiatan berjalan lancar, dihadiri oleh 20 peserta.',
        //     'status' => 'Selesai',
        // ]);
    }
}
