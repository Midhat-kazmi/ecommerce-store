// Load environment variables first
require('dotenv').config(); 


const app = require("./app");
const connectDatabase = require("./db/Database");

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);
});

// Check if DB_URL and PORT are loaded correctly
if (!process.env.DB_URL) {
  console.error("DB_URL not defined in environment variables");
  process.exit(1);
}

if (!process.env.PORT) {
  console.error("PORT not defined in environment variables");
  process.exit(1);
}

// Connect to the database
connectDatabase(); 

// Start the server
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
