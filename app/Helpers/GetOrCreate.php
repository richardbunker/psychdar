<?php

namespace App\Helpers;

use App\Models\Client;
use App\Helpers\Hasher;
use App\Models\Treatment;
use Illuminate\Support\Facades\Auth;

class GetOrCreate
{
    public static function treatment(Client $client)
    {
        if ($client->activeTreatments->count() === 0) {
            $treatment = new Treatment;  
            $treatment->user_id = Auth::user()->id;
            $treatment->client_id = $client->id;
            $treatment->save();
            return $treatment->id;        
        }
        $activeTreatment = $client->activeTreatments->first();
        return $activeTreatment->id;
    }
}