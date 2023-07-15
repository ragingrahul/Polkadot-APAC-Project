import { Dot } from "lucide-react";
import React from "react";

const Updates = () => {
  return (
    <div className="w-full bg-[color:var(--feed-foreground)] text-sm p-5 py-7 text-zinc-400 rounded-2xl">
      <h1 className="text-white text-xl font-bold mx-3">New Features</h1>
      <div className="flex w-full flex-col mt-5 space-y-2">
        <div className="flex w-full">
          <Dot /> Seamlessly Add posts and thoughts
        </div>
        <div className="flex w-full">
          <Dot /> Collectable and Transferable NFTs
        </div>
        <div className="flex w-full">
          <Dot /> Blockchain based authentication
        </div>
        <div className="flex w-full">
          <Dot /> Blogging and Microblogging
        </div>
        <div className="flex w-full">
          <Dot /> More coming soon...
        </div>
      </div>
    </div>
  );
};

export default Updates;
