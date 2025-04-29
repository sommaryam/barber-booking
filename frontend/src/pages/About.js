import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import scrollToTop from '../helpers/scrollToTop';

function About() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
     <div className="relative">
        <img
          src="https://images.pexels.com/photos/3037244/pexels-photo-3037244.jpeg?auto=compress&cs=tinysrgb&w=600"
          className="brightness-50 object-cover h-[50vh] w-full"
          alt="Barber Shop Banner"
        />
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-400 text-5xl lg:text-4xl font-extrabold tracking-wide"
        >
          The Story Behind the Style
        </motion.h2>
      </div>

     
      <section className="py-16 px-6 lg:px-24 flex flex-col lg:flex-row items-center gap-12">
        <motion.img
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          src="https://images.pexels.com/photos/6475046/pexels-photo-6475046.jpeg"
          className="w-full lg:w-1/2 rounded-xl shadow-xl object-cover"
          alt="Barber History"
        />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-xl text-center lg:text-left"
        >
          <h3 className="text-yellow-400 text-3xl font-bold mb-4">How It All Started</h3>
          <p className="mb-4 text-lg leading-relaxed text-neutral-300">
            From a one-chair shop to a local grooming icon — Billy's Barber began with a dream to bring precision cuts and authentic vibes to Ottawa’s heart.
          </p>
          <p className="text-lg leading-relaxed text-neutral-400">
            What started in 2023 with a single barber has grown into a team of artists dedicated to elevating every style. Each haircut is a reflection of our passion and craft.
          </p>
        </motion.div>
      </section>

       <section className="py-16 px-6 lg:px-24 bg-black bg-opacity-20 backdrop-blur-md flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-xl text-center lg:text-left"
        >
          <h3 className="text-yellow-400 text-3xl font-bold mb-4">Why We Matter</h3>
          <p className="mb-4 text-lg leading-relaxed text-neutral-300">
            We’re not just a barbershop — we’re a community. A place where stories are shared, confidence is built, and the art of grooming is celebrated daily.
          </p>
          <p className="text-lg leading-relaxed text-neutral-400">
            Our mission is to deliver more than great haircuts. We deliver presence, pride, and power in every session.
          </p>
        </motion.div>
        <motion.img
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          src="https://images.pexels.com/photos/7195808/pexels-photo-7195808.jpeg"
          className="w-full lg:w-1/2 rounded-xl shadow-xl object-cover"
          alt="Barber Team"
        />
      </section>
    </div>
  );
}

export default About;