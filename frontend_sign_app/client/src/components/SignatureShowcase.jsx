// src/components/SignatureShowcase.jsx
import React from "react";
import CelebritySignatures from "./CelebritySignatures";

const SignatureShowcase = () => {
  return (
    <section
      id="famous"
      style={{ margin: 0, padding: "3rem 1.5rem 1rem 1.5rem" }}
      className="bg-gray-50 border-t border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
        ✒️ Famous Signatures
      </h2>
      <p className="text-center text-gray-500 mb-4">
        Explore iconic digital signatures of famous personalities
      </p>
      <div className="max-w-7xl mx-auto">
        <CelebritySignatures />
      </div>
    </section>
  );
};

export default SignatureShowcase;
