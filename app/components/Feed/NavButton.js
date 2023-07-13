import React from "react";
import { Button } from "@/components/ui/button";

const NavButton = (props) => {
  return (
    <>
      {props.isActive ? (
        <Button className="bg-[color:var(--feed-foreground)] hover:bg-[color:var(--feed-foreground)]">
          <props.icon className="w-4 mr-2" /> {props.name}
        </Button>
      ) : (
        <Button className="bg-[color:var(--feed)] hover:bg-[color:var(--feed-foreground)]">
          <props.icon className="w-4 mr-2" /> {props.name}
        </Button>
      )}
    </>
  );
};

export default NavButton;
