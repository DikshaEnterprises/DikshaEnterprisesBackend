const mongoose = require('mongoose');

const leadFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  product: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model('LeadForm', leadFormSchema);
