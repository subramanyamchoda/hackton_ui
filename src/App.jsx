// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./components/About";
import Compare from "./components/Compare";
import LoginPage from "./components/Login";
import DashboardDealer from "./components/Dashboard_dealer";
import Navbar from "./pages/Navbar";
import TestRideBooking from "./components/TestRideBooking";
import EMICalculator from "./components/EMICalculator";
import UsedBikes from "./components/UsedBikes";
const App = () => {
  return (
    <Router>
    <Navbar />
    
    
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<div><Hero /> <About /></div>}/>
        <Route path="/about" element={<About />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ride" element={<TestRideBooking />} />
        <Route path="/emi" element={<EMICalculator />} />
        <Route path="/used-bikes" element={<UsedBikes />} />

        {/* Dealer Dashboard (Protected Route can be added later) */}
        <Route path="/dashboard" element={<DashboardDealer />} />
      </Routes>
    </Router>
  );
};

export default App;
