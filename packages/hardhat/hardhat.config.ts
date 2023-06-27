import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config();
const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: process.env.STAGING_ALCHEMY_KEY_URL,
      accounts: [process.env.PRIVATE_KEY],
    }
  }
};

export default config;
