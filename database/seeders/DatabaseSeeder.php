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
            $randomClinicNumber = rand(1,3);
            for ($i=0; $i < $randomClinicNumber; $i++) { 
                $user->clinics()->save(\App\Models\Clinic::factory()->create([
                    'user_id' => $user->id
                ]));                
            }
        });

        \App\Models\Clinic::all()->each(function ($clinic) {
            $randomClinicianNumber = rand(3,8);
            for ($i=0; $i < $randomClinicianNumber; $i++) { 
                $clinic->clients()->save(
                    \App\Models\Client::factory()->create([
                        'user_id' => $clinic->user_id,
                        'clinic_id' => $clinic->id,
                    ])
                );            
            }
        });
        
        \App\Models\Client::all()->each(function ($client) {
            $randomTreatmentNumber = rand(1,2);
            for ($i=0; $i < $randomTreatmentNumber; $i++) {             
                $client->treatments()->save(
                    \App\Models\Treatment::factory()->create([
                        'user_id' => $client->user_id,
                        'clinic_id' => $client->clinic_id,
                        'client_id' => $client->id,
                        'consultation_count' => rand(1,58),
                    ])
                );
            }
        });

        \App\Models\Treatment::all()->each(function ($treatment) {
            $randomAssessmentNumber = rand(1,16);
            for ($i=0; $i < $randomAssessmentNumber; $i++) {               
                $treatment->assessments()->save(
                    \App\Models\Assessment::factory()->create([
                        'user_id' => $treatment->user_id,
                        'clinic_id' => $treatment->clinic_id,
                        'client_id' => $treatment->client_id,
                        'treatment_id' => $treatment->id,
                        'measure_id' => 1,
                    ])
                );
            }
        });

    }
}
