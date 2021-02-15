<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Client;
use App\Helpers\Hasher;
use App\Models\Clinician;
use App\Helpers\CanUserAccess;
use Illuminate\Support\Facades\Auth;

class UserClientsController extends Controller
{
    public function index()
    {        
        return Inertia::render('Clients/Index', [
            'organisations' => Auth::user()->organisations
        ]);
    }

    public function show($hashed_client_id)
    {
        $hashed_organisation_id = Hasher::encode(Client::where('id', Hasher::decode($hashed_client_id))->first()->organisation_id);

        if (CanUserAccess::organisationResources($hashed_organisation_id)) {
            return Inertia::render('Clients/Show', [
                'client' => Client::where('id', Hasher::decode($hashed_client_id))
                                ->with('treatments.assessments')
                                ->with('clinic')
                                ->with('clinician')
                                ->first()
            ]);                
        }
            
        return abort(403);
    }
}
