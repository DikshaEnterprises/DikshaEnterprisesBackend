const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { submitCareerForm, getAllCareerForms } = require("../controllers/careerFormController");

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST: Submit career form
router.post("/submit", upload.single("resume"), submitCareerForm);

// GET: Fetch all submissions
router.get("/all", getAllCareerForms);

module.exports = router;
