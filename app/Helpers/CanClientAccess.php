<?php

namespace App\Helpers;

use App\Models\Client;
use App\Helpers\Hasher;
use Illuminate\Support\Facades\Auth;

class CanClientAccess
{
    public static function assessment($hashed_client_id)
    {
        $client = Client::findOrFail(Hasher::decode($hashed_client_id)); 
        if ($client->is_active) {
            if ($client->url_access) {
                return true;
            }            
        }
        return false;
    }
}