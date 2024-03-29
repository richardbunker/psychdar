<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Helpers\Hasher;
use App\Models\Measure;
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

    public function showJSON($hashed_measure_id)
    {
        return $measure = Measure::findOrFail(Hasher::decode($hashed_measure_id));
    }

    public function preview($hashed_measure_id)
    {
        $measure = Measure::findOrFail(Hasher::decode($hashed_measure_id));
        return Inertia::render('Measures/Preview', [
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
        $newMeasure->is_private = $request->isPrivate;
        $newMeasure->structure = json_encode($request->structure);
        $newMeasure->save();

        $user = User::find(Auth::user()->id);

        $user->measures()->attach($newMeasure->id);

        return Redirect::route('showMeasure', $newMeasure->hashed_id);
    }

    public function update(Request $request)
    {
        $measureToUpdate = Measure::find(Hasher::decode($request->hashedId));
        $measureToUpdate->name = $request->structure["name"];
        $measureToUpdate->structure = json_encode($request->structure);
        if ($request->itemsEdited) {
            $measureToUpdate->scales = null;
        }
        $measureToUpdate->is_private = $request->isPrivate;
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

    public function updateScales(Request $request)
    {
        $measureToUpdate = Measure::find(Hasher::decode($request->hashedId));
        $measureToUpdate->scales = json_encode($request->scales);
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

    public function indexPublic()
    {
        $publicMeasures = Measure::public()->orderBy('name')->get();
        $userMeasures = Auth::user()->measures;

        return [
            "publicMeasures" => $publicMeasures,
            "userMeasures" => $userMeasures
        ];
    }

    public function addMeasure(Request $request)
    {
        $user = User::find(Auth::user()->id);

        $user->measures()->attach(Hasher::decode($request->hashedMeasureId));

        return Redirect::route('indexMeasures');
    }
}
