// Order Schema - save orders with status tracking
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      foodId:   String,
      name:     String,
      price:    Number,
      quantity: Number,
      emoji:    String,
    },
  ],
  totalAmount:  { type: Number, required: true },
  deliveryFee:  { type: Number, default: 0     },
  discount:     { type: Number, default: 0     },
  couponUsed:   { type: String, default: ""    },
  address:      { type: String, default: "Mathura, UP" },
  status: {
    type: String,
    enum: ["Placed", "Confirmed", "Preparing", "On the way", "Delivered", "Cancelled"],
    default: "Placed",
  },
  paymentMethod: { type: String, default: "COD" },
  orderId: {
    type: String,
    default: () => "KKJ" + Math.floor(100000 + Math.random() * 900000),
  },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;