<?php

namespace App\Helpers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CanUserAccess
{
    public static function organisationResources($hashed_organisation_id)
    {
        $user = User::find(Auth::user()->id);
        if ($user->organisationsInclude(Hasher::decode($hashed_organisation_id))) {
            return true;            
        }
        return false;
    }
}