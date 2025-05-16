const mongoose = require("mongoose");

const SurveySchema = new mongoose.Schema({
  name: { type: String },
  rating: { type: Number, required: true },
  feedback: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Survey", SurveySchema);
