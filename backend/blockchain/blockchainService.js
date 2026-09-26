const { ethers } = require("ethers");
const { provider, abi } = require("./connection");

const contractAddress = process.env.CONTRACT_ADDRESS;

// Connect to the local Hardhat account
const contract = new ethers.Contract(
    contractAddress,
    abi,
    provider
);


// =====================================
// GET TRANSACTION COUNT
// =====================================

async function getTransactionCount() {
    const count = await contract.getTransactionCount();

    return Number(count);
}


// =====================================
// GET BLOCKCHAIN TRANSACTION
// =====================================

async function getTransaction(index) {
    const transaction = await contract.getTransaction(index);

    return {
        orderId: Number(transaction[0]),
        productName: transaction[1],
        farmerName: transaction[2],
        buyerName: transaction[3],
        quantity: Number(transaction[4]),
        price: Number(transaction[5]),
        timestamp: Number(transaction[6])
    };
}


// =====================================
// RECORD TRANSACTION
// =====================================

async function recordTransaction(
    orderId,
    productName,
    farmerName,
    buyerName,
    quantity,
    price
) {
    const accounts = await provider.send(
        "eth_accounts",
        []
    );

    if (!accounts || accounts.length === 0) {
        throw new Error(
            "No Hardhat accounts available."
        );
    }

    const signer = await provider.getSigner(
        accounts[0]
    );

    const writableContract = new ethers.Contract(
        contractAddress,
        abi,
        signer
    );

    const tx = await writableContract.recordTransaction(
        orderId,
        productName,
        farmerName,
        buyerName,
        quantity,
        price
    );

    await tx.wait();

    return tx.hash;
}


// =====================================
// EXPORT
// =====================================

module.exports = {
    contract,
    getTransactionCount,
    getTransaction,
    recordTransaction
};