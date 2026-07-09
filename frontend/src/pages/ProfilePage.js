import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProfilePage.css";

function ProfilePage({ user, setUser, showToast }) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName]       = useState(user?.name || "");
  const [phone, setPhone]     = useState(user?.phone || "");
  const [email]               = useState(user?.email || "");

  if (!user) {
    return (
      <div className="profile-empty">
        <div className="profile-empty-icon">👤</div>
        <h2>Please Login First</h2>
        <p>You need to login to view your profile</p>
        <button onClick={() => navigate("/login")}>Login Now</button>
      </div>
    );
  }

  const handleSave = () => {
    setUser({ ...user, name, phone });
    setEditing(false);
    showToast && showToast("Profile updated successfully! ✅", "success");
  };

  const handleLogout = () => {
    setUser(null);
    showToast && showToast("Logged out successfully! 👋", "info");
    navigate("/home");
  };

  const stats = [
    { icon: "🛒", label: "Total Orders", value: "12" },
    { icon: "❤️", label: "Favourites",   value: "8"  },
    { icon: "⭐", label: "Reviews",       value: "5"  },
    { icon: "💰", label: "Total Saved",   value: "₹340" },
  ];

  const menuItems = [
    { icon: "📦", label: "My Orders",    path: "/orders"  },
    { icon: "📍", label: "My Addresses", path: "/address" },
    { icon: "🎁", label: "My Coupons",   path: "/home"    },
    { icon: "❤️", label: "Wishlist",     path: "/home"    },
    { icon: "🔔", label: "Notifications",path: "/home"    },
    { icon: "🔒", label: "Privacy Policy",path: "/home"   },
    { icon: "💬", label: "Help & Support",path: "/home"   },
    { icon: "⭐", label: "Rate the App",  path: "/home"   },
  ];

  return (
    <div className="profile-page">

      {/* Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          <span>{user.name?.charAt(0).toUpperCase()}</span>
        </div>
        <div className="profile-info">
          {editing ? (
            <div className="edit-fields">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                className="edit-input"
              />
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Phone number"
                className="edit-input"
              />
              <div className="edit-actions">
                <button className="save-btn" onClick={handleSave}>Save</button>
                <button className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              {user.phone && <p>📱 {user.phone}</p>}
              <button className="edit-profile-btn" onClick={() => setEditing(true)}>
                ✏️ Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="profile-stats">
        {stats.map((s, i) => (
          <div key={i} className="profile-stat">
            <span className="stat-icon">{s.icon}</span>
            <span className="stat-val">{s.value}</span>
            <span className="stat-lbl">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Menu items */}
      <div className="profile-menu">
        {menuItems.map((item, i) => (
          <div key={i} className="profile-menu-item" onClick={() => navigate(item.path)}>
            <span className="menu-item-icon">{item.icon}</span>
            <span className="menu-item-label">{item.label}</span>
            <span className="menu-item-arrow">›</span>
          </div>
        ))}
      </div>

      {/* Logout */}
      <button className="logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>

    </div>
  );
}

export default ProfilePage;