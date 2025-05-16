const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  name: String,
  fatherName: String,
  mobile: String,
  altMobile: String,
  email: String,
  dob: String,               // Use Date if you want validation: `dob: Date`
  gender: String,
  address: String,
  district: String,
  state: String,
  category: String,
  qualification: String,
  experience: String,
  aadhar: String,
  hasReferral: String,       // Or Boolean, depending on frontend type
  referralCode: String,
  referralValid: Boolean,
  agree: Boolean,
  paidAmount: Number,
  paymentId: String,
  orderId: String,
  userId: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', ApplicationSchema);
