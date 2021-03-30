<?php

namespace Database\Seeders;

use App\Helpers\MeasureBuilder;
use Carbon\Carbon;
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
        // \App\Models\User::factory(5)->create();

        // \App\Models\User::all()->each(function ($user) {
        //     $randomNumber = rand(30, 59);
        //     for ($i = 0; $i < $randomNumber; $i++) {
        //         $user->clients()->save(\App\Models\Client::factory()->create([
        //             'user_id' => $user->id
        //         ]));
        //     }
        // });

        // \App\Models\Client::all()->each(function ($client) {
        //     $randomNumber = rand(1, 6);
        //     for ($i = 0; $i < $randomNumber; $i++) {
        //         $client->treatments()->save(\App\Models\Treatment::factory()->create([
        //             'user_id' => $client->user_id,
        //             'client_id' => $client->id,
        //             'included_in_stats' => true,
        //             'ended_at' => Carbon::now()->subDays($randomNumber),
        //             'created_at' => Carbon::now()->subMonths($randomNumber)
        //         ]));
        //     }
        // });

        // \App\Models\Treatment::all()->each(function ($treatment) {
        //     $randomNumber = rand(1, 27);
        //     for ($i = 0; $i < $randomNumber; $i++) {
        //         $treatment->assessments()->save(\App\Models\Assessment::factory()->create([
        //             'user_id' => $treatment->user_id,
        //             'client_id' => $treatment->client_id,
        //             'treatment_id' => $treatment->id,
        //             'measure_id' => 1,
        //         ]));
        //     }
        // });
        
        MeasureBuilder::core10();
        MeasureBuilder::dass21();
        MeasureBuilder::therapyFeedback();

    }
}
