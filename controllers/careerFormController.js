const CareerFormSubmission = require("../models/CareerFormSubmission");

const submitCareerForm = async (req, res) => {
  try {
    const { fullName, email, phone, experience, message, selectedPost,appliedFor,referedBy } = req.body;
    const resumePath = req.file ? req.file.path : null;

    const newSubmission = new CareerFormSubmission({
      fullName,
      email,
      phone,
      experience,
      message,
      selectedPost,
      resume: resumePath,
      appliedFor,
      referedBy
    });

    await newSubmission.save();
    return res.status(201).json({ message: "Application submitted successfully!" });
  } catch (err) {
    console.error("Submission error:", err);
    return res.status(500).json({ message: "Error submitting application. Please try again." });
  }
};

// Fetch all submissions
const getAllCareerForms = async (req, res) => {
  try {
    const submissions = await CareerFormSubmission.find().sort({ createdAt: -1 });
    res.status(200).json(submissions);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Error fetching submissions." });
  }
};

module.exports = { submitCareerForm, getAllCareerForms };
