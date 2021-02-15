<?php

namespace App\Models;

use App\Models\Clinic;
use App\Helpers\Hasher;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Clinician extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $guard = 'clinician';

    protected $appends = ['name', 'hashed_id', 'role'];

    public function getNameAttribute()
    {
        return $this->first_name." ".$this->last_name;
    }

    public function getHashedIdAttribute()
    {
        return Hasher::encode($this->attributes['id']);
    }

    public function getRoleAttribute()
    {
        return 'clinician';
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'organisation_id',
        'clinic_id',
        'can_login',
        'first_name',
        'last_name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'id',
        'email',
        'clinic_id',
        'organisation_id',
        'created_at',
        'updated_at',
        'email_verified_at',
        'password',
        'remember_token',
        'can_login',
    ];

    public function clients()
    {
        return $this->hasMany(Client::class)->orderBy("last_name");
    }

    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }
}
