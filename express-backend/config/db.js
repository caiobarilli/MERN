require("dotenv").config();
const mongoose = require("mongoose");

/***
 * @desc Connect to database
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
      dbName: process.env.mongoDBName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
