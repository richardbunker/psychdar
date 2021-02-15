<?php

namespace App\Models;

use App\Models\Organisation;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $appends = ['role'];


    public function getRoleAttribute()
    {
        return 'admin';
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function organisations()
    {
        return $this->belongsToMany(Organisation::class)->withPivot('is_active')->withTimestamps();
    }

    public function organisationsInclude($organisation_id)
    {
        $userOrganisations = $this->organisations;

        $includesOrganisation = $userOrganisations->map(function($organisation) use ($organisation_id) {
            return $organisation->id == $organisation_id ? true : false;
        })->contains(function($values) {
            return $values === true;
        });

        return $includesOrganisation;
        
    }
}
