import React from "react";

const SignatureCard = ({ name, face, signature }) => {
  return (
    <div className="flex flex-col items-center text-center relative group w-full max-w-xs mx-auto">
      {/* Face image */}
      <div className="z-10">
        <img
          src={face}
          alt={`${name} face`}
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md transition-transform group-hover:scale-105"
          onError={(e) => {
            e.target.src = "/images/fallback.png";
            e.target.alt = "Face not found";
          }}
        />
      </div>

      {/* Signature card */}
      <div className="bg-white mt-[-48px] p-6 pt-12 rounded-2xl shadow-lg w-full max-w-xs transform group-hover:scale-105 transition duration-300 rotate-[-1deg] hover:rotate-0">
        {/* Grey background lines */}
        <div className="h-4 w-3/4 bg-gray-200 rounded-full mb-2 mx-auto"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded-full mb-2 mx-auto"></div>

        <img
          src={signature}
          alt={`${name} signature`}
          className="w-full h-20 sm:h-24 object-contain mt-2 transition-transform group-hover:scale-105"
          onError={(e) => {
            e.target.src = "/images/fallback.png";
            e.target.alt = "Signature not found";
          }}
        />

        <div className="h-0.5 w-1/2 bg-cyan-500 mx-auto mt-3" />
      </div>

      <p className="mt-4 text-gray-800 font-semibold text-base sm:text-lg">{name}</p>
    </div>
  );
};

export default SignatureCard;
