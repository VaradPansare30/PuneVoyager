const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth"); // <-- make sure this path exists

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/PuneVoyager")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Use auth routes under /api/auth
app.use("/api/auth", authRoutes);

// Start server
app.listen(3001, () => {
  console.log("🚀 Server running on port 3001");
});
