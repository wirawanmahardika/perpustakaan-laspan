<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Document;
use App\Models\YearlyStat;
use App\Models\ProfilPerpus;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Mengambil data statistik tahun terbaru
        $latestStat = YearlyStat::orderBy('tahun', 'desc')->first();

        // Mengecek kelengkapan profil (syarat minimal akreditasi)
        // Profil dianggap lengkap jika sudah ada record dan kolom mandatory terisi
        $profile = ProfilPerpus::first("*");
        $isProfileComplete = $profile && $profile->nama_perpustakaan && $profile->npp;

        return Inertia::render('dashboard', [
            'stats' => [
                'total_kegiatan'  => ActivityLog::count("*"),
                'total_dokumen'   => Document::count("*"),
                'total_koleksi'   => $latestStat->jumlah_koleksi ?? 0,
                'total_pengunjung' => $latestStat->jumlah_pengunjung ?? 0,
                'total_anggota'   => $latestStat->jumlah_anggota ?? 0,
                'koleksi_digital' => $latestStat->koleksi_digital ?? 0,
            ],
            // Mengambil 5 aktivitas terbaru untuk log di dashboard
            'activities' => ActivityLog::orderBy('tanggal', 'desc')
                ->take(5)
                ->get()
                ->map(function ($activity) {
                    return [
                        'id' => $activity->id,
                        'nama_kegiatan' => $activity->nama_kegiatan,
                        'tanggal' => $activity->tanggal->format('d M Y'), // Format tanggal untuk frontend
                        'tipe' => strtoupper($activity->tipe),
                    ];
                }),
            'profile_status' => (bool)$isProfileComplete,
        ]);
    }
}
