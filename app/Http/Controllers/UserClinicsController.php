<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Clinic;
use App\Helpers\Hasher;
use App\Helpers\ApiError;
use App\Helpers\CanUserAccess;
use Illuminate\Support\Facades\Auth;

class UserClinicsController extends Controller
{
    public function index()
    {
        return Inertia::render('Clinics/Index', [
            'organisations' => Auth::user()->organisations
        ]);
    }

    public function clinics($hashed_organisation_id)
    {
        if (CanUserAccess::organisationResources($hashed_organisation_id)) {
            return Clinic::where('organisation_id', Hasher::decode($hashed_organisation_id))->with('clinicians')->get();       
        }

        return ApiError::throw403();
    }
    // public function index()
    // {        
    //     return view('clinic.index');
    // }
    
    // public function indexAPI($hashed_organisation_id)
    // {
    //     if (CanUserAccess::organisationResources($hashed_organisation_id)) {
    //         return Clinic::where('organisation_id', Hasher::decode($hashed_organisation_id))->with('clinicians')->get();
    //     }
        
    //     return ApiError::throw403();
        
    // }

    // public function show($hashed_clinic_id)
    // {
    //     return view('clinic.show', compact('hashed_clinic_id'));
    // }

    public function show($hashed_clinic_id)
    {
        $hashed_organisation_id = Hasher::encode(Clinic::where('id', Hasher::decode($hashed_clinic_id))->first()->organisation_id);

        if (CanUserAccess::organisationResources($hashed_organisation_id)) {
            return Inertia::render('Clinics/Show', [
                'clinic' => Clinic::where('id', Hasher::decode($hashed_clinic_id))
                    ->with('clinicians.clients.treatments.assessments')
                    ->first()
            ]);
        }
        return abort(403);
    }
}
