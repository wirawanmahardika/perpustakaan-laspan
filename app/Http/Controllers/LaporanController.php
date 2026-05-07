<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\Laporan;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
    function laporanCreateView(Kegiatan $kegiatan)
    {
        return inertia('laporan/edit', [
            'kegiatan' => $kegiatan,
            'laporan' => null // Karena ini laporan baru
        ]);
    }

    function laporanEditView(Laporan $laporan)
    {
        return inertia('laporan/edit', [
            'kegiatan' => $laporan->kegiatan,
            'laporan' => $laporan
        ]);
    }

    function tambahAtauEditLaporan(Request $request, $id = null)
    {
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
    }
}
