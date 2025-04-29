<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Service;
class Barber extends Model
{
    use HasFactory;

    
    protected $fillable = [
        'name', 'email', 'phone_number', 'specialization', 'profile_picture',
    ];
    
    public function services(){
        return $this->belongsToMany(Service::class);
    }



    public function unavailableTimes()
    {
        return $this->hasMany(UnavailableTime::class); 
    }


   

    
    public function bookings()
    {
        return $this->hasMany(Booking::class); 
    }
}

