<?php

namespace App\Models;

use App\Helpers\Hasher;
use App\Models\Organisation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Measure extends Model
{
    use HasFactory;

    protected $hidden = [
        'id',
        'created_at',
        'updated_at',
    ];

    protected $appends = ['hashed_id'];

    public function getHashedIdAttribute()
    {
        return Hasher::encode($this->attributes['id']);
    }


    public function getStructureAttribute($value)
    {
        return json_decode($value);
    }


    public function getDetailsAttribute($value)
    {
        return json_decode($value);
    }

    public function organisations()
    {
        return $this->belongsToMany(Organisation::class);
    }
    
}
