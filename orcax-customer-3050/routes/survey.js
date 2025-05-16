const express = require("express");
const router = express.Router();
const Survey = require("../models/Survey");

// 설문 등록
router.post("/", async (req, res) => {
  try {
    const { name, rating, feedback } = req.body;
    const newSurvey = new Survey({ name, rating, feedback });
    await newSurvey.save();
    res.status(200).json({ message: "설문 저장 완료!" });
  } catch (error) {
    res.status(500).json({ error: "설문 저장 실패" });
  }
});

// 설문 조회
router.get("/", async (req, res) => {
  try {
    const surveys = await Survey.find().sort({ createdAt: -1 });
    res.status(200).json(surveys);
  } catch (error) {
    res.status(500).json({ error: "설문 조회 실패" });
  }
});

module.exports = router;
