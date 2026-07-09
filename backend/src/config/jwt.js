// JWT helper functions
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "khanakhalojiSecretKey2025";

// Generate token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, SECRET, { expiresIn: "7d" });
};

// Verify token
const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { generateToken, verifyToken };