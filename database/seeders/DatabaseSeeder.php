<?php

namespace Database\Seeders;

use App\Helpers\MeasureBuilder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(5)->create();

        \App\Models\User::all()->each(function ($user) {
            $randomNumber = rand(7, 29);
            for ($i = 0; $i < $randomNumber; $i++) {
                $user->clients()->save(\App\Models\Client::factory()->create([
                    'user_id' => $user->id
                ]));
            }
        });

        MeasureBuilder::dass21();
        MeasureBuilder::core10();

    }
}
