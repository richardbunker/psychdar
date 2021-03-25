<?php

namespace App\Http\Controllers;

use App\Helpers\Hasher;
use App\Models\Client;
use Illuminate\Http\Request;
use App\Services\EffectSizeService;
use Illuminate\Support\Facades\Auth;

class UserEffectSizeController extends Controller
{
    public function index(Request $request)
    {        
        $clients = Client::byUser(Auth::user()->id)
            ->with(['treatments.assessments' => function ($query) use ($request) {
                $query->where('measure_id', 1);
            }])->get();
        $prePost = new EffectSizeService;
        return $prePost->prepareArray($clients);
    }
}
