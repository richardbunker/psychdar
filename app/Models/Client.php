<?php

namespace App\Models;

use App\Models\Clinic;
use App\Helpers\Hasher;
use App\Models\Measure;
use App\Models\Clinician;
use App\Models\Treatment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Client extends Model
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
        'organisation_id',
        'created_at',
        'updated_at',
    ];

    protected $appends = ['hashed_id', 'name', 'url'];

    public function getHashedIdAttribute()
    {
        return Hasher::encode($this->attributes['id']);
    }

    public function getNameAttribute()
    {
        return $this->first_name.' '.$this->last_name;
    }

    public function getUrlAttribute()
    {
        return url("/a")."/".$this->hashed_id;
    }

    public function getPreferencesAttribute($value)
    {
        return json_decode($value);
    }

    public function treatments()
    {
        return $this->hasMany(Treatment::class);
    }

    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }
    
    public function measures()
    {
        return $this->belongsToMany(Measure::class);
    }
}
