const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 기존 공지사항 라우터
const noticeRouter = require("./routes/notice");
app.use("/api/notice", noticeRouter);

// ✅ 설문조사 라우터 추가
const surveyRouter = require("./routes/survey");
app.use("/api/survey", surveyRouter);

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB 연결 성공");
}).catch(err => {
  console.error("MongoDB 연결 실패:", err.message);
});

// 포트 그대로 3050 사용
const PORT = 3050;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중`);
});

