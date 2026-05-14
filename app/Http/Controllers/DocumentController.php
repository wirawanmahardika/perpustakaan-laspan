<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DocumentController extends Controller
{
    public function index()
    {
        return Inertia::render('dokumen/index', [
            'documents' => Document::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpg,jpeg,png,pdf|max:10240', // Max 10MB
            'kategori' => 'required|in:koleksi,sarpras,layanan,tenaga,penyelenggaraan,pengelolaan,inovasi,dampak',
            'keterangan' => 'required|string|max:255',
        ]);

        if ($request->hasFile('file')) {
            $path = $request->file('file')->storePublicly('documents/' . $request->kategori);

            Document::create([
                'file_path' => $path,
                'kategori' => $request->kategori,
                'keterangan' => $request->keterangan,
            ]);
        }

        return back()->with('message', 'Dokumen berhasil diunggah');
    }

    public function destroy(int $id)
    {
        $doc = Document::findOrFail($id);
        Storage::delete($doc->file_path);
        $doc->delete();

        return back()->with('message', 'Dokumen berhasil dihapus');
    }
}
