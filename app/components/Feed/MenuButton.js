import React from "react";
import { Button } from "@/components/ui/button";

const MenuButton = (props) => {
  return (
    <>
      {props.isActive ? (
        <Button className="bg-transparent hover:bg-transparent justify-start text-white w-[90%]">
          <props.icon className="w-4 ml-1 mr-2" /> {props.name}
        </Button>
      ) : (
        <Button className="bg-trasparent hover:bg-zinc-800 justify-start text-zinc-400 w-[90%]">
          <props.icon className="w-4 ml-1 mr-2" /> {props.name}
        </Button>
      )}
    </>
  );
};

export default MenuButton;
