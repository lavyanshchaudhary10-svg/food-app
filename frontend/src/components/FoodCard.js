import React, { useState } from "react";
import "../styles/FoodCard.css";

function FoodCard({ food, addToCart, user, onOpenModal, showToast, wishlist, toggleWish }) {
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const isWished = wishlist && wishlist.includes(food.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    if (!user) {
      showToast("Please login to add items! 🔐", "error");
      return;
    }
    addToCart(food);
    setAdded(true);
    showToast(`${food.name} added to cart! 🛒`, "success");
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWish = (e) => {
    e.stopPropagation();
    toggleWish(food.id);
    if (isWished) {
      showToast(`${food.name} removed from wishlist`, "info");
    } else {
      showToast(`${food.name} added to wishlist! ❤️`, "wish");
    }
  };

  return (
    <div className="food-card" onClick={() => onOpenModal(food)}>

      {/* Veg indicator */}
      <div className={`veg-indicator ${food.veg ? "veg" : "nonveg"}`}>
        <span></span>
      </div>

      {/* Wishlist heart */}
      <button className={`wish-btn ${isWished ? "wished" : ""}`} onClick={handleWish}>
        {isWished ? "❤️" : "🤍"}
      </button>

      {/* Tag */}
      {food.tag && <div className="food-tag">{food.tag}</div>}

      {/* Image */}
      <div className="food-img-area">
        {imgError ? (
          <span className="food-emoji-fallback">{food.emoji}</span>
        ) : (
          <img
            src={food.image}
            alt={food.name}
            className="food-img"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Body */}
      <div className="food-body">
        <div className="food-meta-row">
          <span className="food-rating">⭐ {food.rating}</span>
          <span className="food-time">🕐 {food.time} min</span>
        </div>
        <h3 className="food-name">{food.name}</h3>
        <p className="food-desc">{food.desc}</p>
        <div className="food-footer">
          <span className="food-price">₹{food.price}</span>
          <button className={`add-btn ${added ? "added" : ""}`} onClick={handleAdd}>
            {added ? "✓ Added" : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;