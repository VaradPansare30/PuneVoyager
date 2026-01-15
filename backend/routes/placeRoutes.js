const express = require("express");
const router = express.Router();
const Place = require("../models/Place");

// ✅ Get all places
router.get("/", async (req, res) => {
  try {
    const places = await Place.find({});
    res.json(places);
  } catch (err) {
    console.error("Error fetching places:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get a single place by NUMERIC id
router.get("/:id", async (req, res) => {
  try {
    const numericId = Number(req.params.id);

    const place = await Place.findOne({ id: numericId });

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.json(place);
  } catch (err) {
    console.error("Error fetching place:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Add comment using NUMERIC id
router.post("/:id/comments", async (req, res) => {
  try {
    const numericId = Number(req.params.id);
    const { user, comment } = req.body;

    if (!user || !comment) {
      return res.status(400).json({
        message: "User and comment text are required",
      });
    }

    const place = await Place.findOne({ id: numericId });
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    place.comments.push({ user, comment });
    await place.save();

    res.json(place.comments);
  } catch (err) {
    console.error("Error adding comment:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
