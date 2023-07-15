import React from "react";
import FeedTab from "./FeedTab";
import { useSelector } from "react-redux";

const Playground = () => {
  const currentTab = useSelector((state) => state.default.currentTab);
  return (
    <div className="w-[700px] absolute mt-24 ml-[315px]">
      {currentTab === "feed" && <FeedTab />}
    </div>
  );
};

export default Playground;
