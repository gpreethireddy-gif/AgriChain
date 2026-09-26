const { ethers } = require("ethers");
const path = require("path");
const fs = require("fs");

const provider = new ethers.JsonRpcProvider(
    "http://127.0.0.1:8545"
);

const artifactPath = path.join(
    __dirname,
    "../../blockchain/artifacts/contracts/AgriChain.sol/AgriChain.json"
);

const contractArtifact = JSON.parse(
    fs.readFileSync(artifactPath, "utf8")
);

module.exports = {
    provider,
    abi: contractArtifact.abi
};