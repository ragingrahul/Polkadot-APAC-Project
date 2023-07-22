"use client"

import { WsProvider, ApiPromise, Keyring } from '@polkadot/api'
import { ethers } from 'ethers'
import { dotComPostContract } from '@/utils/constants'

let ABI = ["function mintPostNFT(address dotter,string memory tokenURI)"]

const calculateMintPostCallData = async (address,tokenURI) => {
    let iface = new ethers.utils.Interface(ABI)

    let data = [
        address,
        tokenURI
    ]
    const hex = iface.encodeFunctionData("mintPostNFT", data)
    return hex
}


const moonBeamData = async (contractCall) => {
    const wsProviderAlpha = new WsProvider("wss://wss.api.moonbase.moonbeam.network")
    const apiAlpha = await ApiPromise.create({ provider: wsProviderAlpha })

    const callParams = {
        V2: {
            gasLimit: 710000n,
            action: { Call: dotComPostContract },
            value: 0,
            input: contractCall,
        }
    }

    const tx = apiAlpha.tx.ethereumXcm.transact(callParams)
    const encodedCall = tx.method.toHex()
    return encodedCall
}

const xcmMessage = async (evmAddress, moonbeamSCALE) => {
    const wsProviderRelayChain = new WsProvider("wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network")
    const apiRelayChain = await ApiPromise.create({ provider: wsProviderRelayChain })

    const amountToWithdraw = BigInt(1 * 10 ** 16);
    const devMultiLocation = {
        parents: 0,
        interior: { X1: { PalletInstance: 3 } }
    }

    const weightTransact = 43500000000n;

    const dest = { V3: { parents: 0, interior: { X1: { Parachain: 1000 } } } }

    const instr1 = {
        WithdrawAsset: [
            {
                id: { Concrete: devMultiLocation },
                fun: { Fungible: amountToWithdraw },
            },
        ],
    }

    const instr2 = {
        BuyExecution: {
            fees: {
                id: { Concrete: devMultiLocation },
                fun: { Fungible: amountToWithdraw }
            },
            weightLimit: { Unlimited: null },
        }
    }

    const instr3 = {
        Transact: {
            originKind: 'SovereignAccount',
            requireWeightAtMost: { refTime: weightTransact, proofSize: 200000n },
            call: {
                encoded: moonbeamSCALE,
            }
        }
    }

    const instr4 = {
        DepositAsset: {
            assets: { Wild: 'All' },
            beneficiary: {
                parents: 0,
                interior: { X1: { AccountKey20: { key: evmAddress } } },
            },
        },
    };

    const message = { V3: [instr1, instr2, instr3, instr4] }

    const tx = apiRelayChain.tx.xcmPallet.send(dest, message)
    const encodedCall = tx.toHex()
    return encodedCall

}

export const createPost = async (evmAddress, tokenURI) => {

    // const wsProviderRelayChain=new WsProvider("wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network")


    // const apiRelayChain=await ApiPromise.create({wsProviderRelayChain})

    const contractCallData = await calculateMintPostCallData(evmAddress,tokenURI)
    const moonbeamEncodedData = await moonBeamData(contractCallData)
    const xcmCallData = await xcmMessage(evmAddress, moonbeamEncodedData)
    return xcmCallData
}