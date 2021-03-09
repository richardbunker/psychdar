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
                'userPublishedMeasures' => Auth::user()->publishedMeasures,
            ]);            
        }
        return abort(403);            
    }
    
    public function updateActiveStatus($hashed_client_id, Request $request)
    {
        if (CanUserAccess::client($hashed_client_id)) {
            $client = Client::where('id', Hasher::decode($hashed_client_id))->first();
            $client->is_active = (int)$request->active;
            $client->save();
            return true;                       
        }
            
        return ApiError::throw403();
    }

    public function updateUrlStatus($hashed_client_id, Request $request)
    {
        if (CanUserAccess::client($hashed_client_id)) {
            $client = Client::where('id', Hasher::decode($hashed_client_id))->first();
            $preferences = $client->preferences;
            $preferences->create_own_resources = (int)$request->url;
            $client->preferences = json_encode($preferences);
            $client->save();
            return true;                    
        }
            
        return ApiError::throw403();
    }

    public function updateStatsStatus($hashed_client_id, Request $request)
    {
        if (CanUserAccess::client($hashed_client_id)) {
            $client = Client::where('id', Hasher::decode($hashed_client_id))->first();
            $preferences = $client->preferences;
            $preferences->include_in_analyses = (int)$request->stats;
            $client->preferences = json_encode($preferences);
            $client->save();
            return true;                 
        }
            
        return ApiError::throw403();
    }
}
