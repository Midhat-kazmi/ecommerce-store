const mongoose = require("mongoose");

const connectDatabase = () => {
  const dbUrl = process.env.DB_URL;

  if (!dbUrl) {
    console.error("DB_URL not defined in environment variables");
    process.exit(1);
  }

  mongoose
    .connect(dbUrl, {
     
    })
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      process.exit(1);
    });
};

module.exports = connectDatabase;
