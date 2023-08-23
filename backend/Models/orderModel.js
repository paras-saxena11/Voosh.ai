const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: String,
  subtotal: Number,
  phonenumber: String,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
