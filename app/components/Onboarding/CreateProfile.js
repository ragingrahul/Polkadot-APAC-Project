"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const CreateProfile = () => {
  const [name, setName] = React.useState();
  const [bio, setBio] = React.useState();
  const [date, setDate] = React.useState();
  const [avatar, setAvatar] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className="bg-black relative flex-col justify-center items-center flex">
      <div className="px-20 flex flex-col justify-center">
        {/* Create Profile Section */}
        <div className="absolute top-0 right-0">
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute right-4 top-4 md:right-8 md:top-8 text-white hover:bg-black hover:text-gray-300"
            )}
          >
            Create
          </Link>
        </div>

        <div className="flex flex-col space-y-2">
          {/* Create Profile Header */}
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Create a profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Create a profile to get started.
          </p>
        </div>

        {/* Name */}
        <div className="flex flex-col space-y-2 mt-5">
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Name
          </h1>
          <Input
            type="text"
            placeholder="Anoy"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="ring-offset-gray-900 text-black focus-visible:ring-gray-600 border-gray-500 bg-white w-[400px]"
          />
          <p className="text-sm text-muted-foreground">
            This is your profile diplay name.
          </p>
        </div>

        {/* Date */}
        <div className="flex flex-col space-y-2 mt-5">
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Date
          </h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[400px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <p className="text-sm text-muted-foreground">
            Your age will be determined by this date.
          </p>
        </div>

        {/* Bio */}
        <div className="flex flex-col space-y-2 mt-5">
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Description
          </h1>
          <Textarea
            placeholder="I own a computer."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="ring-offset-gray-900 text-black focus-visible:ring-gray-600 border-gray-500 bg-white w-[400px]"
          />
          <p className="text-sm text-muted-foreground">
            This is your profile description.
          </p>
        </div>

        {/* Avatar */}
        <div className="flex flex-col space-y-2 mt-5">
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Avatar
          </h1>
          <div className="flex items-center space-x-2">
            <Avatar>
              {avatar && <AvatarImage src={URL.createObjectURL(avatar)} />}
              <AvatarFallback>
                {name && name.length > 1 ? name.substring(0, 2) : "AV"}
              </AvatarFallback>
            </Avatar>
            <Input
              id="picture"
              type="file"
              onChange={(e) => {
                if (!e.target.files) return;
                setAvatar(e.target.files[0]);
                console.log(e.target.files[0].type);
              }}
              className="ring-offset-gray-900 text-black focus-visible:ring-gray-600 border-gray-500 hover:cursor-pointer"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            This is your profile diplay Avatar.
          </p>
        </div>

        {/* Create Button */}
        <Button
          disabled={isLoading}
          className="bg-white text-black hover:bg-gray-300 hover:text-black my-5"
          onClick={() => setIsLoading(true)}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateProfile;
