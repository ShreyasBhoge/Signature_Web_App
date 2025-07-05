// src/components/FeatureSection.jsx
import React from "react";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Effortless PDF Signing",
    description: "Upload your PDFs and drag your signature box directly onto the document.",
  },
  {
    title: "Secure & Tokenized Access",
    description: "Share documents via secure, expiring links — no login required for guests.",
  },
  {
    title: "Real-time Signature Tracking",
    description: "Check signature status: Pending, Signed, or Rejected with audit details.",
  },
  {
    title: "Audit Logging",
    description: "Know exactly who signed what, when, and from which IP.",
  },
];

const FeatureSection = () => {
  return (
    <section id="info" className="bg-gray-50 py-20 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          Why People Love <span className="text-blue-600">SignPro 💼</span>
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Power-packed features to make digital signing effortless, professional, and secure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-6 bg-white backdrop-blur-sm border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition duration-300 group"
            >
              <CheckCircle className="text-green-500 w-6 h-6 mt-1 group-hover:scale-110 transition" />
              <div>
                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
