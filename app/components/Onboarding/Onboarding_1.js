import React from "react";
import LeftSection from "./LeftSection";
import ConnectSection from "./ConnectSection";
import CreateProfile from "./CreateProfile";
import { useSelector } from "react-redux";
import PolkadotAddress from "./PolkadotAddress";
import EVMAddress from "./EvmAddress";
import AlreadyConnected from "./AlreadyConnected";

const Onboarding_1 = () => {
  const currentStep = useSelector((state) => state.default.onBoardingStep);
  return (
    <div className="w-screen h-screen grid grid-cols-2 grid-rows-1">
      <LeftSection />
      {currentStep === 0 && <ConnectSection />}
      {currentStep === 1 && <AlreadyConnected />}
      {currentStep === 2 && <PolkadotAddress />}
      {currentStep === 3 && <EVMAddress />}
      {currentStep === 4 && <CreateProfile />}
    </div>
  );
};

export default Onboarding_1;
