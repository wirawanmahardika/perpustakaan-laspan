<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class ActivityLogController extends Controller
{

    public function index()
    {
        // Mengambil semua kegiatan, diurutkan dari yang terbaru
        $kegiatan = ActivityLog::orderBy('tanggal', 'desc')->get();

        return inertia('kegiatan/index', [
            'kegiatan' => $kegiatan
        ]);
    }
    /**
     * Menyimpan kegiatan baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_kegiatan'  => 'required|string|max:255',
            'tanggal'        => 'required|date',
            'tipe'           => 'required|in:promosi,kerjasama,pemberdayaan,layanan_khusus,penghargaan',
            'deskripsi'      => 'required|string',
            'pihak_terlibat' => 'nullable|string|max:255',
            'testimoni' => 'nullable|string'
        ]);

        ActivityLog::create($validated);

        return Redirect::back()->with('message', 'Kegiatan berhasil ditambahkan');
    }

    /**
     * Memperbarui data kegiatan
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama_kegiatan'  => 'required|string|max:255',
            'tanggal'        => 'required|date',
            'tipe'           => 'required|in:promosi,kerjasama,pemberdayaan,layanan_khusus,penghargaan',
            'deskripsi'      => 'required|string',
            'pihak_terlibat' => 'nullable|string|max:255',
            'testimoni' => 'nullable|string'
        ]);

        $kegiatan = ActivityLog::findOrFail($id);
        $kegiatan->update($validated);

        return Redirect::back()->with('message', 'Kegiatan berhasil diperbarui');
    }

    /**
     * Menghapus kegiatan
     */
    public function destroy($id)
    {
        $kegiatan = ActivityLog::findOrFail($id);
        $kegiatan->delete();

        return Redirect::back()->with('message', 'Kegiatan berhasil dihapus');
    }
}
