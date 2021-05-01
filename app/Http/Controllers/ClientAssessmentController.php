<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Client;
use App\Helpers\Hasher;
use App\Models\Measure;
use App\Models\Assessment;
use App\Helpers\GetOrCreate;
use Illuminate\Http\Request;
use App\Helpers\CanClientAccess;
use App\Jobs\SendEmail;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;

class ClientAssessmentController extends Controller
{
    public function show($hashed_measure_id, $hashed_client_id)
    {
        if (CanClientAccess::assessment($hashed_client_id)) {
            return Inertia::render('Assessments/ClientAssessment', [
                'clientHashedId' => $hashed_client_id,
                'measure' => Measure::findOrFail(Hasher::decode($hashed_measure_id))
            ]);            
        }
        return Inertia::render('Assessments/NoAccess');
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
        $assessment->treatment_id = GetOrCreate::treatment($client);
        $assessment->measure_id = Hasher::decode($request->measureHashedId);
        $assessment->responses = json_encode($request->responses);
        $assessment->save();

        $alerts = collect($request->alerts);

        if ($alerts->count() > 0) {
            $user = User::findOrFail($client->user_id);
            foreach ($alerts as $alertInfo) {
                SendEmail::dispatch($client, $user, $alertInfo);
            }
        }
        
        return Redirect::route('thankyou');  
    }
}
