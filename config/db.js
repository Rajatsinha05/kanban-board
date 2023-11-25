const mongoose = require("mongoose");
require("dotenv").config();

// database connection
const connectDB = async () => {
  let url = process.env.DB_URL;
  try {
    await mongoose.connect("mongodb+srv://daksh1or2:kanban@cluster0.bcmpzhn.mongodb.net/");
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};

module.exports = connectDB;
