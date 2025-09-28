// pages/UsedBikes.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, IndianRupee, Bike } from "lucide-react";

// --- Sample Data ---
const usedBikes = [
  {
    id: 1,
    name: "Royal Enfield Classic 350",
    price: 135000,
    year: 2021,
    km: "12,000 km",
    location: "Bangalore",
    img: "bikes/350.png",
  },
  {
    id: 2,
    name: "GT 650",
    price: 165000,
    year: 2022,
    km: "8,500 km",
    location: "Hyderabad",
    img: "bikes/gt.png",
  },
  {
    id: 3,
    name: "Honda Activa 6G",
    price: 68000,
    year: 2020,
    km: "15,000 km",
    location: "Pune",
    img: "bikes/110.png",
  },
  {
    id: 4,
    name: "ns 200",
    price: 175000,
    year: 2021,
    km: "10,000 km",
    location: "Delhi",
    img: "bikes/ns.png",
  },
];

const UsedBikes = () => {
  const [search, setSearch] = useState("");

  const filteredBikes = usedBikes.filter((bike) =>
    bike.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-100 p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <Bike className="w-10 h-10 text-blue-700" />
            <h1 className="text-4xl font-extrabold text-blue-900">Used Bikes</h1>
          </motion.div>
          <p className="text-blue-800 mt-2 font-medium">
            Find your dream second-hand ride at the best price 🏍️
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Search bikes (e.g., Royal Enfield)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>

        {/* Bike Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBikes.map((bike) => (
            <motion.div
              key={bike.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100"
            >
              <img
                src={bike.img}
                alt={bike.name}
                className="w-full h-69 object-cover"
              />
              <div className="p-5">
                <h2 className="text-lg font-bold text-blue-900">{bike.name}</h2>
                <p className="text-gray-600 text-sm mb-3">
                  {bike.year} • {bike.km}
                </p>

                <div className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                  <IndianRupee className="w-5 h-5" />
                  {bike.price.toLocaleString()}
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  {bike.location}
                </div>

                <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-semibold hover:opacity-90 transition">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredBikes.length === 0 && (
          <p className="text-center text-blue-900 font-medium mt-10">
            🚫 No bikes found. Try another search.
          </p>
        )}
      </div>
    </div>
  );
};

export default UsedBikes;
