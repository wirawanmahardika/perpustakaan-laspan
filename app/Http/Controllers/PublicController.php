<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\ProfilPerpus;
use Inertia\Inertia;
use Laravel\Fortify\Features;

class PublicController extends Controller
{
    function welcomeView()
    {
        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'profile' => ProfilPerpus::first("*"),
            'activities' => Kegiatan::latest("updated_at")->with("laporan")->get()
        ]);
    }
}
