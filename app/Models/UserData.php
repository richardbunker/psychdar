<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserData extends Model
{
    use HasFactory;

    public function getOutcomeDataAttribute($value)
    {
        return json_decode($value);
    }
}
