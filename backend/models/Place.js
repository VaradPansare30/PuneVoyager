const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: String,
  comment: String
});

const placeSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  fullDescription: String,
  comments: [commentSchema]
});

module.exports = mongoose.model('Place', placeSchema);
