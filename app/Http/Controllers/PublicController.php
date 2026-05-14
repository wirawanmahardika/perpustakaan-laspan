<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\ProfilPerpus;
use App\Models\YearlyStat;

class PublicController extends Controller
{
    public function index()
    {
        return inertia('welcome', [
            'profile' => ProfilPerpus::first("*") ?? new ProfilPerpus(),
            'activities' => ActivityLog::orderBy('tanggal', 'desc')->take(6)->get(),
            'latest_stats' => YearlyStat::orderBy('tahun', 'desc')->first(),
        ]);
    }
}
