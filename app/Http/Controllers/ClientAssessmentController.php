<?php

namespace App\Http\Controllers;

use App\Helpers\Hasher;
use App\Models\Assessment;
use App\Models\Client;
use App\Models\Measure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ClientAssessmentController extends Controller
{
    public function show($client_hashed_id, $measure_hashed_id)
    {     
        return Inertia::render('Assessments/ClientAssessment', [
            'clientHashedId' => $client_hashed_id,
            'measure' => Measure::findOrFail(Hasher::decode($measure_hashed_id))
        ]);
    }

    public function thankyou()
    {     
        return Inertia::render('Assessments/AssessmentComplete');
    }

    public function store(Request $request)
    {
        $client = Client::findOrFail(Hasher::decode($request->clientHashedId));

        $assessment = new Assessment();
        $assessment->user_id = $client->user_id;
        $assessment->client_id = $client->id;
        $assessment->treatment_id = 1;
        $assessment->measure_id = Hasher::decode($request->measureHashedId);
        $assessment->data = json_encode($request->responses);
        $assessment->save();
        
        return Redirect::route('thankyou');  
    }
}
