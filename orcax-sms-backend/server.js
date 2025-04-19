require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3004;

app.use(bodyParser.json());

const sendSMS = async (to, message) => {
  const res = await axios.post('https://apis.aligo.in/send/', null, {
    params: {
      key: process.env.SMS_API_KEY,
      user_id: process.env.ALIGO_USER_ID,
      sender: process.env.ALIGO_SENDER,
      receiver: to,
      msg: message,
      msg_type: 'SMS'
    }
  });
  return res.data;
};

const sendEmail = async (subject, text) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"OrcaX 알림봇" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECEIVER,
    subject,
    text,
  });
};

app.post('/api/notify', async (req, res) => {
  const { name, phone, wallet, nft } = req.body;
  const msg = `📦 주문 도착!\n\n🧑 이름: ${name}\n📱 전화: ${phone}\n👛 지갑: ${wallet}\n🪙 NFT: ${nft}`;

  try {
    const sms = await sendSMS(process.env.SELLER_PHONE, msg);
    console.log('✅ 문자 전송 성공:', sms);

    await sendEmail('📢 OrcaX 주문 알림', msg);
    console.log('📬 이메일 전송 성공');

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ 알림 전송 실패:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 알림 서버가 포트 ${PORT}에서 실행 중입니다.`);
});
