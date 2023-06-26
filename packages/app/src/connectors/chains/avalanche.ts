
export const AVALANCHE_TESTNET_PARAMS = {
  chainId: 0xA869,
  chainName: "Avalanche Testnet C-Chain",
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18 as const,
  },
  rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
  blockExplorerUrls: ["https://cchain.explorer.avax-test.network/"],
};

