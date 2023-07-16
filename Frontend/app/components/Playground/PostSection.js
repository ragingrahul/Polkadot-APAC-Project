"use client";
import React from "react";
import PostTab from "./PostTab";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "@/redux/dataSlice";

const PostSection = () => {
  const posts = useSelector((state) => state.data.posts);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (posts.length === 0) dispatch(fetchAllPosts());
  }, []);

  return (
    <div className="flex flex-col w-full space-y-5 pb-5 overflow-x-hidden">
      {posts.map((post, index) => {
        return <PostTab key={index} post={post} />;
      })}
    </div>
  );
};

export default PostSection;
