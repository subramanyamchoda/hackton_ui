// src/components/AboutPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Bike, Users, Star, Settings, Zap, Compass } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const About = () => {
  const brandLogos = [
    { src: "https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/honda.svg", alt: "Honda" },
    
    { src: "https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/suzuki.svg", alt: "Suzuki" },
    { src: "https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/ktm.svg", alt: "KTM" },
    
  ];

  return (
    <div className="text-gray-900 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 min-h-screen font-sans overflow-hidden">
      {/* Hero with Background Image */}
      <header
        className="relative text-center max-w-7xl mx-auto px-8 pt-29 pb-39 bg-cover bg-center rounded-3xl shadow-lg"
        style={{
          backgroundImage: "url('bikes/show.png')",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>

        <motion.div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight text-white"
          >
            Ride Your Story with <span className="text-blue-400">Wheelo</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 max-w-3xl mb-10 mx-auto"
          >
            Wheelo isn’t just a platform — it’s your trusted partner for discovering, comparing,
            and booking the two-wheeler of your dreams. From first-hand to second-hand rides, we
            make the journey seamless.
          </motion.p>
        </motion.div>
      </header>
    
      {/* Divider */}
      <div className="h-24 bg-gradient-to-t"></div>

      <main className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Mission */}
        <section className="text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-blue-600 mb-2"
          >
            Our Mission
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg text-gray-800 max-w-2xl mx-auto"
          >
            To empower riders with <span className="font-semibold text-blue-700">clarity</span>,
            <span className="font-semibold text-blue-700"> trust</span>, and{" "}
            <span className="font-semibold text-blue-700">choice</span>. We simplify two-wheeler discovery with
            transparency, tools, and a community-first approach.
          </motion.p>
        </section>

        {/* Features Grid */}
        <section>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center"
          >
            What You'll Find on Wheelo
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[ 
              {
                icon: <Compass className="w-10 h-10 text-blue-600" />,
                title: "Seamless Search & Compare",
                desc: "Browse thousands of models with filters by brand, mileage, price, and more.",
              },
              {
                icon: <Bike className="w-10 h-10 text-blue-600" />,
                title: "New & Used Bikes",
                desc: "Discover the latest launches or explore verified second-hand bikes.",
              },
              {
                icon: <Settings className="w-10 h-10 text-blue-600" />,
                title: "Finance & Tools",
                desc: "Plan with EMI calculators, fuel cost estimators, and instant booking options.",
              },
              {
                icon: <Users className="w-10 h-10 text-blue-600" />,
                title: "Community Insights",
                desc: "Read reviews, ratings, and get tailored recommendations from real riders.",
              },
              {
                icon: <Zap className="w-10 h-10 text-blue-600" />,
                title: "Scooters Too",
                desc: "Perfect for city rides — scooters with detailed specs on mileage and style.",
              },
              {
                icon: <Star className="w-10 h-10 text-blue-600" />,
                title: "Trusted & Verified",
                desc: "Every second-hand listing is checked for authenticity and transparency.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -6 }}
                className="bg-white/80 p-8 rounded-2xl shadow-lg hover:shadow-blue-300 transition"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Brand Showcase */}
        <section className="text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-10"
          >
            Trusted Brands We Feature
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-10">
            {brandLogos.map((logo, i) => (
              <motion.img
                key={i}
                src={logo.src}
                alt={logo.alt}
                className="h-12 w-auto filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.2, rotate: 6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              />
            ))}
          </div>
        </section>
      </main>
      <br />
    </div>
  );
};

export default About;
