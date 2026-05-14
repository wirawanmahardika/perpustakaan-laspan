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
        return Inertia::render('dashboard', [
            'stats' => [
                'total_kegiatan' => ActivityLog::count("*"),
                'total_dokumen'  => Document::count("*"),
                'total_koleksi'  => YearlyStat::orderBy('tahun', 'desc')->value('jumlah_koleksi') ?? 0,
            ],
            'activities' => ActivityLog::orderBy('tanggal', 'desc')->take(5)->get(),
            'profile_status' => ProfilPerpus::exists(),
        ]);
    }
}
