<?php

namespace App\Http\Controllers;

use App\Models\User;
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
            'measures' => Auth::user()->measures
        ]);
    }

    public function create()
    {                
        return Inertia::render('Measures/Create');
    }

    public function show($hashed_measure_id)
    {         
        $measure = Measure::findOrFail(Hasher::decode($hashed_measure_id));       
        return Inertia::render('Measures/Show', [
            'measure' => $measure
        ]);
    }

    public function edit($hashed_measure_id)
    {         
        $measure = Measure::findOrFail(Hasher::decode($hashed_measure_id));    
        return Inertia::render('Measures/Edit', [
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

        $user = User::find(Auth::user()->id);

        $user->measures()->attach($newMeasure->id);
        
        return Redirect::route('showMeasure', $newMeasure->hashed_id);  
    }

    public function update(Request $request)
    {        
        $measureToUpdate = Measure::find(Hasher::decode($request->hashedId));
        $measureToUpdate->name = $request->structure["name"];
        $measureToUpdate->abbreviation = $request->structure["abbr"];
        $measureToUpdate->structure = json_encode($request->structure);
        $measureToUpdate->details = null;
        $measureToUpdate->save();
        
        return Redirect::route('showMeasure', $measureToUpdate->hashed_id);
    }

    public function updateDetails(Request $request)
    {
        $measureToUpdate = Measure::find(Hasher::decode($request->hashedId));
        $measureToUpdate->details = json_encode($request->details);
        $measureToUpdate->save();
                
        return Redirect::route('showMeasure', $measureToUpdate->hashed_id);  
    }

    public function publishMeasure(Request $request)
    {
        $measureToUpdate = Measure::find(Hasher::decode($request->hashedId));
        $measureToUpdate->is_published = true;
        $measureToUpdate->save();
                
        return Redirect::route('showMeasure', $measureToUpdate->hashed_id); 
    }
}
