"use client"

import { WsProvider, ApiPromise, Keyring } from '@polkadot/api'
import { useEffect, useState } from 'react'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { calculateMultilocation } from '@/utils/calculate-multilocation'
//import { ethers } from 'ethers'
import { useDispatch, useSelector } from "react-redux"
import {
    initiateOnboarding,
    setEvmAddress,
    setPolkadotAddress,
    setProvider
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
        const extensions =await web3Enable("dotUser")

        if(!extensions){
            throw Error("No Extensions found")
        }

        const accounts=await web3Accounts()

        dispatch(setPolkadotAddress(accounts[0].address))

    }

    return{
        connectWallet
    }
}