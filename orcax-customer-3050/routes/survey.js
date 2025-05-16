const express = require("express");
const router = express.Router();
const Survey = require("../models/Survey");

// POST: 설문 저장
router.post("/", async (req, res) => {
  try {
    const { name, rating, feedback } = req.body;

    // 유효성 검사 추가
    if (!rating) {
      return res.status(400).json({ error: "만족도를 선택해주세요." });
    }

    const newSurvey = new Survey({ name, rating, feedback });
    await newSurvey.save();
    res.status(200).json({ message: "설문 저장 완료!" });
  } catch (error) {
    console.error("설문 저장 오류:", error); // ❗ 로그 출력
    res.status(500).json({ error: "설문 저장 실패" });
  }
});

// GET: 설문 전체 조회
router.get("/", async (req, res) => {
  try {
    const surveys = await Survey.find().sort({ createdAt: -1 });
    res.status(200).json(surveys);
  } catch (error) {
    console.error("설문 조회 오류:", error); // ❗ 로그 출력
    res.status(500).json({ error: "설문 조회 실패" });
  }
});

module.exports = router;

