<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\BarberController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ReviewController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
//default
Route::get('/', function () {
    return view('welcome');
});
//barbers

Route::get('/barbers', [BarberController::class, 'index'])->name('barbers.index');
Route::get('/barber/{id}', [BarberController::class, 'show'])->name('barber.show');
Route::get('barber/{id}/appointments', [BarberController::class, 'appointment'])->name('barber.appointment');
Route::get('/barber/{barber_id}/book');
//booking

Route::middleware(['auth'])->group(function () {
    Route::resource('bookings', BookingController::class);
});
//services

Route::middleware(['auth'])->group(function () {
    Route::resource('services', ServiceController::class);
});

//login/register /Auth
use App\Http\Controllers\UserController;

Route::get('/login', [UserController::class, 'index'])->name('login');
Route::get('/register', [UserController::class, 'showRegistrationForm'])->name('register'); 
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout'])->name('logout'); 

Route::get('/profile', [UserController::class, 'profile'])->middleware('auth');
Route::post('/profile', [UserController::class, 'updateProfile'])->middleware('auth');

//admin
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function() {
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');  // لوحة تحكم المشرف
    Route::get('/users', [AdminController::class, 'showUsers'])->name('users.index');  // عرض جميع المستخدمين
    Route::get('/barbers', [AdminController::class, 'showBarbers'])->name('barbers.index');  // عرض جميع الحلاقين
    Route::get('/bookings', [AdminController::class, 'showBookings'])->name('bookings.index');  // عرض جميع الحجوزات
    Route::delete('/user/{id}', [AdminController::class, 'deleteUser'])->name('users.delete');  // حذف مستخدم
    Route::post('/booking/{id}/status', [AdminController::class, 'updateBookingStatus'])->name('bookings.updateStatus');  // تحديث حالة الحجز
});

//barberAppointment
Route::resource('booking', BookingController::class);
Route::resource('services', ServiceController::class);
Route::resource('boolking', BookingController::class);
//home page
Route::get('/', [HomeController::class, 'index'])->name('home');


//unavailable_times
Route::post('/barbers/{barber_id}/unavailable-time', [BarberController::class, 'addUnavailableTime'])->name('barbers.addUnavailableTime');
Route::get('/barbers/{barber_id}/unavailable-times', [BarberController::class, 'showUnavailableTimes'])->name('barbers.showUnavailableTimes');
