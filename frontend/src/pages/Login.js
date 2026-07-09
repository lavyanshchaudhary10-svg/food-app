import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthForm.css";
import API_URL from "../config";

function Login({ setUser, showToast }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      showToast && showToast("Please fill all fields! ⚠️", "error");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("kkj-token", data.token);
        showToast && showToast(`Welcome back, ${data.user.name}! 👋`, "success");
        setUser(data.user);
        navigate("/home");
      } else {
        showToast && showToast(data.message || "Login failed!", "error");
      }
    } catch (error) {
      showToast && showToast("Cannot connect to server. ❌", "error");
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-brand">🍽️ Khana Khalo Ji</div>
          <h2>Hunger has a solution.</h2>
          <p>Order from 500+ restaurants. Hot, fresh food delivered in 30 minutes.</p>
          <div className="auth-perks">
            <div className="perk"><span>⚡</span><p>30 min delivery</p></div>
            <div className="perk"><span>🎁</span><p>Exclusive offers</p></div>
            <div className="perk"><span>⭐</span><p>Top rated food</p></div>
            <div className="perk"><span>🔒</span><p>Secure checkout</p></div>
          </div>
          <div className="auth-food-icons">🍔 🍕 🍝 🍜 🍣</div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-box">
          <div className="auth-box-header">
            <h2>Welcome back!</h2>
            <p>Login to continue ordering</p>
          </div>

          <div className="input-group">
            <label>Email address</label>
            <div className="input-wrap">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrap">
              <span className="input-icon">🔑</span>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
              />
              <span className="eye-btn" onClick={() => setShowPass(!showPass)}>
                {showPass ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <button className="auth-btn" onClick={handleLogin} disabled={loading}>
            {loading ? <span className="spinner"></span> : "Login →"}
          </button>

          <div className="auth-divider"><span>or</span></div>

          <p className="auth-switch">
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>Create one free</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;