const mongoose = require("mongoose");

const SurveySchema = new mongoose.Schema({
  name: { type: String },
  rating: { type: Number, required: true },
  feedback: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Survey", SurveySchema);
