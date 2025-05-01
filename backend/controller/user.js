const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const sendMail = require("../utils/sendMail");
const { upload } = require("../utils/multer");
require("dotenv").config(); // Ensure .env is loaded

// ✅ Create User & Send Activation Link
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || !req.file) {
      return res.status(400).json({ success: false, message: "All fields including avatar are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarUrl = path.join("/uploads", req.file.filename);

    const userPayload = {
      name,
      email,
      password: hashedPassword,
      avatar: {
        public_id: req.file.filename,
        url: avatarUrl,
      },
    };

    // Generate JWT activation token
    const activationToken = jwt.sign(userPayload, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    // Send activation email
    await sendMail({
      email,
      subject: "Activate your account",
      message: `Hello ${name},\n\nClick the link below to activate your account:\n${activationUrl}`,
    });

    return res.status(200).json({ success: true, message: `Activation email sent to ${email}` });
  } catch (error) {
    console.error("Create User Error:", error);
    return res.status(500).json({ success: false, message: "Error creating user" });
  }
};

// ✅ Activate User
const activateUser = async (req, res) => {
  try {
    const { activationToken } = req.body;

    if (!activationToken) {
      return res.status(400).json({ success: false, message: "No activation token provided" });
    }

    let newUserData;
    try {
      newUserData = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid or expired activation token" });
    }

    const userExists = await User.findOne({ email: newUserData.email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const user = await User.create(newUserData);
    return res.status(201).json({ success: true, message: "Account activated successfully", user });
  } catch (error) {
    console.error("Activation Error:", error);
    return res.status(500).json({ success: false, message: "Activation failed" });
  }
};

// ✅ Routes
router.post("/create-user", upload.single("file"), createUser);
router.post("/activation", activateUser);

module.exports = router;
