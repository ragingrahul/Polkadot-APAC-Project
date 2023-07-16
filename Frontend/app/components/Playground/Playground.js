import React from "react";
import FeedTab from "./FeedTab";
import { useSelector } from "react-redux";
import PostSection from "./PostSection";
import ThoughtsSection from "./ThoughtsSection";

const Playground = () => {
  const currentTab = useSelector((state) => state.default.currentTab);
  return (
    <div className="w-[700px] absolute mt-24 ml-[315px]">
      {currentTab === "feed" && <FeedTab />}
      {currentTab === "posts" && <PostSection />}
      {currentTab === "thoughts" && <ThoughtsSection />}
    </div>
  );
};

export default Playground;
