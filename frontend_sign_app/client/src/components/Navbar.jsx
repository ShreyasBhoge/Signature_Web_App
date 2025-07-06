import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ onLogout, filterStatus, setFilterStatus }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isUploadedPage = location.pathname === "/documents";
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false); // Close menu after scroll on mobile
  };

  return (
    <nav className="bg-white shadow-lg px-4 sm:px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl sm:text-3xl font-extrabold text-blue-600 cursor-pointer tracking-wide hover:scale-105 transition-transform"
        >
          SignPro
        </h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 text-sm">
        {!isUploadedPage && filterStatus && setFilterStatus && (
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700">Filter:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Signed">Signed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        )}

        {!isUploadedPage && (
          <>
            <button onClick={() => scrollTo("info")} className="hover:text-blue-600 transition">
              Info
            </button>
            <button onClick={() => scrollTo("famous")} className="hover:text-blue-600 transition">
              Famous
            </button>
            <button onClick={() => scrollTo("contact")} className="hover:text-blue-600 transition">
              Contact
            </button>
          </>
        )}

        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md shadow text-sm font-semibold transition"
        >
          👋 Logout
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700 hover:text-blue-600 focus:outline-none"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden px-4 py-4 border-t border-gray-200 text-sm">
          {!isUploadedPage && filterStatus && setFilterStatus && (
            <div className="mb-4">
              <label className="block font-medium mb-1 text-gray-700">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Signed">Signed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          )}

          {!isUploadedPage && (
            <div className="space-y-2">
              <button onClick={() => scrollTo("info")} className="block w-full text-left py-1">
                Info
              </button>
              <button onClick={() => scrollTo("famous")} className="block w-full text-left py-1">
                Famous Signatures
              </button>
              <button onClick={() => scrollTo("contact")} className="block w-full text-left py-1">
                Contact Us
              </button>
            </div>
          )}

          <button
            onClick={onLogout}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold"
          >
            👋 Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
