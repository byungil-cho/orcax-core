const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());

// 정적 파일 서빙: public 폴더에 있는 HTML 접근 가능
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB 연결 성공'))
.catch(err => console.error('❌ MongoDB 연결 실패:', err));

// 라우터 연결
const noticeRoutes = require('./routes/notices');
const feedbackRoutes = require('./routes/feedback');

app.use('/api/notices', noticeRoutes);
app.use('/api/feedback', feedbackRoutes);

// 포트 설정
const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
