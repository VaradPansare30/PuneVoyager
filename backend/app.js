// backend/app.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./database");

// Import routes
const placeRoutes = require("./routes/placeRoutes");
const auth = require("./routes/auth");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/places", placeRoutes);
app.use("/api/auth", auth);

// Connect database
connectDB();

// ✅ Export the app instead of starting the server
module.exports = app;
