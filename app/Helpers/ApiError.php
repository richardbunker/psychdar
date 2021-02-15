<?php

namespace App\Helpers;

class ApiError
{
    public static function throw403()
    {
        return response()->json(['error' => 'Not authorized.'], 403);
    }
}