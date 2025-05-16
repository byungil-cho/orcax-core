const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// .env 파일 로딩
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3060;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 정적 파일 제공 (public 폴더 기준)
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB 연결 성공'))
.catch(err => console.error('❌ MongoDB 연결 실패:', err));

// Survey 모델 (models/Survey.js 경로에 있어야 함)
const Survey = require('./models/Survey');

// 설문 제출 라우트
app.post('/api/surveys', async (req, res) => {
  try {
    const { name, satisfaction, opinion } = req.body;
    const newSurvey = new Survey({ name, satisfaction, opinion });
    await newSurvey.save();
    res.status(200).json({ message: '설문이 저장되었습니다.' });
  } catch (error) {
    console.error('설문 저장 오류:', error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 설문 목록 조회 라우트
app.get('/api/surveys', async (req, res) => {
  try {
    const surveys = await Survey.find().sort({ createdAt: -1 });
    res.json(surveys);
  } catch (error) {
    console.error('설문 조회 오류:', error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 기본 페이지 (index.html 또는 survey-submit.html 등)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'survey-submit.html'));
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 고객 만족도 서버 실행 중 (포트 ${PORT})`);
});

