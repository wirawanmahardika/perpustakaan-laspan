<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Document;
use App\Models\ProfilPerpus;
use App\Models\YearlyStat;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome', [
            'profile' => ProfilPerpus::first("*"),
            'activities' => ActivityLog::orderBy('tanggal', 'desc')->take(4)->get(),
            'latest_stats' => YearlyStat::orderBy('tahun', 'desc')->first(),
            'documents' => Document::orderBy('created_at', 'desc')->take(8)->get(), // Ambil 8 dokumen terbaru
        ]);
    }
}
