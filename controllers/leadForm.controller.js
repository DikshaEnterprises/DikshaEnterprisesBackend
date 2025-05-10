const LeadForm = require('../models/leadForm.model');

// POST /api/lead-form
exports.submitLeadForm = async (req, res) => {
  try {
    const { name, phone,product } = req.body;
    const newEntry = new LeadForm({ name, phone,product });
    await newEntry.save();
    res.status(201).json({ message: 'Form submitted successfully', data: newEntry });
  } catch (error) {
    console.error('Submission Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// GET /api/lead-form
exports.getAllLeadForms = async (req, res) => {
  try {
    const allForms = await LeadForm.find().sort({ submittedAt: -1 });
    res.status(200).json(allForms);
  } catch (error) {
    console.error('Fetching Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
