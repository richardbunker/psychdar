<?php

namespace App\Http\Controllers;

use App\Helpers\Hasher;
use App\Models\Assessment;
use App\Models\Measure;
use Illuminate\Http\Request;

class TreatmentAssessmentsController extends Controller
{
    public function index($hashed_treatment_id)
    {
        return Assessment::where('treatment_id', Hasher::decode($hashed_treatment_id))
            ->get()
            ->groupBy('hashed_measure_id')
            ->map(function($item, $key) {
                return [
                    'measure' => Measure::findOrFail(Hasher::decode($key)), 
                    'assessments' => $item
                ];
            });
        
    }
}
