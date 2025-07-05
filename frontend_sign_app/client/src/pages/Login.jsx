import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_BASE = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password,
      });

      const { token } = res.data;
      localStorage.setItem("token", token);
      toast.success("✅ Logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("❌ Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex items-center justify-center relative px-4">
      {/* Sign Up Link */}
      <div className="absolute top-6 right-6 z-10">
        <Link
          to="/register"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow"
        >
          Sign Up
        </Link>
      </div>

      {/* Animated Login Card */}
      <motion.div
        className="relative z-10 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🔐</div>
          <h1 className="text-3xl font-extrabold text-gray-800">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-1">Login to SignPro</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold rounded-lg bg-indigo-600 text-white hover:scale-105 transition-all duration-300 shadow-md"
          >
            🚀 Log In
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
