import React from "react";
import Menu from "./Menu";
import OtherMenu from "./OtherMenu";

const Sidebar = () => {
  return (
    <div className="fixed h-screen flex flex-col w-[270px]">
      <div className="flex flex-col justify-between w-full h-full mt-24">
        <Menu />
        <OtherMenu />
      </div>
    </div>
  );
};

export default Sidebar;
