// Food Schema - store food items in MongoDB
const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  price:       { type: Number, required: true },
  desc:        { type: String, required: true },
  emoji:       { type: String, default: "🍽️"  },
  cat:         { type: String, required: true },
  rating:      { type: Number, default: 4.0   },
  time:        { type: String, default: "30-35" },
  veg:         { type: Boolean, default: true  },
  tag:         { type: String, default: ""     },
  image:       { type: String, default: ""     },
  available:   { type: Boolean, default: true  },
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;