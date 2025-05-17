const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifyPayment,
    fetchAllApplications,
  updateApplicationStatus,
} = require('../controllers/paymentController');

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);

router.get('/applications', fetchAllApplications);
router.patch('/applications/:id/status', updateApplicationStatus);

module.exports = router;
