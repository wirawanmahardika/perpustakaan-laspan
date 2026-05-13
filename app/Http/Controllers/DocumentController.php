<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BuktiDokumen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'label_bukti'       => 'required|string|max:255',
            'tipe_file'         => 'required|in:foto,video,pdf_scan,infografis',
            'file'              => 'required|file|max:10240', // Maksimal 10MB
            'documentable_id'   => 'required|integer',
            'documentable_type' => 'required|string',
        ]);

        try {
            // 1. Proses Upload File
            $file = $request->file('file');
            // Simpan ke disk s3 (atau ganti ke 'public' jika lokal)
            $path = $file->storePublicly('dokumen-perpus');

            // 2. Simpan ke Database
            BuktiDokumen::create([
                'documentable_id'   => $request->documentable_id,
                'documentable_type' => $request->documentable_type,
                'label_bukti'       => $request->label_bukti,
                'tipe_file'         => $request->tipe_file,
                'file_path'         => $path, // Simpan path-nya saja
            ]);

            return back()->with('message', 'Dokumen berhasil diunggah!');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal mengunggah file: ' . $e->getMessage()]);
        }
    }

    public function destroy(int $id)
    {
        $dokumen = BuktiDokumen::findOrFail($id);
        Storage::delete($dokumen->file_path);
        $dokumen->delete();
        return back()->with('message', 'Dokumen berhasil dihapus.');
    }
}
