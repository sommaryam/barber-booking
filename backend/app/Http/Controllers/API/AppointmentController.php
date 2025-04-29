<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index()
    {
        return Appointment::with(['user', 'barber', 'service'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'barber_id' => 'required|exists:barbers,id',
            'service_id' => 'required|exists:services,id',
            'date' => 'required|date',
            'time' => 'required|string',
            'email' => 'required |email'
        ]);

        $exists= Appointment::where('barber_id',
          $validated['barber_id'])
            ->where('date',$validated['date'])
            ->where('time',$validated['time'])
            ->exists();
        if($exists){
            return response()->json(['message'=>'this time slot is already booked'],409);
        }

        $appointment = Appointment::create($validated);

        
        return response()->json([
            'message' => 'Appointment created successfully!',
            'date' => $appointment
        ],201);

    }

    public function show($id)
    {
        return Appointment::with(['user', 'barber', 'service'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->update($request->all());

        return response()->json($appointment, 200);
    }

    public function destroy($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();

        return response()->json(null, 204);
    }
}
