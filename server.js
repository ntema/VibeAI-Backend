const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./src/config/db");
const app = require("./src/app");

connectDB();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 VibeAI Backend running on http://localhost:${PORT}`);
});
