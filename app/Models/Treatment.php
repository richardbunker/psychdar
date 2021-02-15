<?php

namespace App\Models;

use App\Helpers\Hasher;
use App\Models\Assessment;
use App\Models\Consultation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Treatment extends Model
{
    use HasFactory;
    
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'id',
        'clinic_id',
        'clinician_id',
        'client_id',
        'organisation_id',
        'created_at',
        'updated_at',
    ];

    protected $appends = ['hashed_id'];

    public function getHashedIdAttribute()
    {
        return Hasher::encode($this->attributes['id']);
    }

    // public function consultations()
    // {
    //     return $this->hasMany(Consultation::class);
    // }

    public function assessments()
    {
        return $this->hasMany(Assessment::class);
    }
}
