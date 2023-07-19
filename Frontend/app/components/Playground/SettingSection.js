import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { fetchLoggedInUser } from "@/redux/dataSlice";
import { Calendar as CalendarIcon } from "lucide-react";
import { subYears, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { Textarea } from "@/components/ui/textarea";

const SettingSection = () => {
  const loggedInUser = useSelector((state) => state.data.loggedInUser);
  const evmAddress = useSelector((state) => state.default.evmAddress);
  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState();
  const [bio, setBio] = React.useState();
  const [date, setDate] = React.useState();
  const [avatar, setAvatar] = React.useState();
  const maxDate = subYears(new Date(), 18);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!loggedInUser) return;
    dispatch(fetchLoggedInUser(evmAddress));
  }, [evmAddress]);


  return (
    <>
      {loggedInUser && (
        <div className="w-full bg-transparent flex flex-col text-sm text-zinc-400 justify-between rounded-2xl">
          <div className="flex flex-col justify-center">
            <div className="flex flex-col space-y-2">
              {/* Create Profile Header */}
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Update Profile
              </h1>
              <p className="text-sm text-muted-foreground">
                Update your profile
              </p>
            </div>

            {/* Name */}
            <div className="flex flex-col space-y-2 mt-5">
              <h1 className="text-xl font-semibold tracking-tight text-white">
                Name
              </h1>
              <Input
                type="text"
                placeholder={loggedInUser[1]}
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
                Date of birth
              </h1>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[400px] justify-start text-left font-normal bg-white text-black",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    classNames={{
                      cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-white/5 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      caption_label: "hidden",
                      caption_dropdowns:
                        "flex w-full items-center justify-center space-x-2",
                    }}
                    mode="single"
                    selected={date}
                    fromDate={subYears(new Date(), 100)}
                    toDate={maxDate}
                    captionLayout="dropdown"
                    onSelect={setDate}
                    defaultMonth={
                      new Date(
                        date?.getFullYear() ?? maxDate.getFullYear(),
                        date?.getMonth() ?? maxDate.getMonth(),
                        1
                      )
                    }
                    required
                    initialFocus
                    className="border rounded-md border-white/10"
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
                placeholder={loggedInUser[4]}
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
                  {(avatar && (
                    <AvatarImage src={URL.createObjectURL(avatar)} />
                  )) || <AvatarImage src={loggedInUser[3]} />}
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
                  className="ring-offset-gray-900 text-black focus-visible:ring-gray-600 border-gray-500 hover:cursor-point w-[353px]"
                  placeholder="Choose a File"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                This is your profile diplay Avatar.
              </p>
            </div>

            {/* Create Button & Previous Button */}
            <div className="flex justify-between mt-7">
              <Button
                disabled={isLoading}
                className="bg-white text-black hover:bg-gray-300 hover:text-black w-[190px]"
                
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingSection;
