<?php

namespace App\Http\Controllers;

use App\Models\YearlyStat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class YearlyStatController extends Controller
{
    public function index()
    {
        return Inertia::render('stats/index', [
            'stats' => YearlyStat::orderBy('tahun', 'desc')->get()
        ]);
    }

    public function updateOrCreate(Request $request)
    {
        $validated = $request->validate([
            'tahun'                => 'required|digits:4',
            'jumlah_koleksi'       => 'required|integer|min:0',
            'penambahan_koleksi'   => 'required|integer|min:0', // Pastikan nama kolom di DB sama
            'jumlah_anggota'       => 'required|integer|min:0',
            'jumlah_pengunjung'    => 'required|integer|min:0',
            'jumlah_peminjaman'    => 'required|integer|min:0',
            'buku_dibaca'          => 'required|integer|min:0',
            'koleksi_fiksi'        => 'required|integer|min:0',
            'koleksi_nonfiksi'     => 'required|integer|min:0',
            'koleksi_digital'      => 'required|integer|min:0',
            'analisis_minat_baca'  => 'nullable|string',
        ]);

        $dataToSave = collect($validated)->map(function ($value) {
            return is_numeric($value) ? (int) $value : $value;
        })->toArray();

        // Gunakan updateOrCreate berdasarkan rekam tahun agar tidak ada duplikasi tahun yang sama
        YearlyStat::updateOrCreate(
            ['tahun' => $dataToSave['tahun']],
            $dataToSave
        );

        return back()->with('message', 'Statistik tahun ' . $request->tahun . ' berhasil diperbarui');
    }
}
