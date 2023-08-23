const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const signup = async (req, res) => {
  const { name, phoneNumber, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, phoneNumber, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.secretKey);
    res
      .status(201)
      .json({ message: "User created successfully", token, user_id: user._id });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const login = async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.secretKey);
    res.status(201).json({ token, user_id: user._id });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = { signup, login };
