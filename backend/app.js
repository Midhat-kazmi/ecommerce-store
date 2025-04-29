// Load environment variables first
require('dotenv').config();
const express = require('express');
const ErrorHandler = require('./utils/ErrorHandler');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Cookie parser middleware
app.use("/", express.static("uploads"));
app.use(cors()); // CORS middleware
app.use(bodyParser.urlencoded({ extended: true })); // Body parser middleware

// Configurations
if (process.env.NODE_ENV !== 'production') {
    console.log("Running in development environment");
}

// Import routes
const user = require("./controller/user");
app.use("/api/v2/user", user); // Make sure this route is correctly pointing to the controller

app.use(ErrorHandler); // Error handler middleware

// Export app for later use
module.exports = app;
