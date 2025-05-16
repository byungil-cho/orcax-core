const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// ✅ 모델 정의 (models/Survey.js에서 import)
const Survey = require('../models/Survey');

// ✅ 설문 제출 API
router.post('/api/survey', async (req, res) => {
  try {
    const { name, satisfaction, opinion } = req.body;

    // ✅ 필수값 확인
    if (!satisfaction) {
      return res.status(400).json({ success: false, message: '만족도는 반드시 선택되어야 합니다.' });
    }

    // ✅ 설문 객체 생성 및 저장
    const newSurvey = new Survey({
      name: name?.trim() || '익명',        // 이름이 없으면 익명 처리
      satisfaction: satisfaction.trim(),
      opinion: opinion?.trim() || ''
    });

    await newSurvey.save();

    console.log('✅ 설문 제출 성공:', newSurvey);
    res.json({ success: true, message: '설문이 성공적으로 제출되었습니다.' });

  } catch (error) {
    console.error('❌ 설문 제출 오류:', error.message);
    res.status(500).json({ success: false, message: '서버 오류로 제출에 실패했습니다.' });
  }
});

// ✅ 설문 목록 조회 API
router.get('/api/survey', async (req, res) => {
  try {
    const surveys = await Survey.find().sort({ createdAt: -1 });
    res.json(surveys);
  } catch (error) {
    console.error('❌ 설문 목록 조회 오류:', error.message);
    res.status(500).json({ success: false, message: '데이터를 불러오지 못했습니다.' });
  }
});

module.exports = router;
