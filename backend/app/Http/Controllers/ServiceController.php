<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    public function index()
    {
        return response()->json(Service::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'required|string',
            'price'       => 'required|numeric',
            'duration'    => 'required|integer',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_url'   => 'nullable|url',          
        ]);

       
        $imagePath = null;

        if ($request->hasFile('image')) {                          
            $imagePath = $request->file('image')->store('services','public');
        } elseif ($request->filled('image_url')) {                
            $imagePath = $request->image_url;
        }

        $service = Service::create([
            'name'        => $request->name,
            'description' => $request->description,
            'price'       => $request->price,
            'duration'    => $request->duration,
            'image'       => $imagePath,
        ]);

        return response()->json(['message'=>'Service added successfully!','data'=>$service],201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'required|string',
            'price'       => 'required|numeric',
            'duration'    => 'required|integer',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_url'   => 'nullable|url',
        ]);

        $service = Service::findOrFail($id);
        $imagePath = $service->image;

        if ($request->hasFile('image')) {                            
            if ($service->image && !filter_var($service->image,FILTER_VALIDATE_URL)) {
                Storage::disk('public')->delete($service->image);    
            }
            $imagePath = $request->file('image')->store('services','public');
        } elseif ($request->filled('image_url')) {                  
            $imagePath = $request->image_url;
        }

        $service->update([
            'name'        => $request->name,
            'description' => $request->description,
            'price'       => $request->price,
            'duration'    => $request->duration,
            'image'       => $imagePath,
        ]);

        return response()->json(['message'=>'Service updated successfully','data'=>$service]);
    }

   
}