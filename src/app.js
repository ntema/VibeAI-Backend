const express = require("express");
const cors = require("cors");
const apiLimiter = require("./middleware/rateLimiter");

const authRoutes = require("./routes/authRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const likeRoutes = require("./routes/likeRoutes");

const app = express();

// CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "https://vibeai-frontend.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());

// Rate limiter
app.use("/api/", apiLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", recommendationRoutes);
app.use("/api/like", likeRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "VibeAI Backend is running" });
});

// Root route (only for GET /)
app.get("/", (req, res) => {
  res.send("Welcome to VibeAI Backend!");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

module.exports = app;
