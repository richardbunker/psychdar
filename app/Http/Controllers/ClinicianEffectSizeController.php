<?php

namespace App\Http\Controllers;

use App\Helpers\Hasher;
use App\Helpers\ApiError;
use App\Models\Clinician;
use App\Helpers\CheckRole;
use App\Helpers\HashCheck;
use App\Helpers\CanUserAccess;
use App\Services\EffectSizeService;

class ClinicianEffectSizeController extends Controller
{
    public function __construct(EffectSizeService $effectSizeService)
    {
        $this->effectSizeService = $effectSizeService;
    }

    public function show($hashed_clinician_id, $questionnaire_name)
    {
        $clinician = Clinician::where('id', Hasher::decode($hashed_clinician_id))->select(['id', 'organisation_id', 'clinic_id', 'first_name', 'last_name'])->with('clients.treatments.assessments')->first();

        if (CheckRole::isType('admin')) {
            if (CanUserAccess::organisationResources(Hasher::encode($clinician->organisation_id))) {
                return $this->effectSizeService->prepareArray($clinician, $questionnaire_name);
            }       
        }

        if (CheckRole::isType('clinician')) {
            if (HashCheck::canAuthUserAccessWithHash($hashed_clinician_id)) {
                return $this->effectSizeService->prepareArray($clinician, $questionnaire_name);
            }
        }
        
        return ApiError::throw403();            

    }
}
