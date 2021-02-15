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

        \App\Models\Organisation::factory(5)->create();

        $organisations = \App\Models\Organisation::all();

        // Populate the pivot table
        \App\Models\User::all()->each(function ($user) use ($organisations) { 
            $user->organisations()->attach(
                $organisations->random(rand(1, 5))->pluck('id')->toArray()
            ); 
        });

        \App\Models\Organisation::all()->each(function ($org) {
            $randomClinicNumber = rand(1,3);
            for ($i=0; $i < $randomClinicNumber; $i++) { 
                $org->clinics()->save(\App\Models\Clinic::factory()->create([
                    'organisation_id' => $org->id
                ]));                
            }
        });

        \App\Models\Clinic::all()->each(function ($clinic) {
            $randomClinicianNumber = rand(3,8);
            for ($i=0; $i < $randomClinicianNumber; $i++) { 
                $clinic->clinicians()->save(\App\Models\Clinician::factory()->create([
                    'organisation_id' => $clinic->organisation_id,
                    'clinic_id' => $clinic->id
                ]));              
            }
        }); 
        
        \App\Models\Clinician::all()->each(function ($clinician) {
            $randomClientNumber = rand(10,50);
            for ($i=0; $i < $randomClientNumber; $i++) {               
                $clinician->clients()->save(
                    \App\Models\Client::factory()->create([
                        'organisation_id' => $clinician->organisation_id,
                        'clinic_id' => $clinician->clinic_id,
                        'clinician_id' => $clinician->id,
                    ])
                );
            }
        });
        
        \App\Models\Client::all()->each(function ($client) {
            $randomTreatmentNumber = rand(1,2);
            for ($i=0; $i < $randomTreatmentNumber; $i++) {             
                $client->treatments()->save(
                    \App\Models\Treatment::factory()->create([
                        'organisation_id' => $client->organisation_id,
                        'clinic_id' => $client->clinic_id,
                        'clinician_id' => $client->clinician_id,
                        'client_id' => $client->id,
                        'consultation_count' => rand(1,58),
                    ])
                );
            }
        });

        // \App\Models\Treatment::all()->each(function ($treatment) {
        //     $randomConsultationNumber = rand(1,25);
        //     for ($i=0; $i < $randomConsultationNumber; $i++) {               
        //         $treatment->consultations()->save(
        //             \App\Models\Consultation::factory()->create([
        //                 'organisation_id' => $treatment->organisation_id,
        //                 'clinic_id' => $treatment->clinic_id,
        //                 'clinician_id' => $treatment->clinician_id,
        //                 'client_id' => $treatment->client_id,
        //                 'treatment_id' => $treatment->id,
        //             ])
        //         );
        //     }
        // });

        \App\Models\Treatment::all()->each(function ($treatment) {
            $randomAssessmentNumber = rand(1,16);
            for ($i=0; $i < $randomAssessmentNumber; $i++) {               
                $treatment->assessments()->save(
                    \App\Models\Assessment::factory()->create([
                        'organisation_id' => $treatment->organisation_id,
                        'clinic_id' => $treatment->clinic_id,
                        'clinician_id' => $treatment->clinician_id,
                        'client_id' => $treatment->client_id,
                        'treatment_id' => $treatment->id,
                        'measure_id' => 1,
                    ])
                );
            }
        });

    }
}
