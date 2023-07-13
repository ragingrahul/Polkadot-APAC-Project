"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AddThought = () => {
  const [toggle, setToggle] = React.useState(false);
  const textAreaRef = React.useRef();

  React.useEffect(() => {
    if (toggle) {
      textAreaRef.current.focus();
    }
  }, [textAreaRef.current, toggle]);

  return (
    <>
      {toggle ? (
        <div
          className="w-full bg-[color:var(--feed-foreground)] flex flex-col pl-7 pt-7 pr-5 pb-5 text-sm text-zinc-400 justify-start rounded-2xl"
          onClick={() => {
            setToggle(true);
          }}
        >
          {/* Profile Nam & Logo */}
          <div className="flex items-center mb-7">
            <Avatar>
              <AvatarFallback>{"AN"}</AvatarFallback>
            </Avatar>
            <h1 className="text-white text-sm mx-3">Anoy</h1>
          </div>

          {/* Type area for thoughts */}
          <Textarea
            className="border-0 outline-none focus-visible:outline-none focus-visible:ring-offset-0 mb-5 h-[200px] focus-visible:ring-0 p-0 placeholder:text-zinc-400"
            placeholder="Type to share your thoughts..."
            ref={textAreaRef}
          />

          {/* Post Button */}
          <div className="w-full flex justify-end">
            <Button className="bg-[color:var(--feed-foreground)] hover:bg-zinc-800">
              <Pencil className="w-4 mr-2" /> Post
            </Button>
          </div>
        </div>
      ) : (
        // Template
        <div
          className="w-full h-[150px] bg-[color:var(--feed-foreground)] flex flex-col pl-7 pt-7 pr-5 pb-5 text-sm text-zinc-400 justify-between rounded-2xl"
          onClick={() => {
            setToggle(true);
          }}
        >
          <h1>Type to share your thoughts...</h1>
          <div className="w-full flex justify-end">
            <Button className="bg-[color:var(--feed-foreground)] hover:bg-zinc-800">
              <Pencil className="w-4 mr-2" /> Post
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddThought;
