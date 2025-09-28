import React from "react";
import {
  Truck,
  Car,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Menu,
  Bell,
  Settings,
  BarChart3,
  Clock,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

// --- Mock Data ---
const dealerMetrics = [
  {
    icon: Car,
    title: "Total Listings",
    value: "48",
    color: "text-purple-400",
    bgColor: "bg-purple-900/30",
  },
  {
    icon: DollarSign,
    title: "Revenue (Last 30 Days)",
    value: "₹ 15.5 Lac",
    color: "text-green-400",
    bgColor: "bg-green-900/30",
  },
  {
    icon: Calendar,
    title: "Pending Test Rides",
    value: "12",
    color: "text-yellow-400",
    bgColor: "bg-yellow-900/30",
  },
  {
    icon: Users,
    title: "New Leads",
    value: "24",
    color: "text-blue-400",
    bgColor: "bg-blue-900/30",
  },
];

const recentRequests = [
  {
    id: 101,
    name: "Arjun Singh",
    bike: "Yamaha R15 V4",
    date: "Oct 15, 2025",
    time: "11:00 AM",
    status: "Pending",
  },
  {
    id: 102,
    name: "Priya Sharma",
    bike: "RE Classic 350",
    date: "Oct 14, 2025",
    time: "03:30 PM",
    status: "Confirmed",
  },
  {
    id: 103,
    name: "Vimal Reddy",
    bike: "KTM Duke 250",
    date: "Oct 14, 2025",
    time: "10:00 AM",
    status: "Completed",
  },
  {
    id: 104,
    name: "Sneha Patel",
    bike: "Honda Activa 6G",
    date: "Oct 13, 2025",
    time: "05:00 PM",
    status: "Canceled",
  },
];

// --- Reusable Metric Card ---
const MetricCard = ({ icon: Icon, title, value, color, bgColor }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={`bg-white/20 backdrop-blur-lg ${bgColor} p-6 rounded-xl flex flex-col hover:scale-105 hover:shadow-2xl transition-all duration-300`}
  >
    <div className={`p-3 rounded-full w-fit mb-3 ${bgColor} backdrop-blur-md`}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <p className="text-sm font-light text-gray-100">{title}</p>
    <p className="text-3xl font-extrabold text-white mt-1">{value}</p>
  </motion.div>
);

// --- Sidebar Navigation ---
const Sidebar = ({ active }) => {
  const navItems = [
    { name: "Dashboard", icon: TrendingUp },
    { name: "Inventory", icon: Car },
    { name: "Test Rides", icon: Calendar },
    { name: "Leads", icon: Users },
    { name: "Analytics", icon: BarChart3 },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="hidden lg:block w-64 bg-white/20 backdrop-blur-xl text-gray-100 h-full p-6 fixed border-r border-white/30 shadow-lg">
      <div className="flex items-center space-x-2 mb-12 border-b border-white/20 pb-4">
        <Truck className="w-8 h-8 text-purple-500" />
        <h2 className="text-xl font-extrabold text-white">DEALER PANEL</h2>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
              item.name === active
                ? "bg-purple-600 text-white font-semibold shadow-lg shadow-purple-500/50"
                : "text-gray-200 hover:bg-white/10 hover:text-purple-400"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

// --- Main Component ---
const DashboardDealer = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 text-gray-100 relative overflow-hidden">

      {/* Floating Animations */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
        animate={{ y: [0, 15, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl animate-pulse"
        animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4.5, repeat: Infinity }}
      />

      {/* Sidebar */}
      <Sidebar active="Dashboard" />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 relative z-10">
        {/* Header */}
        <header className="bg-white/20 backdrop-blur-lg border-b border-white/30 sticky top-0 z-20 p-4 flex justify-between items-center lg:px-8 shadow-md">
          <div className="flex items-center space-x-3">
            <Menu className="w-6 h-6 text-gray-200 lg:hidden cursor-pointer" />
            <h1 className="text-xl font-bold text-gray-900">
              Hello, MotoCorp Dealer 👋
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-200 hover:text-purple-500 relative transition duration-200">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                3
              </span>
            </button>
            <div className="w-10 h-10 bg-purple-500 rounded-full cursor-pointer border-2 border-purple-400 flex items-center justify-center text-sm font-bold">
              AB
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 lg:p-10 space-y-10">
          {/* Quick Stats */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Quick Stats & Performance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dealerMetrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>
          </section>

          {/* Sales + Actions + Recent */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sales Trend */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 bg-white/20 backdrop-blur-lg p-6 rounded-xl border border-white/30 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-green-500" /> Sales & Test Ride Trend (6 Months)
              </h2>
              <div className="h-64 bg-white/10 rounded-lg flex items-center justify-center text-gray-700 border border-dashed border-white/30">
                <p>[Interactive Sales & Performance Chart Placeholder]</p>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white/20 backdrop-blur-lg p-6 rounded-xl border border-white/30 shadow-lg space-y-4"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-yellow-500" /> Inventory & Actions
              </h2>

              <button className="w-full flex items-center justify-center p-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition duration-200 shadow-lg shadow-purple-500/50">
                <Car className="w-5 h-5 mr-2" /> Add New Listing
              </button>

              <button className="w-full flex items-center justify-center p-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition duration-200 shadow-lg shadow-red-500/50">
                <Truck className="w-5 h-5 mr-2" /> Manage Price Updates
              </button>

              <button className="w-full flex items-center justify-center p-4 bg-white/20 text-gray-900 rounded-lg font-semibold hover:bg-white/30 transition duration-200">
                <Globe className="w-5 h-5 mr-2" /> Update Dealer Profile
              </button>
            </motion.div>

            {/* Recent Requests */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 bg-white/20 backdrop-blur-lg p-6 rounded-xl border border-white/30 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-yellow-500" /> Recent Test Ride Requests
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/20">
                  <thead className="bg-white/10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Bike Model</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date/Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/5 divide-y divide-white/20">
                    {recentRequests.map((req) => {
                      let statusClasses = "";
                      switch (req.status) {
                        case "Pending":
                          statusClasses = "bg-yellow-500/20 text-yellow-300 border-yellow-400";
                          break;
                        case "Confirmed":
                          statusClasses = "bg-green-500/20 text-green-300 border-green-400";
                          break;
                        case "Canceled":
                          statusClasses = "bg-red-500/20 text-red-300 border-red-400";
                          break;
                        case "Completed":
                          statusClasses = "bg-blue-500/20 text-blue-300 border-blue-400";
                          break;
                        default:
                          statusClasses = "bg-gray-700 text-gray-300 border-gray-500";
                      }
                      return (
                        <tr key={req.id} className="hover:bg-white/10 transition duration-150">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{req.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{req.bike}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{req.date} @ {req.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${statusClasses}`}>{req.status}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <a href="#" className="text-purple-400 hover:text-purple-300 font-semibold transition duration-200">Manage</a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardDealer;
