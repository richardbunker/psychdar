<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Client;
use App\Helpers\Hasher;
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
                                ->with('activeTreatments')
                                ->first(),
                'userPublishedMeasures' => Auth::user()->publishedMeasures,
                'hashed_user_id' => Hasher::encode(Auth::user()->id),
            ]);            
        }
        return abort(403);            
    }
    
    public function store(Request $request)
    {
        $client = new Client;
        $client->user_id = Auth::user()->id;
        $client->identifier = $request->name;
        $client->save();
        return Redirect::route('showClient', $client->hashed_id);  
    }
    
    public function updateSettings(Request $request)
    {
        if (CanUserAccess::client($request->clientHashedId)) {           
            $client = Client::findOrFail(Hasher::decode($request->clientHashedId));
            $client->identifier  = $request->identifier;
            $client->is_active = (int)$request->active;
            $client->url_access = (int)$request->url;
            $client->custom_client_uri = $request->customClientUri;
            $client->save();
            return Redirect::route('showClient', $request->clientHashedId);  
        }
        return abort(403);   
    }
}
