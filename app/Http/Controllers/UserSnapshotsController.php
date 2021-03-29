<?php

namespace App\Http\Controllers;

use App\Helpers\Hasher;
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
    public function destroy(Request $request)
    {
        $snapshot = UserSnapshots::findOrFail(Hasher::decode($request->hashedSnapshotId));
        $snapshot->delete();

        return Redirect::route('userDashboard');  
    }
}
