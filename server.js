require('dotenv').config(); // .env 파일 로드
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3050;
const SERVICE_NAME = process.env.SERVICE_NAME || 'orcax-customer-3050';
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

// DB 연결
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`✅ MongoDB 연결 성공 (${SERVICE_NAME})`);
}).catch((err) => {
  console.error('❌ MongoDB 연결 실패:', err);
});

// 간단한 기본 라우터
app.get('/', (req, res) => {
  res.send(`${SERVICE_NAME} 서버 실행 중`);
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🏢 ${SERVICE_NAME} 포트 ${PORT}에서 실행 중`);
});
