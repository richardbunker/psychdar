<?php

namespace App\Models;

use App\Models\User;
use App\Helpers\Hasher;
use App\Models\Measure;
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
        'user_id',
        'clinic_id',
        'clinician_id',
        'organisation_id',
        'created_at',
        'updated_at',
    ];

    protected $appends = ['hashed_id', 'url'];

    public function getHashedIdAttribute()
    {
        return Hasher::encode($this->attributes['id']);
    }

    public function getUrlAttribute()
    {
        return url("/a")."/".$this->hashed_id;
    }

    public function getPreferencesAttribute($value)
    {
        return json_decode($value);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function treatments()
    {
        return $this->hasMany(Treatment::class)->orderBy('created_at', 'desc');
    }

    public function activetreatments()
    {
        return $this->treatments()->where('ended_at', null);
    }
    
    public function measures()
    {
        return $this->belongsToMany(Measure::class);
    }

    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
}
