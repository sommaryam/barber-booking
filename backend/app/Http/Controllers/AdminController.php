<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Barber;
use App\Models\Booking;
use App\Models\Service;
use Illuminate\Http\Request;

class AdminController extends Controller
{
   
    public function index()
    {
        
        $usersCount = User::count();
        $barbersCount = Barber::count();
        $bookingsCount = Booking::count();
        
        return view('admin.dashboard', compact('usersCount', 'barbersCount', 'bookingsCount'));
    }

  
    public function showUsers()
    {
        $users = User::all(); 
        return view('admin.users.index', compact('users'));
    }

    
    public function showBarbers()
    {
        $barbers = Barber::all(); 
        return view('admin.barbers.index', compact('barbers'));
    }

    
    public function showBookings()
    {
        $bookings = Booking::all();
        return view('admin.bookings.index', compact('bookings'));
    }

    
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        
        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.');
    }

   
    public function updateBookingStatus($id, Request $request)
    {
        $booking = Booking::findOrFail($id);
        $booking->status = $request->status; 
        $booking->save();

        return redirect()->route('admin.bookings.index')->with('success', 'Booking status updated successfully.');
    }
    public function stats()
{
    $activeBookings = Booking::where('status', 'active')->count(); 
    $totalBarbers = Barber::count();
    $totalServices = Service::count();

    return response()->json([
        'activeBookings' => $activeBookings,
        'totalBarbers' => $totalBarbers,
        'totalServices' => $totalServices,
    ]);
}
public function deleteBarber($id)
{
    $barber = Barber::findOrFail($id);
    $barber->delete();
    return response()->json(['message' => 'Barber deleted successfully']);
}

public function deleteService($id)
{
    $service = Service::findOrFail($id);
    $service->delete();
    return response()->json(['message' => 'Service deleted successfully']);
}
}
