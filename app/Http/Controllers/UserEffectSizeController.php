<?php

namespace App\Http\Controllers;

use App\Helpers\Hasher;
use App\Models\Client;
use Illuminate\Http\Request;
use App\Services\EffectSizeService;
use Illuminate\Support\Facades\Auth;

class UserEffectSizeController extends Controller
{
    public function index($hashed_measure_id)
    {        
        $clients = Client::byUser(Auth::user()->id)
            ->with(['treatments.assessments' => function ($query) use ($hashed_measure_id) {
                $query->where('measure_id', Hasher::decode($hashed_measure_id));
            }])->get();
        $prePost = new EffectSizeService;
        return $prePost->prepareArray($clients);
    }
}
