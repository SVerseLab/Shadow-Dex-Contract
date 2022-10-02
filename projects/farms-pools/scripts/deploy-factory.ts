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
      config.Admin[currentNetwork] === "0x0000000000000000000000000000000000000000"
    ) {
      throw new Error("Missing admin address, refer to README 'Deployment' section");
    }
  }

  console.log("Deploying to network:", currentNetwork);

  console.log("Deploying Factory...");

  const ShadowChef = await ethers.getContractFactory("ShadowChef");
  const smartChefFactory = await ShadowChef.deploy(
    config.SHDW[currentNetwork],
    config.BurnAdmin[currentNetwork],
  );

  console.log("SmartChef deployed to:", smartChefFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
