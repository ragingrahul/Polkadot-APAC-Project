"use client";
import React from "react";
import AddThought from "./AddThought";
import PostTab from "./PostTab";

const Posts = [
  {
    id: 1,
    name: "Anoy",
    type: "Thought",
    content:
      "How about we make a new social media platform that is decentralized and has a built in wallet?",
    likes: 120,
  },
  {
    id: 2,
    name: "Rahul",
    type: "Blog",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    cover:
      "https://images.unsplash.com/photo-1689078907312-78fb9d4db8aa?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=adam-bignell-ypKW3v8vm4o-unsplash.jpg",
    likes: 4,
  },
];

const FeedTab = () => {
  return (
    <div className="flex flex-col w-full space-y-5 pb-5 overflow-x-hidden">
      <AddThought />
      {Posts.map((post) => {
        return <PostTab key={post.id} post={post} />;
      })}
    </div>
  );
};

export default FeedTab;
