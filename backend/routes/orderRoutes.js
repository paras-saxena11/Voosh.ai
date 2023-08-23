const express = require("express");
const orderController = require("../controller/orderController");

const router = express.Router();

// Signup route
router.post("/add-order", orderController.createOrder);

// Login route
router.get("/get-order", orderController.getOrders);

module.exports = router;
