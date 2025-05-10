const mongoose = require("mongoose");

const careerFormSubmissionSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    experience: { type: String },
    message: { type: String },
    selectedPost: { type: String, required: true },
    resume: { type: String }, // Stores the file path
    appliedFor: { type: String, required: true },
    referedBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CareerFormSubmission", careerFormSubmissionSchema);
