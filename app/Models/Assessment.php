<?php

namespace App\Models;

use App\Helpers\Hasher;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Assessment extends Model
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
        'treatment_id',
        'organisation_id',
        'measure_id',
        'created_at',
        'updated_at',
    ];

    protected $appends = ['hashed_id'];

    public function getHashedIdAttribute()
    {
        return Hasher::encode($this->attributes['id']);
    }

    public function getDataAttribute($value)
    {
        return json_decode($value);
    }
}
