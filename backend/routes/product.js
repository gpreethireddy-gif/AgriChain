const express = require("express");
const Product = require("../models/product");

const router = express.Router();


// =========================
// ADD PRODUCT
// =========================

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



module.exports = router;