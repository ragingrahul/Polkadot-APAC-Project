import React from "react";
import MenuButton from "./MenuButton";
import {
  BookMarked,
  Home,
  Play,
  Repeat2,
  Settings,
  UserCircle2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab } from "@/redux/defaultSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.default.currentTab);
  return (
    // Side Menu
    <div className="flex flex-col bg-[color:var(--feed-foreground)] w-[80%] ml-8 rounded-2xl hover:text-white items-center py-2 space-y-1">
      <MenuButton
        icon={Home}
        name="Home"
        isActive={currentTab == "feed"}
        OnClick={() => dispatch(setCurrentTab("feed"))}
      />
      <MenuButton
        icon={UserCircle2}
        name="My Profile"
        isActive={currentTab == "myProfile"}
        OnClick={() => dispatch(setCurrentTab("myProfile"))}
      />
      <MenuButton
        icon={BookMarked}
        name="Thoughts"
        isActive={currentTab == "thoughts"}
        OnClick={() => dispatch(setCurrentTab("thoughts"))}
      />
      <MenuButton
        icon={Repeat2}
        name="Posts"
        isActive={currentTab == "posts"}
        OnClick={() => dispatch(setCurrentTab("posts"))}
      />
      <MenuButton
        icon={Play}
        name="Videos"
        isActive={currentTab == "videos"}
        OnClick={() => dispatch(setCurrentTab("videos"))}
      />
      <MenuButton
        icon={Settings}
        name="Setting"
        isActive={currentTab == "setting"}
        OnClick={() => dispatch(setCurrentTab("setting"))}
      />
    </div>
  );
};

export default Menu;
