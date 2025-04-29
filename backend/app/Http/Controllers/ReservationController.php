<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function store(Request $request)
{

    $validated = $request->validate([
        'service' => 'required|string',
        'barber_id' => 'required|exists:barbers,id',
        'date' => 'required|date|after_or_equal:today',
        'time' => 'required|string',
        'email' => 'required|email',
    ]);

  
    return response()->json([
        'message' => 'Reservation validated successfully!',
        'data' => $validated
    ]);
}
    
}
