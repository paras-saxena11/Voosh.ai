require("dotenv").config();
const mongoose = require("mongoose");

const URI_PASS = process.env.MONGODB_PASS;
const URI_NAME = process.env.MONGODB_USERNAME;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${URI_NAME}:${URI_PASS}@cluster0.t0gg0nq.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas:", error.message);
  }
};

module.exports = connectDB;
