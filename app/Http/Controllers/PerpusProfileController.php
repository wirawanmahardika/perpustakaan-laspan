<?php

namespace App\Http\Controllers;

use App\Models\ProfilPerpus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class PerpusProfileController extends Controller
{
    public function editView()
    {
        // Menggunakan method getSingleton agar selalu ada data default jika DB kosong
        return inertia('profile/edit', [
            'profile' => ProfilPerpus::getSingleton()
        ]);
    }

    public function editProfile(Request $request)
    {
        // 1. Validasi data - Disinkronkan dengan schema terbaru (termasuk media_sosial)
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

            // Validasi Media Sosial (JSON/Array)
            // Memastikan key yang dikirim sesuai dengan kebutuhan instrumen penilaian
            'media_sosial'            => 'required|array',
            'media_sosial.facebook'   => 'nullable|string',
            'media_sosial.instagram'  => 'nullable|string',
            'media_sosial.twitter'    => 'nullable|string',
            'media_sosial.website'    => 'nullable|string',

            // Data Demografi & Geografis
            'luas_wilayah'            => 'required|numeric|min:0',
            'jumlah_penduduk'         => 'required|integer|min:0',
            'jarak_ke_kabkota'        => 'required|numeric|min:0',
            'mata_pencaharian_utama'  => 'required|array',
        ]);

        // 2. Ambil instance model menggunakan pola Singleton
        $profile = ProfilPerpus::getSingleton();

        // 3 & 4. Masukkan data dan simpan
        // Karena kita sudah set $casts di model, array media_sosial 
        // akan otomatis diconvert menjadi JSON oleh Eloquent.
        $profile->update($validated);

        // 5. Kembali ke halaman sebelumnya dengan flash message
        return Redirect::back()->with('message', 'Profil Perpustakaan berhasil diperbarui');
    }
}
