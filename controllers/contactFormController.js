// controllers/contactController.js
const Contact = require("../models/ContactRequest");

// Submit a contact form request
exports.submitContactForm = async (req, res) => {
  const { name, phone, email } = req.body;
  try {
    const newContact = new Contact({ name, phone, email });
    await newContact.save();
    res.status(201).json({ message: "Contact request submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting contact request", error });
  }
};

// Get all contact form submissions
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact requests", error });
  }
};
