import VideoBanner from "./components/VideoBanner";
import { motion } from "framer-motion";
import BarberServices from "./components/ComponentsAPI/BarberServices";
import scrollToTop from "./helpers/scrollToTop";
import { useEffect, useState } from "react";
import startVideo from './components/videos/startVideo.mp4';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function App() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    scrollToTop();

    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showIntro ? (
        <div className="h-screen w-screen overflow-hidden bg-black relative">
          <video
            src={startVideo}
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>
      ) : (
        <div className="relative">
          <VideoBanner />
          <section className="py-16 px-6 bg-neutral-900 text-neutral-200 flex flex-col md:flex-row items-center justify-center gap-12">
            <motion.div
              className="flex-1 max-w-2xl"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-5xl text-yellow-600 font-bold mb-6 font-['Open_Sans_Condensed'] tracking-wider">
                Who We Are
              </h2>
              <p className="text-lg text-neutral-400 italic mb-4">Precision. Style. Legacy.</p>
              <p className="text-lg mb-4">
                At <strong>New Look</strong>, we believe a haircut is more than a service — it's a ritual. Founded in 2023, our mission is to bring modern convenience to classic grooming.
              </p>
              <p className="text-lg mb-4">
                From quick online booking to personalized barber selection, we offer a seamless grooming experience tailored for the modern gentleman.
              </p>
              <p className="text-lg">
                Join our community of style-conscious clients who know that a sharp cut speaks volumes.
              </p>
            </motion.div>

            <div className="flex-1 max-w-md">
              <img
                className="w-full rounded-2xl shadow-2xl object-cover grayscale hover:grayscale-0 transition duration-500"
                src="https://images.pexels.com/photos/1895701/pexels-photo-1895701.jpeg"
                alt="Luxury Barber"
              />
            </div>
          </section>
          <div className="bg-cover bg-center py-12 px-4" style={{ backgroundImage: "url('bg_barbSe.jpg')" }}>
            <BarberServices />
          </div>

        </div>
      )}
    </>
  );
}

export default App;