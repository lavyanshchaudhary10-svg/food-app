import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CartPage from "./pages/CartPage";
import OrderSuccess from "./pages/OrderSuccess";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import MyOrders from "./pages/MyOrders";
import AddressPage from "./pages/AddressPage";
import Toast from "./components/Toast";
import FoodModal from "./components/FoodModal";
import "./styles/App.css";

function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);
  const [modalFood, setModalFood] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("kkj-wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  const toggleWish = useCallback((foodId) => {
    setWishlist(prev => {
      const updated = prev.includes(foodId)
        ? prev.filter(id => id !== foodId)
        : [...prev, foodId];
      localStorage.setItem("kkj-wishlist", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addToCart = useCallback((food) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === food.id);
      if (exists) return prev.map(i =>
        i.id === food.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      return [...prev, { ...food, quantity: 1 }];
    });
  }, []);

  const cartCount = cartItems.reduce((t, i) => t + i.quantity, 0);

  return (
    <Router>
      <div className="app">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        {modalFood && (
          <FoodModal
            food={modalFood}
            onClose={() => setModalFood(null)}
            addToCart={addToCart}
            user={user}
            showToast={showToast}
          />
        )}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={
            <>
              <Navbar user={user} setUser={setUser} cartCount={cartCount} />
              <Home addToCart={addToCart} user={user} showToast={showToast} onOpenModal={setModalFood} wishlist={wishlist} toggleWish={toggleWish} />
            </>
          } />
          <Route path="/login" element={
            <>
              <Navbar user={user} setUser={setUser} cartCount={cartCount} />
              <Login setUser={setUser} showToast={showToast} />
            </>
          } />
          <Route path="/signup" element={
            <>
              <Navbar user={user} setUser={setUser} cartCount={cartCount} />
              <Signup setUser={setUser} showToast={showToast} />
            </>
          } />
          <Route path="/cart" element={
            <>
              <Navbar user={user} setUser={setUser} cartCount={cartCount} />
              <CartPage cartItems={cartItems} setCartItems={setCartItems} showToast={showToast} />
            </>
          } />
          <Route path="/order-success" element={
            <>
              <Navbar user={user} setUser={setUser} cartCount={cartCount} />
              <OrderSuccess />
            </>
          } />
          <Route path="/profile" element={
            <>
              <Navbar user={user} setUser={setUser} cartCount={cartCount} />
              <ProfilePage user={user} setUser={setUser} showToast={showToast} />
            </>
          } />
          <Route path="/orders" element={
            <>
              <Navbar user={user} setUser={setUser} cartCount={cartCount} />
              <MyOrders user={user} />
            </>
          } />
          <Route path="/address" element={
            <>
              <Navbar user={user} setUser={setUser} cartCount={cartCount} />
              <AddressPage user={user} showToast={showToast} />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
