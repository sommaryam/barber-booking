<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;



class BookingController extends Controller
{

    public function create()
    {
        $barbers = User::where('role', 'barber')->get();
        $services = Service::all();
        return view('bookings.create', compact('barbers', 'services'));
    }


    public function store(Request $request)
    {

        $request->validate([
            'client_id' => 'required|exists:users,id',
            'barber_id' => 'required|exists:users,id',
            'service_id' => 'required|exists:services,id',
            'booking_time' => 'required|date',
            'status' => 'required|in:pending,confirmed,canceled',
        ]);


        Booking::create($request->all());

        return redirect()->route('bookings.index')->with('success', 'Reservation completed successfully');
    }


    public function index()
    {
        $bookings = Booking::with(['client', 'barber', 'service'])->get();
        return view('bookings.index', compact('bookings'));
    }


    public function edit($id)
    {
        $booking = Booking::findOrFail($id);
        $barbers = User::where('role', 'barber')->get();
        $services = Service::all();
        return view('bookings.edit', compact('booking', 'barbers', 'services'));
    }


    public function update(Request $request, $id)
    {

        $request->validate([
            'client_id' => 'required|exists:users,id',
            'barber_id' => 'required|exists:users,id',
            'service_id' => 'required|exists:services,id',
            'booking_time' => 'required|date',
            'status' => 'required|in:pending,confirmed,canceled',
        ]);

        $booking = Booking::findOrFail($id);
        $booking->update($request->all());

        return redirect()->route('bookings.index')->with('success', 'Reservation updated successfully');
    }


    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->delete();

        return redirect()->route('bookings.index')->with('success', 'Reservation deleted');
    }


    public function show($id)
    {
        $booking = Booking::with(['client', 'barber', 'service'])->findOrFail($id);
        return view('bookings.show', compact('booking'));
    }
    
}
