<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Helpers\Hasher;
use App\Helpers\ApiError;
use App\Models\Clinician;
use App\Helpers\CanUserAccess;
use Illuminate\Support\Facades\Auth;

class UserCliniciansController extends Controller
{    
    public function index()
    {
        return Inertia::render('Clinicians/Index', [
            'organisations' => Auth::user()->organisations
        ]);
    }

    public function show($hashed_clinician_id)
    {
        $hashed_organisation_id = Hasher::encode(Clinician::where('id', Hasher::decode($hashed_clinician_id))->first()->organisation_id);

        if (CanUserAccess::organisationResources($hashed_organisation_id)) {
            return Inertia::render('Clinicians/Show', [
                'role' => 'admin',
                'clinician' => Clinician::where('id', Hasher::decode($hashed_clinician_id))
                                ->with('clients.treatments.assessments')
                                ->with('clinic')
                                ->first()
            ]);
        }
        return abort(403);
    }
}
