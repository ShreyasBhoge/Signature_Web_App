// src/components/SignatureShowcase.jsx
import React from "react";
import CelebritySignatures from "./CelebritySignatures";

const SignatureShowcase = () => {
  return (
    <section
      id="famous"
      className="bg-gray-50 border-t border-gray-200 px-4 sm:px-6 py-12"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
        ✒️ Famous Signatures
      </h2>
      <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
        Explore iconic digital signatures of famous personalities
      </p>

      <div className="max-w-7xl mx-auto">
        <CelebritySignatures />
      </div>
    </section>
  );
};

export default SignatureShowcase;
