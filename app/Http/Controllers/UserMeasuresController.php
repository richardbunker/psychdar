<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Helpers\Hasher;
use App\Models\Measure;
use App\Models\Organisation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class UserMeasuresController extends Controller
{
    public function index()
    {        
        return Inertia::render('Measures/Index', [
            'organisations' => Auth::user()->organisations
        ]);
    }

    public function create()
    {                
        return Inertia::render('Measures/Create', [
            'organisations' => Auth::user()->organisations
        ]);
    }

    public function show($hashed_measure_id)
    {         
        $measure = Measure::find(Hasher::decode($hashed_measure_id));       
        return Inertia::render('Measures/Show', [
            'measure' => $measure
        ]);
    }

    public function store(Request $request)
    {
        $newMeasure = new Measure;
        $newMeasure->name = $request->name;
        $newMeasure->abbreviation = $request->abbr;
        $newMeasure->structure = json_encode($request->all());
        $newMeasure->save();

        $orgCollect = collect($request->orgs);

        foreach ($orgCollect as $orgHash) {
            $organisation = Organisation::find(Hasher::decode($orgHash));
            $organisation->measures()->attach($newMeasure->id);
        }
        
        return Redirect::route('showMeasure', $newMeasure->hashed_id);  
    }

    public function updateDetails(Request $request)
    {
        $measureToUpdate = Measure::find(Hasher::decode($request->hashedId));
        $measureToUpdate->details = json_encode($request->details);
        $measureToUpdate->save();
                
        return Redirect::route('showMeasure', $measureToUpdate->hashed_id);  
    }
}
