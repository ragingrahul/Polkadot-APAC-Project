"use client"

import Image from 'next/image'
import { WsProvider, ApiPromise, Keyring } from '@polkadot/api'
import { useEffect, useState } from 'react'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { calculateMultilocation } from './utils/calculate-multilocation'
import { ethers } from 'ethers'

const name = "Moonbeam"

let ABI = ["function initializeUser(string memory name,string memory avatar,string memory bio,uint256 dob)"]
const dotComUserContract = '0x444a911808D18E17Bf4D7eB44Aa4dee09c605248'
const contractCall = '0xdddc63d4000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000003bcd1a6d0000000000000000000000000000000000000000000000000000000000000008526168756c52616a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005268747470733a2f2f6261666b7265696178736d65636b6166693271776c3571356266367076796a3362776a64616d7037736268366365646270623672687479336d64692e697066732e7733732e6c696e6b2f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008546865204b696e67000000000000000000000000000000000000000000000000';
const moonbeamSCALE = "0x26000170d50a000000000000000000000000000000000000000000000000000000000000444a911808d18e17bf4d7eb44aa4dee09c60524800000000000000000000000000000000000000000000000000000000000000001106dddc63d4000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000003bcd1a6d0000000000000000000000000000000000000000000000000000000000000008526168756c52616a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005268747470733a2f2f6261666b7265696178736d65636b6166693271776c3571356266367076796a3362776a64616d7037736268366365646270623672687479336d64692e697066732e7733732e6c696e6b2f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008546865204b696e6700000000000000000000000000000000000000000000000000"
const XCMCall = "0xcd0804630003000100a10f031000040000010403000f0000c16ff28623130000010403000f0000c16ff28623000601070053cd200a02350c007d0726000170d50a000000000000000000000000000000000000000000000000000000000000444a911808d18e17bf4d7eb44aa4dee09c60524800000000000000000000000000000000000000000000000000000000000000001106dddc63d4000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000003bcd1a6d0000000000000000000000000000000000000000000000000000000000000008526168756c52616a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005268747470733a2f2f6261666b7265696178736d65636b6166693271776c3571356266367076796a3362776a64616d7037736268366365646270623672687479336d64692e697066732e7733732e6c696e6b2f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008546865204b696e67000000000000000000000000000000000000000000000000000d010000010300ef7bcb9acb294da0eded2d28f7edcbafd81fb0e2"

export default function Home() {
  const [api, setApi] = useState()
  const [accounts, setAccounts] = useState([])
  const [selectedAccounts, setSelectedAccounts] = useState()
  const [multiLocation, setMultiLocation] = useState()

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

    let address = allAccounts[0].address

    //calculate multi location
    const multiLocation = await calculateMultilocation(address)
    setMultiLocation(multiLocation)
  }

  //Calculate Function CallData

  const calculateContractFunctionCallData = async () => {
    let iface = new ethers.utils.Interface(ABI)
    let data = [
      "RahulRaj",
      "https://bafkreiaxsmeckafi2qwl5q5bf6pvyj3bwjdamp7sbh6cedbpb6rhty3mdi.ipfs.w3s.link/",
      "The King",
      "1003297389"
    ]
    const hex = iface.encodeFunctionData("initializeUser", data)
    console.log(hex)
    return hex
  }

  //Generating Moonbeam Encoded CallData
  const moonBeamCallData = async () => {
    const callParams = {
      V2: {
        gasLimit: 710000n,
        action: { Call: dotComUserContract },
        value: 0,
        input: contractCall,
      }
    }

    const tx = api.tx.ethereumXcm.transact(callParams)

    const encodedCall = tx.method.toHex()
    console.log("Encoded CallData:", encodedCall)
  }

  const xcmMessage = async () => {
    const providerWsURL = 'wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network';
    const amountToWithdraw = BigInt(1 * 10 ** 16); // 0.01 DEV
    const devMultiLocation = {
      parents: 0,
      interior: { X1: { PalletInstance: 3 } },
    };

    const weightTransact = 43500000000n; // 25000 * Gas limit of EVM call
    const multiLocAccount = '0xef7bcb9acb294da0eded2d28f7edcbafd81fb0e2'; // REPLACE with your multilocation-derivative account

    // 2. XCM Destination (Moonbase Alpha Parachain ID 1000)
    const dest = { V3: { parents: 0, interior: { X1: { Parachain: 1000 } } } };

    // 3. XCM Instruction 1
    const instr1 = {
      WithdrawAsset: [
        {
          id: { Concrete: devMultiLocation },
          fun: { Fungible: amountToWithdraw },
        },
      ],
    };

    const instr2 = {
      BuyExecution: {
        fees: {
          id: { Concrete: devMultiLocation },
          fun: { Fungible: amountToWithdraw },
        },
        weightLimit: { Unlimited: null },
      },
    };

    const instr3 = {
      Transact: {
        originKind: 'SovereignAccount',
        requireWeightAtMost: { refTime: weightTransact, proofSize: 200000n },
        call: {
          encoded: moonbeamSCALE,
        },
      },
    };

    const instr4 = {
      DepositAsset: {
        assets: { Wild: 'All' },
        beneficiary: {
          parents: 0,
          interior: { X1: { AccountKey20: { key: multiLocAccount } } },
        },
      },
    };

    const message = { V3: [instr1, instr2, instr3, instr4] };

    const substrateProvider = new WsProvider(providerWsURL);
    const apiLocal = await ApiPromise.create({ provider: substrateProvider });

    // 9. Create the Extrinsic
    const tx = apiLocal.tx.xcmPallet.send(dest, message);

    // 10. Get SCALE Encoded Calldata
    const encodedCall = tx.toHex();
    console.log(`Encoded Calldata: ${encodedCall}`);

  }

  const sendXCM = async () => {
    const providerWsURL ='wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network';
    const MNEMONIC = 'weapon turn shop mango atom invest hurt fatal night work away square'; // Not safe, only for testing
  
    const keyring=new Keyring({type:'sr25519'})

    const substrateProvider = new WsProvider(providerWsURL);
    const api = await ApiPromise.create({ provider: substrateProvider });

    const rahul=keyring.addFromUri(MNEMONIC)

    const tx=await api.tx(XCMCall).signAndSend(rahul,(result)=>{
      console.log(`Transaction sent`)
      if(result.status.isInBlock){
        console.log(`Transaction include in blockHash ${result.status.asInBlock}`)
      }
    })
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
        Calculate initializeUser CallData
      </button>
      <button onClick={moonBeamCallData}>
        Calculate moonbeam CallData
      </button>
      <button onClick={xcmMessage}>
        Calculate XCM CallData
      </button>
      <button onClick={sendXCM}>
        Send XCM message
      </button>
      <div>
        dapp
      </div>
    </main>
  )
}
