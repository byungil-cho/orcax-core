const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  name: String,
  satisfaction: String,
  comment: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Survey', surveySchema);
