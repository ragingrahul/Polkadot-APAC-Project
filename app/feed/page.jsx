import React from "react";
import Navbar from "../components/Feed/Navbar";
import Sidebar from "../components/Feed/Sidebar";
import Playground from "../components/Playground/Playground";

const page = () => {
  return (
    <div className="bg-[color:var(--feed)] w-screen">
      <Playground />
      <Sidebar />
      <Navbar />
    </div>
  );
};

export default page;
