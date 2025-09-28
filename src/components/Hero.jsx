import React, { useState, useEffect } from "react";
import { FaMotorcycle, FaArrowRight, FaSearch, FaBicycle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
  "/bikes/gt.png",
  "/bikes/350.png",
  "/bikes/ns.png",
  "/bikes/access.png",
  "/bikes/ns1.png",
];

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, type: "spring" },
  }),
};

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carousel auto cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 animate-gradient-x flex flex-col lg:flex-row items-center justify-between px-8 md:px-20 py-10 overflow-hidden">
      
      {/* Left Section */}
      <div className="flex-1 flex flex-col gap-10 relative z-10">
        {/* Title & Description */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-3 flex items-center gap-2">
            Wheelo <FaMotorcycle className="text-yellow-500 animate-bounce" />
          </h1>
          <p className="text-gray-700 text-lg md:text-xl max-w-lg">
            Explore first-hand and second-hand bikes & scooters. Compare models, 
            check brands, and find the perfect ride for you.
          </p>
        </motion.div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              icon: <FaSearch className="text-yellow-500 text-2xl animate-pulse" />,
              title: "Search & Compare",
              text: "Search bikes or scooters by brand and model. Compare first-hand and second-hand options.",
            },
            {
              icon: <FaBicycle className="text-blue-500 text-2xl animate-bounce" />,
              title: "Brands & Used Bikes",
              text: "Browse popular brands like Honda, Yamaha, Suzuki, KTM, Bajaj. Used bikes also available.",
            },
            {
              icon: <FaArrowRight className="text-green-500 text-2xl animate-pulse" />,
              title: "Compare Bikes",
              text: "Compare multiple bikes or scooters to find the perfect mix of style, price, and performance.",
            },
            {
              icon: <FaMotorcycle className="text-red-500 text-2xl animate-bounce" />,
              title: "Scooters Too",
              text: "Not just bikes — find scooters with great mileage and style options for city rides.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotate: -1 }}
              className="rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-yellow-300 transition duration-300 p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                {card.icon}
                <h2 className="text-lg font-semibold">{card.title}</h2>
              </div>
              <p className="text-gray-500 text-sm">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Carousel */}
      <motion.div
        className="flex-1 mt-10 lg:mt-0 relative flex justify-center items-center z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="w-full max-w-md h-96 overflow-hidden rounded-2xl shadow-2xl relative">
          <AnimatePresence>
            {heroImages.map((img, index) =>
              index === currentIndex ? (
                <motion.img
                  key={img}
                  src={img}
                  alt={`Bike ${index + 1}`}
                  className="absolute w-full h-full object-cover rounded-2xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1 }}
                />
              ) : null
            )}
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 flex gap-2">
            {heroImages.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === currentIndex ? "bg-yellow-500 animate-ping" : "bg-gray-300"
                } transition-all`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Decorative Background Circles */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-yellow-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-52 h-52 bg-blue-400 rounded-full opacity-20 blur-3xl animate-ping"></div>
    </section>
  );
};

export default Hero;
