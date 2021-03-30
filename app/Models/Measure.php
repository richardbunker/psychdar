<?php

namespace App\Models;

use App\Models\User;
use App\Models\Client;
use App\Helpers\Hasher;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Measure extends Model
{
    use HasFactory;

    protected $hidden = [
        'id',
        'created_at',
        'updated_at',
        'pivot'
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

    public function getScalesAttribute($value)
    {
        return json_decode($value);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function clients()
    {
        return $this->belongsToMany(Client::class);
    }

    public function scopePublic($query)
    {
        return $query->where('is_private', false);
    }
    
}
