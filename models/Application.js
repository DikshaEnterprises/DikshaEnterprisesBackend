const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  name: String,
  fatherName: String,
  mobile: String,
  email: String,
  aadhar: String,
  category: String,
  qualification: String,
  experience: String,
  address: String,
  district: String,
  state: String,
  gender: String,
  role: String,
  paidAmount: Number,
  paymentId: String,
  orderId: String,
  referralValid: Boolean,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', ApplicationSchema);
