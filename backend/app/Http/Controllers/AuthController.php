<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{
   
    public function login(Request $request)
    {
      
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();


        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        if (!$user->is_admin){
            return response()->json(['message'=>'Unauthorized'],403);
        }
 
        $token = $user->createToken('adminToken')->plainTextToken;

        return response()->json(['token' => $token]);
    }
}
