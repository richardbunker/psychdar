<?php

namespace App\Helpers;

use App\Models\Client;
use App\Models\Treatment;
use Illuminate\Support\Facades\Auth;

class CanUserAccess
{
    public static function client($hashed_client_id)
    {
        $client = Client::findOrFail(Hasher::decode($hashed_client_id));
        if (Auth::user()->id === $client->user_id) {
            return true;            
        }
        return false;
    }

    public static function treatment($hashed_treatment_id)
    {
        $treatment = Treatment::findOrFail(Hasher::decode($hashed_treatment_id));
        if (Auth::user()->id === $treatment->user_id) {
            return true;            
        }
        return false;
    }
}