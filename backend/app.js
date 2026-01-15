// backend/app.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./database");

// Import routes
const placeRoutes = require("./routes/placeRoutes");
const auth = require("./routes/auth"); // 👈 added this line

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/places", placeRoutes);
app.use("/api/auth", auth); // 👈 added this line

// Connect database
connectDB();

// Start server
const PORT = 3001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
