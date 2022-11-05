
import React, { useMemo } from 'react'

import { InjectedConnector } from '@web3-react/injected-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { Web3WalletButton } from './Web3WalletButton'

import styles from './Web3WalletConnector.module.css'
import { Web3Provider } from '@ethersproject/providers'

const AVALANCHE_TESTNET_PARAMS = {
  chainId: '0xA869',
  chainName: 'Avalanche Testnet C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://cchain.explorer.avax-test.network/'],
}

const ETHEREUM_TESTNET_PARAMS = {
  chainId: '0x5',
  chainName: 'Ethereum Goerli',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://goerli.infura.io/v3/'],
  blockExplorerUrls: ['https://goerli.etherscan.io/'],
}

const Web3WalletConnector = () => {

  async function connect() {
  }

  async function disconnect() {
  }

  const isUnsupportedChainIdError = useMemo(() => {
    return error instanceof UnsupportedChainIdError
  }, [error])

  return (
    <div className={styles.connector}>
      {isUnsupportedChainIdError ? <p>Network change required</p> : null}
      <Web3WalletButton connect={connect} />
      {active ? <button onClick={disconnect}>Disconnect</button> : null}
    </div>
  )
}

export default Web3WalletConnector
