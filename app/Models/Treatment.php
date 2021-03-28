<?php

namespace App\Models;

use App\Helpers\Hasher;
use App\Models\Assessment;
use App\Models\Consultation;
use Carbon\Carbon;
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
        'user_id',
        'client_id',
        'organisation_id',
        'created_at',
        'ended_at',
        'updated_at',
    ];

    protected $dates = [
        'ended_at'
    ];

    protected $appends = ['hashed_id', 'started', 'ended'];

    public function getHashedIdAttribute()
    {
        return Hasher::encode($this->attributes['id']);
    }

    public function getStartedAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('d/m/Y');
    }

    public function getEndedAttribute()
    {
        if (is_null($this->attributes['ended_at']) ) {
            return 'Present';
        }
        return Carbon::parse($this->attributes['ended_at'])->format('d/m/Y');
    }

    public function assessments()
    {
        return $this->hasMany(Assessment::class);
    }
}
