const express = require("express");
const router = express.Router();
const { getJobDetails } = require("../controllers/jobController");

// GET /api/jobs/:title
router.get("/:title", getJobDetails);

module.exports = router;
