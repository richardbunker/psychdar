<?php

namespace App\Http\Controllers;

use App\Helpers\Hasher;
use App\Models\UserData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class UserDataController extends Controller
{
    public function store(Request $request)
    {
        if (is_null(Auth::user()->data)) {
            $userData = new UserData; 
            $userData->user_id = Auth::user()->id;           
        } else {
            $userData = Auth::user()->data;
        }
        $userData->measure_id_for_outcome_stats = Hasher::decode($request->outcomeMeasureDetails["hashedMeasureId"]);
        $userData->outcome_data = json_encode($request->outcomeMeasureDetails);
        $userData->save();
        
        return Redirect::route('userDashboard');  
    }
}
