"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const ConnectSection = () => {
  const [isLoading, setIsLoading] = React.useState(false);
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
            Connect your Polkadot wallet to get started.
          </p>
        </div>
        <Button
          disabled={isLoading}
          className="bg-white text-black hover:bg-gray-300 hover:text-black"
          onClick={() => setIsLoading(true)}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Connnect
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
