import { ethers, network } from "hardhat";

import config from "../config";

const currentNetwork = network.name;

async function main() {
  // eslint-disable-next-line eqeqeq
  if (currentNetwork == "testnet") {
    if (!process.env.KEY_TESTNET) {
      throw new Error("Missing private key, refer to README 'Deployment' section");
    }
    if (
      !config.Admin[currentNetwork] ||
      config.Admin[currentNetwork] === "0x20058C377061C2508047aD07AddF8a55606550FF"
    ) {
      throw new Error("Missing admin address, refer to README 'Deployment' section");
    }
  }

  
  console.log("Deploying to network:", currentNetwork);


  console.log("Deploying ShadowChef...");

  const ShadowChefV2 = await ethers.getContractFactory("ShadowChefV2");
  const shadowchefv2 = await ShadowChefV2.deploy(
    config.SHDW.testnet,
    config.BurnAdmin.testnet,
  );

  
  console.log("ShadowChef deployed to:", shadowchefv2.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
