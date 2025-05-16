const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  name: String,
  message: String,
  rating: Number,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
