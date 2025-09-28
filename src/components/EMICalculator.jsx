// components/EMICalculator.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bike, Gauge, Wallet, ChevronDown } from "lucide-react";

// --- Mock Bike Data ---
const bikes = [
  { id: "yamaha-r15", name: "Yamaha R15 V4", price: 180000 },
  { id: "re-classic350", name: "Royal Enfield Classic 350", price: 220000 },
  { id: "ktm-duke", name: "KTM Duke 250", price: 240000 },
  { id: "ather-450x", name: "Ather 450X", price: 160000 },
  { id: "ola-s1pro", name: "Ola S1 Pro", price: 150000 },
];

const EMICalculator = () => {
  const [selectedBike, setSelectedBike] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const calculateEMI = () => {
    if (!selectedBike) return;

    const bikePrice = bikes.find((b) => b.id === selectedBike)?.price || 0;
    const P = bikePrice - parseFloat(downPayment || 0); // loan amount
    const R = parseFloat(rate) / 12 / 100; // monthly interest
    const N = parseFloat(tenure); // months

    if (P > 0 && R >= 0 && N > 0) {
      const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      const total = emiValue * N;
      const interest = total - P;

      setEmi(emiValue.toFixed(2));
      setTotalPayment(total.toFixed(2));
      setTotalInterest(interest.toFixed(2));
    } else {
      setEmi(null);
      setTotalPayment(null);
      setTotalInterest(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-100 flex items-center justify-center p-6 pt-24">
      <motion.div
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 border border-blue-200"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Bike className="w-10 h-10 text-blue-600 animate-bounce" />
          <h1 className="text-4xl font-extrabold text-blue-900">Bike EMI Calculator</h1>
        </div>
        <p className="text-center text-blue-700 font-medium mb-8">
          Select your <span className="font-bold">Bike / Scooter</span> and plan EMI easily 🚴
        </p>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Bike Select */}
          <motion.div
            className="p-4 bg-blue-50 rounded-xl shadow hover:shadow-lg transition relative"
            whileHover={{ scale: 1.02 }}
          >
            <label className="block text-blue-900 font-semibold mb-2">
              Select Bike
            </label>
            <div className="relative">
              <select
                value={selectedBike}
                onChange={(e) => setSelectedBike(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose a Bike</option>
                {bikes.map((bike) => (
                  <option key={bike.id} value={bike.id}>
                    {bike.name} (₹ {bike.price.toLocaleString()})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </motion.div>

          {/* Down Payment */}
          <motion.div
            className="p-4 bg-blue-50 rounded-xl shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <label className="block text-blue-900 font-semibold mb-2">
              Down Payment (₹)
            </label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="e.g., 50000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </motion.div>

          {/* Interest Rate */}
          <motion.div
            className="p-4 bg-blue-50 rounded-xl shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <label className="block text-blue-900 font-semibold mb-2">
              Interest Rate (% p.a.)
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g., 9.5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </motion.div>

          {/* Tenure */}
          <motion.div
            className="p-4 bg-blue-50 rounded-xl shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.02 }}
          >
            <label className="block text-blue-900 font-semibold mb-2">
              Tenure (Months)
            </label>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="e.g., 24"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </motion.div>
        </div>

        {/* Button */}
        <motion.button
          onClick={calculateEMI}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-bold text-lg hover:opacity-90 transition"
          whileTap={{ scale: 0.95 }}
        >
          Calculate EMI
        </motion.button>

        {/* Result Section */}
        {emi && (
          <motion.div
            className="mt-8 grid md:grid-cols-3 gap-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-6 bg-blue-50 rounded-xl shadow-inner">
              <Gauge className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h2 className="text-lg font-semibold text-blue-900">Monthly EMI</h2>
              <p className="text-xl font-bold text-blue-800">₹ {emi}</p>
            </div>

            <div className="p-6 bg-blue-50 rounded-xl shadow-inner">
              <Wallet className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h2 className="text-lg font-semibold text-blue-900">Total Payment</h2>
              <p className="text-xl font-bold text-green-700">₹ {totalPayment}</p>
            </div>

            <div className="p-6 bg-blue-50 rounded-xl shadow-inner">
              <Bike className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <h2 className="text-lg font-semibold text-blue-900">Interest Payable</h2>
              <p className="text-xl font-bold text-red-700">₹ {totalInterest}</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default EMICalculator;
