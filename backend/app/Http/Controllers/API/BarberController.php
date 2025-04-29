<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Barber;
use App\Models\Service;

use Illuminate\Http\Request;

class BarberController extends Controller
{

    public function index()
    {

        $barbers = Barber::all();

        return response()->json($barbers);
    }


    public function byService($serviceId)
    {
        $service = Service::findOrFail($serviceId);
        return response()->json(
            $service->barbers()->with('services')->get()
        );
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'bio'         => 'nullable|string',
            'phone'       => 'nullable|string|max:30',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'image_url'   => 'nullable|url',
            'services'    => 'required|array',
            'services.*'  => 'exists:services,id',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('barbers', 'public');
        } elseif ($request->filled('image_url')) {
            $imagePath = $request->image_url;
        }

        $barber = Barber::create([
            'name'            => $validated['name'],
            'bio'             => $validated['bio']   ?? null,
            'phone_number'    => $validated['phone'] ?? null,
            'profile_picture' => $imagePath,
        ]);

        $barber->services()->sync($validated['services']);

        return response()->json([
            'message' => 'Barber created successfully',
            'data'    => $barber->load('services')
        ], 201);
    }
    public function destroy($id)
    {
        $barber = Barber::findOrFail($id);
        $barber->delete();

        return response()->json(['message' => 'Barber deleted successfully']);
    }
}
