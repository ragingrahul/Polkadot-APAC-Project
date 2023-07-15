import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, Plus } from "lucide-react";
import Image from "next/image";

const PostTab = (props) => {
  return (
    <div className="w-full bg-[color:var(--feed-foreground)] flex flex-col pl-7 pt-7 pr-5 pb-5 text-sm text-zinc-400 justify-between rounded-2xl">
      <div className="w-full flex justify-between">
        {/* Profile Picture and Name */}
        <div className="flex items-center mb-5">
          <Avatar>
            <AvatarFallback>{"AN"}</AvatarFallback>
          </Avatar>
          <h1 className="text-white text-sm mx-3">{props.post.name}</h1>
        </div>

        {/* Follow Button */}
        <Button className="bg-zinc-800 hover:bg-zinc-600">
          <Plus className="w-4 mr-2" /> Follow
        </Button>
      </div>

      {/* Post Content */}
      <h1 className="text-sm text-zinc-400 mb-5">
        {props.post.content.length > 245
          ? props.post.content.substring(0, 245) + "..."
          : props.post.content}
      </h1>

      {/* Post Cover */}
      {props.post.type == "Blog" && (
        <Image
          src={props.post.cover}
          alt="Post Cover"
          height={500}
          width={1000}
          className="rounded-xl object-cover w-full h-[300px] mb-5"
        />
      )}

      {/* Post Like Button */}
      <div className="w-full flex justify-between items-center">
        <h1 className="text-sm text-zinc-400">
          Loved by {props.post.likes} dotters
        </h1>
        <Button className="bg-[color:var(--feed-foreground)] hover:bg-zinc-800">
          <Heart className="w-4 mr-2" /> Like
        </Button>
      </div>
    </div>
  );
};

export default PostTab;
