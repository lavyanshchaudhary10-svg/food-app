const express = require("express");
const router  = express.Router();
const { getAllFoods, seedFoods } = require("../controllers/foodController");

// GET /api/food
router.get("/", getAllFoods);

// POST /api/food/seed  (run once to add foods to DB)
router.post("/seed", seedFoods);

module.exports = router;