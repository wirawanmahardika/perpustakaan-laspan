<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\Laporan;

class DashboardController extends Controller
{
    function dashboard()
    {
        return inertia('dashboard', [
            'stats' => [
                'total_kegiatan' => Kegiatan::count("*"),
                'laporan_selesai' => Laporan::where('status', "=", 'Selesai', "")->count("*"),
                'laporan_draft' => Laporan::where('status', "=", 'Draft', "")->count("*"),
            ],
            'activities' => Kegiatan::with('laporan')
                ->latest('updated_at')
                ->take(5)
                ->get()
        ]);
    }
}
