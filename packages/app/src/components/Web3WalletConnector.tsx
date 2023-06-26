import React, { useMemo, useState } from "react";

import { Web3WalletButton } from "./Web3WalletButton";

import styles from "./Web3WalletConnector.module.css";
import { ETHEREUM_TESTNET_PARAMS } from "../connectors/chains/sepolia-eth";

const Web3WalletConnector = () => {
  const isActive = false;
  const [error, setError] = useState<Error>();

  async function connect() {}

  async function disconnect() {}

  return null;

  // return (
  //   <div className={styles.connector}>
  //     <Web3WalletButton connect={connect} />
  //     {isActive ? <button onClick={disconnect}>Disconnect</button> : null}
  //     {error ? (<p className={styles.error}>{error.message}</p>) : null}
  //   </div>
  // )
};

export default Web3WalletConnector;
