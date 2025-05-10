const app = require("./app"); 
const connectDatabase = require("./db/Database");
const express = require("express");
const path = require("path");

// Serve static files from /uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

// Ensure environment variables are set
if (!process.env.DB_URL) {
  console.error("DB_URL not defined in environment variables");
  process.exit(1);
}

if (!process.env.PORT) {
  console.error("PORT not defined in environment variables");
  process.exit(1);
}

// Connect to MongoDB
connectDatabase();

// Start server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
