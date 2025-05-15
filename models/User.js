const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  referralCode: { type: String, unique: true }
});

module.exports = mongoose.model("User", userSchema);
