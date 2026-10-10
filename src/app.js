const express = require("express");
const cors = require("cors");
const apiLimiter = require("./middleware/rateLimiter");

const authRoutes = require("./routes/authRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const likeRoutes = require("./routes/likeRoutes");

const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://vibeai-frontend.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use("/api/", apiLimiter);


app.use("/api/auth", authRoutes);
app.use("/api", recommendationRoutes);
app.use("/api/like", likeRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "VibeAI Backend is running" });
});

app.use("/", (req, res) => {
  res.send("Welcome to VibeAI Backend!");
});

module.exports = app;
