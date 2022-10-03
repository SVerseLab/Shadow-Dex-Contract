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

  if (!config.ShadowFactory[networkName] || config.ShadowFactory[networkName] === ethers.constants.AddressZero) {
    throw new Error("Missing shadowfactory address, refer to README 'Deployment' section");
  }

  if (!config.WCORE[networkName] || config.WCORE[networkName] === ethers.constants.AddressZero) {
    throw new Error("Missing WCORE address, refer to README 'Deployment' section");
  }

  console.log("Deploying to network:", networkName);

  // Deploy ShadowRouter
  console.log("Deploying ShadowRouter..");

  const ShadowRouter = await ethers.getContractFactory("ShadowRouter");

  const shadowRouter = await ShadowRouter.deploy(
    config.ShadowFactory[networkName],
    config.WCORE[networkName],
  );

  await shadowRouter.deployed();

  console.log("ShadowRouter deployed to:", shadowRouter.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
