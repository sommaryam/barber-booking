import React, { useEffect } from 'react';
import BarberShopReservation from '../components/ComponentsAPI/BarberShopReservation';
import scrollToTop from '../helpers/scrollToTop';

function Reservations() {

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-yellow-500">


      <div className="relative">
        <img
          className="object-cover h-[60vh] w-full"
          src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg"
          alt="Barber Reservation"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-xl tracking-wide">
            Book Your Royal Cut
          </h1>
        </div>
      </div>


      <section className="py-16 px-4 flex justify-center">
        <div className="bg-neutral-800 shadow-2xl border border-yellow-500 rounded-2xl w-full max-w-5xl p-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center border-b border-yellow-600 pb-4">
            Reservation Details
          </h2>
          <BarberShopReservation />
        </div>
      </section>
    </div>
  );
}

export default Reservations;