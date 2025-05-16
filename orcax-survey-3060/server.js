const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const port = process.env.PORT || 3060;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB 연결 성공'))
  .catch(err => console.error('❌ MongoDB 연결 실패:', err));

const surveyRoutes = require('./routes/survey');
app.use('/api/survey', surveyRoutes);

app.listen(port, () => {
  console.log(`🚀 고객 만족도 서버 실행 중 (포트 ${port})`);
});

