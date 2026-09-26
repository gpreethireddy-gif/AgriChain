const express = require("express");
const Order = require("../models/Order");

const {
    recordTransaction
} = require("../blockchain/blockchainService");

const router = express.Router();


// =====================================
// PLACE NEW ORDER
// =====================================

router.post("/place", async (req, res) => {

    try {

        const {
            buyerId,
            buyerName,
            products,
            totalAmount
        } = req.body;


        // Create order

        const order = new Order({

            buyerId: buyerId,

            buyerName: buyerName,

            products: products,

            totalAmount: totalAmount,

            status: "Pending"

        });


        // Save order to MongoDB

        await order.save();

        console.log(
            "Order saved to MongoDB:",
            order._id.toString()
        );


        // Store blockchain transaction details

        const blockchainTransactions = [];


        // =====================================
        // RECORD ORDER ON BLOCKCHAIN
        // =====================================

        for (const product of products) {

            try {

                const blockchainOrderId = Number(
                    parseInt(
                        order._id.toString().slice(-8),
                        16
                    )
                );


                const txHash = await recordTransaction(

                    blockchainOrderId,

                    product.productName,

                    product.farmerName,

                    buyerName,

                    Number(product.quantity),

                    Number(product.price)

                );


                console.log(
                    "Blockchain transaction successful:",
                    txHash
                );


                // Save blockchain transaction hash

                blockchainTransactions.push({

                    productName:
                        product.productName,

                    transactionHash:
                        txHash

                });


            } catch (blockchainError) {

                console.error(
                    "Blockchain recording failed:",
                    blockchainError.message
                );

            }

        }


        // =====================================
        // SAVE BLOCKCHAIN DETAILS TO MONGODB
        // =====================================

        order.blockchainTransactions =
            blockchainTransactions;


        await order.save();


        console.log(
            "Blockchain transaction details saved to MongoDB."
        );


        // =====================================
        // SEND RESPONSE
        // =====================================

        res.status(201).json({

            message:
                "Order placed successfully!",

            order: order

        });


    } catch (error) {

        console.error(
            "Place Order Error:",
            error
        );


        res.status(500).json({

            message:
                "Unable to place order."

        });

    }

});


// =====================================
// GET BUYER ORDERS
// =====================================

router.get("/buyer/:buyerId", async (req, res) => {

    try {

        const { buyerId } = req.params;


        const orders = await Order.find({

            buyerId: buyerId

        }).sort({

            createdAt: -1

        });


        res.status(200).json({

            orders: orders

        });


    } catch (error) {

        console.error(
            "Get Buyer Orders Error:",
            error
        );


        res.status(500).json({

            message:
                "Unable to fetch orders."

        });

    }

});


// =====================================
// CONFIRM ORDER
// =====================================

router.put("/confirm/:orderId", async (req, res) => {

    try {

        const { orderId } = req.params;


        const order = await Order.findById(orderId);


        if (!order) {

            return res.status(404).json({

                message:
                    "Order not found."

            });

        }


        order.status = "Confirmed";


        await order.save();


        res.status(200).json({

            message:
                "Order confirmed successfully!",

            order: order

        });


    } catch (error) {

        console.error(
            "Confirm Order Error:",
            error
        );


        res.status(500).json({

            message:
                "Unable to confirm order."

        });

    }

});


// =====================================
// GET ALL ORDERS
// =====================================

router.get("/all", async (req, res) => {

    try {

        const orders = await Order.find()
            .sort({
                createdAt: -1
            });


        res.status(200).json({

            orders: orders

        });


    } catch (error) {

        console.error(
            "Get All Orders Error:",
            error
        );


        res.status(500).json({

            message:
                "Unable to fetch orders."

        });

    }

});


// =====================================
// COMPLETE ORDER
// =====================================

router.put("/complete/:orderId", async (req, res) => {

    try {

        const { orderId } = req.params;


        const order = await Order.findById(orderId);


        if (!order) {

            return res.status(404).json({

                message:
                    "Order not found."

            });

        }


        order.status = "Completed";


        await order.save();


        res.status(200).json({

            message:
                "Order completed successfully!",

            order: order

        });


    } catch (error) {

        console.error(
            "Complete Order Error:",
            error
        );


        res.status(500).json({

            message:
                "Unable to complete order."

        });

    }

});


// =====================================
// CANCEL ORDER
// =====================================

router.put("/cancel/:orderId", async (req, res) => {

    try {

        const { orderId } = req.params;


        const order = await Order.findById(orderId);


        if (!order) {

            return res.status(404).json({

                message:
                    "Order not found."

            });

        }


        order.status = "Cancelled";


        await order.save();


        res.status(200).json({

            message:
                "Order cancelled successfully!",

            order: order

        });


    } catch (error) {

        console.error(
            "Cancel Order Error:",
            error
        );


        res.status(500).json({

            message:
                "Unable to cancel order."

        });

    }

});


module.exports = router;