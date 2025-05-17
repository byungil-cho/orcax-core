// routes/survey.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// ✅ MongoDB 모델 임포트
const Survey = require('../models/Survey'); // 경로는 실제 파일 위치에 맞게 조정

// 기존 GET/POST 라우터 외에 아래 DELETE 추가!
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // MongoDB에서 문서 삭제
    const result = await Survey.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send('삭제할 설문을 찾을 수 없습니다.');
    }

    res.sendStatus(200); // 성공
  } catch (error) {
    console.error('❌ 삭제 중 오류:', error.message);
    res.status(500).send('서버 오류로 삭제에 실패했습니다.');
  }
});

module.exports = router;

