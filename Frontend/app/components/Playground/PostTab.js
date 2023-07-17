import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, Plus } from "lucide-react";
import Image from "next/image";
import { getProfile } from "@/app/api/getProfile";
import { useSelector } from "react-redux";

const PostTab = (props) => {
  const [user, setUser] = React.useState({});
  const evmAddress = useSelector((state) => state.default.evmAddress);
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
            <AvatarFallback>{"Dot"}</AvatarFallback>
          </Avatar>
          <h1 className="text-white text-sm mx-3">{user[1]}</h1>
        </div>

        {/* Follow Button */}
        {evmAddress !== props.post.evmAddress && (
          <Button className="bg-zinc-800 hover:bg-zinc-600">
            <Plus className="w-4 mr-2" /> Follow
          </Button>
        )}
      </div>

      {/* Post Title */}
      <h1 className="text-xl font-bold text-white mb-5">{props.post.title}</h1>

      {/* Post Content */}
      <div className="w-full flex flex-col max-h-[120px] overflow-hidden mb-5 postTabGradient">
        {props.post.content.map((paragraph, index) => {
          if (paragraph.type === "Heading")
            return (
              <h1
                key={index}
                className="text-base text-transparent font-bold mb-5"
              >
                {paragraph.content}
              </h1>
            );
          else if (paragraph.type === "Paragraph")
            return (
              <p key={index} className="text-sm text-transparent mb-5">
                {paragraph.content}
              </p>
            );
        })}
      </div>

      {/* Post Cover */}

      <Image
        src={props.post.cover}
        alt="Post Cover"
        height={500}
        width={1000}
        className="rounded-xl object-cover w-full h-[300px] mb-5"
      />

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

export default PostTab;
