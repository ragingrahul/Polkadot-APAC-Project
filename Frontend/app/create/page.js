"use client";

import CreatePost from "../components/CreatePost/CreatePost";
import { Toaster } from "@/components/ui/toaster";

const page = () => {
  return (
    <div className="w-full overflow-x-hidden h-full">
      <CreatePost />
      <Toaster />
    </div>
  );
};

export default page;
