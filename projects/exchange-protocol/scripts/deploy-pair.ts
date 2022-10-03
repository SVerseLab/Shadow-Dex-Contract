/* eslint-disable no-console */
import { ethers, network, run } from "hardhat";

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

  // if (!config.ShadowRouter[networkName] || config.ShadowRouter[networkName] === ethers.constants.AddressZero) {
  //   throw new Error("Missing router address, refer to README 'Deployment' section");
  // }

  // if (!config.WCORE[networkName] || config.WCORE[networkName] === ethers.constants.AddressZero) {
  //   throw new Error("Missing WBNB address, refer to README 'Deployment' section");
  // }

  console.log("Deploying to network:", networkName);

  // Deploy ShadowPair
  console.log("Deploying ShadowPair..");

  const ShadowPair = await ethers.getContractFactory("ShadowPair");

  const shadowPair = await ShadowPair.deploy(
    // config.WCORE[networkName],
    // config.ShadowRouter[networkName],
    // config.MaxZapReverseRatio[networkName]
  );

  await shadowPair.deployed();

  console.log("ShadowPair deployed to:", shadowPair.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
