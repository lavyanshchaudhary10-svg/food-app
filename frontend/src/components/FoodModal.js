import React from "react";
import "../styles/FoodModal.css";

function FoodModal({ food, onClose, addToCart, user, showToast }) {
  if (!food) return null;

  const handleAdd = () => {
    if (!user) {
      showToast("Please login to add items! 🔐", "error");
      return;
    }
    addToCart(food);
    showToast(`${food.name} added to cart! 🛒`, "success");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>

        {/* Close button */}
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Food image */}
        <div className="modal-img-wrap">
          <img src={food.image} alt={food.name} className="modal-img" />
          <div className="modal-img-overlay">
            {food.tag && <span className="modal-tag">{food.tag}</span>}
            <div className={`modal-veg ${food.veg ? "veg" : "nonveg"}`}>
              <span></span>
            </div>
          </div>
        </div>

        {/* Food info */}
        <div className="modal-body">
          <div className="modal-top">
            <h2 className="modal-name">{food.name}</h2>
            <span className="modal-price">₹{food.price}</span>
          </div>

          <div className="modal-meta">
            <span className="modal-rating">⭐ {food.rating} rating</span>
            <span className="modal-dot">•</span>
            <span className="modal-time">🕐 {food.time} min</span>
            <span className="modal-dot">•</span>
            <span className="modal-cat">🍽️ {food.cat}</span>
          </div>

          <p className="modal-desc">{food.desc}</p>

          {/* Nutrition info */}
          <div className="modal-nutrition">
            <h4>Nutrition Info</h4>
            <div className="nutrition-grid">
              <div className="nutrition-item">
                <span className="n-val">320</span>
                <span className="n-label">Calories</span>
              </div>
              <div className="nutrition-item">
                <span className="n-val">12g</span>
                <span className="n-label">Protein</span>
              </div>
              <div className="nutrition-item">
                <span className="n-val">28g</span>
                <span className="n-label">Carbs</span>
              </div>
              <div className="nutrition-item">
                <span className="n-val">14g</span>
                <span className="n-label">Fat</span>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="modal-reviews">
            <h4>Customer Reviews</h4>
            <div className="review-item">
              <span className="review-avatar">R</span>
              <div>
                <p className="review-name">Rahul S. <span className="review-stars">⭐⭐⭐⭐⭐</span></p>
                <p className="review-text">Ekdum mast tha! Ghar jaisa taste! 🔥</p>
              </div>
            </div>
            <div className="review-item">
              <span className="review-avatar">P</span>
              <div>
                <p className="review-name">Priya M. <span className="review-stars">⭐⭐⭐⭐</span></p>
                <p className="review-text">Very tasty and delivered on time. Will order again!</p>
              </div>
            </div>
            <div className="review-item">
              <span className="review-avatar">A</span>
              <div>
                <p className="review-name">Amit K. <span className="review-stars">⭐⭐⭐⭐⭐</span></p>
                <p className="review-text">Best dish I've had in a while. Highly recommend!</p>
              </div>
            </div>
          </div>

          {/* Add to cart button */}
          <button className="modal-add-btn" onClick={handleAdd}>
            Add to Cart — ₹{food.price} 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodModal;