const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const surveyRouter = require("./routes/survey");

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB 연결 성공");
}).catch((err) => {
  console.error("❌ MongoDB 연결 실패:", err);
});

app.use("/api/survey", surveyRouter);

app.listen(3060, () => {
  console.log("🚀 고객 만족도 서버 실행 중 (포트 3060)");
});
