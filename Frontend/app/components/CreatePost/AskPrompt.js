import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Icons } from "@/components/ui/icons";

export function usePrompt() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [web, setWeb] = React.useState(2);
  const [isSucess, setIsSucess] = React.useState(false);
  const router = useRouter();
  const [promptActive, setPromptActive] = React.useState(false);
  const [Function, setFunction] = React.useState(() => {});

  const triggerPrompt = (Function, Web) => {
    setPromptActive(true);
    setFunction(Function);
    setWeb(Web);
  };

  const triggerFunction = async () => {
    try {
      setIsLoading(true);
      await Function;
      setIsSucess(true);
    } catch (error) {
      setIsSucess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const closePrompt = () => {
    setPromptActive(false);
  };

  useEffect(() => {
    if (isSucess) {
      setInterval(() => {
        router.push("/feed");
      }, 1000);
    }
  }, [isSucess]);

  const Prompt = () => {
    return (
      <>
        {promptActive && (
          <div className="h-screen w-screen flex items-center fixed bg-black/20 backdrop-blur-md backdrop-filter z-100 top-0 left-0">
            <div className="h-full w-[575px] flex-col flex justify-center items-center space-y-3">
              {!isLoading && !isSucess && (
                <>
                  <div className="flex flex-col space-y-1 items-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-white">
                      {web === 2
                        ? "Create a normal post"
                        : "Create a Web3 post"}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Want to continue with this post?
                    </p>
                  </div>
                  <Button
                    className="bg-black relative hover:bg-zinc-800 border-2 group border-zinc-800 h-[50px] w-[200px] p-6 flex justify-center items-center flex-col"
                    onClick={triggerFunction}
                  >
                    Yes
                  </Button>
                  <Button
                    className="bg-black relative hover:bg-zinc-800 border-2 group border-zinc-800 h-[50px] w-[200px] p-6 flex justify-center items-center flex-col"
                    onClick={closePrompt}
                  >
                    No
                  </Button>
                </>
              )}
              {isLoading && (
                <Icons.spinner className="mr-2 h-8 w-8 animate-spin text-white" />
              )}
              {isSucess && (
                <div className="flex flex-col space-y-1 items-center">
                  <h1 className="text-2xl font-semibold tracking-tight text-white">
                    <Check className="w-8 h-8 text-white" />
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Post Created Sucessfully
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  };

  return [Prompt, triggerPrompt];
}
