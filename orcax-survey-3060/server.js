const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3060;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB 연결 성공'))
.catch(err => console.error('❌ MongoDB 연결 실패:', err));

// Mongoose 모델
const Survey = require('./models/Survey');

// 설문 제출 API
app.post('/api/survey', async (req, res) => {
  try {
    const { name, satisfaction, comment } = req.body;
    const newSurvey = new Survey({ name, satisfaction, comment });
    await newSurvey.save();
    res.status(201).json({ message: '설문 제출 완료' });
  } catch (err) {
    console.error('설문 제출 실패:', err);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 설문 목록 조회 API
app.get('/api/survey', async (req, res) => {
  try {
    const surveys = await Survey.find().sort({ createdAt: -1 });
    res.json(surveys);
  } catch (err) {
    console.error('설문 목록 불러오기 실패:', err);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 고객 만족도 서버 실행 중 (포트 ${PORT})`);
});
