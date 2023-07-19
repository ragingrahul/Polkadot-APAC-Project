import { Button } from "@/components/ui/button";
import { Box, Database } from "lucide-react";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { saveToIPFS } from "@/app/hooks/saveToIPFS";
import { createPost } from "@/app/hooks/createPostXCM";
import { WsProvider, ApiPromise } from "@polkadot/api";
import RPC from "../../../utils/polkadotRPC";

const PostPrompt = () => {
  const editor = useSelector((state) => state.default.editor);
  const title = useSelector((state) => state.default.title);
  const cover = useSelector((state) => state.default.cover);
  const evmAddress = useSelector((state) => state.default.evmAddress)
  const polkadotAddress = useSelector((state) => state.default.polkadotAddress)
  const provider = useSelector((state) => state.default.provider);



  const createWeb3PostW3A = async () => {

    if (!cover || !title || !editor.getJSON().content[0].content) {
      window.alert("Cannot keep any field empty")
      return
    }
    const cidImage = await saveToIPFS(cover)
    const postMetadata = {
      "properties": {
        "name": {
          "type": "string",
          "description": title
        },
        "description": {
          "type": "string",
          "description": "Post on dotCom Network"
        },
        "image": {
          "type": "string",
          "description": `${cidImage}.ipfs.w3s.link`
        },
        "evmAddress": {
          "type": "string",
          "description": evmAddress
        },
        "polkadotAddress": {
          "type": "string",
          "description": polkadotAddress
        },
        "content": {
          "type": "string",
          "description": editor.getJSON()
        },
        "web": {
          "type": "string",
          "description": "3"
        },
        "date": {
          "type": "string",
          "description": Date.now()
        },
        "chain": {
          "type": "string",
          "description": "polkadot"
        }
      }
    }
    const file = new File([JSON.stringify(postMetadata)], 'file.json', { type: 'application/json' })
    const cidPost = await saveToIPFS(file)
    const xcmCallData = await createPost(
      evmAddress,
      `${cidPost}.ipfs.w3s.link`
    )
    const rpc = new RPC(provider);
    const keyPair = await rpc.getPolkadotKeyPair();
    const api = await rpc.makeClient();
    const tx = await api.tx(xcmCallData).signAndSend(keyPair);
    console.log(tx);
  }

  return (
    <div className="w-full h-full flex flex-col relative justify-center p-20">
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

      <div className="flex flex-col space-y-1 mb-5">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Create a post
        </h1>
        <p className="text-sm text-muted-foreground">
          Choose a type of post to create.
        </p>
      </div>

      <div className="flex flex-col space-y-2 mt-4 ">
        <div className="flex flex-col space-y-7 ">
          <Button
            className="bg-black relative hover:bg-zinc-800 border-2 group border-zinc-800 h-[200px] w-[400px] p-6 flex justify-between items-start flex-col"
            onClick={() => {
              console.log(evmAddress)
              console.log(provider)
            }}
          >
            <div className="flex flex-col space-y-1 items-start">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Create a normal post
              </h1>
              <p className="text-sm text-muted-foreground">
                Post stored in a centralized database.
              </p>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white group-hover:animate-pulse">
              Web2
            </h1>

            <Database className="w-4 h-4 text-white absolute bottom-6 right-6" />
          </Button>

          <Button className="bg-black relative hover:bg-zinc-800 border-2 group border-zinc-800 h-[200px] w-[400px] p-6 flex justify-between items-start flex-col"
            onClick={createWeb3PostW3A}
          >
            <div className="flex flex-col space-y-1 items-start">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Create a Web3 post
              </h1>
              <p className="text-sm text-muted-foreground">
                Post stored in the blockchain for eternity
              </p>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white group-hover:animate-pulse">
              Web3
            </h1>

            <Box className="w-4 h-4 text-white absolute bottom-6 right-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostPrompt;
