const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3070;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🏢 orcax-franchise-3070 서버 실행 중입니다!');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB 연결 성공 (프랜차이즈)');
    app.listen(PORT, () => {
      console.log(`🏢 orcax-franchise-3070 포트 ${PORT}에서 실행 중`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB 연결 실패:', err);
  });
