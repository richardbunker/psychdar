<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Helpers\Hasher;
use App\Helpers\ApiError;
use Illuminate\Http\Request;
use App\Helpers\CanUserAccess;

class OrganisationClientsController extends Controller
{    
    public function index($hashed_organisation_id)
    {

        if (CanUserAccess::organisationResources($hashed_organisation_id)) {
            return Client::where('organisation_id', Hasher::decode($hashed_organisation_id))
                ->orderBy("last_name")
                ->get();
        }
        return ApiError::throw403();
        
    }

    public function updateActiveStatus($hashed_client_id, Request $request)
    {
        $hashed_organisation_id = Hasher::encode(Client::where('id', Hasher::decode($hashed_client_id))->first()->organisation_id);

        if (CanUserAccess::organisationResources($hashed_organisation_id)) {
            $client = Client::where('id', Hasher::decode($hashed_client_id))->first();
            $client->is_active = (int)$request->active;
            $client->save();
            return true;
        }
            
        return ApiError::throw403();

    }

    public function updateUrlStatus($hashed_client_id, Request $request)
    {

        $hashed_organisation_id = Hasher::encode(Client::where('id', Hasher::decode($hashed_client_id))->first()->organisation_id);

        if (CanUserAccess::organisationResources($hashed_organisation_id)) {
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

        $hashed_organisation_id = Hasher::encode(Client::where('id', Hasher::decode($hashed_client_id))->first()->organisation_id);

        if (CanUserAccess::organisationResources($hashed_organisation_id)) {
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
