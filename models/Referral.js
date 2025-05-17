const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema({
  userId: { type: String, required: false, unique: true },
  name: { type: String, required: false },
  phone: { type: String, required: false },
  referralCode: { type: String, unique: true },
  totalAmount: { type: Number, default: 0 },
  transactions: [
    {
          _id:String,
      amount: Number,
      date: { type: Date, default: Date.now },
      accNumber: String,
      ifscCode: String,
      bankName: String,
      mobileNumber: String,
      activeStatus: String
    }
  ]
});

module.exports = mongoose.model("Referral", referralSchema);
