<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable ,HasFactory;
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
        'bio',
        'is_admin',
       
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_admin'=>'boolean',
    ];

    public function isAdmin()
    {
        return $this->is_admin === 1;
    }

    public function barberProfile()
    {
        return $this->hasOne(BarberProfile::class);
    }

    
    public function bookingsAsClient()
    {
        return $this->hasMany(Booking::class, 'client_id');
    }

    
    public function bookingsAsBarber()
    {
        return $this->hasMany(Booking::class, 'barber_id');
    }
}
