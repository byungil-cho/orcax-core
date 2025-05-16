const express = require('express');
const router = express.Router();
const Survey = require('../models/Survey');

// ✅ POST: 설문 저장
router.post('/', async (req, res) => {
  try {
    const { name, satisfaction, feedback } = req.body;
    const newSurvey = new Survey({ name, satisfaction, feedback });
    await newSurvey.save();
    res.status(200).json({ message: '설문 저장 완료' });
  } catch (err) {
    console.error('❌ 설문 저장 실패:', err.message);
    res.status(500).json({ error: '서버 오류' });
  }
});

// ✅ GET: 설문 리스트
router.get('/', async (req, res) => {
  try {
    const surveys = await Survey.find().sort({ createdAt: -1 });
    res.status(200).json(surveys);
  } catch (err) {
    res.status(500).json({ error: '데이터 불러오기 실패' });
  }
});

module.exports = router;
