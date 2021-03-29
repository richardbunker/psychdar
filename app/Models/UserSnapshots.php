<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSnapshots extends Model
{
    use HasFactory;

    public function getDataAttribute($value)
    {
        return json_decode($value);
    }
}
