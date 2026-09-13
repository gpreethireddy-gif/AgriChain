const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();


// =========================
// REGISTER USER
// =========================

router.post("/register", async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            role,
            password
        } = req.body;


        // Check if email already exists
        const existingUser = await User.findOne({
            email: email
        });

        if (existingUser) {

            return res.status(400).json({
                message: "Email already registered"
            });

        }


        // Hash password
        const hashedPassword =
            await bcrypt.hash(password, 10);


        // Create new user
        const user = new User({

            name: name,
            email: email,
            phone: phone,
            role: role,
            password: hashedPassword

        });


        // Save user to MongoDB
        await user.save();


        res.status(201).json({

            message:
                "User registered successfully!",

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role

            }

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server error",
            error: error.message

        });

    }

});



// =========================
// LOGIN USER
// =========================

router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password,
            role
        } = req.body;


        // Find user by email
        const user = await User.findOne({
            email: email
        });


        // User not found
        if (!user) {

            return res.status(401).json({

                message:
                    "Invalid email or password"

            });

        }


        // Check selected role
        if (user.role !== role) {

            return res.status(401).json({

                message:
                    "Invalid role selected"

            });

        }


        // Compare password
        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        // Wrong password
        if (!passwordMatch) {

            return res.status(401).json({

                message:
                    "Invalid email or password"

            });

        }


        // Login successful
        res.status(200).json({

            message:
                "Login successful!",

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role

            }

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server error",
            error: error.message

        });

    }

});


module.exports = router;