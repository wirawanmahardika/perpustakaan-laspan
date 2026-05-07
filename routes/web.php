<?php

use App\Models\Kegiatan;
use App\Models\Laporan;
use App\Models\ProfilPerpus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
    'profile' => ProfilPerpus::first("*"),
    'activities' => Kegiatan::latest("updated_at")->with("laporan")->get()
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
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


    Route::put('/profile', function (Request $request) {
        $request->validate([
            'nama_perpus' => 'required|string|max:255',
            'alamat'      => 'required|string',
            'kontak'      => 'required|string',
            'deskripsi'   => 'nullable|string',
        ]);


        // Mengambil data pertama
        $profilePerpus = ProfilPerpus::first("*");

        // Mengisi properti satu per satu sesuai permintaan Anda
        $profilePerpus->nama_perpus = $request->nama_perpus;
        $profilePerpus->alamat      = $request->alamat;
        $profilePerpus->kontak      = $request->kontak;
        $profilePerpus->deskripsi   = $request->deskripsi;

        // Simpan perubahan ke database
        $profilePerpus->save();

        return back()->with('message', 'Profil berhasil diperbarui');
    })->name('admin.profile-edit-put');



    Route::get('/kegiatan', function () {
        return inertia('kegiatan/index', [
            // Mengambil semua kegiatan dengan relasi laporan
            'kegiatan' => Kegiatan::with('laporan')
                ->latest()
                ->get()
        ]);
    })->name('admin.kegiatan');

    Route::post('/kegiatan', function (Request $request) {
        $request->validate([
            'nama_kegiatan'     => 'required|string|max:255',
            'tanggal_kegiatan'  => 'required|date',
            'lokasi'            => 'required|string|max:255',
            'deskripsi_kegiatan' => 'required|string',
        ]);

        // Ambil profil perpus (asumsi hanya ada satu profil)
        $profil = ProfilPerpus::first("*");

        $kegiatan = new Kegiatan();
        $kegiatan->profil_perpus_id = $profil->id;
        $kegiatan->nama_kegiatan    = $request->nama_kegiatan;
        $kegiatan->tanggal_kegiatan = $request->tanggal_kegiatan;
        $kegiatan->lokasi           = $request->lokasi;
        $kegiatan->deskripsi_kegiatan = $request->deskripsi_kegiatan;
        $kegiatan->save();

        return back()->with('message', 'Agenda berhasil ditambahkan');
    })->name('admin.kegiatan.store');

    Route::delete('/kegiatan/{kegiatan}', function (Kegiatan $kegiatan) {
        $kegiatan->delete(null);
        return back();
    })->name('admin.kegiatan.destroy');

    Route::get('/laporan/create/{kegiatan}', function (Kegiatan $kegiatan) {
        return inertia('laporan/edit', [
            'kegiatan' => $kegiatan,
            'laporan' => null // Karena ini laporan baru
        ]);
    })->name('admin.laporan-create');

    Route::get('/laporan/edit/{laporan}', function (Laporan $laporan) {
        return inertia('laporan/edit', [
            'kegiatan' => $laporan->kegiatan,
            'laporan' => $laporan
        ]);
    })->name('admin.laporan-edit');

    Route::match(['post', 'put'], '/laporan/{id?}', function (Request $request, $id = null) {
        $request->validate([
            'kegiatan_id' => 'required|exists:kegiatan,id',
            'isi_laporan' => 'required|string',
            'status'      => 'required|in:Draft,Selesai',
        ]);

        // Jika ada ID, ambil data lama. Jika tidak, buat instance baru.
        if ($id) {
            $laporan = Laporan::findOrFail($id);
        } else {
            $laporan = new Laporan();
            $laporan->kegiatan_id = $request->kegiatan_id;
            $laporan->tanggal_buat = now(); // Set tanggal buat hanya saat baru
        }

        // Update properti
        $laporan->isi_laporan = $request->isi_laporan;
        $laporan->status      = $request->status;
        $laporan->save();

        return back()->with('message', 'Laporan berhasil disimpan!');
    })->name('admin.laporan-store-or-update');
});

require __DIR__ . '/settings.php';
