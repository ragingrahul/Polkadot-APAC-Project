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

const PolkadotAddress = () => {
  const polkadotAddress = useSelector((state) => state.default.polkadotAddress);
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
            Step 1 of 3
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          {/* Fund Account Section */}
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Fund your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Fund your Polkadot account to get started.
          </p>
        </div>

        {/* Copy Address Section */}
        <Button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "bg-transparent text-muted-foreground hover:bg-zinc-900 hover:text-white w-[500px] justify-between mt-5"
          )}
          onClick={() => {
            navigator.clipboard.writeText(polkadotAddress);
            alert("Copied Polkadot Address to clipboard");
          }}
        >
          {polkadotAddress}
          <Copy className="w-4" />
        </Button>

        {/*  Previous Button */}
        <div className="flex justify-between mt-7">
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

export default PolkadotAddress;
