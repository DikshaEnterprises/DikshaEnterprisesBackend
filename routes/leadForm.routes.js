const express = require('express');
const router = express.Router();
const {
  submitLeadForm,
  getAllLeadForms,
} = require('../controllers/leadForm.controller');

router.post('/', submitLeadForm);
router.get('/', getAllLeadForms);

module.exports = router;
