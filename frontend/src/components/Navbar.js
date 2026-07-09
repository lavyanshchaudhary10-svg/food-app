import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ user, setUser, cartCount }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("kkj-token");
    setUser(null);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate("/home");
      setSearch("");
    }
  };

  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-logo">
        <span className="logo-icon">🍽️</span>
        <span className="logo-text">KhanaKhaloJi</span>
      </Link>

      <div className="navbar-location">
        <span className="location-pin">📍</span>
        <div className="location-text">
          <span className="location-label">Deliver to</span>
          <span className="location-value">Mathura, UP</span>
        </div>
        <span className="location-arrow">▾</span>
      </div>

      <form className="navbar-search" onSubmit={handleSearch}>
        <span className="search-icon-nav">🔍</span>
        <input
          type="text"
          placeholder="Search for dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="navbar-links">
        {!user ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link signup">Sign Up</Link>
          </>
        ) : (
          <>
            <span className="user-greeting">Hi, {user.name?.split(" ")[0]}</span>
            <Link to="/profile" className="nav-link">Profile</Link>
            <Link to="/orders" className="nav-link">Orders</Link>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </>
        )}
        <Link to="/cart" className="cart-link">
          🛒 Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
