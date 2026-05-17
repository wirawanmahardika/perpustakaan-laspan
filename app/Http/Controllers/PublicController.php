<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Document;
use App\Models\ProfilPerpus;
use App\Models\User;
use App\Models\YearlyStat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome', [
            'profile' => ProfilPerpus::first("*"),
            'activities' => ActivityLog::orderBy('tanggal', 'desc')->take(4)->get(),
            'latest_stats' => YearlyStat::orderBy('tahun', 'desc')->first(),
            'documents' => Document::orderBy('created_at', 'desc')->take(8)->get(),
            'officers' => User::all(),
        ]);
    }


    public function about()
    {
        $profile = ProfilPerpus::first("*");
        $officers = User::orderBy('id', 'asc')->get();
        return Inertia::render('tentang', [
            'profile' => $profile,
            'officers' => $officers
        ]);
    }

    public function documents()
    {
        $profile = ProfilPerpus::first("*");
        $documents = Document::orderBy('created_at', 'desc')->get();
        return Inertia::render('document', [
            'profile' => $profile,
            'documents' => $documents
        ]);
    }

    public function contact()
    {
        // Mengambil rekaman data profil pertama untuk memuat relasi kontak dan alamat resmi
        $profile = ProfilPerpus::first("*");

        return Inertia::render('kontak', [
            'profile' => $profile
        ]);
    }

    public function aktivitas(Request $request)
    {
        $query = ActivityLog::query();

        // Logika Pencarian
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('nama_kegiatan', 'like', "%{$request->search}%")
                    ->orWhere('deskripsi', 'like', "%{$request->search}%");
            });
        }

        // Filter Tipe
        if ($request->type) {
            $query->where('tipe', $request->type);
        }

        return Inertia::render('aktivitas', [
            'activities' => $query
                ->orderByRaw('CASE WHEN artikel IS NULL OR artikel = "" THEN 1 ELSE 0 END ASC, tanggal DESC', [])
                ->paginate(9)
                ->withQueryString(),
            'filters' => $request->only(['search', 'type'])
        ]);
    }
}
