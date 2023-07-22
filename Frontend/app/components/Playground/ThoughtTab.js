import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, HeartOff, Minus, Plus } from "lucide-react";
import { getProfile } from "@/app/api/getProfile";
import { useSelector } from "react-redux";
import {
  likeThought,
  followUser,
  getFollowing,
  unfollowUser,
} from "@/app/api/getProfile";
import { set } from "date-fns";

const ThoughtTab = (props) => {
  const [user, setUser] = React.useState({});
  const [likes, setLikes] = React.useState([]);
  const evmAddress = useSelector((state) => state.default.evmAddress);
  const polkadotAddress = useSelector((state) => state.default.polkadotAddress);
  const [following, setFollowing] = React.useState([]);

  useEffect(() => {
    if (evmAddress)
      getFollowing(evmAddress).then((res) => {
        setFollowing(res);
      });
    console.log(following);
  }, [evmAddress]);

  useEffect(() => {
    if (props.post.address) {
      getProfile(props.post.evmAddress).then((res) => {
        setUser(res);
      });
    }
    setLikes(props.post.likes);
  }, []);

  const likePost = async () => {
    try {
      const res = await likeThought(polkadotAddress, props.post._id);
      setLikes(res.likes);
    } catch (err) {
      console.log(err);
    }
  };

  const follow = async () => {
    try {
      const res = await followUser(polkadotAddress, props.post.evmAddress);
      setFollowing(res);
    } catch (err) {
      console.log(err);
    }
  };

  const unfollow = async () => {
    try {
      const res = await unfollowUser(polkadotAddress, props.post.evmAddress);
      setFollowing(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full bg-[color:var(--feed-foreground)] flex flex-col pl-7 pt-7 pr-5 pb-5 text-sm text-zinc-400 justify-between rounded-2xl">
      <div className="w-full flex justify-between">
        {/* Profile Picture and Name */}
        <div className="flex items-center mb-5">
          <Avatar>
            {user && <AvatarImage src={"https://" + user[3]} />}
            <AvatarFallback>{"AN"}</AvatarFallback>
          </Avatar>
          <h1 className="text-white text-sm mx-3">{user[1]}</h1>
        </div>

        {/* Follow Button */}
        {evmAddress !== props.post.evmAddress && (
          <Button
            className="bg-zinc-800 hover:bg-zinc-600"
            onClick={() => {
              following.includes(props.post.evmAddress) ? unfollow() : follow();
            }}
          >
            {following.includes(props.post.evmAddress) ? (
              <span className="flex items-center">
                <Minus className="w-4 mr-2" />
                Unfollow
              </span>
            ) : (
              <span className="flex items-center">
                <Plus className="w-4 mr-2" />
                Follow
              </span>
            )}
          </Button>
        )}
      </div>

      {/* Post Content */}
      <p className="text-sm text-zinc-400 mb-5 mt-2">{props.post.content}</p>

      {/* Post Like Button */}
      <div className="w-full flex justify-between items-center">
        <h1 className="text-sm text-zinc-400">
          Loved by {likes.length} dotters
        </h1>
        <Button
          className="bg-[color:var(--feed-foreground)] hover:bg-zinc-800"
          onClick={likePost}
        >
          {!likes.includes(polkadotAddress) ? (
            <span className="flex items-center">
              <Heart className="w-4 mr-2" /> Like
            </span>
          ) : (
            <span className="flex items-center">
              <HeartOff className="w-4 mr-2" /> Unlike
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ThoughtTab;
