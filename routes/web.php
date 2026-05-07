<?php

use App\Models\Kegiatan;
use App\Models\Laporan;
use App\Models\ProfilPerpus;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
    'profile' => ProfilPerpus::first("*"),
    'activities' => Kegiatan::latest("updated_at")->take(3)->get()
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Di web.php atau DashboardController
    Route::get('/dashboard', function () {
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
    })->name('admin.dashboard');

    Route::get('/profile/edit', function () {
        return inertia('profile/edit', [
            'profile' => ProfilPerpus::first("*")
        ]);
    })->name('admin.profile-edit');

    // // web.php atau KegiatanController
    Route::get('/kegiatan', function () {
        return inertia('kegiatan/index', [
            // Mengambil semua kegiatan dengan relasi laporan
            'kegiatan' => Kegiatan::with('laporan')
                ->latest()
                ->get()
        ]);
    })->name('admin.kegiatan');


    // Rute untuk membuat laporan baru (mengambil data kegiatan berdasarkan ID di URL)
    Route::get('/laporan/create/{kegiatan}', function (Kegiatan $kegiatan) {
        return inertia('laporan/edit', [
            'kegiatan' => $kegiatan,
            'laporan' => null // Karena ini laporan baru
        ]);
    })->name('admin.laporan-create');

    // Rute untuk mengedit laporan yang sudah ada
    Route::get('/laporan/edit/{laporan}', function (Laporan $laporan) {
        return inertia('laporan/edit', [
            'kegiatan' => $laporan->kegiatan,
            'laporan' => $laporan
        ]);
    })->name('admin.laporan-edit');
});

require __DIR__ . '/settings.php';
