
import { useWeb3React } from '@web3-react/core'
import React, { FC } from 'react'

import styles from './Web3WalletButton.module.css'
import cn from 'classnames'

type Web3WalletButtonProps = { connect: () => void }

const truncate = (input: string) =>
  input.length > 5
    ? `${input.substring(0, 3)}...${input.substring(
        input.length - 2,
        input.length
      )}`
    : input

export const Web3WalletButton: FC<Web3WalletButtonProps> = ({ connect }) => {
  const { active, account } = useWeb3React()

  if (active && account) {
    return (
      <span className={styles.address}>
        Connected with{' '}
        <strong className={styles.addressHex}>{truncate(account)}</strong>
      </span>
    )
  } else {
    return (
      <button className={cn(styles.button, styles.primary)} onClick={connect}>
        Connect wallet
      </button>
    )
  }
}
