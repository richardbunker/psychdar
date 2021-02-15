<?php

namespace App\Models;

use App\Models\Client;
use App\Helpers\Hasher;
use App\Models\Clinician;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Clinic extends Model
{
    use HasFactory;
    
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'id',
        'created_at',
        'updated_at',
        'organisation_id',
    ];

    protected $appends = ['hashed_id'];

    public function getHashedIdAttribute()
    {
        return Hasher::encode($this->attributes['id']);
    }

    public function clients()
    {
        return $this->hasMany(Client::class)->orderBy('identifier');
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
}
