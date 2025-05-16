const express = require('express');
const router = express.Router();

// 샘플 공지사항 데이터 (필요 시 DB 연동 가능)
const sampleNotices = [
  {
    id: 1,
    title: "OrcaX 시스템 점검 안내",
    content: "5월 20일 오전 2시부터 4시까지 점검이 진행됩니다.",
    date: "2025-05-16"
  },
  {
    id: 2,
    title: "신규 고객 만족도 설문 오픈",
    content: "설문에 참여해주시면 감사 포인트를 드립니다.",
    date: "2025-05-15"
  }
];

// GET /api/notice
router.get('/', (req, res) => {
  res.json(sampleNotices);
});

// POST /api/notice
router.post('/', (req, res) => {
  const { title, content } = req.body;
  const newNotice = {
    id: sampleNotices.length + 1,
    title,
    content,
    date: new Date().toISOString().split('T')[0]
  };
  sampleNotices.push(newNotice);
  res.status(201).json({ message: "공지사항 등록 완료!", notice: newNotice });
});

module.exports = router;
