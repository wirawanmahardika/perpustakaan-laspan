<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\ProfilPerpus;
use Illuminate\Http\Request;

class KegiatanController extends Controller
{
    function kegiatanView()
    {
        return inertia('kegiatan/index', [
            // Mengambil semua kegiatan dengan relasi laporan
            'kegiatan' => Kegiatan::with('laporan')
                ->latest()
                ->get()
        ]);
    }


    function tambahDanEditKegiatan(Request $request,  $id = null)
    {
        $request->validate([
            'nama_kegiatan'     => 'required|string|max:255',
            'tanggal_kegiatan'  => 'required|date',
            'lokasi'            => 'required|string|max:255',
            'deskripsi_kegiatan' => 'required|string',
        ]);

        if ($id) {
            $kegiatan = Kegiatan::findOrFail($id);
        } else {
            $profil = ProfilPerpus::first("*");
            $kegiatan = new Kegiatan();
            $kegiatan->profil_perpus_id = $profil->id;
        }

        $kegiatan->nama_kegiatan    = $request->nama_kegiatan;
        $kegiatan->tanggal_kegiatan = $request->tanggal_kegiatan;
        $kegiatan->lokasi           = $request->lokasi;
        $kegiatan->deskripsi_kegiatan = $request->deskripsi_kegiatan;
        $kegiatan->save();

        return back()->with('message', 'Agenda berhasil ditambahkan');
    }

    function deleteKegiatan(Kegiatan $kegiatan)
    {
        $kegiatan->delete(null);
        return back();
    }
}
