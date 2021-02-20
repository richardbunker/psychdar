<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Helpers\Hasher;
use App\Models\Measure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class ClientMeasureController extends Controller
{
    public function store(Request $request)
    {
        $client = Client::findOrFail(Hasher::decode($request->clientHashedId));
        $measure = Measure::findOrFail(Hasher::decode($request->measureHashedId));

        $client->measures()->attach($measure->id);

        return Redirect::route('showClient', $client->hashed_id);         
    }
}
