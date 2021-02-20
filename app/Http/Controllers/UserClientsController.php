<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Client;
use App\Helpers\Hasher;
use App\Helpers\CanUserAccess;
use App\Models\Measure;
use Illuminate\Support\Facades\Auth;

class UserClientsController extends Controller
{
    public function index()
    {       
        return Inertia::render('Clients/Index', [
            'userClients' => Client::where('user_id', Auth::user()->id)->orderBy('identifier')->get()
        ]);
    }

    public function show($hashed_client_id)
    {
        if (CanUserAccess::client($hashed_client_id)) { 
            return Inertia::render('Clients/Show', [
                'client' => Client::where('id', Hasher::decode($hashed_client_id))
                                ->with('treatments.assessments')
                                ->with('measures')
                                ->with('clinic')
                                ->first(),
                'userMeasures' => Auth::user()->measures,
            ]);            
        }
        return abort(403);            
    }
}
