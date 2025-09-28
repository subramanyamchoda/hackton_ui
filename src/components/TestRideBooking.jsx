// components/TestRideBooking.jsx
import React, { useState } from "react";
import {
  MapPin,
  CalendarDays,
  Clock,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  User,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Mock Data (Replace with API later) ---
const availableBikes = [
  {
    id: "yamaha-r15v4",
    name: "Roayl Enfield gt 650",
    image:
      "bikes/gt.png",
  },
  {
    id: "re-classic350",
    name: "Royal Enfield Classic 350",
    image:
      "bikes/350.png",
  },
  {
    id: "ktm-duke250",
    name: "access",
    image:
      "bikes/access.png",
  },
  {
    id: "ather-450x",
    name: "Ather 450X",
    image:
      "https://imgd.aeplcdn.com/1280x720/n/cw/ec/48206/450x-right-front-three-quarter.jpeg?isig=0&q=75",
  },
  {
    id: "ola-s1pro",
    name: "Ola S1 Pro",
    image:
      "https://imgd.aeplcdn.com/1280x720/n/cw/ec/46571/ola-s1-pro-right-front-three-quarter.jpeg?isig=0&q=75",
  },
];

const availableDealers = [
  {
    id: "dealer-north",
    name: "Wheelora Motors - North",
    address: "123, Main Street, North City",
  },
  {
    id: "dealer-south",
    name: "Wheelora Motors - South",
    address: "456, Park Avenue, South Town",
  },
  {
    id: "dealer-east",
    name: "Wheelora Motors - East",
    address: "789, Industrial Area, East Ward",
  },
];

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);
    if (hour < 17) slots.push(`${String(hour).padStart(2, "0")}:30`);
  }
  return slots;
};
const timeSlots = generateTimeSlots();

const stepVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -50, scale: 0.95 },
};

const TestRideBooking = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    bikeId: "",
    dealerId: "",
    date: "",
    time: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const validateStep = () => {
    let errors = {};
    let isValid = true;

    if (step === 1 && !bookingData.bikeId) {
      errors.bikeId = "Please select a bike.";
      isValid = false;
    } else if (step === 2) {
      if (!bookingData.dealerId) {
        errors.dealerId = "Please select a dealer.";
        isValid = false;
      }
      if (!bookingData.date) {
        errors.date = "Please select a date.";
        isValid = false;
      }
      if (!bookingData.time) {
        errors.time = "Please select a time slot.";
        isValid = false;
      }
    } else if (step === 3) {
      if (!bookingData.customerName) {
        errors.customerName = "Name is required.";
        isValid = false;
      }
      if (
        !bookingData.customerEmail ||
        !/\S+@\S+\.\S+/.test(bookingData.customerEmail)
      ) {
        errors.customerEmail = "Valid email is required.";
        isValid = false;
      }
      if (!/^\d{10}$/.test(bookingData.customerPhone)) {
        errors.customerPhone = "10-digit phone number required.";
        isValid = false;
      }
    }
    setFormErrors(errors);
    return isValid;
  };

  const handleNextStep = () => {
    if (validateStep()) setStep((p) => p + 1);
  };
  const handlePrevStep = () => setStep((p) => p - 1);
  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };
  const handleSubmitBooking = () => {
    if (validateStep()) setStep(5);
  };

  const selectedBike = availableBikes.find((b) => b.id === bookingData.bikeId);
  const selectedDealer = availableDealers.find(
    (d) => d.id === bookingData.dealerId
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-100 flex items-center justify-center p-4 pt-24">
      <motion.div
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2">
            Book Your Test Ride
          </h1>
          <p className="text-lg text-blue-800">
            Experience your favorite bike before you buy!
          </p>
        </div>

        {/* Step Progress */}
        <div className="flex justify-between items-center mb-10 relative">
          <div className="absolute left-0 right-0 h-1 bg-gray-200 rounded-full mx-4">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="relative z-10 flex flex-col items-center text-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                  step >= s ? "bg-blue-600" : "bg-gray-400"
                }`}
              >
                {step > s ? <CheckCircle className="w-6 h-6" /> : s}
              </div>
              <p className={`mt-2 text-sm font-semibold ${step >= s ? "text-blue-700" : "text-gray-500"}`}>
                {s === 1 && "Bike"}
                {s === 2 && "Dealer & Time"}
                {s === 3 && "Your Info"}
                {s === 4 && "Confirm"}
              </p>
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {/* Step 1 */}
            {step === 1 && (
              <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.4 }}>
                <h2 className="text-3xl font-bold text-blue-900 mb-6 flex items-center">
                 
                  Choose Your Bike
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableBikes.map((bike) => (
                    <label
                      key={bike.id}
                      className={`block p-4 border-2 rounded-xl cursor-pointer transition transform hover:scale-105 ${
                        bookingData.bikeId === bike.id ? "border-blue-600 shadow-lg" : "border-gray-200 hover:border-blue-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="bikeId"
                        value={bike.id}
                        checked={bookingData.bikeId === bike.id}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <img
                        src={bike.image}
                        alt={bike.name}
                        className="w-full h-32 object-contain mb-3 rounded-lg bg-gray-50"
                      />
                      <p className="text-lg font-semibold text-center text-blue-900">{bike.name}</p>
                    </label>
                  ))}
                </div>
                {formErrors.bikeId && <p className="text-red-500 text-sm mt-2">{formErrors.bikeId}</p>}
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.4 }}>
                <h2 className="text-3xl font-bold text-blue-900 mb-6 flex items-center">
                  <MapPin className="w-7 h-7 mr-3 text-red-500" /> Dealer & Time
                </h2>

                <div className="mb-6">
                  <label className="block text-blue-900 font-semibold mb-2">Select Dealer</label>
                  <div className="relative">
                    <select
                      name="dealerId"
                      value={bookingData.dealerId}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Choose a Dealer</option>
                      {availableDealers.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} - {d.address}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {formErrors.dealerId && <p className="text-red-500 text-sm mt-2">{formErrors.dealerId}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-blue-900 font-semibold mb-2 flex items-center">
                      <CalendarDays className="w-5 h-5 mr-2" /> Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={bookingData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    {formErrors.date && <p className="text-red-500 text-sm mt-2">{formErrors.date}</p>}
                  </div>

                  <div>
                    <label className="block text-blue-900 font-semibold mb-2 flex items-center">
                      <Clock className="w-5 h-5 mr-2" /> Time
                    </label>
                    <div className="relative">
                      <select
                        name="time"
                        value={bookingData.time}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Choose a Time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {formErrors.time && <p className="text-red-500 text-sm mt-2">{formErrors.time}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.4 }}>
                <h2 className="text-3xl font-bold text-blue-900 mb-6 flex items-center">
                  <User className="w-7 h-7 mr-3 text-red-500" /> Your Details
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="customerName"
                    placeholder="Full Name"
                    value={bookingData.customerName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                  {formErrors.customerName && <p className="text-red-500 text-sm">{formErrors.customerName}</p>}
                  <input
                    type="email"
                    name="customerEmail"
                    placeholder="Email Address"
                    value={bookingData.customerEmail}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                  {formErrors.customerEmail && <p className="text-red-500 text-sm">{formErrors.customerEmail}</p>}
                  <input
                    type="tel"
                    name="customerPhone"
                    placeholder="Phone Number"
                    value={bookingData.customerPhone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                  {formErrors.customerPhone && <p className="text-red-500 text-sm">{formErrors.customerPhone}</p>}
                </div>
              </motion.div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <motion.div key="step4" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.4 }}>
                <h2 className="text-3xl font-bold text-blue-900 mb-6 flex items-center">
                  <CheckCircle className="w-7 h-7 mr-3 text-green-500" /> Review & Confirm
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg shadow-inner space-y-3 text-blue-900">
                  <p>🚴 Bike: {selectedBike?.name || "N/A"}</p>
                  <p>🏬 Dealer: {selectedDealer?.name || "N/A"}</p>
                  <p>📍 Location: {selectedDealer?.address || "N/A"}</p>
                  <p>📅 Date: {bookingData.date}</p>
                  <p>⏰ Time: {bookingData.time}</p>
                  <p>👤 Name: {bookingData.customerName}</p>
                  <p>📧 Email: {bookingData.customerEmail}</p>
                  <p>📞 Phone: {bookingData.customerPhone}</p>
                </div>
              </motion.div>
            )}

            {/* Step 5: Success */}
            {step === 5 && (
              <motion.div key="step5" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.4 }} className="text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-bounce" />
                <h2 className="text-3xl font-bold text-blue-900 mb-3">Booking Confirmed!</h2>
                <p className="text-lg text-blue-800 mb-2">Thank you, {bookingData.customerName}!</p>
                <p className="text-md text-blue-700">
                  Your test ride for <span className="font-semibold">{selectedBike?.name}</span> at <span className="font-semibold">{selectedDealer?.name}</span> on {bookingData.date} at {bookingData.time} is booked.
                </p>
                <button
                  onClick={() => setStep(1)}
                  className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Book Another Ride
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        {step < 5 && (
          <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
            {step > 1 && (
              <button
                onClick={handlePrevStep}
                className="flex items-center px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                <ArrowLeft className="w-5 h-5 mr-2" /> Previous
              </button>
            )}
            {step < 4 && (
              <button
                onClick={handleNextStep}
                className="ml-auto flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Next <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            )}
            {step === 4 && (
              <button
                onClick={handleSubmitBooking}
                className="ml-auto flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                <CheckCircle className="w-5 h-5 mr-2" /> Confirm Booking
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TestRideBooking;
