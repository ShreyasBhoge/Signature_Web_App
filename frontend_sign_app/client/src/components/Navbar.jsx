import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ onLogout, filterStatus, setFilterStatus }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isUploadedPage = location.pathname === "/documents";

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="bg-white shadow-lg px-6 py-5 flex justify-between items-center sticky top-0 z-50 text-base">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-extrabold text-blue-600 cursor-pointer tracking-wide hover:scale-105 transition-transform"
        >
          SignPro
        </h1>
      </div>

      {/* Right: Buttons */}
      <div className="flex items-center gap-8">
        {!isUploadedPage && filterStatus && setFilterStatus && (
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-gray-700">Filter by Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border px-3 py-1 rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-400 hover:scale-105 transition"
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
            <button
              onClick={() => scrollTo("info")}
              className="hover:text-blue-600 transition hover:scale-105 font-semibold text-gray-700"
            >
              Info
            </button>
            <button
              onClick={() => scrollTo("famous")}
              className="hover:text-blue-600 transition hover:scale-105 font-semibold text-gray-700"
            >
              Famous Signatures
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="hover:text-blue-600 transition hover:scale-105 font-semibold text-gray-700"
            >
              Contact Us
            </button>
          </>
        )}

        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md shadow transition-all duration-300 font-semibold hover:scale-105"
        >
          👋 Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
