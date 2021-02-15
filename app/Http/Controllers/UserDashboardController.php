<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Client;
use App\Models\Clinic;
use App\Helpers\Hasher;
use App\Helpers\ApiError;
use App\Models\Clinician;
use App\Models\Treatment;
use App\Models\Assessment;
use App\Models\Consultation;
use App\Helpers\CanUserAccess;
use Illuminate\Support\Facades\Auth;

class UserDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/User', [
            'organisations' => Auth::user()->organisations
        ]);
    }

    public function clinics($hashed_organisation_id)
    {
        if (CanUserAccess::organisationResources($hashed_organisation_id)) {
            return Clinic::where('organisation_id', Hasher::decode($hashed_organisation_id))->get();
        }

        return ApiError::throw403();
    }

    public function clinicians($hashed_organisation_id)
    {
        if (CanUserAccess::organisationResources($hashed_organisation_id)) {
            return Clinician::where('organisation_id', Hasher::decode($hashed_organisation_id))->get();
        }
        
        return ApiError::throw403();
    }

    public function clients($hashed_organisation_id)
    {
        if (CanUserAccess::organisationResources($hashed_organisation_id)) {
            return Client::where('organisation_id', Hasher::decode($hashed_organisation_id))->get();
        }
        
        return ApiError::throw403();
    }

    public function treatments($hashed_organisation_id)
    {
        if (CanUserAccess::organisationResources($hashed_organisation_id)) {
            return Treatment::where('organisation_id', Hasher::decode($hashed_organisation_id))->get();
        }
        
        return ApiError::throw403();
    }

    public function consultations($hashed_organisation_id)
    {
        if (CanUserAccess::organisationResources($hashed_organisation_id)) {
            // return Consultation::where('organisation_id', Hasher::decode($hashed_organisation_id))->get();
            $treatments = Treatment::where('organisation_id', Hasher::decode($hashed_organisation_id))->get();
            return $treatments->map(function($treatment) {
                return $treatment->consultation_count;
            })->sum();
        }
        
        return ApiError::throw403();
    }

    public function assessments($hashed_organisation_id)
    {
        if (CanUserAccess::organisationResources($hashed_organisation_id)) {
            return Assessment::where('organisation_id', Hasher::decode($hashed_organisation_id))->get()->count();
        }

        return ApiError::throw403();
    }
}
