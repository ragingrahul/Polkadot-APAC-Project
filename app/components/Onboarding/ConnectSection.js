"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import {
  initiateOnboarding,
  setEvmAddress,
  setPolkadotAddress,
} from "@/redux/defaultSlice";
import { Input } from "@/components/ui/input";
import { Wallet2 } from "lucide-react";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { CHAIN_NAMESPACES,WALLET_ADAPTERS } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CommonPrivateKeyProvider } from "@web3auth/base-provider";
import RPC from '../../util/polkadotRPC'

const clientId="BHU28_3aSDIzfxbmGoAxn8D8X3Dctu1qZiCN12N_ztH_rgSjZJK1FasQiyqYRxiYIpjP1O6g3FgOTCQ3BQRnlgE"

const ConnectSection = () => {
  const [web3auth,setWeb3auth]=React.useState(null)
  const [provider,setProvider]=React.useState(null)
  const [loggedIn,setLoggedIn]=React.useState(false)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState();

  const handleConnect = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      dispatch(initiateOnboarding());
      dispatch(
        setPolkadotAddress("15gFi9nN4SR6pfPN8wJ9DvnMRTPvcS1Z5J8znFLSkr2paspZ")
      );
      dispatch(setEvmAddress("0x14D8e2C3A03f3708dA1a04002F91B953FB9853CC"));
    }, 1000);
  };

  // Initializing web3Auth
  useEffect(()=>{
    const initializeWeb3Auth=async()=>{
      try {
        const chainConfig={
          chainNamespace:CHAIN_NAMESPACES.OTHER,
          chainId:"0x1",
          rpcTarget: "https://rpc.polkadot.io/",
          displayName: "Polkadot Mainnet",
          blockExplorer: "https://explorer.polkascan.io/",
          ticker: "DOT",
          tickerName: "Polkadot",
        }
        const web3authInstance = new Web3AuthNoModal({
          clientId,
          chainConfig,
          web3AuthNetwork: "aqua",
        });

        setWeb3auth(web3authInstance)

        const privateKeyProvider = new CommonPrivateKeyProvider({ config: { chainConfig } });
        const openloginAdapter = new OpenloginAdapter({
          privateKeyProvider,
        });
        web3authInstance.configureAdapter(openloginAdapter);
        await web3authInstance.init();
        setProvider(web3authInstance.provider);
        if (web3authInstance.connectedAdapterName) {
          setLoggedIn(true);
        }

      } catch (error) {
        console.error(error)
      }
    }

    initializeWeb3Auth()
  },[])

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
      loginProvider: "google",
    });
    setProvider(web3authProvider);
    setLoggedIn(true);
    console.log("Logged in Successfully!");
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    console.log("Logged Out")
    setProvider(null);
    setLoggedIn(false);
  };


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
          Connect
        </Link>
      </div>

      {/* Connect Dialog */}
      <div className="mx-auto flex w-full h-full flex-col justify-center items-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Connect a wallet
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to get started.
          </p>
        </div>

        {/* Connect with Email */}
        <div className="flex flex-col space-y-2 mt-5">
          <Input
            type="text"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="ring-offset-gray-900 text-black focus-visible:ring-gray-600 border-gray-500 bg-white w-[300px]"
          />
        </div>
        <Button
          disabled={isLoading}
          className="bg-white text-black hover:bg-gray-300 hover:text-black w-[300px]"
          onClick={handleConnect}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Sign In with Email
        </Button>

        <div className="relative  w-[300px]">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted-foreground" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Connect with Wallet */}
        <Button
          disabled={isLoading}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "bg-transparent text-white hover:bg-zinc-900 hover:text-white w-[300px]"
          )}
          onClick={handleConnect}
        >
          {(isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )) || <Wallet2 size={14} className="mr-2 h-4 w-4" />}
          Connect
        </Button>
        <Button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "bg-transparent text-white hover:bg-zinc-900 hover:text-white w-[300px]"
          )}
          onClick={login}
        >
          Login
        </Button>
        <Button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "bg-transparent text-white hover:bg-zinc-900 hover:text-white w-[300px]"
          )}
          onClick={logout}
        >
          Logout
        </Button>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By connecting your wallet, you agree to our{" "}
          <Link
            href="#"
            className="underline underline-offset-4 hover:text-gray-300"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="underline underline-offset-4 hover:text-gray-300"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default ConnectSection;
