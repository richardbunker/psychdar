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

    public function clinicians()
    {
        return $this->hasMany(Clinician::class)->orderBy("first_name");
    }
    
    public function organisation()
    {
        return $this->belongsTo(Organisation::class);
    }
    
}
