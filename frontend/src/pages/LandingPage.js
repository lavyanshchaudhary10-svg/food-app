import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Fade in animation
    setTimeout(() => setShow(true), 100);
  }, []);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(() => navigate("/home"), 800);
  };

  return (
    <div className={`landing ${show ? "visible" : ""} ${leaving ? "leaving" : ""}`}>

      {/* YouTube video background */}
      <div className="video-bg">
        <iframe
          src="https://www.youtube.com/embed/videoseries?list=PLbpi6ZahtOH6Ar_3GPy3workwYL_nt7FV&autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
          title="food background"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>

      {/* Dark overlay */}
      <div className="video-overlay"></div>

      {/* Content */}
      <div className="landing-content">

        {/* Logo animation */}
        <div className="landing-logo">
          <span className="logo-emoji">🍽️</span>
        </div>

        {/* Brand name */}
        <h1 className="brand-name">
          <span className="brand-khana">Khana</span>
          <span className="brand-khalo">Khalo</span>
          <span className="brand-ji">Ji</span>
          <span className="brand-emoji">😋</span>
        </h1>

        <p className="brand-tagline">
          India ka sabse bada food delivery platform
        </p>

        <div className="brand-stats">
          <div className="stat-item">
            <span className="stat-num">500+</span>
            <span className="stat-label">Dishes</span>
          </div>
          <div className="stat-divider">|</div>
          <div className="stat-item">
            <span className="stat-num">50+</span>
            <span className="stat-label">Cuisines</span>
          </div>
          <div className="stat-divider">|</div>
          <div className="stat-item">
            <span className="stat-num">30 min</span>
            <span className="stat-label">Delivery</span>
          </div>
        </div>

        {/* Enter button */}
        <button className="enter-btn" onClick={handleEnter}>
          <span>Order Karo Abhi</span>
          <span className="enter-arrow">→</span>
        </button>

        {/* Scrolling food marquee */}
        <div className="food-marquee">
          <div className="marquee-track">
            {["🍔 Burger", "🍕 Pizza", "🍝 Pasta", "🍜 Noodles", "🍣 Sushi",
              "🥘 Curry", "🫓 Dosa", "🍱 Thali", "🍦 Ice Cream", "🥗 Salad",
              "🍛 Biryani", "🧆 Chaat", "🥙 Wrap", "🍮 Gulab Jamun", "☕ Coffee",
              "🍔 Burger", "🍕 Pizza", "🍝 Pasta", "🍜 Noodles", "🍣 Sushi",
              "🥘 Curry", "🫓 Dosa", "🍱 Thali", "🍦 Ice Cream", "🥗 Salad"].map((item, i) => (
              <span key={i} className="marquee-item">{item}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default LandingPage;