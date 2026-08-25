const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();


// =========================
// MIDDLEWARE
// =========================

app.use(cors());

app.use(express.json());


// =========================
// AUTH ROUTES
// =========================

app.use("/api/auth", authRoutes);


// =========================
// DATABASE CONNECTION
// =========================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB connected successfully!");

    })
    .catch((error) => {

        console.log("MongoDB connection failed:");
        console.log(error.message);

    });


// =========================
// HOME ROUTE
// =========================

app.get("/", (req, res) => {

    res.json({

        message:
            "AgriChain Backend is running successfully!"

    });

});


// =========================
// START SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `AgriChain server running on http://localhost:${PORT}`
    );

});