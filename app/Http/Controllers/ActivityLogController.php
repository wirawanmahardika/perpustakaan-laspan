<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class ActivityLogController extends Controller
{
    public function index()
    {
        $kegiatan = ActivityLog::orderBy('tanggal', 'desc')->get();
        return inertia('kegiatan/index', [
            'kegiatan' => $kegiatan
        ]);
    }

    public function readArtikel(int $id)
    {
        $activity = ActivityLog::where("id", "=", $id, null)->first();
        return inertia('kegiatan/read-artikel', [
            'activity' => $activity
        ]);
    }

    public function artikelEditor(int $id)
    {
        return inertia('kegiatan/artikel', [
            'kegiatan' => ActivityLog::find($id, "*")
        ]);
    }

    public function artikelUpdate(Request $request, int $id)
    {

        // 1. Validasi dengan pesan kustom (opsional)
        $request->validate([
            "artikel" => "required|string|min:10",
        ], [
            "artikel.required" => "Konten artikel tidak boleh kosong.",
            "artikel.min" => "Isi artikel terlalu pendek untuk standar akreditasi."
        ]);

        // 2. Update menggunakan method update() yang lebih ringkas
        $activity = ActivityLog::where("id", "=", $id, null)->update(['artikel' => $request->artikel]);

        // 3. Kembalikan Redirect (Standar Inertia)
        // back() akan memicu onSuccess di frontend dan memperbarui props data
        return redirect()->back()->with('message', 'Artikel berhasil diperbarui secara permanen.');
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
            'testimoni' => 'nullable|string',
            "artikel" => 'nullable|string'
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
