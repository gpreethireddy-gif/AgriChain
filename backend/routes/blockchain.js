const express = require("express");
const Order = require("../models/Order");

const {
    getTransactionCount,
    getTransaction
} = require("../blockchain/blockchainService");

const router = express.Router();


router.get("/transactions", async (req, res) => {

    try {

        // Get blockchain transaction count

        const count =
            await getTransactionCount();


        const transactions = [];


        // Get every transaction from blockchain

        for (let i = 0; i < count; i++) {

            const transaction =
                await getTransaction(i);


            transactions.push({
                blockchainIndex: i,
                ...transaction
            });

        }


        // Get all orders from MongoDB

        const orders =
            await Order.find()
                .sort({ createdAt: -1 });


        /*
         * Match blockchain transactions
         * with MongoDB orders.
         */

        const finalTransactions =
            transactions.map(
                transaction => {


                    let transactionHash = null;


                    /*
                     * Search every order
                     */

                    for (const order of orders) {


                        /*
                         * Generate the same blockchain
                         * order ID used when the order
                         * was created.
                         */

                        const blockchainOrderId =
                            Number(
                                parseInt(
                                    order._id
                                        .toString()
                                        .slice(-8),
                                    16
                                )
                            );


                        /*
                         * Check whether this is
                         * the correct order.
                         */

                        if (
                            blockchainOrderId ===
                            transaction.orderId
                        ) {


                            /*
                             * Find the blockchain
                             * transaction for this product.
                             */

                            if (
                                order.blockchainTransactions &&
                                order.blockchainTransactions.length > 0
                            ) {

                                const record =
                                    order.blockchainTransactions.find(
                                        item =>
                                            item.productName ===
                                            transaction.productName
                                    );


                                if (record) {

                                    transactionHash =
                                        record.transactionHash;

                                }

                            }


                            break;

                        }

                    }


                    return {

                        ...transaction,

                        transactionHash:
                            transactionHash

                    };

                }
            );


        // Send final response

        res.status(200).json({

            count:
                finalTransactions.length,

            transactions:
                finalTransactions

        });


    } catch (error) {


        console.error(
            "Blockchain Transaction Error:",
            error
        );


        res.status(500).json({

            message:
                "Unable to fetch blockchain transactions."

        });

    }

});


module.exports = router;