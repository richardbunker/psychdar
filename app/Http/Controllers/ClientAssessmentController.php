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
use App\Mail\ScaleScoreAlert;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Mail;
use function PHPUnit\Framework\isEmpty;
use Illuminate\Support\Facades\Redirect;

class ClientAssessmentController extends Controller
{
    public function show($client_hashed_id, $measure_hashed_id)
    {
        if (CanClientAccess::assessment($client_hashed_id)) {
            return Inertia::render('Assessments/ClientAssessment', [
                'clientHashedId' => $client_hashed_id,
                'measure' => Measure::findOrFail(Hasher::decode($measure_hashed_id))
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
            foreach ($alerts as $alertInfo) {
                Mail::to(Auth::user()->email)->queue(new ScaleScoreAlert($client, $alertInfo, Auth::user()->name));
            }
        }
        
        return Redirect::route('thankyou');  
    }
}
