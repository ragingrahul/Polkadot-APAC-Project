import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Router, Wallet2 } from "lucide-react";
import { nextOnboardingStep } from "@/redux/defaultSlice";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import { getProfile, login, checkLogin } from "@/app/api/getProfile";
import { WsProvider } from "@polkadot/api";
import { stringToHex, stringToU8a } from "@polkadot/util";
import { useToast } from "@/components/ui/use-toast";
import { useWeb3Auth } from "@/app/hooks";

const AlreadyConnected = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasProfile, setHasProfile] = React.useState(false);
  const loginMethod = useSelector((state) => state.default.loginMethod);
  const dispatch = useDispatch();
  const evmAddress = useSelector((state) => state.default.evmAddress);
  const polkadotAddress = useSelector((state) => state.default.polkadotAddress);
  const router = useRouter();
  const { toast } = useToast();
  const { logout } = useWeb3Auth();

  const Login = async () => {
    try {
      setIsLoading(true);
      const { web3FromAddress } = await import("@polkadot/extension-dapp");
      const injector = await web3FromAddress(polkadotAddress);
      const { signature } = await injector.signer.signRaw({
        address: polkadotAddress,
        data: stringToHex(
          "Welcome to DotCom. Please read the terms and conditions before using the service."
        ),
        type: "bytes",
      });
      await login(polkadotAddress, evmAddress, signature);
      router.push("/feed");
    } catch (e) {
      console.log(e);
      toast({
        title: "Unauthorized",
        description: "Kindly sign the message to continue.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPro = async () => {
    if (evmAddress.length > 0) {
      const res = await getProfile(evmAddress);
      if (res[1].length === 0) {
        console.log("No User");
        setHasProfile(false);
        return;
      }
      setHasProfile(true);
      console.log(res);
    }
  };

  useEffect(() => {
    if (hasProfile) return;
    getPro();
  }, [evmAddress]);

  return (
    <div className="relative bg-black">
      {/* Connect Section */}
      <div className="absolute top-0 right-0">
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8 text-white hover:bg-black hover:text-gray-300"
          )}
        >
          Connected
        </Link>
      </div>

      {/* Connect Dialog */}
      <div className="mx-auto flex w-full h-full flex-col justify-center items-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Wallet Connected
          </h1>
          <p className="text-sm text-muted-foreground">
            Your wallet is now connected, <br /> proceed to the next step.
          </p>
        </div>

        {/* Connect with Email */}
        {hasProfile ? (
          <Button
            disabled={isLoading}
            className="bg-white text-black hover:bg-gray-300 hover:text-black w-[300px]"
            onClick={async () => {
              await Login();
            }}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Go to Feed
          </Button>
        ) : (
          <Button
            disabled={isLoading}
            className="bg-white text-black hover:bg-gray-300 hover:text-black w-[300px]"
            onClick={() => {
              dispatch(nextOnboardingStep());
            }}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Profile
          </Button>
        )}

        {loginMethod === "email" && (
          <>
            {" "}
            <div className="relative  w-[300px]">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted-foreground" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            {/* Connect with Wallet */}
            <Button
              disabled={isLoading}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "bg-transparent text-white hover:bg-zinc-900 hover:text-white w-[300px]"
              )}
              onClick={logout}
            >
              {(isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )) || <Wallet2 size={14} className="mr-2 h-4 w-4" />}
              Logout
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AlreadyConnected;
