"use client"

import Image from 'next/image'
import { WsProvider, ApiPromise } from '@polkadot/api'
import { useEffect, useState } from 'react'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { calculateMultilocation } from './utils/calculate-multilocation'
import { ethers } from 'ethers'

const name = "Moonbeam"

let ABI=["function batchAll(address[] memory to,uint256[] memory value,bytes[] memory callData,uint64[] memory gasLimit)"]
const batchPrecompile = '0x0000000000000000000000000000000000000808'
const contractCall ='0x96e292b8000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001e000000000000000000000000000000000000000000000000000000000000000020000000000000000000000001fc56b105c4f0a1a8038c2b429932b122f6b631f000000000000000000000000ed13b028697febd70f34cf9a9e280a8f1e98fd29000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000042004ffd90000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000042004ffd9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';

export default function Home() {
  const [api, setApi] = useState()
  const [accounts, setAccounts] = useState([])
  const [selectedAccounts, setSelectedAccounts] = useState()
  const [multiLocation,setMultiLocation] = useState()

  //connects to provider
  const setup = async () => {
    const wsProvider = new WsProvider("wss://wss.api.moonbase.moonbeam.network")

    const api = await ApiPromise.create({ provider: wsProvider })

    setApi(api)
  }

  //Connects and calculates the multi location
  const handleConnection = async () => {

    const extensions = await web3Enable(name)

    if (!extensions) {
      throw Error("No Extensions found")
    }
    //setting accounts
    const allAccounts = await web3Accounts()
    console.log(allAccounts)
    setAccounts(allAccounts)

    let address=allAccounts[0].address
    
    //calculate multi location
    const multiLocation = await calculateMultilocation(address)
    setMultiLocation(multiLocation)
  }

  //Calculate Function CallData

  const calculateContractFunctionCallData = async()=>{
    let iface=new ethers.utils.Interface(ABI)
    let data=[
      ["0x1FC56B105c4F0A1a8038c2b429932B122f6B631f","0xed13B028697febd70f34cf9a9E280a8f1E98FD29"],
      [],
      ["0x2004ffd9","0x2004ffd9"],
      []
    ]
    const hex=iface.encodeFunctionData("batchAll",data)
    console.log(hex)
    return hex
  }

  //Generating Moonbeam Encoded CallData
  const moonBeamCallData= async()=>{
    const callParams={
      V2:{
        gasLimit:150000n,
        action:{Call:batchPrecompile},
        value:0,
        input:contractCall,
      }
    }
  }
  

  useEffect(() => {
    setup()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <button onClick={handleConnection}>
        Connect
      </button>
      <button onClick={calculateContractFunctionCallData}>
        Calculate FunctionCall Data
      </button>
      <div>
        dapp
      </div>
    </main>
  )
}
