const Referral = require('../models/Referral');

exports.getReferralEarnings = async (req, res) => {
  const { referralCode } = req.params;

  try {
    const referral = await Referral.findOne({ referralCode });

    if (!referral) {
      return res.status(404).json({ message: "Referral not found" });
    }

    const totalPaid = referral.totalAmount;
    const commission = referral.totalAmount;

    res.json({
      referralCode,
      totalPaid,
      commission,
    });
  } catch (error) {
    console.error("Referral earnings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
