<?php

namespace App\Http\Controllers;

use App\Models\ProfilPerpus;
use Illuminate\Http\Request;

class PerpusProfileController extends Controller
{
    function editView()
    {
        return inertia('profile/edit', [
            'profile' => ProfilPerpus::first("*")
        ]);
    }

    function editProfile(Request $request)
    {
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
    }
}
