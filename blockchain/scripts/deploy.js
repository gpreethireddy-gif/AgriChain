import { network } from "hardhat";

const { ethers } = await network.connect();

const agriChain = await ethers.deployContract("AgriChain");

await agriChain.waitForDeployment();

console.log("AgriChain deployed to:", await agriChain.getAddress());