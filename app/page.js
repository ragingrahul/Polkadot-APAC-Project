"use client"

import Image from 'next/image'
import { WsProvider, ApiPromise } from '@polkadot/api'
import { useEffect, useState } from 'react'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'

const name = "Moonbeam"

export default function Home() {
  const [api, setApi] = useState()
  const [accounts, setAccounts] = useState([])
  const [selectedAccounts, setSelectedAccounts] = useState()

  const setup = async () => {
    const wsProvider = new WsProvider("wss://wss.api.moonbase.moonbeam.network")

    const api = await ApiPromise.create({ provider: wsProvider })

    setApi(api)
  }

  const handleConnection = async () => {

    const extensions = await web3Enable(name)

    if (!extensions) {
      throw Error("No Extensions found")
    }

    const allAccounts = await web3Accounts()
    console.log(allAccounts)
    setAccounts(allAccounts)

    if (allAccounts.length == 1)
      setSelectedAccounts(allAccounts[0])
  }

  useEffect(() => {
    setup()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {accounts.length === 0 ?
        (
          <button onClick={handleConnection}>
            Connect
          </button>
        ) : null
      }
      <div>
        dapp
      </div>
    </main>
  )
}
