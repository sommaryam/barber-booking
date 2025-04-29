<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Mail\AppointmentBooked;
use Illuminate\Support\Facades\Mail;

class AppointmentController extends Controller
{
    public function store(Request $request)
    {
     
        $request->validate([
            'user_id'    => 'required|integer|exists:users,id',
            'service_id' => 'required|integer|exists:services,id',
            'barber_id'  => 'required|integer|exists:barbers,id',
            'date'       => 'required|date',
            'email'      => 'required|email',
        ]);

        
        $appointment = Appointment::create([
            'user_id'    => $request->user_id,
            'service_id' => $request->service_id,
            'barber_id'  => $request->barber_id,
            'date'       => $request->date,
            'time'       => $request->time ?? null,
            'email'      => $request->email,
        ]);

       
        $details = [
            'service' => $appointment->service->name,
            'barber'  => $appointment->barber->name,
            'date'    => $appointment->date,
            'time'    => $appointment->time ?? '—',
            'email'   => $appointment->email,
        ];

   
        Mail::to('admin@example.com')->send(new AppointmentBooked($details));

        return response()->json(['message' => 'Appointment booked successfully!'], 201);
    }
}