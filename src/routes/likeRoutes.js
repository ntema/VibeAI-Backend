const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { likeSong, getLikedSongs } = require("../controllers/likeController");

router.post("/", protect, likeSong);
router.get("/", protect, getLikedSongs);

module.exports = router;
