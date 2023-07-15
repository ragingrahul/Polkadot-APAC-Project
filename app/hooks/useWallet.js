"use client"

import { WsProvider, ApiPromise, Keyring } from '@polkadot/api'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { calculateMultilocation } from '@/utils/calculate-multilocation'
//import { ethers } from 'ethers'
import { useDispatch, useSelector } from "react-redux"
import {
    
    setEvmAddress,
    setPolkadotAddress,
    
} from "@/redux/defaultSlice";

export function useWallet(){
    const dispatch = useDispatch()
    const polkadotAddress = useSelector((state) => state.default.polkadotAddress)


    useEffect(() => {
        const evmAddress = createEVMAddress(polkadotAddress)
        dispatch(setEvmAddress(evmAddress))
    }, [polkadotAddress])

    const createEVMAddress = async (polkadotAddress) => {
        if (polkadotAddress) {
            //console.log(await polkadotAddress)
            const multiLocation = await calculateMultilocation(await polkadotAddress)
            dispatch(setEvmAddress(multiLocation))
        }
    }

    const connectWallet=async()=>{
        const { web3Accounts, web3Enable } = await import(
            "@polkadot/extension-dapp"
          );
        const extensions =await web3Enable("dotUser")

        if(!extensions){
            throw Error("No Extensions found")
        }
        console.log("Hello")
        const accounts=await web3Accounts()
        console.log(accounts[0].address)
        dispatch(setPolkadotAddress(accounts[0].address))
        return accounts[0].address
    }

    return{
        connectWallet
    }
}