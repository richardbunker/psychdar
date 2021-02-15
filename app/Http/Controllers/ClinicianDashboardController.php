<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Helpers\Hasher;
use App\Helpers\ApiError;
use App\Models\Clinician;
use App\Helpers\HashCheck;
use Illuminate\Support\Facades\Auth;

class ClinicianDashboardController extends Controller
{   
    public function index()
    {
        return Inertia::render('C/Dashboard/Index', [
            'clinician' => Clinician::where('id', Auth::user()->id)
                            ->with('clients.treatments.assessments')
                            ->with('clinic')
                            ->first()
        ]);
    }
}
