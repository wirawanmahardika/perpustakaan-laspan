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
        // 1. Validasi data
        $validated = $request->validate([
            'nama_perpus'            => 'required|string|max:255',
            'npp'                    => 'required|string|max:255|unique:profil_perpus,npp,' . $request->id,
            'desa_kelurahan'         => 'required|string|max:255',
            'kecamatan'              => 'required|string|max:255',
            'kabupaten_kota'         => 'required|string|max:255',
            'provinsi'               => 'required|string|max:255',
            'alamat'         => 'required|string',
            'media_sosial'           => 'nullable|string|max:255',
            'telp'                   => 'nullable|string|max:20',
            'fax'                    => 'nullable|string|max:20',
            'email'                  => 'nullable|email|max:255',
            'tahun_berdiri'          => 'required|digits:4',
            'nomor_sk_pendirian'     => 'required|string|max:255',
            'bulan_tahun_efektif'    => 'required|string|max:255',
            'nama_petugas'           => 'required|string|max:255',
            'nama_penanggung_jawab'  => 'required|string|max:255',
            'sifat_bangunan'         => 'required|in:gabung,mandiri',
            'jumlah_anggota'         => 'required|integer|min:0',
            'luas_wilayah_km2'       => 'required|numeric|min:0',
            'jumlah_penduduk'        => 'required|integer|min:0',
            'jarak_ke_perpus_kab'    => 'required|numeric|min:0',
            'mata_pencaharian_utama' => 'required|array',
        ]);

        // 2. Ambil instance model
        $profile = ProfilPerpus::first("*") ?? new ProfilPerpus();

        // 3. "Fill" instance dengan data tervalidasi
        // Method ini akan memetakan array ke properti model secara otomatis
        $profile->fill($validated);

        // 4. Simpan (Save akan mendeteksi apakah ini update atau insert otomatis)
        $profile->save();

        return Redirect::back()->with('message', 'Profil berhasil diperbarui');
    }
}
