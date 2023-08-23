const Order = require("../Models/orderModel");

const createOrder = async (req, res) => {
  const { user_id, subtotal, phonenumber } = req.body;
  // console.log(user_id, subtotal);
  try {
    const order = new Order({ user_id, subtotal, phonenumber });
    await order.save();
    res.status(201).json({ message: "Order added successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const getOrders = async (req, res) => {
  const user_id = req.user._id;
  try {
    const orders = await Order.find({ user_id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  createOrder,
  getOrders,
};
