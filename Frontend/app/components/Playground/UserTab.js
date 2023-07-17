import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, Plus } from "lucide-react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "@/redux/dataSlice";

const UserTab = () => {
  const selectedAddress = useSelector((state) => state.default.selectedAddress);
  const evmAddress = useSelector((state) => state.default.evmAddress);
  const user = useSelector((state) => state.data.selectedUser);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!selectedAddress) return;
    dispatch(fetchUser(selectedAddress));
  }, [selectedAddress]);

  return (
    <>
      {user.length > 0 && (
        <div className="w-full bg-[color:var(--feed-foreground)] h-[300px] flex flex-col pl-7 pt-7 pr-5 pb-5 text-sm text-zinc-400 justify-between relative rounded-2xl">
          <div className="w-full h-full absolute top-0 left-0 z-0 rounded-2xl bg-transparent">
            <Image
              src={user[3]}
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-2xl rounded-b-[19px]"
              alt="ProfilePic"
            />
          </div>

          <div className="w-full h-full absolute top-0 left-0 profileGradient rounded-2xl z-0"></div>

          <div className="w-full flex z-0">
            {/* Follow Button */}
            {selectedAddress !== evmAddress && (
              <Button className="bg-zinc-800 hover:bg-zinc-600">
                <Plus className="w-4 mr-2" /> Follow
              </Button>
            )}
          </div>

          {/* Post Like Button */}
          <div className="w-full flex flex-col-reverse z-0">
            <h1 className="text-sm text-zinc-400">{user[4]}</h1>
            <h1 className="text-3xl text-white font-bold">{user[1]}</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTab;
