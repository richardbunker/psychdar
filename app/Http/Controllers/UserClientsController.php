<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Client;
use App\Helpers\Hasher;
use App\Models\Measure;
use App\Helpers\ApiError;
use Illuminate\Http\Request;
use App\Helpers\CanUserAccess;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

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
                                ->first(),
                'userPublishedMeasures' => Auth::user()->publishedMeasures,
            ]);            
        }
        return abort(403);            
    }
    
    public function updateSettings(Request $request)
    {
        if (CanUserAccess::client($request->clientHashedId)) {           
            $client = Client::findOrFail(Hasher::decode($request->clientHashedId));
            $client->is_active = (int)$request->active;
            $preferences = $client->preferences;
            $preferences->create_own_resources = (int)$request->url;
            $preferences->include_in_analyses = (int)$request->stats;
            $client->preferences = json_encode($preferences);
            $client->save();
            return Redirect::route('showClient', $request->clientHashedId);  
        }
        return abort(403);   
    }
}
