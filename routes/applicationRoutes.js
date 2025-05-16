const express = require('express');
const router = express.Router();
const { getApplication } = require('../controllers/getApplicationController');

router.post('/get-applications', getApplication); // this must exist

module.exports = router;
