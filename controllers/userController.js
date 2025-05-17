const User = require("../models/User");

// Generates a random short code (6 characters)
const generateReferralCode = () => {
  return 'REF-' + Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Ensures the referral code is unique in the DB
const generateUniqueReferralCode = async () => {
  let code;
  let exists = true;

  while (exists) {
    code = generateReferralCode();
    const existing = await User.findOne({ referralCode: code });
    exists = !!existing;
  }

  return code;
};

exports.createUser = async (req, res) => {
  try {
    const { userId, name, phone } = req.body;

    const existingUser = await User.findOne({ userId });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const referralCode = await generateUniqueReferralCode(); // use unique code
    const user = new User({ userId, name, phone, referralCode });
    await user.save();

    res.status(201).json({ name: user.name, referralCode: user.referralCode });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ name: user.name, referralCode: user.referralCode });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
