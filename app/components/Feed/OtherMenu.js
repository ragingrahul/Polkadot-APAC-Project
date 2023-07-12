import React from "react";
import MenuButton from "./MenuButton";
import { HelpCircle, Star } from "lucide-react";

const OtherMenu = () => {
  return (
    <div className="flex flex-col bg-transparent w-[80%] ml-8 hover:text-white items-center py-7 space-y-1">
      <MenuButton icon={Star} name="Updates" isActive={false} />
      <MenuButton icon={HelpCircle} name="Help & Feedback" isActive={false} />
    </div>
  );
};

export default OtherMenu;
