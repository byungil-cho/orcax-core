const express = require("express");
const router = express.Router();
const Survey = require("../models/Survey");

// POST /api/survey
router.post("/", async (req, res) => {
  try {
    const { name, rating, feedback } = req.body;
    const newSurvey = new Survey({ name, rating, feedback });
    await newSurvey.save();
    res.status(200).json({ message: "설문 저장 완료!" });
  } catch (error) {
    console.error("설문 저장 오류:", error);
    res.status(500).json({ error: "설문 저장 실패" });
  }
});

module.exports = router;
