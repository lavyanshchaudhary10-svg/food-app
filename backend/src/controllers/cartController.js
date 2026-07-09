// Cart Controller - add to cart and view cart
const Cart = require("../models/Cart");

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { userId, foodId, name, price } = req.body;

    // Find existing cart for this user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({
        userId,
        items: [{ foodId, name, price, quantity: 1 }],
      });
    } else {
      // Check if item already in cart
      const existingItem = cart.items.find((item) => item.foodId === foodId);

      if (existingItem) {
        // Increase quantity
        existingItem.quantity += 1;
      } else {
        // Add new item
        cart.items.push({ foodId, name, price, quantity: 1 });
      }
    }

    await cart.save();
    res.json({ message: "Item added to cart", cart });
  } catch (error) {
    console.log("Add to cart error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get cart by userId
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({ items: [] }); // empty cart
    }

    res.json(cart);
  } catch (error) {
    console.log("Get cart error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addToCart, getCart };