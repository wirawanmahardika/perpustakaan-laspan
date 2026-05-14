<?php

namespace App\Http\Controllers;

use App\Models\ProfilPerpus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class PerpusProfileController extends Controller
{
    public function editView()
    {
        return inertia('profile/edit', [
            'profile' => ProfilPerpus::first("*")
        ]);
    }


    public function editProfile(Request $request)
    {
        // 1. Validasi data - Disesuaikan dengan nama kolom di migrasi dan model
        $validated = $request->validate([
            'nama_perpustakaan'       => 'required|string|max:255',
            'npp'                     => 'nullable|string|max:255',
            'alamat'                  => 'required|string',
            'desa_kelurahan'          => 'required|string|max:255',
            'kecamatan'               => 'required|string|max:255',
            'kabupaten_kota'          => 'required|string|max:255',
            'provinsi'                => 'required|string|max:255',
            'kontak'                  => 'nullable|string|max:255',
            'tahun_berdiri'           => 'required|digits:4',
            'nomor_sk'                => 'required|string|max:255',
            'tanggal_operasi_efektif' => 'nullable|date',
            'nama_petugas'            => 'nullable|string|max:255',
            'nama_penanggung_jawab'   => 'nullable|string|max:255',
            'sifat_bangunan'          => 'required|in:gabung,sendiri',

            // Data Demografi & Geografis
            'luas_wilayah'            => 'required|numeric|min:0',
            'jumlah_penduduk'         => 'required|integer|min:0',
            'jarak_ke_kabkota'        => 'required|numeric|min:0',
            'mata_pencaharian_utama'  => 'required|array',
        ]);

        // 2. Ambil instance model menggunakan pola Singleton (Baris Pertama)
        // Jika belum ada data sama sekali, akan membuat instance baru
        $profile = ProfilPerpus::first("*") ?? new ProfilPerpus();

        // 3. Masukkan data hasil validasi ke model
        $profile->fill($validated);

        // 4. Simpan ke database
        $profile->save();

        // 5. Kembali ke halaman sebelumnya dengan flash message
        return Redirect::back()->with('message', 'Profil Perpustakaan berhasil diperbarui');
    }
}
