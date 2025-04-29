<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Service;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'barber_id',
        'service_id',
        'booking_time',
        'status',
    ];


    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    
    public function barber()
    {
        return $this->belongsTo(User::class, 'barber_id');
    }


    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
