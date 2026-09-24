const express = require("express");
const router = express.Router();
const {
  getMoods,
  recommend,
} = require("../controllers/recommendationController");

router.get("/moods", getMoods);
router.get("/recommend", recommend);

module.exports = router;
