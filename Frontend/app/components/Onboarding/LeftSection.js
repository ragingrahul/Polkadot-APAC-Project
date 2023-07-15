import React from "react";
import Image from "next/image";

const LeftSection = () => {
  return (
    <div className="bg-zinc-900 flex flex-col justify-between">
      {/* Logo */}
      <Image
        src="/Logos/Logo_Full_White.png"
        alt="Onboarding_1"
        width={850}
        height={859}
        className="h-[250px] w-[250px] m-10"
      />

      {/* Quote */}
      <blockquote className="my-10 mx-10  text-white">
        <p className="text-lg">
          &ldquo; Polkadot has a vibrant and growing community of developers,
          enthusiasts, and entrepreneurs. dotCom facilitates seamless data
          sharing & collaboration!! &rdquo;
        </p>
        <footer className="text-sm mt-2">Anoy Roy Chowdhury</footer>
      </blockquote>
    </div>
  );
};

export default LeftSection;
