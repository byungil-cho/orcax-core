// models/Survey.js
const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
  name: String,
  satisfaction: String,
  opinion: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Survey', SurveySchema);
