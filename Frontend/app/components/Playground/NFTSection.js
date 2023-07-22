"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAlldata } from "@/redux/dataSlice";
import Web3PostTab from "./Web3PostTab";

const NFTSection = () => {
  const data = useSelector((state) => state.data.data);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAlldata());
  }, []);

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex flex-col w-full space-y-5 pb-5 overflow-x-hidden">
      {data.map((post, index) => {
        if (post.type === "post") return 
        if (post.type === "thought")
          return 
        else return <Web3PostTab key={index} post={post.properties} />;
      })}
    </div>
  );
};

export default NFTSection;
