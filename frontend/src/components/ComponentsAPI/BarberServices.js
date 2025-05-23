import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.3,
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const BarberServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/services")
      .then((response) => {
        setServices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching services: " + error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="flex flex-col items-center">
          <DotLottieReact
            src="https://lottie.host/cf83f8e2-b618-4b4b-bc86-bc83df74f03b/OMIKRwmk3P.lottie"
            loop
            autoplay
            style={{ width: 250, height: 250 }}
          />
          <p className="text-yellow-500 mt-4 text-xl">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <section className="w-full pb-4 px-4 bg-red-950 bg-opacity-10 mt-4 flex flex-col md:flex-row mx-auto justify-center items-center gap-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto py-12 px-6 bg-neutral-800 text-neutral-200 rounded-xl shadow-lg"
      >
        <h2 className="text-center text-4xl font-bold text-yellow-500 mb-8">
          Our Premium Barber Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="flex flex-col items-start p-6 bg-neutral-900 rounded-lg shadow-md hover:shadow-xl transition duration-300 hover:bg-neutral-700"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-50 object-cover rounded-t-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-yellow-200 mb-2">
                {service.name}
              </h3>
              <div className="w-full h-px bg-neutral-500 mb-4"></div>
              <p className="text-xl text-yellow-500 mb-4">{service.price}$</p>
              <p className="text-lg">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default BarberServices;