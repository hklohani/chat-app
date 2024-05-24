<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => 'Himanshu',
            'email' => 'himanshu@gmail.com',
        ]);

        User::factory()->create([
            'name' => 'Prabhanshu',
            'email' => 'prabhanshu@gmail.com',
        ]);
        User::factory()->create([
            'name' => 'Ujjwal',
            'email' => 'ujjwal@gmail.com',
        ]);
    }
}
