// src/components/Compare.jsx
import React, { useState, useMemo } from "react";
import {
  Search,
  Sliders,
  DollarSign,
  Droplet,
  Tag,
  Zap,
  Gauge,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- sample data ---------- */
const bikes = [
  { id: 1, name: "Yamaha R15 V4", brand: "Yamaha", price: "₹1,80,000", priceValue: 180000, mileage: "45 kmpl", fuel: "Petrol", image: "https://bikeimages.com/r15v4.png" },
  { id: 2, name: "Royal Enfield Classic 350", brand: "Royal Enfield", price: "₹2,10,000", priceValue: 210000, mileage: "37 kmpl", fuel: "Petrol", image: "https://bikeimages.com/classic350.png" },
  { id: 3, name: "Honda Activa 6G", brand: "Honda", price: "₹80,000", priceValue: 80000, mileage: "50 kmpl", fuel: "Petrol", image: "https://bikeimages.com/activa6g.png" },
  { id: 4, name: "Bajaj Pulsar NS200", brand: "Bajaj", price: "₹1,40,000", priceValue: 140000, mileage: "38 kmpl", fuel: "Petrol", image: "https://bikeimages.com/pulsarns200.png" },
  { id: 5, name: "KTM Duke 250", brand: "KTM", price: "₹2,30,000", priceValue: 230000, mileage: "35 kmpl", fuel: "Petrol", image: "https://bikeimages.com/duke250.png" },
  { id: 6, name: "TVS Apache RTR 160", brand: "TVS", price: "₹1,10,000", priceValue: 110000, mileage: "45 kmpl", fuel: "Petrol", image: "https://bikeimages.com/apache160.png" },
  { id: 7, name: "Hero Splendor Plus", brand: "Hero", price: "₹75,000", priceValue: 75000, mileage: "65 kmpl", fuel: "Petrol", image: "https://bikeimages.com/splendor.png" },
  { id: 8, name: "Ola S1 Pro", brand: "Ola Electric", price: "₹1,25,000", priceValue: 125000, mileage: "181 km/charge", fuel: "Electric", image: "https://bikeimages.com/olas1pro.png" },
  { id: 9, name: "Ather 450X", brand: "Ather", price: "₹1,50,000", priceValue: 150000, mileage: "146 km/charge", fuel: "Electric", image: "https://bikeimages.com/ather450x.png" },
  { id: 10, name: "Suzuki Access 125", brand: "Suzuki", price: "₹90,000", priceValue: 90000, mileage: "48 kmpl", fuel: "Petrol", image: "https://bikeimages.com/access125.png" },
];

const distinct = (arr, key) => [...new Set(arr.map((i) => i[key]))];
const brands = distinct(bikes, "brand");
const fuelTypes = distinct(bikes, "fuel");

/* ---------- small reusable components ---------- */
const FilterCheckbox = ({ label, checked, onChange }) => (
  <label className="flex items-center space-x-3 text-gray-800 cursor-pointer hover:text-purple-600 transition">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
    />
    <span className="text-sm">{label}</span>
  </label>
);

/* ---------- framer-motion variants ---------- */
const listStagger = {
  visible: { transition: { staggerChildren: 0.06 } },
  hidden: {},
};
const cardVariant = {
  hidden: { opacity: 0, y: 12, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 18 } },
};

/* ---------- main component ---------- */
const Compare = () => {
  const [filters, setFilters] = useState({
    brand: [],
    fuel: [],
    minPrice: 0,
    maxPrice: 300000,
  });
  const [searchTerm, setSearchTerm] = useState("");

  // handlers
  const toggleFilter = (type, value) => {
    setFilters((p) => {
      const arr = p[type];
      return { ...p, [type]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };
  const resetFilters = () => setFilters({ brand: [], fuel: [], minPrice: 0, maxPrice: 300000 });

  // filtered list (memoized)
  const filteredBikes = useMemo(() => {
    const s = searchTerm.trim().toLowerCase();
    return bikes.filter((bike) => {
      if (s && !(`${bike.name} ${bike.brand}`.toLowerCase().includes(s))) return false;
      if (filters.brand.length && !filters.brand.includes(bike.brand)) return false;
      if (filters.fuel.length && !filters.fuel.includes(bike.fuel)) return false;
      if (bike.priceValue < filters.minPrice || bike.priceValue > filters.maxPrice) return false;
      return true;
    });
  }, [searchTerm, filters]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Find Your Dream Ride</h1>
          <p className="mt-2 text-lg text-purple-600 font-medium">Compare bikes, scooters & EVs with ease.</p>

          <div className="mt-6 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by model or brand..."
              className="w-full py-3 pl-12 pr-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            />
          </div>
        </div>

        <div className="lg:flex lg:space-x-8">
          {/* sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:w-80 mb-8 lg:mb-0 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 sticky top-6 self-start"
          >
            <div className="flex items-center gap-3 mb-5">
              <Sliders className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800">Filter By</h3>
            </div>

            {/* Price */}
            <div className="mb-6">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700"><DollarSign className="w-4 h-4" /> Price Range</h4>
              <p className="text-xs text-gray-500 mt-1 mb-3">₹{filters.minPrice.toLocaleString('en-IN')} — ₹{filters.maxPrice.toLocaleString('en-IN')}</p>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="300000"
                  step="5000"
                  value={filters.minPrice}
                  onChange={(e) => setFilters((p) => ({ ...p, minPrice: Number(e.target.value) }))}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none"
                />
                <input
                  type="range"
                  min="0"
                  max="300000"
                  step="5000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters((p) => ({ ...p, maxPrice: Number(e.target.value) }))}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none"
                />
              </div>
            </div>

            {/* Fuel */}
            <div className="mb-6">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700"><Droplet className="w-4 h-4" /> Fuel Type</h4>
              <div className="mt-3 flex flex-col gap-2">
                {fuelTypes.map((fuel) => (
                  <FilterCheckbox
                    key={fuel}
                    label={fuel}
                    checked={filters.fuel.includes(fuel)}
                    onChange={() => toggleFilter("fuel", fuel)}
                  />
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="mb-4">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700"><Tag className="w-4 h-4" /> Brand</h4>
              <div className="mt-3 flex flex-col gap-2 max-h-44 overflow-y-auto pr-2">
                {brands.map((b) => (
                  <FilterCheckbox
                    key={b}
                    label={b}
                    checked={filters.brand.includes(b)}
                    onChange={() => toggleFilter("brand", b)}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button onClick={resetFilters} className="flex-1 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition">Clear</button>
              <button onClick={() => setFilters((p) => ({ ...p }))} className="flex-1 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition">Apply</button>
            </div>
          </motion.aside>

          {/* listings */}
          <div className="lg:flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-700">{filteredBikes.length} result{filteredBikes.length !== 1 ? "s" : ""}</p>
              <div className="text-sm text-gray-500">Sorted by <span className="font-medium text-gray-700">Relevance</span></div>
            </div>

            <motion.div initial="hidden" animate="visible" variants={listStagger} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredBikes.length > 0 ? (
                  filteredBikes.map((bike) => (
                    <motion.article
                      key={bike.id}
                      layout
                      variants={cardVariant}
                      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition"
                    >
                      <div className="relative h-44 bg-gray-50 flex items-center justify-center p-4">
                        <img src={bike.image} alt={bike.name} className="max-h-full w-auto object-contain" />
                        <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${bike.fuel === "Electric" ? "bg-blue-500 text-white" : "bg-red-500 text-white"}`}>
                          {bike.fuel === "Electric" ? <Zap className="w-3 h-3 inline mr-1" /> : <Droplet className="w-3 h-3 inline mr-1" />}
                          {bike.fuel}
                        </span>
                      </div>

                      <div className="p-5">
                        <p className="text-sm font-semibold text-purple-600 mb-1">{bike.brand}</p>
                        <h3 className="text-xl font-extrabold text-gray-900 truncate">{bike.name}</h3>

                        <div className="flex items-center justify-between mt-4 border-t border-b py-3 text-sm text-gray-600">
                          <span className="flex items-center gap-2"><Gauge className="w-4 h-4 text-red-500" /> {bike.mileage}</span>
                          <span className="text-2xl font-bold text-green-600">{bike.price}</span>
                        </div>

                        <button className="mt-5 w-full rounded-xl py-3 bg-purple-600 text-white font-bold hover:bg-purple-700 transition transform hover:scale-[1.02] shadow-sm">
                          View Details
                        </button>
                      </div>
                    </motion.article>
                  ))
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-full text-center py-24 text-gray-700"
                  >
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold">No bikes match your filters</h2>
                    <p className="text-gray-500 mt-2">Try widening the price range or clearing some filters.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
