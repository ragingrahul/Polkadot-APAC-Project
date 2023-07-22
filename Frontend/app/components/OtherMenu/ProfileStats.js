import { DotIcon, Eye, File, ThumbsUp } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { getFollowers, getFollowing, getViews } from "@/app/api/getProfile";

const ProfileStats = () => {
  const data = useSelector((state) => state.data.data);
  const loading = useSelector((state) => state.data.loading);
  const [totalLikes, setTotalLikes] = React.useState(0);
  const evmAddress = useSelector((state) => state.default.evmAddress);
  const [follewers, setFollowers] = React.useState(0);
  const [following, setFollowing] = React.useState(0);
  const [view, setView] = React.useState(0);

  React.useEffect(() => {
    if (loading || !data) return;
    data.forEach((post) => {
      if (post.type === "thought" || post.type === "post") {
        setTotalLikes(totalLikes + post.likes.length);
      }
    });
  }, [loading]);

  React.useEffect(() => {
    if (evmAddress) {
      getFollowers(evmAddress).then((res) => {
        setFollowers(res.length);
      });
      getFollowing(evmAddress).then((res) => {
        setFollowing(res.length);
      });
      getViews(evmAddress).then((res) => {
        setView(res);
      });
    }
  }, [data]);

  return (
    <>
      {data && (
        <div className="w-full bg-[color:var(--feed-foreground)] text-sm p-5 pr-7 flex flex-col items-center text-zinc-400 rounded-2xl space-y-4">
          <div className="flex w-full justify-center">
            {/* Followers and Following */}
            <h1 className="text-base text-white text-bold">{follewers}</h1>
            <span className="text-base ml-2 text-zinc-400"> Followers </span>
            <DotIcon className="w-6 h-6 text-zinc-400 mx-3" />
            <h1 className="text-base text-white text-bold">{following}</h1>
            <span className="text-base ml-2 text-zinc-400"> Following </span>
          </div>

          <div className="flex items-center justify-center bg-zinc-900 rounded-full py-3 px-9">
            {/* Total Posts */}
            <div className="flex  items-center justify-center">
              <File className="w-4 h-4 text-zinc-400 mr-3" />
              <h1 className="mr-2">{data.length}</h1>
            </div>
            <DotIcon className="w-4 h-4 text-zinc-400 mx-3" />

            {/* Total Likes */}
            <div className="flex items-center justify-center">
              <ThumbsUp className="w-4 h-4 text-zinc-400 mr-3" />{" "}
              <h1 className="mr-2">{totalLikes}</h1>
            </div>

            {/* Total Views */}
            <div className="flex items-center justify-center">
              <DotIcon className="w-4 h-4 text-zinc-400 mx-3" />
              <Eye className="w-4 h-4 text-zinc-400 mr-3" />{" "}
              <h1 className="mr-2">{view}</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileStats;
