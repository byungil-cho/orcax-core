const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.send("공지사항 API입니다.");
});

module.exports = router;
