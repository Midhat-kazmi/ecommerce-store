// Load environment variables first
require("dotenv").config();
const express = require("express");
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize express app
const app = express();

// ✅ Fix CORS config (before routes)
app.use(cors({
  origin: "http://localhost:5173", // allow frontend origin
  credentials: true,              // allow cookies and auth headers
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));

// Configurations
if (process.env.NODE_ENV !== "production") {
  console.log("Running in development environment");
}

// Import routes
const user = require("./controller/user");
app.use("/api/v2/user", user);

// Export app
module.exports = app;
