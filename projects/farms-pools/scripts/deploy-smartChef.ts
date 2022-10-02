import { ethers, network } from "hardhat";
import { parseEther } from "ethers/lib/utils";

import config from "../config";

const currentNetwork = network.name;

async function main() {
  // eslint-disable-next-line eqeqeq
  if (currentNetwork == "mainnet") {
    if (!process.env.KEY_MAINNET) {
      throw new Error("Missing private key, refer to README 'Deployment' section");
    }
    if (
      !config.Admin[currentNetwork] ||
      config.Admin[currentNetwork] === "0x0000000000000000000000000000000000000000"
    ) {
      throw new Error("Missing admin address, refer to README 'Deployment' section");
    }
  }

  console.log("Deploying to network:", currentNetwork);

  let rewardTokenAddress: string;

  // eslint-disable-next-line eqeqeq
  if (currentNetwork == "testnet") {
    const MockBEP20 = await ethers.getContractFactory("MockBEP20");
    const rewardToken = await MockBEP20.deploy("Pool Token 1", "PT1", parseEther("800000"));
    rewardTokenAddress = rewardToken.address;
    console.log("RewardToken deployed to:", rewardTokenAddress);
  // eslint-disable-next-line eqeqeq
  } else if (currentNetwork == "mainnet") {
    rewardTokenAddress = config.RewardToken[currentNetwork];
  }

  console.log("Deploying ShadowChef...");

  const SmartChef = await ethers.getContractFactory("ShadowChef");

  const smartChef = await SmartChef.deploy(
    config.SHDW[currentNetwork],
    config.BurnAdmin[currentNetwork],
   
  );

  console.log("ShadowChef deployed to:", smartChef.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
