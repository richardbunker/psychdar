<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Client;
use App\Helpers\Hasher;
use App\Helpers\ApiError;
use App\Helpers\HashCheck;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClinicianClientsController extends Controller
{   
    public function index()
    {
        return Inertia::render('C/Clients/Index', [
            'clients' => Client::where('clinician_id', Auth::user()->id)
                            ->with('treatments.assessments')
                            ->with('clinic')
                            ->with('clinician')
                            ->orderBy("last_name")
                            ->get()
        ]);
    }

    public function show($hashed_client_id)
    {
        $client = Client::where('id', Hasher::decode($hashed_client_id))
                ->with('treatments.assessments')
                ->with('clinic')
                ->with('clinician')
                ->first();
        
        if (HashCheck::strictEqualTo($client->clinician->hashed_id, Auth::user()->hashed_id)) {
            return Inertia::render('C/Clients/Show', [
                'client' => $client
            ]);         
        }

        return abort(403);

    }

    public function updateActiveStatusAPI($hashed_client_id, Request $request)
    {
        $client = Client::where('id', Hasher::decode($hashed_client_id))
                ->with('clinician')
                ->first();

        if (HashCheck::strictEqualTo($client->clinician->hashed_id, Auth::user()->hashed_id)) {
            $client->is_active = (int)$request->active;
            $client->save();
            return true;
        }
        return ApiError::throw403();
    }

    public function updateUrlStatusAPI($hashed_client_id, Request $request)
    {
        $client = Client::where('id', Hasher::decode($hashed_client_id))
                ->with('clinician')
                ->first();

        if (HashCheck::strictEqualTo($client->clinician->hashed_id, Auth::user()->hashed_id)) {
            $preferences = $client->preferences;
            $preferences->create_own_resources = (int)$request->url;
            $client->preferences = json_encode($preferences);
            $client->save();
            return true;
        }
            
        return ApiError::throw403();

    }

    public function updateStatsStatusAPI($hashed_client_id, Request $request)
    {
        $client = Client::where('id', Hasher::decode($hashed_client_id))
                ->with('clinician')
                ->first();

        if (HashCheck::strictEqualTo($client->clinician->hashed_id, Auth::user()->hashed_id)) {
            $preferences = $client->preferences;
            $preferences->include_in_analyses = (int)$request->stats;
            $client->preferences = json_encode($preferences);
            $client->save();
            return true;
        }
            
        return ApiError::throw403();

    }
}
