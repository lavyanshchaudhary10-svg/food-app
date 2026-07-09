// Cart Routes - add to cart and view cart
const express = require("express");
const router = express.Router();
const { addToCart, getCart } = require("../controllers/cartController");

// POST /api/cart/add
router.post("/add", addToCart);

// GET /api/cart/:userId
router.get("/:userId", getCart);

module.exports = router;