const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

// Signup route
router.post("/add-user", userController.signup);

// Login route
router.post("/login-user", userController.login);

module.exports = router;
