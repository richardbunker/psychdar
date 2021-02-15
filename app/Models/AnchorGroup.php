<?php

namespace App\Models;

use App\Helpers\Hasher;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AnchorGroup extends Model
{
    use HasFactory;

    protected $hidden = [
        'id',
        'created_at',
        'updated_at',
    ];

    protected $appends = ['hashed_id'];

    public function getHashedIdAttribute()
    {
        return Hasher::encode($this->attributes['id']);
    }

    public function getAnchorsAttribute($value)
    {
        return json_decode($value);
    }
}
