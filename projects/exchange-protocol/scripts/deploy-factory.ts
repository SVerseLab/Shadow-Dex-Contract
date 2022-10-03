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

  if (!config.feeToSetter[networkName] || config.feeToSetter[networkName] === ethers.constants.AddressZero) {
    throw new Error("Missing feeToSetter address, refer to README 'Deployment' section");
  }

  console.log("Deploying to network:", networkName);

  // Deploy ShadowFactory
  console.log("Deploying ShadowFactory..");

  const ShadowFactory = await ethers.getContractFactory("ShadowFactory");

  const shadowFactory = await ShadowFactory.deploy(
    config.feeToSetter[networkName],
  );

  await shadowFactory.deployed();

  console.log("ShadowFactory deployed to:", shadowFactory.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
