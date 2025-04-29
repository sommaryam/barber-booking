<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    public function index()
    {
        
        return response()->json(Service::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string',
            'price'       => 'required|numeric',
            'description' => 'required|string',
            'duration'    => 'required|integer',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_url'   => 'nullable|url',
        ]);

        
        if ($request->hasFile('image')) {                     
            $validated['image'] = $request->file('image')
                                          ->store('services','public');
        } elseif ($request->filled('image_url')) {             
            $validated['image'] = $request->image_url;
        }

        $service = Service::create($validated);

        return response()->json([
            'message' => 'Service created successfully',
            'data'    => $service
        ], 201);
    }
    public function destroy($id)
{
    $service = Service::findOrFail($id);
    $service->delete();
    return response()->json(['message' => 'Barber deleted successfully']);
}

}