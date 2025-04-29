<?php

namespace App\Mail;

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AppointmentBooked extends Mailable
{
    use Queueable, SerializesModels;

    public $appointmentDetails;

    public function __construct($appointmentDetails)
    {
        $this->appointmentDetails = $appointmentDetails;
    }

    public function build()
    {
        return $this->subject('Appointment Booked')
                    ->view('emails.appointment_booked'); // Template for the email body
    }
}