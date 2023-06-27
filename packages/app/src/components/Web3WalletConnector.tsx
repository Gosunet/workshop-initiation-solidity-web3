import React, { useMemo, useState } from "react";

import { Web3WalletButton } from "./Web3WalletButton";

import styles from "./Web3WalletConnector.module.css";
import { ETHEREUM_TESTNET_PARAMS } from "../connectors/chains/sepolia-eth";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

const Web3WalletConnector = () => {
  const { isActive, connector } = useWeb3React<Web3Provider>();
  const [error, setError] = useState<Error>();

  async function connect() {
    try {
      setError(undefined);
      await connector.activate(ETHEREUM_TESTNET_PARAMS);
    } catch (e) {
      console.log(e);
      setError(e as Error);
    }
  }

  async function disconnect() {
    await connector.resetState();
  }

  return (
    <div className={styles.connector}>
      <Web3WalletButton connect={connect} />
      {isActive ? <button onClick={disconnect}>Disconnect</button> : null}
      {error ? <p className={styles.error}>{error.message}</p> : null}
    </div>
  );
};

export default Web3WalletConnector;
