import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/OrderSuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  // Auto redirect after 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) { clearInterval(timer); navigate("/"); }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const orderId = "QB" + Math.floor(Math.random() * 900000 + 100000);
  const steps = [
    { icon: "✅", label: "Order Confirmed",   done: true  },
    { icon: "👨‍🍳", label: "Being Prepared",   done: true  },
    { icon: "🛵", label: "Out for Delivery",  done: false },
    { icon: "🏠", label: "Delivered",         done: false },
  ];

  return (
    <div className="success-page">
      <div className="success-card">

        {/* Animated checkmark */}
        <div className="success-circle">
          <span className="success-check">✓</span>
        </div>

        <h1>Order Placed!</h1>
        <p className="success-sub">
          Yay! Your food is being prepared. Sit back and relax 🎉
        </p>

        {/* Order ID */}
        <div className="order-id-box">
          <span className="order-id-label">Order ID</span>
          <span className="order-id-val">#{orderId}</span>
        </div>

        {/* Estimated time */}
        <div className="eta-box">
          <span className="eta-icon">🕐</span>
          <div>
            <p className="eta-label">Estimated Delivery Time</p>
            <p className="eta-val">30 – 40 minutes</p>
          </div>
        </div>

        {/* Tracking steps */}
        <div className="tracking-steps">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div className={`step ${step.done ? "done" : "pending"}`}>
                <div className="step-icon">{step.icon}</div>
                <p className="step-label">{step.label}</p>
              </div>
              {i < steps.length - 1 && (
                <div className={`step-line ${steps[i + 1].done ? "done" : ""}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Delivery address */}
        <div className="delivery-address">
          <span>📍</span>
          <span>Delivering to: <strong>Mathura, Uttar Pradesh</strong></span>
        </div>

        {/* Buttons */}
        <button className="home-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>

        <p className="redirect-msg">
          Redirecting in <strong>{seconds}s</strong>...
        </p>
      </div>
    </div>
  );
}

export default OrderSuccess;