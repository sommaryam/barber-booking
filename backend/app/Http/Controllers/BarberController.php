<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Barber;
use App\Models\Service;
use App\Models\UnavailableTime;
use Illuminate\Http\Request;


class BarberController extends Controller
{
   
    public function index()
{
    return response()->json(Barber::with('services')->get());
}

   
    public function show($id)
    {
        $barber = Barber::findOrFail($id); 
        $services = Service::all();
        return view('barbers.show', compact('barber', 'services'));
    }

    
    public function appointments($id)
    {
        $barber = Barber::findOrFail($id); 
        $appointments = Booking::where('barber_id', $id)->get(); 
        return view('barbers.appointments', compact('barber', 'appointments'));
    }

    
    public function createBooking($barber_id)
    {
        $barber = Barber::findOrFail($barber_id);
        $services = Service::all();
        return view('bookings.create', compact('barber', 'services'));
    }


    public function storeBooking(Request $request)
    {
        $request->validate([
            'client_id' => 'required',
            'barber_id' => 'required',
            'service_id' => 'required',
            'booking_time' => 'required|date',
            'status' => 'required|in:pending,confirmed,canceled',
        ]);

        Booking::create($request->all());
        return redirect()->route('bookings.index')->with('success','Booking successful');
    }

    
    public function addUnavailableTime(Request $request, $barber_id)
    {
        $request->validate([
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time', // التأكد من أن الوقت النهائي بعد وقت البدء
        ]);

        UnavailableTime::create([
            'barber_id' => $barber_id,
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
        ]);

        return redirect()->route('barber.show', $barber_id)->with('success', 'Unavailable time added successfully');
    }

    
    public function showUnavailableTimes($barber_id)
    {
        $barber = Barber::findOrFail($barber_id);
        $unavailableTimes = $barber->unavailableTimes; 

        return view('barbers.show', compact('barber', 'unavailableTimes'));
    }

    
}
