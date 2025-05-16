const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');

router.get('/', async (req, res) => {
  const notices = await Notice.find().sort({ date: -1 });
  res.json(notices);
});

router.post('/', async (req, res) => {
  const notice = new Notice(req.body);
  await notice.save();
  res.status(201).json(notice);
});

module.exports = router;
