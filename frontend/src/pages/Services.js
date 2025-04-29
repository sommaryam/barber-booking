import React, { useEffect } from 'react';
import BarberServices from '../components/ComponentsAPI/BarberServices';
import scrollToTop from '../helpers/scrollToTop';

function Services() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <div className="relative">
        <img
          className="brightness-50 object-cover h-[50vh] w-full"
          src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg"
          alt="Our Services Banner"
        />
        <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl lg:text-7xl font-extrabold text-yellow-500 drop-shadow-lg">
          Our Services
        </h2>
      </div>

      <section className="py-16 px-6 lg:px-24 flex flex-col items-center gap-12">
        <p className="text-lg text-center max-w-2xl text-neutral-300">
          Discover a range of premium grooming services designed to bring out your best style. Whether it's a classic cut, a modern fade, or a hot towel shave, our barbers bring expertise and passion to every detail.
        </p>

        <div className="w-full max-w-6xl">
          <BarberServices />
        </div>
      </section>
    </div>
  );
}

export default Services;