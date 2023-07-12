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

const Menu = () => {
  return (
    // Side Menu
    <div className="flex flex-col bg-[color:var(--feed-foreground)] w-[80%] ml-8 rounded-2xl hover:text-white items-center py-2 space-y-1">
      <MenuButton icon={Home} name="Home" isActive={true} />
      <MenuButton icon={UserCircle2} name="My Profile" isActive={false} />
      <MenuButton icon={BookMarked} name="Thoughts" isActive={false} />
      <MenuButton icon={Repeat2} name="Posts" isActive={false} />
      <MenuButton icon={Play} name="Videos" isActive={false} />
      <MenuButton icon={Settings} name="Setting" isActive={false} />
    </div>
  );
};

export default Menu;
