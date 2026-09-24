const User = require("../models/User");

const likeSong = async (req, res) => {
  try {
    const { id, name, artist, albumArt } = req.body;
    const user = await User.findById(req.user.id);

    if (user.likedSongs.some((song) => song.id === id)) {
      return res.json({ message: "Already liked" });
    }

    user.likedSongs.push({ id, name, artist, albumArt });
    await user.save();

    res.json({ message: "Song liked", likedSongs: user.likedSongs });
  } catch (error) {
    res.status(500).json({ error: "Failed to like song" });
  }
};

const getLikedSongs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ likedSongs: user.likedSongs || [] });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch liked songs" });
  }
};

module.exports = { likeSong, getLikedSongs };
