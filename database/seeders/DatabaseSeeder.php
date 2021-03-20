<?php

namespace Database\Seeders;

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
            $randomNumber = rand(7, 30);
            for ($i=0; $i < $randomNumber; $i++) { 
                $user->clients()->save(\App\Models\Client::factory()->create([
                    'user_id' => $user->id
                ]));                
            }
        });
        
        // \App\Models\Client::all()->each(function ($client) {
        //     $randomTreatmentNumber = rand(1,3);
        //     for ($i=0; $i < $randomTreatmentNumber; $i++) {             
        //         $client->treatments()->save(
        //             \App\Models\Treatment::factory()->create([
        //                 'user_id' => $client->user_id,
        //                 'client_id' => $client->id,
        //             ])
        //         );
        //     }
        // });

        // \App\Models\Treatment::all()->each(function ($treatment) {
        //     $randomAssessmentNumber = rand(1,16);
        //     for ($i=0; $i < $randomAssessmentNumber; $i++) {               
        //         $treatment->assessments()->save(
        //             \App\Models\Assessment::factory()->create([
        //                 'user_id' => $treatment->user_id,
        //                 'client_id' => $treatment->client_id,
        //                 'treatment_id' => $treatment->id,
        //                 'measure_id' => 1,
        //             ])
        //         );
        //     }
        // });

    }
}
