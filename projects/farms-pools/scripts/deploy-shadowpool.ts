/* eslint-disable no-console */
import { ethers, network, run } from "hardhat";
import config from "../config";

const main = async () => {
  // Compile contracts
  await run("compile");
  console.log("Compiled contracts.");

  const networkName = network.name;

  // Sanity checks
  if (networkName === "mainnet") {
    if (!process.env.KEY_MAINNET) {
      throw new Error("Missing private key, refer to README 'Deployment' section");
    }
  } else if (networkName === "testnet") {
    if (!process.env.KEY_TESTNET) {
      throw new Error("Missing private key, refer to README 'Deployment' section");
    }
  }

  if (!config.TOKEN[networkName] || config.TOKEN[networkName] === ethers.constants.AddressZero) {
    throw new Error("Missing TOKEN address, refer to README 'Deployment' section");
  }

  if (!config.SHADOWCHEFV2[networkName] || config.SHADOWCHEFV2[networkName] === ethers.constants.AddressZero) {
    throw new Error("Missing SHADOWCHEFV2 address, refer to README 'Deployment' section");
  }
  if (!config.ADMIN[networkName] || config.ADMIN[networkName] === ethers.constants.AddressZero) {
    throw new Error("Missing ADMIN address, refer to README 'Deployment' section");
  }
  if (!config.TREASURY[networkName] || config.TREASURY[networkName] === ethers.constants.AddressZero) {
    throw new Error("Missing TREASURY address, refer to README 'Deployment' section");
  }
  if (!config.OPERATOR[networkName] || config.OPERATOR[networkName] === ethers.constants.AddressZero) {
    throw new Error("Missing OPERATOR address, refer to README 'Deployment' section");
  }
  if (!config.PID[networkName] || config.PID[networkName] === ethers.constants.AddressZero) {
    throw new Error("Missing PID address, refer to README 'Deployment' section");
  }

  console.log("Deploying to network:", networkName);

  // Deploy ShadowZap
  console.log("Deploying ShadowPool..");

  const ShadowPool = await ethers.getContractFactory("ShadowPool");

  const shadowPool = await ShadowPool.deploy(
    config.TOKEN[networkName],
    config.SHADOWCHEFV2[networkName],
    config.ADMIN[networkName],
    config.TREASURY[networkName],
    config.OPERATOR[networkName],
    config.PID[networkName]
  );

  await shadowPool.deployed();

  console.log("ShadowPool deployed to:", shadowPool.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
