import type { HardhatUserConfig, NetworkUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-truffle5";
import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import "solidity-coverage";
import "dotenv/config";

const { KEY_TESTNET } = process.env;

const CoreTestnet: NetworkUserConfig = {
  url: "https://rpc.test.btcs.network/",
  chainId: 1115,
  accounts: [`0x${KEY_TESTNET}`],
};

// const bscMainnet: NetworkUserConfig = {
//   url: "https://bsc-dataseed.binance.org/",
//   chainId: 56,
//   accounts: [`0x${KEY_MAINNET}`],
// };

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    testnet: CoreTestnet,
    // mainnet: bscMainnet,
  },
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 99999,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  abiExporter: {
    path: "./data/abi",
    clear: true,
    flat: false,
  },
};

export default config;
