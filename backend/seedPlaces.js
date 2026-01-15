// backend/seedplaces.js
require('dotenv').config();
const mongoose = require("mongoose");
const Place = require("./models/Place");

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected to PuneVoyager (Atlas)"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ✅ Seed data
const places = Array.from({ length: 21 }, (_, i) => ({
  id: i + 1,
  fullDescription: `This is the full description for Place ${i + 1}. Replace this with real content.`,
  comments: []
}));

async function seedPlaces() {
  try {
    // Optional: remove all existing places before seeding
    // await Place.deleteMany({});

    for (const place of places) {
      // Upsert ensures we don’t create duplicates if run multiple times
      await Place.updateOne(
        { id: place.id },
        { $setOnInsert: place },
        { upsert: true }
      );
    }

    console.log("✅ Places added/updated successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding places:", err);
    mongoose.disconnect();
  }
}

seedPlaces();
