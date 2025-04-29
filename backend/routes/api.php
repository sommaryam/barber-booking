<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\API\ServiceController;
use App\Http\Controllers\API\BarberController;
use App\Http\Controllers\API\AppointmentController;
use App\Http\Controllers\API\ScheduleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminController; 
use App\Models\Service;
use App\Models\Barber;
use App\Models\Appointment;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| These routes handle all API requests for the application.
*/

// ---------- Public Routes ----------
Route::post('/login', [AuthController::class, 'login']);
Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/barbers', [BarberController::class, 'index']);
Route::post('/reservation', [ReservationController::class, 'store']);
Route::get('/barber/{serviceId}', [BarberController::class, 'getBarberByService']);
Route::post('/appointments', [AppointmentController::class, 'store']);
Route::delete('/admin/barbers/{id}', [AdminController::class, 'deleteBarber']);
Route::delete('/admin/services/{id}', [AdminController::class, 'deleteService']);
// ---------- Protected Routes (auth:sanctum) ----------
Route::middleware('auth:sanctum')->group(function () {

    // User
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Admin
    Route::prefix('admin')->group(function () {
        Route::get('/user', [AdminAuthController::class, 'user']);
        Route::post('/logout', [AdminAuthController::class, 'logout']);
        Route::get('/stats', [AdminController::class, 'stats']);
    });

    // Services & Barbers
    Route::post('/services', [ServiceController::class, 'store']);
    Route::delete('/admin/services/{id}', [ServiceController::class, 'destroy']);
    Route::post('/barbers', [BarberController::class, 'store']);
    Route::delete('/admin/barbers/{id}', [BarberController::class, 'destroy']);
    Route::get('/services/{id}/barbers', [BarberController::class, 'byService']);
});
