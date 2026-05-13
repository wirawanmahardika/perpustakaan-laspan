<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\PerpusProfileController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PublicController::class, "welcomeView"])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, "dashboard"])->name('admin.dashboard');

    Route::get('/profile/edit', [PerpusProfileController::class, "editView"])->name('admin.profile-edit');
    Route::put('/profile', [PerpusProfileController::class, "editProfile"])->name('admin.profile-edit-put');

    Route::get('/kegiatan', [KegiatanController::class, "kegiatanView"])->name('admin.kegiatan');
    Route::match(["post", "put"], '/kegiatan/{id?}', [KegiatanController::class, "tambahDanEditKegiatan"])->name('admin.kegiatan.store-or-update');
    Route::delete('/kegiatan/{kegiatan}', [KegiatanController::class, "deleteKegiatan"])->name('admin.kegiatan.destroy');

    Route::get('/laporan/create/{kegiatan}', [LaporanController::class, "laporanCreateView"])->name('admin.laporan-create');
    Route::get('/laporan/edit/{laporan}', [LaporanController::class, "laporanEditView"])->name('admin.laporan-edit');
    Route::match(['post', 'put'], '/laporan/{id?}', [LaporanController::class, "tambahAtauEditLaporan"])->name('admin.laporan-store-or-update');
});

require __DIR__ . '/settings.php';
