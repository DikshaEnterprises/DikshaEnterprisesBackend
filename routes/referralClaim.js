const express = require("express");
const router = express.Router();
const { claimReferralPayment ,getReferralDataByCode,getAllReferrals,updateTransactionStatus} = require("../controllers/ReferralClaim");

router.post("/claim", claimReferralPayment);
router.post('/get', getReferralDataByCode);
router.get('/all', getAllReferrals);
router.post("/update-status", updateTransactionStatus);


module.exports = router;
