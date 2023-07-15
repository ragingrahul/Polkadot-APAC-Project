import React from "react";
import Updates from "./Updates";
import { useSelector } from "react-redux";

const OtherMenu = () => {
  const currentTab = useSelector((state) => state.default.currentTab);
  return (
    <div className="w-[400px] fixed mt-24 ml-[1075px] h-[200px] ">
      {(currentTab === "feed" || currentTab === "updates") && <Updates />}
    </div>
  );
};

export default OtherMenu;
