const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Mongo 연결
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB 연결 성공'))
  .catch((err) => console.error('❌ MongoDB 연결 실패:', err));

// 라우터
app.use('/api/notices', require('./routes/notices'));
app.use('/api/feedback', require('./routes/feedback'));

const PORT = 3050;
app.listen(PORT, () => {
  console.log(`🟢 3050번 포트에서 서버 실행 중: http://localhost:${PORT}`);
});
