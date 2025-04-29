# Barber Booking

A full-featured barber booking application built with **Laravel** (backend) and **React** (frontend). It allows users to browse services, choose barbers, and book appointments. Admins can manage services, barbers, and schedules.

## Features

### Admin Panel
- Add / Delete barbers
- Add / Delete services
### Customer Interface
- Browse available services
- View barbers by selected service
- Choose date & time for booking
- Make reservations easily

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Laravel, MySQL
- **API Authentication:** Laravel Sanctum

## Installation

### Backend (Laravel)
1. Navigate to the backend folder:
    ```bash
    cd backend
    ```
2. Install the dependencies:
    ```bash
    composer install
    ```
3. Create your `.env` file:
    ```bash
    cp .env.example .env
    ```
4. Generate the application key:
    ```bash
    php artisan key:generate
    ```
5. Run the migrations:
    ```bash
    php artisan migrate
    ```
6. Start the Laravel development server:
    ```bash
    php artisan serve
    ```

### Frontend (React)
1. Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Start the React development server:
    ```bash
    npm start
    ```

## Author

- GitHub: [@sommaryam](https://github.com/sommaryam)
