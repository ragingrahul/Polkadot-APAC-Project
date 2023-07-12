import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Copy, ChevronRight, ChevronLeft } from "lucide-react";
import {
  nextOnboardingStep,
  previousOnboardingStep,
} from "@/redux/defaultSlice";

const EVMAddress = () => {
  const EvmAddress = useSelector((state) => state.default.evmAddress);
  const dispatch = useDispatch();
  return (
    <div className="bg-black relative flex-col justify-center items-center flex">
      <div className="px-20 flex flex-col justify-center">
        {/* Steps Section */}
        <div className="absolute top-0 right-0">
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute right-8 top-8 text-white hover:bg-black hover:text-gray-300 w-[120px]"
            )}
          >
            Step 2 of 3
          </Link>
        </div>

        <div className="flex flex-col space-y-2">
          {/* Fund Account Section */}
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Fund your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Fund your Ethereum ERC-20 account to get started.
          </p>
        </div>

        {/* Copy Address Section */}
        <Button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "bg-transparent text-muted-foreground hover:bg-zinc-900 hover:text-white w-[500px] justify-between mt-5"
          )}
          onClick={() => {
            navigator.clipboard.writeText(EvmAddress);
            alert("Copied EVM Address to clipboard");
          }}
        >
          {EvmAddress}
          <Copy className="w-4" />
        </Button>

        {/* Next Button & Previous Button */}
        <div className="flex justify-between mt-7">
          <Button
            className={cn(
              buttonVariants({ variant: "outline" }),
              "bg-white text-black hover:bg-gray-300 hover:text-black w-[240px] relative"
            )}
            onClick={() => {
              dispatch(previousOnboardingStep());
            }}
          >
            <ChevronLeft className="absolute left-3 w-4" />
            Previous
          </Button>
          <Button
            className={cn(
              buttonVariants({ variant: "outline" }),
              "bg-white text-black hover:bg-gray-300 hover:text-black w-[240px] relative"
            )}
            onClick={() => {
              dispatch(nextOnboardingStep());
            }}
          >
            Next
            <ChevronRight className="absolute right-3 w-4" />
          </Button>
        </div>

        {/* Info */}
        <p className="text-left text-sm text-muted-foreground my-3">
          If your account is already funded, <br /> you can skip this step.
        </p>
      </div>
    </div>
  );
};

export default EVMAddress;
