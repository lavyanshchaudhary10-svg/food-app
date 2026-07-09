import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CartPage.css";
import API_URL from "../config";

function CartPage({ cartItems, setCartItems, showToast }) {
  const navigate = useNavigate();
  const [coupon, setCoupon]     = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  const updateQty = (id, change) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => setCartItems(prev => prev.filter(i => i.id !== id));

  const getSubtotal = () => cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
  const getDelivery = () => getSubtotal() >= 299 ? 0 : 49;
  const getTax      = () => Math.round(getSubtotal() * 0.05);
  const getTotal    = () => getSubtotal() + getDelivery() + getTax() - discount;

  const applyCoupon = () => {
    const codes = { "FIRST50": 50, "HAPPY20": 30, "BDAY30": 40, "SAVE60": 60 };
    const val = codes[coupon.trim().toUpperCase()];
    if (val) {
      setDiscount(val);
      setCouponMsg(`✓ Coupon applied! You saved ₹${val}`);
    } else {
      setCouponMsg("✗ Invalid coupon code");
    }
  };

  const handleOrder = async () => {
    const token = localStorage.getItem("kkj-token");
    if (token) {
      try {
        await fetch(`${API_URL}/api/orders/place`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: cartItems.map(i => ({
              foodId:   i.id,
              name:     i.name,
              price:    i.price,
              quantity: i.quantity,
              emoji:    i.emoji,
            })),
            totalAmount:   getTotal(),
            deliveryFee:   getDelivery(),
            discount:      discount,
            couponUsed:    coupon,
            address:       "Mathura, UP",
            paymentMethod: "COD",
          }),
        });
      } catch (err) {
        console.log("Order save error:", err);
      }
    }
    setCartItems([]);
    navigate("/order-success");
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>Your Cart <span>🛒</span></h2>
        <p>{cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h3>Your cart is empty!</h3>
          <p>Looks like you haven't added anything yet</p>
          <button onClick={() => navigate("/home")}>Browse Menu</button>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-left">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-emoji">{item.emoji}</div>
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">₹{item.price} per item</p>
                  </div>
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                    <span className="qty-val">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, +1)}>+</button>
                  </div>
                  <span className="item-subtotal">₹{item.price * item.quantity}</span>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>🗑</button>
                </div>
              ))}
            </div>

            <div className="coupon-box">
              <h4>🎁 Apply Coupon</h4>
              <p className="coupon-hints">Try: FIRST50 · HAPPY20 · BDAY30 · SAVE60</p>
              <div className="coupon-row">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && applyCoupon()}
                />
                <button onClick={applyCoupon}>Apply</button>
              </div>
              {couponMsg && (
                <p className={`coupon-msg ${couponMsg.startsWith("✓") ? "success" : "error"}`}>
                  {couponMsg}
                </p>
              )}
            </div>
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal ({cartItems.reduce((t,i) => t + i.quantity, 0)} items)</span>
              <span>₹{getSubtotal()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery fee</span>
              <span style={{ color: getDelivery() === 0 ? "#22c55e" : "#fff" }}>
                {getDelivery() === 0 ? "FREE 🎉" : `₹${getDelivery()}`}
              </span>
            </div>
            <div className="summary-row">
              <span>GST (5%)</span>
              <span>₹{getTax()}</span>
            </div>
            {discount > 0 && (
              <div className="summary-row discount-row">
                <span>Discount</span>
                <span>− ₹{discount}</span>
              </div>
            )}
            <div className="summary-divider"></div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>₹{getTotal()}</span>
            </div>
            {getDelivery() > 0 && (
              <p className="free-delivery-hint">
                Add ₹{299 - getSubtotal()} more for FREE delivery!
              </p>
            )}
            <button className="checkout-btn" onClick={handleOrder}>
              Place Order →
            </button>
            <button className="continue-btn" onClick={() => navigate("/home")}>
              + Add More Items
            </button>
            <div className="safety-badges">
              <span>🔒 Secure Payment</span>
              <span>✓ 100% Safe</span>
              <span>🚀 Fast Delivery</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;