<?php

namespace App\Models;

use App\Models\User;
use App\Models\Clinic;
use App\Helpers\Hasher;
use App\Models\Measure;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Organisation extends Model
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
        'pivot',
    ];

    protected $appends = ['hashed_id'];

    public function getHashedIdAttribute()
    {
        return Hasher::encode($this->attributes['id']);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function measures()
    {
        return $this->belongsToMany(Measure::class);
    }

    public function clinics()
    {
        return $this->hasMany(Clinic::class);
    }
}
