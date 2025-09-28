// components/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Search, Bike } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Common nav items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Compare", path: "/compare" },
    { name: "Book Test Ride", path: "/ride" },
    { name: "EMI Cal", path: "/emi" },
    { name: "Used Bikes", path: "/used-bikes" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-blue-700">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <Bike className="w-8 h-8 text-yellow-400 animate-bounce" />
          </motion.div>
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            Wheelo
          </motion.span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex gap-4">
            {navItems.map((item, i) => (
              <NavLink
                key={i}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-3 py-2 font-medium transition text-gray-700 hover:text-blue-700 ${
                    isActive ? "text-blue-700 font-bold" : ""
                  }`
                }
              >
                <motion.span whileHover={{ scale: 1.1, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                  {item.name}
                </motion.span>
                <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 rounded" />
              </NavLink>
            ))}

            {/* Conditional User Links */}
            {user ? (
              <>
                <NavLink to="/bot" className="px-3 py-2 hover:text-blue-700 font-medium">Bot</NavLink>
                <NavLink to="/skin" className="px-3 py-2 hover:text-blue-700 font-medium">Skin</NavLink>
                <NavLink to="/dashboard" className="px-3 py-2 hover:text-blue-700 font-medium">Dashboard</NavLink>
                <button
                  onClick={() => {
                    setUser(null);
                    localStorage.removeItem("user");
                    navigate("/login");
                  }}
                  className="px-3 py-2 hover:text-blue-700 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className="px-3 py-2 hover:text-blue-700 font-medium">
                Login
              </NavLink>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bikes..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6 text-blue-700" /> : <Menu className="w-6 h-6 text-blue-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-blue-50/70 backdrop-blur-md"
        >
          <div className="flex flex-col space-y-3 px-6 py-4">
            {navItems.map((item, i) => (
              <NavLink
                key={i}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition text-gray-700 hover:bg-blue-200 hover:text-blue-700 ${
                    isActive ? "bg-blue-200 text-blue-700 font-bold" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* Conditional User Links */}
            {user ? (
              <>
                <NavLink to="/bot" className="px-3 py-2 hover:text-blue-700 font-medium">Bot</NavLink>
                <NavLink to="/skin" className="px-3 py-2 hover:text-blue-700 font-medium">Skin</NavLink>
                <NavLink to="/dashboard" className="px-3 py-2 hover:text-blue-700 font-medium">Dashboard</NavLink>
                <button
                  onClick={() => {
                    setUser(null);
                    localStorage.removeItem("user");
                    navigate("/login");
                  }}
                  className="px-3 py-2 hover:text-blue-700 font-medium text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className="px-3 py-2 hover:text-blue-700 font-medium">
                Login
              </NavLink>
            )}

            {/* Mobile Search */}
            <div className="relative mt-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bikes..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
