const express = require("express");
const router = express.Router();

const path = require("path");
const bcrypt = require("bcryptjs"); // Make sure bcryptjs is installed
const { upload } = require("../utils/multer");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");

// POST /create-user
router.post("/create-user", upload.single("file"), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return next(new ErrorHandler("Please provide all required fields", 400));
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return next(new ErrorHandler("Email already exists", 400));
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Ensure file is uploaded
        if (!req.file) {
            return next(new ErrorHandler("Please upload an avatar file", 400));
        }

        const filename = req.file.filename;
        const fileUrl = path.join("/uploads", filename); // Relative path for frontend use

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            avatar: {
                public_id: filename,
                url: fileUrl,
            },
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
