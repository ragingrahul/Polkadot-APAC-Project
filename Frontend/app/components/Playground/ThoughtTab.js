import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, Plus } from "lucide-react";
import Image from "next/image";
import { getProfile } from "@/app/api/getProfile";

const ThoughtTab = (props) => {
  const [user, setUser] = React.useState({});
  useEffect(() => {
    if (props.post.address) {
      getProfile(props.post.evmAddress).then((res) => {
        setUser(res);
      });
    }
  }, []);
  return (
    <div className="w-full bg-[color:var(--feed-foreground)] flex flex-col pl-7 pt-7 pr-5 pb-5 text-sm text-zinc-400 justify-between rounded-2xl">
      <div className="w-full flex justify-between">
        {/* Profile Picture and Name */}
        <div className="flex items-center mb-5">
          <Avatar>
            {user && <AvatarImage src={user[3]} />}
            <AvatarFallback>{"AN"}</AvatarFallback>
          </Avatar>
          <h1 className="text-white text-sm mx-3">{user[1]}</h1>
        </div>

        {/* Follow Button */}
        <Button className="bg-zinc-800 hover:bg-zinc-600">
          <Plus className="w-4 mr-2" /> Follow
        </Button>
      </div>

      {/* Post Content */}
      <p className="text-sm text-zinc-400 mb-5 mt-2">{props.post.content}</p>

      {/* Post Like Button */}
      <div className="w-full flex justify-between items-center">
        <h1 className="text-sm text-zinc-400">
          Loved by {props.post.likes.length} dotters
        </h1>
        <Button className="bg-[color:var(--feed-foreground)] hover:bg-zinc-800">
          <Heart className="w-4 mr-2" /> Like
        </Button>
      </div>
    </div>
  );
};

export default ThoughtTab;
