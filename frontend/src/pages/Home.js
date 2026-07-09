import React, { useState } from "react";
import FoodCard from "../components/FoodCard";
import "../styles/Home.css";

const ALL_FOODS = [
  {
    id: "1", name: "Classic Beef Burger", price: 149, desc: "Juicy beef patty with lettuce, tomato & special sauce",
    emoji: "🍔", cat: "Burger", rating: 4.5, time: "20-25", veg: false, tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80"
  },
  {
    id: "2", name: "Paneer Tikka Burger", price: 139, desc: "Grilled paneer with mint chutney & crispy onion rings",
    emoji: "🍔", cat: "Burger", rating: 4.2, time: "20-25", veg: true, tag: "Veg",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=80"
  },
  {
    id: "3", name: "Chicken Zinger", price: 179, desc: "Crispy fried chicken fillet with coleslaw & mayo",
    emoji: "🍔", cat: "Burger", rating: 4.4, time: "20-25", veg: false, tag: "",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80"
  },
  {
    id: "4", name: "Margherita Pizza", price: 299, desc: "Classic tomato sauce with fresh mozzarella & basil",
    emoji: "🍕", cat: "Pizza", rating: 4.6, time: "30-35", veg: true, tag: "Popular",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80"
  },
  {
    id: "5", name: "Pepperoni Pizza", price: 349, desc: "Loaded with pepperoni slices & extra cheese",
    emoji: "🍕", cat: "Pizza", rating: 4.7, time: "30-35", veg: false, tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80"
  },
  {
    id: "6", name: "BBQ Chicken Pizza", price: 379, desc: "Smoky BBQ sauce, grilled chicken & caramelized onions",
    emoji: "🍕", cat: "Pizza", rating: 4.4, time: "30-35", veg: false, tag: "",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80"
  },
  {
    id: "7", name: "Pasta Alfredo", price: 199, desc: "Creamy white sauce pasta with garlic & parmesan",
    emoji: "🍝", cat: "Pasta", rating: 4.2, time: "25-30", veg: true, tag: "",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&q=80"
  },
  {
    id: "8", name: "Arrabbiata Pasta", price: 189, desc: "Spicy tomato sauce pasta with fresh herbs",
    emoji: "🍝", cat: "Pasta", rating: 4.3, time: "25-30", veg: true, tag: "Spicy 🌶️",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80"
  },
  {
    id: "9", name: "Cold Coffee", price: 99, desc: "Chilled coffee blended with milk & ice cream",
    emoji: "☕", cat: "Drinks", rating: 4.5, time: "10-15", veg: true, tag: "Refreshing",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80"
  },
  {
    id: "10", name: "Mango Shake", price: 89, desc: "Fresh mango blended into a thick creamy shake",
    emoji: "🥭", cat: "Drinks", rating: 4.6, time: "10-15", veg: true, tag: "Seasonal",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&q=80"
  },
  {
    id: "11", name: "Strawberry Shake", price: 99, desc: "Fresh strawberries blended with creamy milk",
    emoji: "🍓", cat: "Drinks", rating: 4.4, time: "10-15", veg: true, tag: "",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&q=80"
  },
  {
    id: "12", name: "Chocolate Brownie", price: 129, desc: "Warm fudgy brownie served with vanilla ice cream",
    emoji: "🍫", cat: "Desserts", rating: 4.8, time: "15-20", veg: true, tag: "Must Try",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80"
  },
  {
    id: "13", name: "Gulab Jamun", price: 79, desc: "Soft milk dumplings soaked in rose sugar syrup",
    emoji: "🍮", cat: "Desserts", rating: 4.5, time: "10-15", veg: true, tag: "",
    image: "https://images.unsplash.com/photo-1666367538949-a3a0eb15f714?w=400&q=80"
  },
  {
    id: "14", name: "Veg Fried Rice", price: 159, desc: "Wok tossed rice with fresh vegetables & soy sauce",
    emoji: "🍚", cat: "Chinese", rating: 4.1, time: "20-25", veg: true, tag: "",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80"
  },
  {
    id: "15", name: "Chicken Noodles", price: 189, desc: "Stir fried noodles with chicken & fresh veggies",
    emoji: "🍜", cat: "Chinese", rating: 4.4, time: "20-25", veg: false, tag: "Popular",
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&q=80"
  },
  {
    id: "16", name: "Veg Manchurian", price: 169, desc: "Crispy veggie balls in spicy manchurian gravy",
    emoji: "🥘", cat: "Chinese", rating: 4.3, time: "20-25", veg: true, tag: "Spicy 🌶️",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80"
  },
  {
    id: "17", name: "Masala Dosa", price: 119, desc: "Crispy rice crepe stuffed with spiced potato filling",
    emoji: "🫓", cat: "South", rating: 4.6, time: "20-25", veg: true, tag: "Popular",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80"
  },
  {
    id: "18", name: "Idli Sambar", price: 89, desc: "Steamed rice cakes served with sambar & chutney",
    emoji: "🍱", cat: "South", rating: 4.3, time: "15-20", veg: true, tag: "Healthy",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80"
  },
];

const RESTAURANTS = [
  { id: "r1", name: "Burger Palace",  cuisine: "Burgers, Fast Food",  rating: 4.5, time: "25-30", offer: "50% off upto ₹100",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80" },
  { id: "r2", name: "Pizza Paradise", cuisine: "Pizza, Italian",      rating: 4.7, time: "30-40", offer: "Free delivery",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80" },
  { id: "r3", name: "Pasta Point",    cuisine: "Pasta, Continental",  rating: 4.2, time: "25-35", offer: "20% off",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80" },
  { id: "r4", name: "Dragon Wok",     cuisine: "Chinese, Asian",      rating: 4.4, time: "20-30", offer: "Buy 1 Get 1",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80" },
  { id: "r5", name: "South Spice",    cuisine: "South Indian, Dosas", rating: 4.6, time: "20-25", offer: "30% off upto ₹80",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80" },
  { id: "r6", name: "Sweet Dreams",   cuisine: "Desserts, Shakes",    rating: 4.8, time: "15-20", offer: "Flat ₹50 off",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80" },
];

const CATEGORIES = ["All", "Burger", "Pizza", "Pasta", "Chinese", "South", "Drinks", "Desserts"];

export default function Home({ addToCart, user, showToast, onOpenModal, wishlist, toggleWish }) {
  const [activecat, setActivecat]         = useState("All");
  const [vegOnly, setVegOnly]             = useState(false);
  const [sortBy, setSortBy]               = useState("default");
  const [activeSection, setActiveSection] = useState("food");

  // Filter + Sort
  const filtered = ALL_FOODS
    .filter(f => activecat === "All" || f.cat === activecat)
    .filter(f => !vegOnly || f.veg)
    .sort((a, b) => {
      if (sortBy === "price-low")  return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating")     return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="home">

      {/* ── HERO ── */}
      <div className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow">🚀 Free delivery on first order</p>
          <h1>Craving something<br /><span>delicious?</span></h1>
          <p className="hero-sub">Order from the best restaurants around you. Hot, fresh & fast.</p>
          <div className="hero-badges">
            <span>⚡ 30 min delivery</span>
            <span>⭐ Top rated</span>
            <span>🎉 Best offers</span>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-card">
            <div className="hero-card-emoji">🍔</div>
            <div className="hero-card-emoji mid">🍕</div>
            <div className="hero-card-emoji right">🍝</div>
          </div>
        </div>
      </div>

      {/* ── OFFERS ── */}
      <div className="offers-row">
        <div className="offer-pill o1">🎁 FIRST50 — 50% off your first order</div>
        <div className="offer-pill o2">🚀 FREE delivery above ₹299</div>
        <div className="offer-pill o3">⏰ HAPPY20 — 20% off 2PM–5PM</div>
        <div className="offer-pill o4">🎂 BDAY30 — 30% off on birthdays</div>
      </div>

      {/* ── SECTION TOGGLE ── */}
      <div className="section-toggle">
        <button
          className={activeSection === "food" ? "active" : ""}
          onClick={() => setActiveSection("food")}
        >🍽️ Food Menu</button>
        <button
          className={activeSection === "restaurants" ? "active" : ""}
          onClick={() => setActiveSection("restaurants")}
        >🏪 Restaurants</button>
      </div>

      {activeSection === "restaurants" ? (

        /* ── RESTAURANTS ── */
        <div className="restaurants-section">
          <h2 className="section-title">Top Restaurants Near You</h2>
          <div className="restaurant-grid">
            {RESTAURANTS.map(r => (
              <div className="restaurant-card" key={r.id}>

                {/* Real restaurant image */}
                <div className="rest-image">
                  <img src={r.image} alt={r.name} className="rest-img" />
                </div>

                <div className="rest-offer-badge">{r.offer}</div>
                <div className="rest-body">
                  <h3>{r.name}</h3>
                  <p className="rest-cuisine">{r.cuisine}</p>
                  <div className="rest-meta">
                    <span className="rest-rating">⭐ {r.rating}</span>
                    <span className="rest-dot">•</span>
                    <span className="rest-time">🕐 {r.time} min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      ) : (

        /* ── FOOD MENU ── */
        <div className="menu-section">
          <div className="menu-controls">
            <div className="left-controls">
              <h2 className="section-title">What's on your mind?</h2>
            </div>

            {/* Sort + Veg toggle */}
            <div className="right-controls">
              <select
                className="sort-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="default">Sort By</option>
                <option value="rating">⭐ Top Rated</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
              </select>

              <div
                className={`veg-toggle ${vegOnly ? "active" : ""}`}
                onClick={() => setVegOnly(!vegOnly)}
              >
                <span className="veg-dot"></span>
                <span>Veg Only</span>
              </div>
            </div>
          </div>

          {/* Category pills */}
          <div className="cat-scroll">
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`cat-pill ${activecat === c ? "active" : ""}`}
                onClick={() => setActivecat(c)}
              >{c}</button>
            ))}
          </div>

          {/* Result count */}
          <p className="result-count">{filtered.length} items found</p>
          

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="no-results">
              <p>😔 No items found</p>
              <button onClick={() => { setActivecat("All"); setVegOnly(false); setSortBy("default"); }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="food-grid">
              {filtered.map(food => (
    <FoodCard
      key={food.id}
      food={food}
      addToCart={addToCart}
      user={user}
      showToast={showToast}
      onOpenModal={onOpenModal}
      wishlist={wishlist}
      toggleWish={toggleWish} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">🍔 QuickBite</span>
            <p>Delivering happiness to your doorstep, one meal at a time.</p>
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <span>About Us</span>
            <span>Careers</span>
            <span>Blog</span>
            <span>Contact</span>
          </div>
          <div className="footer-links">
            <h4>Support</h4>
            <span>Help Center</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Refund Policy</span>
          </div>
          <div className="footer-links">
            <h4>Follow Us</h4>
            <span>📘 Facebook</span>
            <span>📸 Instagram</span>
            <span>🐦 Twitter</span>
            <span>▶️ YouTube</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 QuickBite. All rights reserved. Made with ❤️ in India.</p>
        </div>
      </footer>

    </div>
  );
}