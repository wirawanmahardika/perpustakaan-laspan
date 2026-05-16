<?php

namespace App\Http\Controllers;


use App\Models\User;
use App\Models\SertifikatUser;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class SertifikatUserController extends Controller
{
    public function createSertifikat(User $user)
    {
        $user->load('sertifikats');
        return Inertia::render('users/sertifikat-create', [
            'user' => $user
        ]);
    }

    public function storeSertifikat(Request $request, User $user)
    {
        $request->validate([
            'sertifikat_baru' => 'required|array|min:1',
            'sertifikat_baru.*.nama_sertifikat' => 'required|string|max:255',
            'sertifikat_baru.*.penerbit' => 'required|string|max:255',
            'sertifikat_baru.*.tahun_terbit' => 'required|integer|min:1900|max:' . date('Y'),
            'sertifikat_baru.*.file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        foreach ($request->file('sertifikat_baru') as $index => $fileData) {
            if (isset($fileData['file'])) {
                $path = $fileData['file']->storePublicly('sertifikats');
                $textData = $request->input("sertifikat_baru.{$index}");
                $user->sertifikats()->create([
                    'nama_sertifikat' => $textData['nama_sertifikat'],
                    'penerbit'        => $textData['penerbit'],
                    'tahun_terbit'    => $textData['tahun_terbit'],
                    'file_path'       => $path,
                ]);
            }
        }

        return Redirect::back()->with('message', 'Seluruh berkas sertifikat baru berhasil diunggah ke S3.');
    }

    public function destroySertifikat(SertifikatUser $sertifikat)
    {
        if (Storage::exists($sertifikat->file_path)) {
            Storage::delete($sertifikat->file_path);
        }
        $sertifikat->delete(null);
        return Redirect::back()->with('message', 'Sertifikat berhasil dihapus dari riwayat.');
    }
}
