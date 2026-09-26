
const express = require("express");
const Product = require("../models/product");

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            products: products
        });

    } catch (error) {
        console.error("Get Products Error:", error);

        res.status(500).json({
            message: "Unable to fetch products."
        });
    }
});

// TEST PRODUCT ROUTE
router.get("/test", (req, res) => {
    res.json({
        message: "Product route is working!"
    });
});

// ADD PRODUCT
router.post("/add", async (req, res) => {
    try {
        const {
            farmerId,
            farmerName,
            productName,
            category,
            quantity,
            unit,
            price,
            description
        } = req.body;

        if (
            !farmerId ||
            !farmerName ||
            !productName ||
            !category ||
            quantity === undefined ||
            !unit ||
            price === undefined
        ) {
            return res.status(400).json({
                message: "Please fill all required fields."
            });
        }

        const newProduct = new Product({
            farmerId,
            farmerName,
            productName,
            category,
            quantity,
            unit,
            price,
            description
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({
            message: "Product added successfully!",
            product: savedProduct
        });

    } catch (error) {
        console.error("Add Product Error:", error);

        res.status(500).json({
            message: "Unable to add product.",
            error: error.message
        });
    }
});

module.exports = router;