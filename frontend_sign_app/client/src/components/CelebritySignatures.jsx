// src/components/CelebritySignatures.jsx
import React from "react";
import SignatureCard from "./SignatureCard";

const celebrities = [
  {
    name: "Steve Jobs",
    face: "/images/steve-jobs.gif",
    signature: "/images/steve-jobs-signature.png",
  },
  {
    name: "Barack Obama",
    face: "/images/barack-obama.gif",
    signature: "/images/barack-obama-signature.png",
  },
  {
    name: "Edgar Allan Poe",
    face: "/images/edgar-allan-poe.gif",
    signature: "/images/edgar-allan-poe-signature.svg",
  },
  {
    name: "Mohandas Gandhi",
    face: "/images/mohandas-gandhi.gif",
    signature: "/images/mohandas-gandhi-signature.svg",
  },
  {
    name: "Bruce Lee",
    face: "/images/bruce-lee.gif",
    signature: "/images/bruce-lee-signature.svg",
  },
  {
    name: "Meg Whitman",
    face: "/images/meg-whitman.gif",
    signature: "/images/meg-whitman-signature.svg",
  },
  {
    name: "Kanye West",
    face: "/images/kanye-west.gif", // Consider renaming to remove dash
    signature: "/images/kanye-west-signature.svg",
  },
  {
    name: "Neil Armstrong",
    face: "/images/neil-armstrong.gif", // Consider renaming to remove dash
    signature: "/images/neil-armstrong-signature.svg",
  },
];

const CelebritySignatures = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-items-center">
      {celebrities.map((celeb, idx) => (
        <SignatureCard
          key={idx}
          name={celeb.name}
          face={celeb.face}
          signature={celeb.signature}
        />
      ))}
    </div>
  );
};

export default CelebritySignatures;
