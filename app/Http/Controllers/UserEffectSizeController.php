<?php

namespace App\Http\Controllers;

use App\Helpers\Hasher;
use App\Models\Client;
use Illuminate\Http\Request;
use App\Services\EffectSizeService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class UserEffectSizeController extends Controller
{
    public function index($hashed_measure_id, $dateRange)
    {   
        $dates = explode("_", $dateRange);
        $from = Carbon::parse($dates[0])->toDateTimeString();
        $to = Carbon::parse($dates[1])->toDateTimeString();
        $clients = Client::byUser(Auth::user()->id)
            ->with(['treatments' => function ($query) use ($from, $to) {
                $query->where('created_at', ">=", $from)->where('ended_at', "<=", $to);
            },
            'treatments.assessments' => function ($query) use ($hashed_measure_id) {
                $query->where('measure_id', Hasher::decode($hashed_measure_id));
            }])
            ->get();
        $prePost = new EffectSizeService;
        return $prePost->prepareArray($clients);
    }
}
