import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyOrders.css";
import API_URL from "../config";

function MyOrders({ user }) {
  const navigate = useNavigate();
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchOrders();
    else setLoading(false);
  }, [user]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("kkj-token");
      const res   = await fetch(`${API_URL}/api/orders/my`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Fetch orders error:", err);
      setOrders([
        {
          _id: "1", orderId: "KKJ104521",
          createdAt: "2025-05-16T20:30:00",
          status: "Delivered",
          items: [
            { name: "Butter Chicken", quantity: 1, price: 299 },
            { name: "Biryani",        quantity: 2, price: 329 },
          ],
          totalAmount: 957,
        },
      ]);
    }
    setLoading(false);
  };

  const getStatusColor = (status) => {
    if (status === "Delivered")  return "#22c55e";
    if (status === "Cancelled")  return "#ef4444";
    if (status === "On the way") return "#f5a623";
    if (status === "Preparing")  return "#3b82f6";
    return "#888";
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  if (!user) {
    return (
      <div className="orders-empty">
        <div className="orders-empty-icon">📦</div>
        <h2>Please Login First</h2>
        <p>Login to view your orders</p>
        <button onClick={() => navigate("/login")}>Login Now</button>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h2>My Orders 📦</h2>
        <p>{orders.length} orders placed</p>
      </div>

      {loading ? (
        <p style={{ color:"#555", textAlign:"center", padding:"40px" }}>
          Loading orders...
        </p>
      ) : orders.length === 0 ? (
        <div className="orders-empty" style={{ background:"#1a1a1a", borderRadius:"16px", padding:"60px" }}>
          <div className="orders-empty-icon">🛒</div>
          <h2>No orders yet!</h2>
          <p>Order something delicious first</p>
          <button onClick={() => navigate("/home")}>Order Now</button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order, i) => (
            <div key={i} className="order-card">
              <div className="order-top">
                <div className="order-top-left">
                  <h4>Khana Khalo Ji 🍽️</h4>
                  <p className="order-date">
                    {order.createdAt ? formatDate(order.createdAt) : "Recent"}
                  </p>
                </div>
                <span
                  className="order-status"
                  style={{
                    color:       getStatusColor(order.status),
                    borderColor: getStatusColor(order.status) + "40",
                    background:  getStatusColor(order.status) + "15",
                  }}
                >
                  {order.status}
                </span>
              </div>

              <div className="order-items">
                {order.items?.map((item, j) => (
                  <div key={j} className="order-item-row">
                    <span className="order-item-name">{item.quantity}x {item.name}</span>
                    <span className="order-item-price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="order-bottom">
                <div className="order-id-text">
                  Order #{order.orderId || order._id?.slice(-6).toUpperCase()}
                </div>
                <div className="order-total">
                  Total: <strong>₹{order.totalAmount}</strong>
                </div>
              </div>

              <button className="reorder-btn" onClick={() => navigate("/home")}>
                🔄 Reorder
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;