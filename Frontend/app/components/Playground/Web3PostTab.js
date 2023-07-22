import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, Plus, HeartOff, Minus, WalletCards } from "lucide-react";
import Image from "next/image";
import {
  getProfile,
  followUser,
  unfollowUser,
  getFollowing,
} from "@/app/api/getProfile";
import { useSelector } from "react-redux";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

const Web3PostTab = (props) => {
  const [user, setUser] = React.useState({});
  const evmAddress = useSelector((state) => state.default.evmAddress);
  const polkadotAddress = useSelector((state) => state.default.polkadotAddress);
  const [following, setFollowing] = React.useState([]);
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "w-full prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none text-white mt-5",
      },
    },
    content: ``,
    injectCSS: true,
  });

  useEffect(() => {
    if (evmAddress)
      getFollowing(evmAddress).then((res) => {
        setFollowing(res);
      });
    console.log(following);
  }, [evmAddress]);

  useEffect(() => {
    if (props.post.evmAddress.description) {
      getProfile(props.post.evmAddress.description).then((res) => {
        setUser(res);
      });
    }
  }, []);

  useEffect(() => {
    if (props.post.address) {
      getProfile(props.post.evmAddress.description).then((res) => {
        setUser(res);
      });
    }
  }, []);

  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(props.post.content.description);
    editor.setEditable(false);
  }, [editor]);

  const follow = async () => {
    try {
      const res = await followUser(
        polkadotAddress,
        props.post.evmAddress.description
      );
      setFollowing(res);
    } catch (err) {
      console.log(err);
    }
  };

  const unfollow = async () => {
    try {
      const res = await unfollowUser(
        polkadotAddress,
        props.post.evmAddress.description
      );
      setFollowing(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full bg-[color:var(--feed-foreground)] flex flex-col pl-7 pt-7 pr-5 pb-5 text-sm text-zinc-400 justify-between rounded-2xl">
      <div className="w-full flex justify-between">
        {/* Profile Picture and Name */}
        <div className="flex items-center mb-5">
          <Avatar>
            {user && <AvatarImage src={"https://" + user[3]} />}
            <AvatarFallback>{"Dot"}</AvatarFallback>
          </Avatar>
          <h1 className="text-white text-sm mx-3">{user[1]}</h1>
        </div>

        {/* Follow Button */}
        {evmAddress !== props.post.evmAddress.description && (
          <Button
            className="bg-zinc-800 hover:bg-zinc-600"
            onClick={() => {
              following.includes(props.post.evmAddress.description)
                ? unfollow()
                : follow();
            }}
          >
            {following.includes(props.post.evmAddress.description) ? (
              <span className="flex items-center">
                <Minus className="w-4 mr-2" />
                Unfollow
              </span>
            ) : (
              <span className="flex items-center">
                <Plus className="w-4 mr-2" />
                Follow
              </span>
            )}
          </Button>
        )}
      </div>

      {/* Post Title */}
      <h1 className="text-3xl font-bold text-white mb-5">
        {props.post.name.description}
      </h1>

      {/* Post Content */}
      <div className="w-full flex flex-col overflow-hidden mb-5 postTabGradient">
        {editor && <EditorContent editor={editor} />}
      </div>

      {/* Post Cover */}

      <Image
        src={"https://" + props.post.image.description}
        alt="Post Cover"
        height={500}
        width={1000}
        className="rounded-xl object-cover w-full h-[300px] mb-5"
      />

      {/* Post Like Button */}
      <div className="w-full flex justify-between items-center">
        <h1 className="text-sm text-zinc-400">
          Listed Post can be minted by anyone
        </h1>
        <Button className="bg-[color:var(--feed-foreground)] hover:bg-zinc-800">
          <span className="flex items-center">
            <WalletCards className="w-4 mr-2" /> Mint
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Web3PostTab;
