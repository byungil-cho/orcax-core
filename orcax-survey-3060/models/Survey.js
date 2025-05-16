const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  name: String,
  satisfaction: String,
  comment: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Survey', surveySchema);
