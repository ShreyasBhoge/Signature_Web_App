// src/pages/Landing.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex flex-col items-center justify-center px-4">
      <motion.h1
        className="text-5xl sm:text-6xl font-extrabold text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="text-indigo-500">W</span>
        <span className="text-purple-500">e</span>
        <span className="text-pink-500">l</span>
        <span className="text-blue-500">c</span>
        <span className="text-green-500">o</span>
        <span className="text-yellow-500">m</span>
        <span className="text-red-500">e </span>
        <span className="text-indigo-500">t</span>
        <span className="text-purple-500">o </span>
        <span className="text-pink-500">S</span>
        <span className="text-blue-500">i</span>
        <span className="text-green-500">g</span>
        <span className="text-yellow-500">n</span>
        <span className="text-red-500">P</span>
        <span className="text-indigo-500">r</span>
        <span className="text-purple-500">o</span>
      </motion.h1>

      <motion.div
        className="flex gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:scale-105 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold text-lg hover:scale-105 transition"
        >
          Register
        </button>
      </motion.div>
    </div>
  );
};

export default Landing;
