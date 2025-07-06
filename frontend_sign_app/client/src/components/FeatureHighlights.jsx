// src/components/FeatureHighlights.jsx
import React from "react";
import { FaBolt, FaShieldAlt, FaClock, FaUserCheck } from "react-icons/fa";

const features = [
  {
    icon: <FaBolt className="text-yellow-400 text-3xl group-hover:animate-pulse" />,
    title: "Instant Signing",
    desc: "Sign documents online in seconds. No printing or scanning required.",
  },
  {
    icon: <FaShieldAlt className="text-green-500 text-3xl group-hover:rotate-12 transition-transform" />,
    title: "Secure & Encrypted",
    desc: "Your data is protected with enterprise-grade encryption and audit trails.",
  },
  {
    icon: <FaClock className="text-blue-500 text-3xl group-hover:scale-110 transition-transform" />,
    title: "Save Time",
    desc: "Reduce turnaround time by up to 80% with instant delivery and sign-off.",
  },
  {
    icon: <FaUserCheck className="text-purple-500 text-3xl group-hover:scale-110 transition-transform" />,
    title: "User Friendly",
    desc: "Clean and easy interface for both senders and signers — no learning curve.",
  },
];

const FeatureHighlights = () => {
  return (
    <section className="bg-gradient-to-br from-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
          🚀 Why Choose <span className="text-gray-900">SignPro?</span>
        </h2>
        <p className="text-gray-600 mb-12 text-sm sm:text-base">
          Powerful features that elevate your document workflow
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                {f.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
