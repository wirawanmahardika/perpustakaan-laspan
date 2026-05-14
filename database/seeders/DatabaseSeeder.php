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
        // 1. DATA USERS
        User::create([
            "name" => "Wirawan",
            "email" => "wirawanmahardika10@gmail.com",
            "password" => Hash::make("wirawan123"),
            "jabatan" => "Kepala Perpustakaan",
            "pendidikan_terakhir" => "S1 Perpustakaan",
            "role" => "admin",
            "kreativitas_karya" => "Penulis artikel literasi desa di media massa.",
        ]);

        User::create([
            "name" => "Petugas Perpus",
            "email" => "petugas@desa.id",
            "password" => Hash::make("petugas123"),
            "jabatan" => "Staf Layanan",
            "pendidikan_terakhir" => "SMA",
            "role" => "petugas",
        ]);

        // 2. PROFIL PERPUSTAKAAN
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
            'media_sosial' => [
                'instagram' => 'https://instagram.com/perpusdesa',
                'facebook' => 'https://facebook.com/perpusdesa',
                'website' => 'https://perpus.sukamaju.desa.id'
            ],
            'mata_pencaharian_utama' => ['Pertanian', 'Dagang']
        ]);

        // 3. STATISTIK TAHUNAN (3 Tahun Terakhir)
        foreach ([2023, 2024, 2025] as $index => $year) {
            YearlyStat::create([
                'tahun' => $year,
                'jumlah_koleksi' => 1200 + ($index * 250),
                'penambahan_koleksi' => 150 + ($index * 50),
                'jumlah_anggota' => 120 + ($index * 40),
                'jumlah_pengunjung' => 1500 + ($index * 450),
                'jumlah_peminjaman' => 800 + ($index * 200),
                'buku_dibaca' => 1100 + ($index * 300),
                'koleksi_fiksi' => 600 + ($index * 100),
                'koleksi_nonfiksi' => 500 + ($index * 100),
                'koleksi_digital' => 100 + ($index * 50),
                'analisis_minat_baca' => 'Peningkatan kunjungan sebesar ' . (15 + ($index * 5)) . '% didorong oleh program pojok baca digital dan variasi koleksi fiksi terbaru.'
            ]);
        }

        // 4. BANYAK ACTIVITY LOGS (Menyasar Instrumen Penilaian)
        $activities = [
            // Promosi (Dimensi 5)
            [
                'nama_kegiatan' => 'Sosialisasi Minat Baca ke PAUD & SD',
                'tanggal' => '2025-01-15',
                'tipe' => 'promosi',
                'deskripsi' => 'Pengenalan perpustakaan kepada anak usia dini melalui metode bercerita (Read Aloud).',
                'pihak_terlibat' => 'SDN 01 Sukamaju, PAUD Kasih Ibu',
                'testimoni' => 'Anak-anak sangat antusias mengikuti sesi bercerita.'
            ],
            [
                'nama_kegiatan' => 'Pemasangan Banner & Poster Literasi Desa',
                'tanggal' => '2025-02-10',
                'tipe' => 'promosi',
                'deskripsi' => 'Promosi layanan perpustakaan di area strategis kantor desa dan pasar desa.',
                'pihak_terlibat' => 'Perangkat Desa'
            ],
            // Kerjasama (Dimensi 5)
            [
                'nama_kegiatan' => 'Penandatanganan MoU dengan Sekolah Sekitar',
                'tanggal' => '2025-02-20',
                'tipe' => 'kerjasama',
                'deskripsi' => 'Kesepakatan bersama dalam pemanfaatan koleksi perpustakaan desa untuk siswa sekolah.',
                'pihak_terlibat' => 'SMPN 2 Cibeunying',
                'testimoni' => 'Memudahkan siswa mencari referensi tugas sekolah.'
            ],
            [
                'nama_kegiatan' => 'Kerjasama Layanan Perpustakaan Keliling',
                'tanggal' => '2025-03-05',
                'tipe' => 'kerjasama',
                'deskripsi' => 'Sinergi dengan Dinas Arpus Daerah untuk jadwal kunjungan mobil pusling bulanan.',
                'pihak_terlibat' => 'Dinas Arsip & Perpustakaan Daerah'
            ],
            // Pemberdayaan (Dimensi 8)
            [
                'nama_kegiatan' => 'Pelatihan Pembuatan Produk Olahan Hasil Tani',
                'tanggal' => '2025-03-12',
                'tipe' => 'pemberdayaan',
                'deskripsi' => 'Bimtek literasi terapan: Membaca panduan pengemasan produk untuk UMKM lokal.',
                'pihak_terlibat' => 'Kelompok Wanita Tani (KWT)',
                'testimoni' => 'Sangat membantu ibu-ibu dalam meningkatkan nilai jual produk.'
            ],
            [
                'nama_kegiatan' => 'Kelas Literasi Digital & Internet Sehat',
                'tanggal' => '2025-04-02',
                'tipe' => 'pemberdayaan',
                'deskripsi' => 'Pelatihan dasar komputer dan penggunaan internet untuk mencari informasi pertanian.',
                'pihak_terlibat' => 'Pemuda Karang Taruna'
            ],
            // Layanan Khusus (Dimensi 5)
            [
                'nama_kegiatan' => 'Layanan Kunjungan Home Visit Lansia',
                'tanggal' => '2025-04-18',
                'tipe' => 'layanan_khusus',
                'deskripsi' => 'Pengantaran buku ke rumah-rumah warga lansia yang kesulitan datang ke perpustakaan.',
                'pihak_terlibat' => 'Kader Posyandu Lansia'
            ],
            [
                'nama_kegiatan' => 'Pojok Baca Disabilitas',
                'tanggal' => '2025-05-01',
                'tipe' => 'layanan_khusus',
                'deskripsi' => 'Penyediaan ruang dan koleksi khusus untuk warga berkebutuhan khusus.',
                'pihak_terlibat' => 'Komunitas Peduli Inklusi'
            ],
            // Penghargaan (Dimensi 7)
            [
                'nama_kegiatan' => 'Perpustakaan Desa Terbaik Tingkat Kabupaten',
                'tanggal' => '2025-05-15',
                'tipe' => 'penghargaan',
                'deskripsi' => 'Menerima penghargaan juara 1 lomba perpustakaan desa atas inovasi layanan digital.',
                'pihak_terlibat' => 'Bupati/Pemerintah Kabupaten',
                'testimoni' => 'Bukti nyata kerja keras seluruh pengelola perpustakaan.'
            ],
        ];

        foreach ($activities as $act) {
            ActivityLog::create($act);
        }
    }
}
