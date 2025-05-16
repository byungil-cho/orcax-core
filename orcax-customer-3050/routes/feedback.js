const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.get('/', async (req, res) => {
  const feedback = await Feedback.find().sort({ submittedAt: -1 });
  res.json(feedback);
});

router.post('/', async (req, res) => {
  const feedback = new Feedback(req.body);
  await feedback.save();
  res.status(201).json(feedback);
});

module.exports = router;
