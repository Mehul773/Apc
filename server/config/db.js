const mongoose = require("mongoose")
const dotenv = require("dotenv")
const colors = require("colors");
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected".yellow);
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
      }
  };
  
  module.exports = connectDB;