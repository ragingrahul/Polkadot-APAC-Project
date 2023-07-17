import React from "react";
import FeedTab from "./FeedTab";
import { useSelector } from "react-redux";
import PostSection from "./PostSection";
import ThoughtsSection from "./ThoughtsSection";
import MyProfileSection from "./MyProfileSection";
import SettingSection from "./SettingSection";

const Playground = () => {
  const currentTab = useSelector((state) => state.default.currentTab);
  return (
    <div className="w-[700px] absolute mt-24 ml-[315px]">
      {currentTab === "feed" && <FeedTab />}
      {currentTab === "posts" && <PostSection />}
      {currentTab === "thoughts" && <ThoughtsSection />}
      {currentTab === "myProfile" && <MyProfileSection />}
      {currentTab === "setting" && <SettingSection />}
    </div>
  );
};

export default Playground;
