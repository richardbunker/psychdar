<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Helpers\Hasher;
use App\Helpers\ApiError;
use App\Helpers\CanUserAccess;
use App\Models\Measure;
use App\Models\Organisation;
use Illuminate\Support\Facades\Auth;

class OrganisationMeasuresController extends Controller
{   
    public function index($hashed_organisation_id)
    {
        if (CanUserAccess::organisationResources($hashed_organisation_id)) {
            $orgainisation = Organisation::where('id', Hasher::decode($hashed_organisation_id))->first();
            return $orgainisation->measures;
        }
        return ApiError::throw403();
    }
}
