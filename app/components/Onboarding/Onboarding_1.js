import React from "react";
import LeftSection from "./LeftSection";
import ConnectSection from "./ConnectSection";
import CreateProfile from "./CreateProfile";
import { useSelector } from "react-redux";

const Onboarding_1 = () => {
  const openCreateModal = useSelector((state) => state.default.openCreateModal);
  return (
    <div className="w-screen h-screen grid grid-cols-2 grid-rows-1">
      <LeftSection />
      {openCreateModal ? <CreateProfile /> : <ConnectSection />}
    </div>
  );
};

export default Onboarding_1;
