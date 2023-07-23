import React from "react";
import Updates from "./Updates";
import { useSelector } from "react-redux";
import ProfileStats from "./ProfileStats";
import Charts from "./Charts";

const OtherMenu = () => {
  const currentTab = useSelector((state) => state.default.currentTab);
  return (
    <div className="w-[400px] fixed mt-24 ml-[1075px] flex flex-col items-center justify-center space-y-2">
      {(currentTab === "feed" || currentTab === "updates") && <Updates />}
      {currentTab === "myProfile" && <ProfileStats />}
      {currentTab === "feed" && <Charts />}
    </div>
  );
};

export default OtherMenu;
