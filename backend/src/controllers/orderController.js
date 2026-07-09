// Order Controller - place and get orders
const Order = require("../models/Order");

// Place new order
const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, deliveryFee, discount, couponUsed, address, paymentMethod } = req.body;

    const newOrder = new Order({
      userId: req.userId,
      items,
      totalAmount,
      deliveryFee:   deliveryFee   || 0,
      discount:      discount      || 0,
      couponUsed:    couponUsed    || "",
      address:       address       || "Mathura, UP",
      paymentMethod: paymentMethod || "COD",
      status: "Placed",
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.log("Place order error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all orders of a user
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .sort({ createdAt: -1 }); // latest first

    res.json(orders);
  } catch (error) {
    console.log("Get orders error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update order status (admin use)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: "Status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { placeOrder, getMyOrders, getOrderById, updateOrderStatus };