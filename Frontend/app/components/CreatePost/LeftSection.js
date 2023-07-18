import React from "react";
import PostPrompt from "./PostPrompts";

const LeftSection = () => {
  return (
    <div className="bg-black fixed overflow-x-hidden h-full w-[575px]">
      <PostPrompt />
    </div>
  );
};

export default LeftSection;
