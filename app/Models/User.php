<?php

namespace App\Models;

use App\Models\Client;
use App\Helpers\Hasher;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $appends = ['hashed_id'];

    public function getHashedIdAttribute()
    {
        return Hasher::encode($this->attributes['id']);
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
        'id',
        'created_at',
        'updated_at',
        'email_verified_at',
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
    
    public function measures()
    {
        return $this->belongsToMany(Measure::class)->orderBy('name');
    }
    
    public function clients()
    {
        return $this->hasMany(Client::class)->orderBy('identifier');
    }
    
    public function data()
    {
        return $this->hasOne(UserData::class);
    }

    public function activeClients()
    {
        return $this->hasMany(Client::class)->where('is_active', 1);
    }

    public function publishedMeasures()
    {
        return $this->measures()->where('is_published', 1);
    }
}
