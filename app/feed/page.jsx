import React from "react";
import Navbar from "../components/Feed/Navbar";
import Sidebar from "../components/Feed/Sidebar";

const page = () => {
  return (
    <div className="bg-[color:var(--feed)] h-screen w-screen">
      <Sidebar />
      <Navbar />
    </div>
  );
};

export default page;
