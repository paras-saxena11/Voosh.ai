const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const jwt = require("jsonwebtoken");
const User = require("./Models/userModel");

connectDB();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middelware
const authenticateJWT = async (req, res, next) => {
  const fetchedToken = req.header("Authorization");
  const token = fetchedToken.match(/"([^"]+)"/)[1];
  // console.log(token);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { userId } = jwt.verify(token, process.env.secretKey);
    req.user = await User.findOne({ _id: userId }).select("_id");
    req.token = token;
    next();
  } catch (error) {
    console.log(error);
  }
};

app.use("/user", userRoutes);
app.use("/order", authenticateJWT, orderRoutes);

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server running on port: ", PORT);
});
