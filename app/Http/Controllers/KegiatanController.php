<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\ProfilPerpus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class KegiatanController extends Controller
{
    function kegiatanView()
    {
        $kegiatanData =  Kegiatan::with(['laporan', 'buktiDokumen'])
            ->latest()
            ->get();

        return inertia('kegiatan/index', [
            // Mengambil semua kegiatan dengan relasi laporan
            'kegiatan' => $kegiatanData,
        ]);
    }


    public function tambahDanEditKegiatan(Request $request, $id = null)
    {
        $request->validate([
            'nama'                 => 'required|string|max:255',
            'jenis_kegiatan'       => 'required|in:layanan,promosi,inovasi,pemberdayaan,kerjasama',
            'sub_jenis_layanan'    => 'nullable|required_if:jenis_kegiatan,layanan|string',
            'media_promosi'        => 'nullable|required_if:jenis_kegiatan,promosi|string',
            'tanggal_pelaksanaan'  => 'required|date',
            'deskripsi'            => 'required|string',
            'pihak_kolaborasi'     => 'nullable|string|max:255',
            'testimoni_masyarakat' => 'nullable|string',
        ]);

        try {
            if ($id) {
                $kegiatan = Kegiatan::findOrFail($id);
            } else {
                // Mengambil ID profil perpus yang aktif
                $profil = ProfilPerpus::first("*");

                if (!$profil) {
                    return back()->withErrors(['error' => 'Data Profil Perpustakaan belum diatur.']);
                }

                $kegiatan = new Kegiatan();
                $kegiatan->profil_perpus_id = $profil->id;
            }

            // Pemetaan kolom sesuai migration terbaru
            $kegiatan->nama                 = $request->nama;
            $kegiatan->jenis_kegiatan       = $request->jenis_kegiatan;
            $kegiatan->sub_jenis_layanan    = $request->sub_jenis_layanan;
            $kegiatan->media_promosi        = $request->media_promosi;
            $kegiatan->tanggal_pelaksanaan  = $request->tanggal_pelaksanaan;
            $kegiatan->deskripsi            = $request->deskripsi;
            $kegiatan->pihak_kolaborasi     = $request->pihak_kolaborasi;
            $kegiatan->testimoni_masyarakat = $request->testimoni_masyarakat;

            $kegiatan->save();

            return back()->with('message', $id ? 'Kegiatan berhasil diperbarui' : 'Kegiatan berhasil ditambahkan');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    function deleteKegiatan(Kegiatan $kegiatan)
    {
        $kegiatan->delete(null);
        return back();
    }
}
