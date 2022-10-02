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

  if (!config.ShadowRouter[networkName] || config.ShadowRouter[networkName] === ethers.constants.AddressZero) {
    throw new Error("Missing shadowrouter address, refer to README 'Deployment' section");
  }

  if (!config.WCORE[networkName] || config.WCORE[networkName] === ethers.constants.AddressZero) {
    throw new Error("Missing WCORE address, refer to README 'Deployment' section");
  }

  console.log("Deploying to network:", networkName);

  // Deploy ShadowZap
  console.log("Deploying ShadowZap V1..");

  const ShadowZap = await ethers.getContractFactory("ShadowZap");

  const shadowZap = await ShadowZap.deploy(
    config.WCORE[networkName],
    config.ShadowRouter[networkName],
    config.MaxZapReverseRatio[networkName]
  );

  await shadowZap.deployed();

  console.log("ShadowZap V1 deployed to:", shadowZap.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
