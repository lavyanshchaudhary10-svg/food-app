// Food Controller - get food from MongoDB
const Food = require("../models/Food");

// Get all foods
const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find({ available: true });

    // If DB empty, return hardcoded data
    if (foods.length === 0) {
      return res.json(getHardcodedFoods());
    }

    res.json(foods);
  } catch (error) {
    console.log("Get foods error:", error.message);
    // Fallback to hardcoded
    res.json(getHardcodedFoods());
  }
};

// Seed foods into DB
const seedFoods = async (req, res) => {
  try {
    await Food.deleteMany({});
    await Food.insertMany(getHardcodedFoods());
    res.json({ message: "Foods seeded successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Seed failed" });
  }
};

// Hardcoded food data as fallback
const getHardcodedFoods = () => [
  { id:"1",  name:"Butter Chicken",      price:299, desc:"Creamy tomato curry with tender chicken",     emoji:"🍗", cat:"North Indian", rating:4.8, time:"30-35", veg:false, tag:"Bestseller", image:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80" },
  { id:"2",  name:"Dal Makhani",          price:249, desc:"Slow cooked black lentils in butter & cream", emoji:"🥘", cat:"North Indian", rating:4.7, time:"35-40", veg:true,  tag:"Popular",    image:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80" },
  { id:"3",  name:"Biryani",             price:329, desc:"Aromatic basmati rice with spiced meat",       emoji:"🍚", cat:"North Indian", rating:4.9, time:"40-45", veg:false, tag:"Must Try",   image:"https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400&q=80" },
  { id:"4",  name:"Masala Dosa",          price:119, desc:"Crispy rice crepe with spiced potato filling", emoji:"🫓", cat:"South Indian", rating:4.6, time:"20-25", veg:true,  tag:"Popular",    image:"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80" },
  { id:"5",  name:"Pani Puri",            price:59,  desc:"Crispy balls with tangy spiced water",         emoji:"🫧", cat:"Street Food",  rating:4.9, time:"10-15", veg:true,  tag:"Bestseller", image:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80" },
  { id:"6",  name:"Hyderabadi Biryani",   price:349, desc:"Dum cooked biryani with saffron",              emoji:"🍚", cat:"Biryani",      rating:4.9, time:"45-50", veg:false, tag:"#1 Rated",   image:"https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400&q=80" },
  { id:"7",  name:"Classic Beef Burger",  price:149, desc:"Juicy beef patty with special sauce",          emoji:"🍔", cat:"Burgers",      rating:4.5, time:"20-25", veg:false, tag:"Bestseller", image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
  { id:"8",  name:"Margherita Pizza",     price:299, desc:"Classic tomato sauce with mozzarella",         emoji:"🍕", cat:"Pizza",        rating:4.6, time:"30-35", veg:true,  tag:"Popular",    image:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80" },
  { id:"9",  name:"Gulab Jamun",          price:79,  desc:"Soft milk dumplings in sugar syrup",           emoji:"🍮", cat:"Sweets",       rating:4.5, time:"10-15", veg:true,  tag:"",           image:"https://images.unsplash.com/photo-1666367538949-a3a0eb15f714?w=400&q=80" },
  { id:"10", name:"Mango Lassi",          price:89,  desc:"Thick yogurt based mango drink",               emoji:"🥭", cat:"Drinks",       rating:4.7, time:"5-10",  veg:true,  tag:"Seasonal",   image:"https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&q=80" },
];

module.exports = { getAllFoods, seedFoods };