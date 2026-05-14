<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\PerpusProfileController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\YearlyStatController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PublicController::class, "welcomeView"])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, "dashboard"])->name('admin.dashboard');

    Route::get('/profile/edit', [PerpusProfileController::class, "editView"])->name('admin.profile-edit');
    Route::put('/profile', [PerpusProfileController::class, "editProfile"])->name('admin.profile-edit-put');

    // Route::get('/kegiatan', [KegiatanController::class, "kegiatanView"])->name('admin.kegiatan');
    // Route::match(["post", "put"], '/kegiatan/{id?}', [KegiatanController::class, "tambahDanEditKegiatan"])->name('admin.kegiatan.store-or-update');
    // Route::delete('/kegiatan/{kegiatan}', [KegiatanController::class, "deleteKegiatan"])->name('admin.kegiatan.destroy');

    Route::get('/laporan/create/{kegiatan}', [LaporanController::class, "laporanCreateView"])->name('admin.laporan-create');
    Route::get('/laporan/edit/{laporan}', [LaporanController::class, "laporanEditView"])->name('admin.laporan-edit');
    Route::match(['post', 'put'], '/laporan/{id?}', [LaporanController::class, "tambahAtauEditLaporan"])->name('admin.laporan-store-or-update');

    // Route::post('/dokumen', [DocumentController::class, 'store'])->name('admin.dokumen-store');
    // Route::delete('/dokumen/{id}', [DocumentController::class, 'destroy'])->name('admin.dokumen-destroy');

    Route::get('/kegiatan', [ActivityLogController::class, 'index'])->name('admin.kegiatan');
    Route::post('/kegiatan', [ActivityLogController::class, 'store'])->name('kegiatan.store');
    Route::put('/kegiatan/{id}', [ActivityLogController::class, 'update'])->name('kegiatan.update');
    Route::delete('/kegiatan/{id}', [ActivityLogController::class, 'destroy'])->name('kegiatan.destroy');

    Route::get('/documents', [DocumentController::class, 'index'])->name('documents.index');
    Route::post('/documents', [DocumentController::class, 'store'])->name('documents.store');
    Route::delete('/documents/{id}', [DocumentController::class, 'destroy'])->name('documents.destroy');

    Route::get('/stats', [YearlyStatController::class, 'index'])->name('stats.index');
    Route::post('/stats', [YearlyStatController::class, 'updateOrCreate'])->name('stats.store');
});

require __DIR__ . '/settings.php';
