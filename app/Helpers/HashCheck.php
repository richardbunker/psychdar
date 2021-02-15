<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Auth;

class HashCheck
{
    public static function canAuthUserAccessWithHash($hashed_id)
    {
        $authUser = Auth::user();

        if ($authUser->hashed_id === $hashed_id) {
            return true;
        }

        return false;
    }

    public static function strictEqualTo($first_hash, $second_hash)
    {
        if ($first_hash === $second_hash) {
            return true;
        }

        return false;
    }
}