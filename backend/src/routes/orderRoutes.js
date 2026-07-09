// Order Routes
const express = require("express");
const router  = express.Router();
const { placeOrder, getMyOrders, getOrderById, updateOrderStatus } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// POST /api/orders/place  (protected)
router.post("/place", protect, placeOrder);

// GET /api/orders/my  (protected)
router.get("/my", protect, getMyOrders);

// GET /api/orders/:id  (protected)
router.get("/:id", protect, getOrderById);

// PUT /api/orders/:id/status
router.put("/:id/status", protect, updateOrderStatus);

module.exports = router;