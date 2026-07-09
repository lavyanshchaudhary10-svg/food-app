require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes  = require("./routes/authRoutes");
const foodRoutes  = require("./routes/foodRoutes");
const cartRoutes  = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app  = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// Routes
app.use("/api/auth",   authRoutes);
app.use("/api/food",   foodRoutes);
app.use("/api/cart",   cartRoutes);
app.use("/api/orders", orderRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Khana Khalo Ji Backend Running! 🍽️");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});