<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\PerpusProfileController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\SertifikatUserController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\YearlyStatController;
use Illuminate\Support\Facades\Route;


// Rute Publik Portal Resmi Desa
// Route::get('/activities', [PublicController::class, 'activities'])->name('public.activities');

Route::get('/', [PublicController::class, "index"])->name('home');
Route::get('/about', [PublicController::class, 'about'])->name('public.about');
Route::get('/aktivitas', [PublicController::class, 'aktivitas'])->name("aktivitas");
Route::get('/kontak', [PublicController::class, 'contact'])->name('public.contact');
Route::get('/dokumen', [PublicController::class, 'documents'])->name('public.documents');
Route::get('/kegiatan/{id}/read/artikel', [ActivityLogController::class, 'readArtikel'])->name('readArtikel');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, "index"])->name('admin.dashboard');
    Route::get('/users', [UserController::class, "index"])->name('admin.users');
    Route::post('/users', [UserController::class, 'store'])->name('admin.users.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('admin.users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('admin.users.destroy');

    Route::get('/users/{user}/sertifikat', [SertifikatUserController::class, 'createSertifikat'])->name('users.sertifikat.create');
    Route::post('/users/{user}/sertifikat', [SertifikatUserController::class, 'storeSertifikat'])->name('users.sertifikat.store');
    Route::delete('/sertifikat/{sertifikat}', [SertifikatUserController::class, 'destroySertifikat'])->name('sertifikat.destroy');

    Route::get('/profile/edit', [PerpusProfileController::class, "editView"])->name('admin.profile-edit');
    Route::put('/profile', [PerpusProfileController::class, "editProfile"])->name('admin.profile-edit-put');

    Route::get('/kegiatan', [ActivityLogController::class, 'index'])->name('admin.kegiatan');
    Route::get('/kegiatan/{id}/artikel', [ActivityLogController::class, 'artikelEditor'])->name('kegiatan.artikel-editor');
    Route::put('/kegiatan/{id}/artikel', [ActivityLogController::class, 'artikelUpdate'])->name('kegiatan.artikel-edit');
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
