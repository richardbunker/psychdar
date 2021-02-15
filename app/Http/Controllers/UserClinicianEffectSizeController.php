<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Helpers\Hasher;
use App\Models\Clinician;
use Illuminate\Support\Facades\Auth;

class UserClinicianEffectSizeController extends Controller
{
    public function show($hashed_clinician_id, $questionnaire_name)
    {
        $authUser = User::find(Auth::user()->id);

        $clinician = Clinician::where('id', Hasher::decode($hashed_clinician_id))->select(['id', 'organisation_id', 'clinic_id', 'first_name', 'last_name'])->with('clients.treatments.consultations')->first();

        if ($authUser->organisationsInclude($clinician->organisation_id)) {

            $pre = collect();
            $post = collect();

            $clinician->clients->each(function ($client) use ($questionnaire_name, $pre, $post){
                $client->treatments->each(function ($treatment) use ($questionnaire_name, $pre, $post) {
                    if ($treatment->consultations->count() > 1) {                        
                        $pre->push(collect($treatment->consultations->first()->data->questionnaires->$questionnaire_name->response_data)->values()->sum());
                        $post->push(collect($treatment->consultations->last()->data->questionnaires->$questionnaire_name->response_data)->values()->sum());
                    }
                });
            });            

            return ['pre' => $pre, 'post' => $post];

        }

        return response()->json(['error' => 'Not authorized.'],403);
    }
}
