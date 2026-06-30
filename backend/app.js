require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const promptRoutes = require("./routes/prompt.routes");
const tagRoutes = require("./routes/tag.routes");
const uploadRoutes = require("./routes/upload.routes");
const feedRoutes = require("./routes/feed.routes");
const adminRoutes = require("./routes/admin.routes");

// Middleware
const errorMiddleware = require("./middleware/error.middleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/prompts", promptRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/admin", adminRoutes);

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MyPrompt API Running",
  });
});

// Global Error Handler
app.use(errorMiddleware);

// Database Connection & Server Start
(async () => {
  try {
    await db.query("SELECT NOW()");
    console.log("✅ Database Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error);
    process.exit(1);
  }
})();

module.exports = app;