"use client";
import { fetchAllThoughts } from "@/redux/dataSlice";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ThoughtTab from "./ThoughtTab";

const ThoughtsSection = () => {
  const thoughts = useSelector((state) => state.data.thoughts);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (thoughts.length === 0) dispatch(fetchAllThoughts());
  }, []);

  return (
    <div className="flex flex-col w-full space-y-5 pb-5 overflow-x-hidden">
      {thoughts.map((post, index) => {
        return <ThoughtTab key={index} post={post} />;
      })}
    </div>
  );
};

export default ThoughtsSection;
