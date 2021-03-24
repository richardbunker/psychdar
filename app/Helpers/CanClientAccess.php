<?php

namespace App\Helpers;

use App\Models\Client;
use App\Helpers\Hasher;
use Illuminate\Support\Facades\Auth;

class CanClientAccess
{
    public static function assessment($client_hashed_id)
    {
        $client = Client::findOrFail(Hasher::decode($client_hashed_id)); 
        if ($client->is_active) {
            if ($client->url_access) {
                return true;
            }            
        }
        return false;
    }
}