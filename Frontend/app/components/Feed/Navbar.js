"use client";
import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Settings,
  Activity,
  Play,
  Repeat2,
  Search,
  Pencil,
  Copy,
  Dot,
  Wallet2,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import NavButton from "./NavButton";
import { setCurrentTab } from "@/redux/defaultSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUser } from "@/redux/dataSlice";

const Navbar = () => {
  const [walletToggle, setWalletToggle] = React.useState(false);
  const currentTab = useSelector((state) => state.default.currentTab);
  const polkadotAddress = useSelector((state) => state.default.polkadotAddress);
  const evmAddress = useSelector((state) => state.default.evmAddress);
  const user = useSelector((state) => state.data.loggedInUser);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchLoggedInUser(evmAddress));
  }, [evmAddress]);

  return (
    <div className="fixed bg-[color:var(--feed)] w-full h-[75px]">
      <div className="w-auto h-full flex ml-8 justify-between">
        <div className="flex h-full items-center space-x-5">
          <div className="flex justify-between mr-10 h-full items-center w-[220px] group">
            {/* Avatar */}
            <div className="flex h-full items-center ">
              <Avatar>
                <AvatarImage src={user[3]} />
                <AvatarFallback>{"Dot"}</AvatarFallback>
              </Avatar>
              <h1 className="text-white text-sm mx-3">{user[1]}</h1>
            </div>

            {/* Profile Setting */}
            <Button className="bg-[color:var(--feed-foreground)] hover:bg-[color:var(--feed-foreground)] hover:cursor-default flex item-center p-2 h-8 scale-0 group-hover:scale-100">
              <Settings size={16} />
            </Button>
          </div>

          {/* Feed Button */}
          <NavButton
            name="Feed"
            icon={Activity}
            isActive={currentTab === "feed"}
            OnClick={() => dispatch(setCurrentTab("feed"))}
          />

          {/* Post Button */}
          <NavButton
            name="Posts"
            icon={Repeat2}
            isActive={currentTab === "posts"}
            OnClick={() => dispatch(setCurrentTab("posts"))}
          />

          {/* Videos Button */}
          <NavButton
            name="Videos"
            icon={Play}
            isActive={currentTab === "videos"}
            OnClick={() => dispatch(setCurrentTab("videos"))}
          />

          {/* Search Bar */}
          <div className="flex h-full items-center">
            <Search color="white" className="w-12 ml-10" />
            <Input
              className="ml-5 w-[400px] bg-[color:var(--feed-foreground)] border-none text-white focus-visible:ring-1 "
              placeholder="Search"
            ></Input>
          </div>
        </div>

        {/* Post Button */}
        <div className="flex items-center justify-center mr-10 space-x-5">
          <Button className="bg-[color:var(--feed-foreground)] hover:bg-zinc-800">
            <Pencil className="w-4 mr-2" /> Post
          </Button>

          <Button
            className="bg-[color:var(--feed-foreground)] hover:bg-zinc-800"
            onClick={() => {
              setWalletToggle(!walletToggle);
            }}
          >
            {walletToggle ? (
              <X className="w-4 " />
            ) : (
              <Wallet2 className="w-4 " />
            )}
          </Button>
        </div>
      </div>

      {/* Post Toggle */}
      {walletToggle && (
        <div className="absolute w-[200px] h-[120px] flex flex-col justify-center items-center space-y-5 right-7">
          <Button
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "bg-[color:var(--feed-foreground)] text-muted-foreground px-2 hover:bg-zinc-900 hover:text-white w-[175px] justify-between"
            )}
            onClick={() => {
              navigator.clipboard.writeText(polkadotAddress);
              alert("Copied Polkadot Address to clipboard");
            }}
          >
            <div className="flex justify-center items-center">
              <Dot color="#fd1a7a" />
              {polkadotAddress.substring(0, 4) +
                "..." +
                polkadotAddress.substring(polkadotAddress.length - 4)}
            </div>
            <Copy className="w-4" />
          </Button>

          <Button
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "bg-[color:var(--feed-foreground)] text-muted-foreground px-2 hover:bg-zinc-900 hover:text-white w-[175px] justify-between"
            )}
            onClick={() => {
              navigator.clipboard.writeText(evmAddress);
              alert("Copied Ethereum Address to clipboard");
            }}
          >
            <div className="flex justify-center items-center">
              <Dot color="#0080c0" />
              {evmAddress.substring(0, 4) +
                "..." +
                evmAddress.substring(evmAddress.length - 4)}
            </div>
            <Copy className="w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
