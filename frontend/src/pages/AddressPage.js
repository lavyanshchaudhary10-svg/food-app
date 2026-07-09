import React, { useState } from "react";
import "../styles/AddressPage.css";

function AddressPage({ user, showToast }) {
  const [addresses, setAddresses] = useState([
    { id: 1, type: "Home",  icon: "🏠", address: "123, Shiv Nagar, Mathura, UP - 281001",  default: true  },
    { id: 2, type: "Work",  icon: "💼", address: "45, Tech Park, Sector 18, Noida - 201301", default: false },
  ]);

  const [showForm, setShowForm]   = useState(false);
  const [newAddr, setNewAddr]     = useState("");
  const [newType, setNewType]     = useState("Home");

  const addAddress = () => {
    if (!newAddr.trim()) {
      showToast && showToast("Please enter an address! ⚠️", "error");
      return;
    }
    const icons = { Home: "🏠", Work: "💼", Other: "📍" };
    setAddresses(prev => [...prev, {
      id: Date.now(),
      type: newType,
      icon: icons[newType],
      address: newAddr,
      default: false,
    }]);
    setNewAddr("");
    setShowForm(false);
    showToast && showToast("Address added successfully! 📍", "success");
  };

  const setDefault = (id) => {
    setAddresses(prev => prev.map(a => ({ ...a, default: a.id === id })));
    showToast && showToast("Default address updated! ✅", "success");
  };

  const deleteAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    showToast && showToast("Address removed!", "info");
  };

  return (
    <div className="address-page">
      <div className="address-header">
        <h2>My Addresses 📍</h2>
        <p>Manage your delivery addresses</p>
      </div>

      {/* Address list */}
      <div className="address-list">
        {addresses.map(addr => (
          <div key={addr.id} className={`address-card ${addr.default ? "default" : ""}`}>
            <div className="addr-left">
              <span className="addr-icon">{addr.icon}</span>
              <div className="addr-info">
                <div className="addr-type-row">
                  <span className="addr-type">{addr.type}</span>
                  {addr.default && <span className="addr-default-badge">Default</span>}
                </div>
                <p className="addr-text">{addr.address}</p>
              </div>
            </div>
            <div className="addr-actions">
              {!addr.default && (
                <button className="addr-btn set-default" onClick={() => setDefault(addr.id)}>
                  Set Default
                </button>
              )}
              <button className="addr-btn delete" onClick={() => deleteAddress(addr.id)}>
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add address form */}
      {showForm ? (
        <div className="add-addr-form">
          <h4>Add New Address</h4>

          <div className="type-select">
            {["Home", "Work", "Other"].map(t => (
              <button
                key={t}
                className={`type-btn ${newType === t ? "active" : ""}`}
                onClick={() => setNewType(t)}
              >
                {t === "Home" ? "🏠" : t === "Work" ? "💼" : "📍"} {t}
              </button>
            ))}
          </div>

          <textarea
            placeholder="Enter full address with city, state & pincode..."
            value={newAddr}
            onChange={e => setNewAddr(e.target.value)}
            className="addr-textarea"
            rows={3}
          />

          <div className="form-actions">
            <button className="save-addr-btn" onClick={addAddress}>Save Address</button>
            <button className="cancel-addr-btn" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <button className="add-addr-btn" onClick={() => setShowForm(true)}>
          + Add New Address
        </button>
      )}
    </div>
  );
}

export default AddressPage;