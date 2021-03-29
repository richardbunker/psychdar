<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserSnapshots;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class UserSnapshotsController extends Controller
{
    public function store(Request $request)
    {
        $snapshot = new UserSnapshots;
        $snapshot->user_id = Auth::user()->id;        
        $snapshot->data = json_encode($request->all());
        $snapshot->save();
        
        return Redirect::route('userDashboard');  
    }
}
