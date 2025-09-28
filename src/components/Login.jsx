import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bike, Truck, User, Mail, Lock } from "lucide-react";

const LoginPage = () => {
  const [activeRole, setActiveRole] = useState("user");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const isDealer = activeRole === "dealer";

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(`Logging in as ${activeRole}`, formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-100 via-blue-200 to-blue-100 p-6">
      
      {/* Floating Bike Animations */}
      <motion.img
        src="bikes/ns.png"
        alt="Bike"
        className="absolute top-10 left-5 w-40 rounded-2xl "
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: [0, -20, 0], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <motion.img
        src="bikes/gt.png"
        alt="Bike"
        className="absolute bottom-10 right-10 rounded-2xl w-40 "
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: [0, 20, 0], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl backdrop-blur-lg overflow-hidden"
      >
        {/* Header */}
        <div className="relative p-8 bg-gradient-to-r from-blue-400 to-purple-600 text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <Bike className="mx-auto w-12 h-12 mb-3 text-yellow-400 animate-bounce" />
            <h1 className="text-3xl font-extrabold">Wheelora Login</h1>
            <p className="text-blue-100 mt-2">Sign in to continue your ride journey 🚴‍♂️</p>
          </motion.div>

          {/* Role Tabs */}
          <div className="flex mt-6 bg-white/20 rounded-xl backdrop-blur-md overflow-hidden">
            <button
              onClick={() => setActiveRole("user")}
              className={`flex-1 py-3 flex items-center justify-center gap-2 transition-all ${
                !isDealer
                  ? "bg-white text-blue-700 font-bold shadow-md"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <User className="w-5 h-5" />
              Customer
            </button>
            <button
              onClick={() => setActiveRole("dealer")}
              className={`flex-1 py-3 flex items-center justify-center gap-2 transition-all ${
                isDealer
                  ? "bg-white text-blue-700 font-bold shadow-md"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Truck className="w-5 h-5" />
              Dealer
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-2xl font-bold mb-4 ${
              isDealer ? "text-red-600" : "text-blue-700"
            }`}
          >
            {isDealer ? "Dealer Access" : "Customer Account"}
          </motion.h2>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm text-gray-800"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm text-gray-800"
            />
          </motion.div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={`w-full py-3 rounded-lg font-bold text-lg text-white shadow-lg transition duration-300 ${
              isDealer
                ? "bg-red-500 hover:bg-red-600 shadow-red-300/50"
                : "bg-blue-600 hover:bg-blue-700 shadow-blue-300/50"
            }`}
          >
            {isDealer ? "Login as Dealer" : "Login as Customer"}
          </motion.button>

          {/* Signup */}
          <p className="text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-800 transition"
            >
              Create one
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
