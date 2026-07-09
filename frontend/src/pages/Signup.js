import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthForm.css";
import API_URL from "../config";

function Signup({ setUser, showToast }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const strength = password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 10 ? 2 : 3;

  const strengthLabel = ["", "Weak", "Good", "Strong"];
  const strengthColor = ["", "#ef4444", "#f5a623", "#22c55e"];

  const handleSignup = async () => {
    if (!name || !email || !password) {
      showToast && showToast("Please fill all fields! ⚠️", "error");
      return;
    }
    if (password.length < 6) {
      showToast && showToast("Password too short! Min 6 characters. ⚠️", "error");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("kkj-token", data.token);
        showToast && showToast("Account created! ✅", "success");
        setUser(data.user);
        navigate("/home");
      } else {
        showToast && showToast(data.message || "Signup failed!", "error");
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
          <h2>Join 10 lakh+ food lovers.</h2>
          <p>Sign up free and get 50% off on your first order with code FIRST50.</p>
          <div className="auth-perks">
            <div className="perk"><span>🎉</span><p>50% off first order</p></div>
            <div className="perk"><span>🚀</span><p>Free delivery</p></div>
            <div className="perk"><span>📱</span><p>Track live orders</p></div>
            <div className="perk"><span>💳</span><p>Safe payments</p></div>
          </div>
          <div className="auth-food-icons">🍔 🍕 🍝 🍜 🍣</div>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-box">
          <div className="auth-box-header">
            <h2>Create account</h2>
            <p>It's free and takes 30 seconds</p>
          </div>
          <div className="input-group">
            <label>Full name</label>
            <div className="input-wrap">
              <span className="input-icon">👤</span>
              <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className="input-group">
            <label>Email address</label>
            <div className="input-wrap">
              <span className="input-icon">✉️</span>
              <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="input-group">
            <label>Password</label>
            <div className="input-wrap">
              <span className="input-icon">🔑</span>
              <input type={showPass ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSignup()} />
              <span className="eye-btn" onClick={() => setShowPass(!showPass)}>{showPass ? "🙈" : "👁️"}</span>
            </div>
          </div>
          {password.length > 0 && (
            <div className="strength-wrap">
              <div className="strength-bar">
                {[1, 2, 3].map(i => (
                  <div key={i} className="strength-seg" style={{ background: strength >= i ? strengthColor[strength] : "#333" }} />
                ))}
              </div>
              <span style={{ fontSize: "12px", fontWeight: 600, color: strengthColor[strength] }}>{strengthLabel[strength]}</span>
            </div>
          )}
          <button className="auth-btn" onClick={handleSignup} disabled={loading}>
            {loading ? <span className="spinner"></span> : "Create Account →"}
          </button>
          <div className="auth-divider"><span>or</span></div>
          <p className="auth-switch">
            Already have an account? <span onClick={() => navigate("/login")}>Login here</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
