<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'duration',
        'image'
    ];
    public function getImageAttribute($value)
{
    return filter_var($value, FILTER_VALIDATE_URL)
           ? $value
           : ($value ? asset('storage/'.$value) : null);
}
    public function barbers()
    {
        return $this->belongsToMany(Barber::class);

    }
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
    
    
}
