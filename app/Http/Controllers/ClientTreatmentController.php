<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Helpers\Hasher;
use App\Models\Treatment;
use Illuminate\Http\Request;
use App\Helpers\CanUserAccess;
use Illuminate\Support\Facades\Redirect;

class ClientTreatmentController extends Controller
{
    public function ended(Request $request)
    {
        if (CanUserAccess::treatment($request->treatmentHashedId)) {           
            $treatment = Treatment::findOrFail(Hasher::decode($request->treatmentHashedId));
            $treatment->ended_at = Carbon::now();
            $treatment->save();
            return Redirect::route('showClient', Hasher::encode($treatment->client_id));  
        }
        return abort(403);  
    }
}
