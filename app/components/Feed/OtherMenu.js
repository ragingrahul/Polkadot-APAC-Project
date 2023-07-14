import React from "react";
import MenuButton from "./MenuButton";
import { HelpCircle, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab } from "@/redux/defaultSlice";

const OtherMenu = () => {
  const currentTab = useSelector((state) => state.default.currentTab);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col bg-transparent w-[80%] ml-8 hover:text-white items-center py-7 space-y-1">
      <MenuButton
        icon={Star}
        name="Updates"
        isActive={currentTab === "updates"}
        OnClick={() => dispatch(setCurrentTab("updates"))}
      />
      <MenuButton
        icon={HelpCircle}
        name="Help & Feedback"
        isActive={currentTab === "help"}
        OnClick={() => dispatch(setCurrentTab("help"))}
      />
    </div>
  );
};

export default OtherMenu;
