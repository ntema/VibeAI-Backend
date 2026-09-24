const axios = require("axios");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 });

const moodSeeds = {
  chill: ["Burna Boy", "Tems", "Omah Lay", "SZA"],
  party: ["Asake", "Wizkid", "Davido", "Rema", "Shallipopi"],
  energetic: ["BNXN", "Fireboy DML", "Ayra Starr", "Asake", "Seyi Vibez"],
  sad: ["Omah Lay", "Tems", "Joeboy", "CKay"],
  happy: ["Wizkid", "Davido", "Burna Boy", "Fireboy DML"],
};

// Generate a clean avatar when Last.fm gives placeholder
const getArtistImage = (artistName) => {
  const encodedName = encodeURIComponent(artistName);
  // Clean, colorful generated avatar
  return `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=ffffff&size=300&bold=true&format=png`;
};

const getRecommendations = async (seed, mood) => {
  let artistSeed = seed;

  if (mood && moodSeeds[mood]) {
    const options = moodSeeds[mood];
    artistSeed = options[Math.floor(Math.random() * options.length)];
  }

  if (!artistSeed) {
    throw new Error("Seed or mood is required");
  }

  const cacheKey = `rec_${artistSeed.toLowerCase()}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const response = await axios.get("http://ws.audioscrobbler.com/2.0/", {
    params: {
      method: "artist.getSimilar",
      artist: artistSeed,
      api_key: process.env.LASTFM_API_KEY,
      format: "json",
      limit: 12,
      autocorrect: 1,
    },
  });

  let artists = response.data.similarartists?.artist || [];

  // Put original seed first
  artists = [
    { name: artistSeed },
    ...artists.filter((a) => a.name.toLowerCase() !== artistSeed.toLowerCase()),
  ].slice(0, 12);

  const recommendations = artists.map((artist, index) => {
    return {
      id: `rec-${index}-${Date.now()}`,
      name: artist.name,
      artist: artist.name,
      // Always use clean generated image (Last.fm images are broken)
      albumArt: getArtistImage(artist.name),
    };
  });

  const result = {
    success: true,
    seed: artistSeed,
    mood: mood || null,
    recommendations,
  };

  cache.set(cacheKey, result);
  return result;
};

module.exports = {
  getRecommendations,
  moodSeeds,
};
