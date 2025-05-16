const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();
const app = express();

// ✅ 꼭 있어야 할 미들웨어!
app.use(cors()); // ✅ CORS 허용
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB 연결 성공');
}).catch(err => {
  console.error('❌ MongoDB 연결 실패:', err.message);
});

// ✅ 설문 라우터
app.use('/api/survey', require('./routes/survey'));

const PORT = process.env.PORT || 3060;
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
