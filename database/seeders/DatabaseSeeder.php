<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\LibraryProfileSeeder;
use Database\Seeders\KegiatanSeeder;
use Database\Seeders\LaporanSeeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            LibraryProfileSeeder::class,
            KegiatanSeeder::class,
            LaporanSeeder::class,
        ]);
    }
}
