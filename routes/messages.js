const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// 메시지 등록
router.post('/', async (req, res) => {
  const { name, message } = req.body;
  try {
    const newMessage = new Message({ name, message });
    await newMessage.save();
    res.status(201).json({ message: '메시지 등록 완료' });
  } catch (error) {
    res.status(500).json({ error: '서버 오류: 등록 실패' });
  }
});

// 메시지 조회
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: '서버 오류: 조회 실패' });
  }
});

module.exports = router;
