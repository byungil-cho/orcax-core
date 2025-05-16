const express = require('express');
const router = express.Router();
const Survey = require('../models/Survey');

router.post('/', async (req, res) => {
  try {
    const survey = new Survey(req.body);
    await survey.save();
    res.status(200).json({ message: '저장 성공!' });
  } catch (error) {
    res.status(500).json({ message: '저장 실패', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const results = await Survey.find().sort({ date: -1 });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: '데이터 불러오기 실패', error });
  }
});

module.exports = router;

