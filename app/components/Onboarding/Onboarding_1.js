import React from "react";
import LeftSection from "./LeftSection";
import ConnectSection from "./ConnectSection";

const Onboarding_1 = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-2 grid-rows-1">
      <LeftSection />
      <ConnectSection />
    </div>
  );
};

export default Onboarding_1;
