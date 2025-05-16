const express = require('express');
const router = express.Router();
const { getReferralEarnings } = require('../controllers/referralController');

router.get('/referral-earnings/:referralCode', getReferralEarnings);

module.exports = router;
