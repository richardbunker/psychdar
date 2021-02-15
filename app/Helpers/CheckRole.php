<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Auth;

class CheckRole
{
    public static function isType($role)
    {
        $authUser = Auth::user();

        if ($authUser->role === $role) {
            return true;           
        }

        return false;
    }
    
    public static function getRole() {

       return Auth::user()->role;
       
    }
}