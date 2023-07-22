"use client";
import React from "react";
import AddThought from "./AddThought";
import PostTab from "./PostTab";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUserData, fetchUser } from "@/redux/dataSlice";
import ThoughtTab from "./ThoughtTab";
import UserTab from "./UserTab";
import Web3PostTab from "./Web3PostTab";

const MyProfileSection = () => {
  const selectedAddress = useSelector((state) => state.default.selectedAddress);
  const data = useSelector((state) => state.data.data);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!selectedAddress) return;
    dispatch(fetchAllUserData(selectedAddress));
  }, [selectedAddress]);

  React.useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div className="flex flex-col w-full space-y-5 pb-5 overflow-x-hidden">
      <UserTab />
      {data.map((post, index) => {
        if (post.type === "post") return <PostTab key={index} post={post} />;
        if (post.type === "thought")
          return <ThoughtTab key={index} post={post} />;
        else return <Web3PostTab key={index} post={post.properties} />;
      })}
    </div>
  );
};

export default MyProfileSection;
