const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// 환경변수 사용 시 필요
require('dotenv').config();

// 미들웨어
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE']
}));
app.use(express.json());

// ⬇️ 설문 라우터 연결 반드시 필요!
const surveyRoutes = require('./routes/survey'); // ✅ 경로 확인!
app.use('/api/survey', surveyRoutes); // ✅ 반드시 있어야 함!

// DB 연결
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB 연결 성공');
}).catch(err => {
  console.error('❌ MongoDB 연결 실패:', err.message);
});

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});

