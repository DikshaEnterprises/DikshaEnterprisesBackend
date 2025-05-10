// routes/contactRoutes.js
const express = require("express");
const { submitContactForm, getAllContacts } = require("../controllers/contactFormController");
const router = express.Router();

// Route to submit the contact form
router.post("/submit", submitContactForm);

// Route to get all contact form submissions
router.get("/all", getAllContacts);

module.exports = router;
