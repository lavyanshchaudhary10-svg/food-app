// Auth Service - simple helper for validation
// Keeping this basic as it's a student project

// Check if email format is valid
const isValidEmail = (email) => {
  return email.includes("@") && email.includes(".");
};

// Check if password is long enough
const isValidPassword = (password) => {
  return password.length >= 6;
};

module.exports = { isValidEmail, isValidPassword };