const { getRecommendations, moodSeeds } = require("../services/lastfmService");

const getMoods = (req, res) => {
  res.json({
    moods: Object.keys(moodSeeds),
    nigerianStarter: [
      "Asake",
      "Burna Boy",
      "Wizkid",
      "Davido",
      "Rema",
      "Omah Lay",
    ],
  });
};

const recommend = async (req, res) => {
  try {
    const { seed, mood } = req.query;
    const data = await getRecommendations(seed, mood);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getMoods, recommend };
