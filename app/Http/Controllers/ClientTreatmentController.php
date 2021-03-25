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
    public function end(Request $request)
    {
        if (CanUserAccess::treatment($request->hashedTreatmentId)) {           
            $treatment = Treatment::findOrFail(Hasher::decode($request->hashedTreatmentId));
            $treatment->ended_at = Carbon::createFromFormat('D M d Y H:i:s e+', $request->endedAt)->toDateTimeString();
            $treatment->save();
            return Redirect::route('showClient', Hasher::encode($treatment->client_id));  
        }
        return abort(403);  
    }

    public function update(Request $request)
    {
        if (CanUserAccess::treatment($request->hashedTreatmentId)) {           
            $treatment = Treatment::findOrFail(Hasher::decode($request->hashedTreatmentId));
            $treatment->included_in_stats = $request->includedInStats;
            $treatment->save();
            return Redirect::route('showClient', Hasher::encode($treatment->client_id));  
        }
        return abort(403);  
    }

    public function reactivate(Request $request)
    {
        if (CanUserAccess::treatment($request->hashedTreatmentId)) {           
            $treatment = Treatment::findOrFail(Hasher::decode($request->hashedTreatmentId));
            $treatment->ended_at = null;
            $treatment->save();
            return Redirect::route('showClient', Hasher::encode($treatment->client_id));  
        }
        return abort(403);  
    }
}
